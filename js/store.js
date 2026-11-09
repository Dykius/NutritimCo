/* NutritimCo · Estado del prototipo
   Simula el backend guardando todo en el navegador (localStorage).
   No se guardan contraseñas: el inicio de sesión es simulado. */
(function () {
  var KEY = "nutritimco:v1";

  function iso(d) {
    var z = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return z.toISOString().slice(0, 10);
  }
  function daysAgo(n) {
    var d = new Date();
    d.setDate(d.getDate() - n);
    return iso(d);
  }
  NC.today = function () {
    return iso(new Date());
  };
  NC.daysAgo = daysAgo;
  NC.isoDate = iso;
  NC.fmtDate = function (s) {
    if (!s) return "";
    var p = s.split("-");
    return p[2] + "/" + p[1] + "/" + p[0];
  };
  NC.uid = function () {
    return Math.random().toString(36).slice(2, 9);
  };

  function buildUser(seed) {
    var u = JSON.parse(JSON.stringify(seed));
    u.favs = (seed.favs || []).map(function (f) {
      return { id: f[0], at: Date.now() - f[1] * 86400000 };
    });
    u.habits = (seed.habitsSeed || []).map(function (h) {
      return {
        id: NC.uid(),
        recId: h[0],
        origin: h[1],
        done: h[2].map(daysAgo),
        archived: false,
      };
    });
    delete u.habitsSeed;
    u.created = NC.today();
    return u;
  }

  function fresh() {
    return {
      users: NC.SEED_USERS.map(buildUser),
      session: null,
      recs: JSON.parse(JSON.stringify(NC.SEED_RECS)),
    };
  }

  var state;
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      state = raw ? JSON.parse(raw) : fresh();
      if (!state.users || !state.recs) state = fresh();
    } catch (e) {
      state = fresh();
    }
  }
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      /* almacenamiento lleno o bloqueado */
    }
  }
  load();

  NC.store = {
    reset: function () {
      state = fresh();
      save();
    },
    save: save,

    /* ---------- Sesión y cuentas ---------- */
    user: function () {
      if (!state.session) return null;
      return (
        state.users.find(function (u) {
          return u.email === state.session;
        }) || null
      );
    },
    findUser: function (email) {
      email = (email || "").trim().toLowerCase();
      return (
        state.users.find(function (u) {
          return u.email === email;
        }) || null
      );
    },
    login: function (email) {
      var u = this.findUser(email);
      if (!u) return false;
      state.session = u.email;
      save();
      return true;
    },
    logout: function () {
      state.session = null;
      save();
    },
    register: function (name, email) {
      var u = buildUser({
        email: email.trim().toLowerCase(),
        name: name.trim(),
        role: "usuario",
        profile: { done: false, goals: [], restr: [], activity: "" },
        consents: {
          cuenta: true,
          salud: false,
          recordatorios: false,
          estadisticas: false,
        },
        privacy: { soloYo: true, personalizar: true },
        favs: [],
        habitsSeed: [],
        dismissed: [],
        tune: [],
        reminder: false,
      });
      state.users.push(u);
      state.session = u.email;
      save();
      return u;
    },
    deleteAccount: function () {
      var u = this.user();
      if (!u) return;
      state.users = state.users.filter(function (x) {
        return x.email !== u.email;
      });
      state.session = null;
      save();
    },
    update: function (fn) {
      var u = this.user();
      if (u) {
        fn(u);
        save();
      }
    },

    /* ---------- Contenidos ---------- */
    recs: function (all) {
      return state.recs.filter(function (r) {
        return all || r.status === "publicada";
      });
    },
    rec: function (id) {
      return (
        state.recs.find(function (r) {
          return r.id === id;
        }) || null
      );
    },
    upsertRec: function (rec) {
      var i = state.recs.findIndex(function (r) {
        return r.id === rec.id;
      });
      rec.updated = NC.today();
      if (i >= 0) state.recs[i] = rec;
      else state.recs.unshift(rec);
      save();
    },
    setStatus: function (id, status) {
      var r = this.rec(id);
      if (r) {
        r.status = status;
        r.updated = NC.today();
        save();
      }
    },
    removeRec: function (id) {
      state.recs = state.recs.filter(function (r) {
        return r.id !== id;
      });
      save();
    },

    /* ---------- Favoritos ---------- */
    isFav: function (id) {
      var u = this.user();
      return !!(
        u &&
        u.favs.some(function (f) {
          return f.id === id;
        })
      );
    },
    toggleFav: function (id) {
      var u = this.user();
      if (!u) return null;
      var on = this.isFav(id);
      if (on)
        u.favs = u.favs.filter(function (f) {
          return f.id !== id;
        });
      else u.favs.unshift({ id: id, at: Date.now() });
      save();
      return !on;
    },

    /* ---------- Hábitos ---------- */
    habits: function () {
      var u = this.user();
      return u
        ? u.habits.filter(function (h) {
            return !h.archived;
          })
        : [];
    },
    hasHabit: function (recId) {
      return this.habits().some(function (h) {
        return h.recId === recId;
      });
    },
    addHabit: function (recId, origin) {
      var u = this.user();
      if (!u || this.hasHabit(recId)) return false;
      u.habits.push({
        id: NC.uid(),
        recId: recId,
        origin: origin || "recomendación",
        done: [],
        archived: false,
      });
      save();
      return true;
    },
    toggleHabitToday: function (hid) {
      var h = this.habits().find(function (x) {
        return x.id === hid;
      });
      if (!h) return;
      var t = NC.today(),
        i = h.done.indexOf(t);
      if (i >= 0) h.done.splice(i, 1);
      else h.done.push(t);
      save();
      return i < 0;
    },
    archiveHabit: function (hid) {
      var u = this.user();
      if (!u) return;
      var h = u.habits.find(function (x) {
        return x.id === hid;
      });
      if (h) {
        h.archived = true;
        save();
      }
    },
    restoreHabit: function (hid) {
      var u = this.user();
      if (!u) return;
      var h = u.habits.find(function (x) {
        return x.id === hid;
      });
      if (h) {
        h.archived = false;
        save();
      }
    },

    /* Racha de un hábito: días seguidos cumplidos hasta hoy (o hasta ayer si hoy aún no) */
    streak: function (h) {
      var n = 0,
        start = h.done.indexOf(NC.today()) >= 0 ? 0 : 1;
      for (var d = start; d < 400; d++) {
        if (h.done.indexOf(daysAgo(d)) >= 0) n++;
        else break;
      }
      return n;
    },
    /* Resumen general para la pantalla de hábitos */
    summary: function () {
      var hs = this.habits(),
        t = NC.today();
      var doneToday = hs.filter(function (h) {
        return h.done.indexOf(t) >= 0;
      }).length;
      var anyOn = function (date) {
        return hs.some(function (h) {
          return h.done.indexOf(date) >= 0;
        });
      };
      var streak = 0,
        s = anyOn(t) ? 0 : 1;
      for (var d = s; d < 400; d++) {
        if (anyOn(daysAgo(d))) streak++;
        else break;
      }
      /* Semana de lunes a domingo */
      var now = new Date(),
        dow = (now.getDay() + 6) % 7,
        week = [],
        possible = 0,
        done = 0;
      for (var i = 0; i < 7; i++) {
        var date = daysAgo(dow - i),
          future = i > dow;
        var count = hs.filter(function (h) {
          return h.done.indexOf(date) >= 0;
        }).length;
        if (!future) {
          possible += hs.length;
          done += count;
        }
        week.push({
          date: date,
          label: "LMXJVSD"[i],
          ok: count > 0,
          today: i === dow,
          future: future,
        });
      }
      return {
        total: hs.length,
        doneToday: doneToday,
        streak: streak,
        week: week,
        pct: possible ? Math.round((done / possible) * 100) : 0,
      };
    },

    /* ---------- Personalización (reglas simples) ---------- */
    usesHealth: function (u) {
      return !!(u && u.consents.salud && u.privacy.personalizar);
    },
    personalize: function () {
      var u = this.user();
      if (!u) return [];
      var p = u.profile || {},
        useHealth = this.usesHealth(u);
      var goalCats = (p.goals || []).map(function (g) {
        return NC.GOALS[g] && NC.GOALS[g].cat;
      });
      var needTags = useHealth
        ? (p.restr || [])
            .map(function (r) {
              return NC.PROFILE_RESTR[r] && NC.PROFILE_RESTR[r].tag;
            })
            .filter(Boolean)
        : [];
      var tune = u.tune || [];
      var self = this;
      return this.recs()
        .filter(function (r) {
          if ((u.dismissed || []).indexOf(r.id) >= 0) return false;
          if (
            r.cat === "alimentacion" &&
            needTags.some(function (t) {
              return r.tags.indexOf(t) < 0;
            })
          )
            return false;
          if (
            p.activity === "bajo" &&
            r.diff === "Media" &&
            r.cat === "actividad"
          )
            return false;
          return true;
        })
        .map(function (r) {
          var score = 0,
            why = [];
          var gi = goalCats.indexOf(r.cat);
          if (gi >= 0) {
            score += 5;
            why.push(
              "dijiste que quieres " +
                NC.GOALS[p.goals[gi]].label.toLowerCase(),
            );
          }
          if (r.cat === "alimentacion" && needTags.length) {
            score += 1;
            why.push(
              "cumple con tus restricciones (" +
                needTags
                  .map(function (t) {
                    return NC.RESTR[t].split(" (")[0].toLowerCase();
                  })
                  .join(", ") +
                ")",
            );
          }
          if (p.activity && r.diff === "Fácil") {
            score += 1;
            if (!why.length) why.push("encaja con tu nivel de actividad");
          }
          if (tune.indexOf("mas-descanso") >= 0 && r.cat === "descanso") {
            score += 3;
            why.push("pediste más descanso");
          }
          if (
            tune.indexOf("ejercicio-suave") >= 0 &&
            r.cat === "actividad" &&
            r.diff === "Fácil"
          ) {
            score += 3;
            why.push("pediste ejercicio suave");
          }
          if (
            tune.indexOf("menos-recetas-largas") >= 0 &&
            r.kind === "receta" &&
            r.minutes > 30
          )
            score -= 4;
          if (self.isFav(r.id))
            score -= 1; /* lo que ya guardaste baja un poco para mostrar cosas nuevas */
          if (!why.length)
            why.push("es una recomendación corta y fácil de empezar");
          return { rec: r, score: score, why: why[0] };
        })
        .sort(function (a, b) {
          return b.score - a.score;
        });
    },

    exportData: function () {
      var u = this.user();
      if (!u) return null;
      var self = this;
      return {
        generado: new Date().toISOString(),
        aviso: "Copia de tus datos en NutritimCo (prototipo académico).",
        cuenta: { nombre: u.name, correo: u.email, creada: u.created },
        perfil_salud: u.profile,
        consentimientos: u.consents,
        privacidad: u.privacy,
        favoritos: u.favs.map(function (f) {
          var r = self.rec(f.id);
          return r ? r.title : f.id;
        }),
        habitos: u.habits.map(function (h) {
          var r = self.rec(h.recId);
          return {
            habito: r ? r.title : h.recId,
            dias_cumplidos: h.done,
            archivado: h.archived,
          };
        }),
      };
    },
  };
})();

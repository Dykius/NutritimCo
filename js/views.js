/* NutritimCo · Pantallas del prototipo
   Cada vista devuelve { title, nav, html, mount }. El enrutador está en app.js. */
(function () {
  var S = NC.store,
    esc = NC.esc,
    I = NC.icon;
  var V = (NC.views = {});

  function first(name) {
    return (name || "").split(" ")[0];
  }
  function countCat(cat) {
    return S.recs().filter(function (r) {
      return r.cat === cat;
    }).length;
  }
  function plural(n, s, p) {
    return n + " " + (n === 1 ? s : p);
  }
  function norm(s) {
    return String(s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }
  function sourceText(r) {
    return NC.SOURCES[r.source] || r.sourceText || "Pendiente";
  }
  function field(id, label, input, hint) {
    return `<div class="fd"><label for="${id}">${label}</label>${input}<p class="err" id="${id}-err" hidden></p>${hint ? `<p class="hint">${hint}</p>` : ""}</div>`;
  }
  function setErr(root, id, msg) {
    var e = root.querySelector("#" + id + "-err"),
      inp = root.querySelector("#" + id);
    if (e) {
      e.textContent = msg || "";
      e.hidden = !msg;
    }
    if (inp) {
      inp.setAttribute("aria-invalid", msg ? "true" : "false");
      if (msg) inp.setAttribute("aria-describedby", id + "-err");
    }
  }
  NC.setErr = setErr;

  /* =========================================================
     Pantalla 1 · Inicio
     ========================================================= */
  V.inicio = function () {
    var u = S.user();
    var picks = ["alimentacion", "actividad", "descanso"]
      .map(function (c) {
        return S.recs().find(function (r) {
          return r.cat === c;
        });
      })
      .filter(Boolean);
    return {
      title: "Inicio",
      nav: "Inicio",
      html: `
      <section class="hero">
        <div class="hero-t">
          <h1 tabindex="-1">Comer rico, moverte y dormir bien, sin complicarte</h1>
          <p class="lead">Recomendaciones cortas y claras de alimentación, actividad física, descanso y bienestar. Entras sin cuenta o armas tu perfil para recibir lo que más te sirve.</p>
          <div class="row">
            <a class="b" href="${u ? "#/para-ti" : "#/acceso?modo=registro"}">${u ? "Ver mis recomendaciones" : "Crear mi perfil"}</a>
            <a class="b s" href="#/explorar">${u ? "Explorar" : "Explorar sin cuenta"}</a>
          </div>
          <p class="hint">Contenido informativo. No sustituye la consulta médica.</p>
        </div>
        ${NC.img("mercado", { cat: "actividad", eager: true, cls: "hero-img", sizes: "(max-width: 760px) 100vw, 560px", w: 1200 })}
      </section>
      <section aria-labelledby="h-cats">
        <h2 id="h-cats" class="vh">Categorías</h2>
        <div class="g g4">
          ${Object.keys(NC.CATS)
            .map(function (k) {
              var c = NC.CATS[k];
              return `
            <a class="cat-tile" href="#/explorar?cat=${k}" style="background:${c.tint};border-bottom-color:${c.color}">
              <span class="cat-n">${c.name}</span><span class="hint">${plural(countCat(k), "recomendación", "recomendaciones")}</span>
            </a>`;
            })
            .join("")}
        </div>
      </section>
      <section aria-labelledby="h-hoy">
        <div class="rw"><h2 id="h-hoy">Recomendadas hoy</h2><a class="lk" href="#/explorar">Ver todas</a></div>
        <div class="g g3">${picks
          .map(function (r) {
            return NC.card(r);
          })
          .join("")}</div>
      </section>
      <section aria-labelledby="h-como">
        <h2 id="h-como">Así funciona</h2>
        <ol class="g g3 steps">
          <li class="pn"><h3>1. Cuéntanos tu objetivo</h3><p class="muted">Un perfil corto, con campos opcionales.</p></li>
          <li class="pn"><h3>2. Recibe recomendaciones para ti</h3><p class="muted">Te decimos por qué te mostramos cada una.</p></li>
          <li class="pn"><h3>3. Guarda favoritos y sigue tus hábitos</h3><p class="muted">Marca tu avance diario, a tu ritmo.</p></li>
        </ol>
      </section>
      <section class="pn v band">
        <h3>Tus datos de salud son tuyos</h3>
        <p>Todo lo que cuentas sobre tu salud es opcional, lo usamos solo para personalizar y puedes verlo, corregirlo o borrarlo cuando quieras.</p>
        <a class="b s" href="#/legal">Conocer mis derechos</a>
      </section>`,
    };
  };

  /* =========================================================
     Pantalla 2 · Registro e inicio de sesión
     ========================================================= */
  V.acceso = function (q) {
    var mode = q.modo === "ingresar" ? "ingresar" : "registro";
    var next = q.next || "";
    var pwd = function (id) {
      return `<div class="pw"><input class="in" id="${id}" name="${id}" type="password" autocomplete="${mode === "registro" ? "new-password" : "current-password"}" required>
        <button type="button" class="pw-t" data-toggle="${id}" aria-pressed="false">${I("eye", 18)}<span>Mostrar</span></button></div>`;
    };
    var reg = `
      <form id="f-reg" novalidate>
        ${field("r-name", "Nombre", '<input class="in" id="r-name" autocomplete="name" required>')}
        ${field("r-mail", "Correo electrónico", '<input class="in" id="r-mail" type="email" autocomplete="email" required placeholder="nombre@correo.com">')}
        ${field("r-pass", "Contraseña", pwd("r-pass"), "Mínimo 8 caracteres. Mezcla letras, números y símbolos.")}
        <div class="meter" aria-live="polite"><div class="meter-b"><span id="m-bar"></span></div><small id="m-txt">Seguridad: escribe una contraseña</small></div>
        <label class="ck"><input type="checkbox" id="r-ok"><span>Acepto los términos y autorizo el tratamiento de mis datos personales según la <a href="#/legal" target="_blank">política de datos</a> (Ley 1581 de 2012).</span></label>
        <p class="err" id="r-ok-err" hidden></p>
        <button class="b full" type="submit">Crear cuenta</button>
        <button class="b s full" type="button" data-google>Continuar con Google</button>
        <p class="hint center">¿Ya tienes cuenta? <a class="lk" href="#/acceso?modo=ingresar${next ? "&next=" + encodeURIComponent(next) : ""}">Ingresar</a></p>
      </form>`;
    var log = `
      <form id="f-log" novalidate>
        ${field("l-mail", "Correo electrónico", '<input class="in" id="l-mail" type="email" autocomplete="email" required placeholder="nombre@correo.com">')}
        ${field("l-pass", "Contraseña", pwd("l-pass"))}
        <button class="b full" type="submit">Ingresar</button>
        <button class="b s full" type="button" data-google>Continuar con Google</button>
        <button class="lk" type="button" id="forgot">¿Olvidaste tu contraseña?</button>
        <div class="pn v" id="recover" hidden>
          ${field("rc-mail", "Escribe tu correo para recuperar el acceso", '<input class="in" id="rc-mail" type="email" autocomplete="email">')}
          <button class="b s" type="button" id="rc-send">Enviar enlace</button>
          <p class="ok" id="rc-msg" role="status" hidden></p>
        </div>
        <div class="demo"><b>Cuentas de prueba del prototipo</b><p>laura@correo.com (usuaria con datos) y editor@nutritimco.example (editor). Sirve cualquier contraseña de 8 caracteres o más.</p></div>
      </form>`;
    return {
      title: mode === "registro" ? "Crear cuenta" : "Ingresar",
      nav: "",
      bare: true,
      html: `
      <div class="auth">
        <aside class="auth-side">
          <h2>Tu cuenta, a tu manera</h2>
          ${NC.img("arepas", { cat: "alimentacion", cls: "auth-img", sizes: "(max-width: 760px) 100vw, 480px" })}
          <ul class="ticks">
            <li>${I("check", 20)}Recibe recomendaciones para ti.</li>
            <li>${I("check", 20)}Guarda tus favoritos.</li>
            <li>${I("check", 20)}Sigue tus hábitos cada día.</li>
          </ul>
        </aside>
        <div class="auth-main">
          <h1 tabindex="-1" class="vh">${mode === "registro" ? "Crear cuenta" : "Ingresar"}</h1>
          <div class="tabs" role="tablist" aria-label="Tipo de acceso">
            <a role="tab" aria-selected="${mode === "registro"}" class="cp${mode === "registro" ? " on" : ""}" href="#/acceso?modo=registro${next ? "&next=" + encodeURIComponent(next) : ""}">Crear cuenta</a>
            <a role="tab" aria-selected="${mode === "ingresar"}" class="cp${mode === "ingresar" ? " on" : ""}" href="#/acceso?modo=ingresar${next ? "&next=" + encodeURIComponent(next) : ""}">Ingresar</a>
          </div>
          ${mode === "registro" ? reg : log}
        </div>
      </div>`,
      mount: function (root) {
        var go = function () {
          location.hash = next
            ? "#" + next
            : S.user().role === "editor"
              ? "#/editor"
              : "#/para-ti";
        };
        root.querySelectorAll("[data-toggle]").forEach(function (b) {
          b.addEventListener("click", function () {
            var inp = root.querySelector("#" + b.dataset.toggle),
              show = inp.type === "password";
            inp.type = show ? "text" : "password";
            b.setAttribute("aria-pressed", show);
            b.querySelector("span").textContent = show ? "Ocultar" : "Mostrar";
          });
        });
        root.querySelectorAll("[data-google]").forEach(function (b) {
          b.addEventListener("click", function () {
            NC.modal({
              title: "Continuar con Google",
              body: "<p>En la versión final este botón abre el inicio de sesión de Google. En el prototipo entras con la cuenta de prueba de Laura.</p>",
              actions: [
                {
                  label: "Cancelar",
                  cls: "s",
                  fn: function (c) {
                    c();
                  },
                },
                {
                  label: "Continuar",
                  fn: function (c) {
                    S.login("laura@correo.com");
                    c();
                    NC.toast("Sesión iniciada.");
                    go();
                  },
                },
              ],
            });
          });
        });
        var fr = root.querySelector("#f-reg");
        if (fr) {
          var pass = fr.querySelector("#r-pass");
          pass.addEventListener("input", function () {
            var v = pass.value,
              s = 0;
            if (v.length >= 8) s++;
            if (/[A-Z]/.test(v) && /[a-z]/.test(v)) s++;
            if (/\d/.test(v)) s++;
            if (/[^A-Za-z0-9]/.test(v)) s++;
            var lv = !v
              ? ["", "0%", "escribe una contraseña"]
              : s <= 1
                ? ["weak", "30%", "baja"]
                : s <= 3
                  ? ["mid", "62%", "media"]
                  : ["strong", "100%", "alta"];
            var bar = fr.querySelector("#m-bar");
            bar.className = lv[0];
            bar.style.width = lv[1];
            fr.querySelector("#m-txt").textContent = "Seguridad: " + lv[2];
          });
          fr.addEventListener("submit", function (e) {
            e.preventDefault();
            var name = fr.querySelector("#r-name").value.trim(),
              mail = fr.querySelector("#r-mail").value.trim(),
              ok = true;
            setErr(fr, "r-name", name ? "" : "Escribe tu nombre.");
            if (!name) ok = false;
            var mailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
            if (!mailOk) {
              setErr(
                fr,
                "r-mail",
                "Escribe un correo válido, por ejemplo nombre@correo.com.",
              );
              ok = false;
            } else if (S.findUser(mail)) {
              setErr(
                fr,
                "r-mail",
                "Ese correo ya está registrado. Ingresa o recupera tu contraseña.",
              );
              ok = false;
            } else setErr(fr, "r-mail", "");
            if (pass.value.length < 8) {
              setErr(
                fr,
                "r-pass",
                "La contraseña debe tener al menos 8 caracteres.",
              );
              ok = false;
            } else setErr(fr, "r-pass", "");
            var c = fr.querySelector("#r-ok").checked,
              ce = fr.querySelector("#r-ok-err");
            ce.textContent = c
              ? ""
              : "Para crear la cuenta debes aceptar la política de datos.";
            ce.hidden = c;
            if (!c) ok = false;
            if (!ok) {
              var bad =
                fr.querySelector('[aria-invalid="true"]') ||
                fr.querySelector("#r-ok");
              bad.focus();
              return;
            }
            S.register(name, mail);
            NC.toast("Cuenta creada. Ahora arma tu perfil.");
            location.hash = "#/perfil?nuevo=1";
          });
        }
        var fl = root.querySelector("#f-log");
        if (fl) {
          fl.addEventListener("submit", function (e) {
            e.preventDefault();
            var mail = fl.querySelector("#l-mail").value.trim(),
              p = fl.querySelector("#l-pass").value,
              ok = true;
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
              setErr(fl, "l-mail", "Escribe un correo válido.");
              ok = false;
            } else setErr(fl, "l-mail", "");
            if (p.length < 8) {
              setErr(
                fl,
                "l-pass",
                "La contraseña tiene al menos 8 caracteres.",
              );
              ok = false;
            } else setErr(fl, "l-pass", "");
            if (ok && !S.findUser(mail)) {
              setErr(
                fl,
                "l-pass",
                "El correo o la contraseña no coinciden. Revísalos o crea una cuenta.",
              );
              ok = false;
            }
            if (!ok) {
              fl.querySelector('[aria-invalid="true"]').focus();
              return;
            }
            S.login(mail);
            NC.toast("Hola de nuevo, " + first(S.user().name) + ".");
            go();
          });
          fl.querySelector("#forgot").addEventListener("click", function () {
            var r = fl.querySelector("#recover");
            r.hidden = !r.hidden;
            if (!r.hidden) r.querySelector("input").focus();
          });
          fl.querySelector("#rc-send").addEventListener("click", function () {
            var m = fl.querySelector("#rc-mail").value.trim();
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m)) {
              setErr(fl, "rc-mail", "Escribe un correo válido.");
              return;
            }
            setErr(fl, "rc-mail", "");
            var msg = fl.querySelector("#rc-msg");
            msg.hidden = false;
            msg.textContent =
              "Si ese correo tiene una cuenta, te enviamos un enlace para crear una contraseña nueva. Revisa también la carpeta de spam.";
          });
        }
      },
    };
  };

  /* =========================================================
     Pantalla 3 · Perfil de salud (3 pasos)
     ========================================================= */
  V.perfil = function (q) {
    var u = S.user(),
      p = JSON.parse(JSON.stringify(u.profile || {}));
    p.goals = p.goals || [];
    p.restr = p.restr || [];
    var step = Math.min(3, Math.max(1, parseInt(q.paso, 10) || 1));
    var names = ["Datos básicos", "Objetivos", "Preferencias y restricciones"];
    var body;
    if (step === 1) {
      body = `<h2 class="h3">Paso 1. Datos básicos</h2>
        <div class="g g2">
          ${field("p-age", "Edad", `<input class="in" id="p-age" type="number" inputmode="numeric" min="18" max="110" value="${esc(p.age || "")}">`)}
          ${field(
            "p-sex",
            "Sexo (opcional)",
            `<select class="in" id="p-sex">${[
              "Prefiero no decirlo",
              "Femenino",
              "Masculino",
              "Otro",
            ]
              .map(function (o) {
                return `<option${p.sex === o ? " selected" : ""}>${o}</option>`;
              })
              .join("")}</select>`,
          )}
          ${field("p-h", "Estatura en cm (opcional)", `<input class="in" id="p-h" type="number" inputmode="numeric" min="90" max="230" value="${esc(p.height || "")}">`)}
          ${field("p-w", "Peso en kg (opcional)", `<input class="in" id="p-w" type="number" inputmode="numeric" min="25" max="300" value="${esc(p.weight || "")}">`)}
        </div>
        <fieldset class="fs"><legend>Nivel de actividad actual</legend>
          <div class="chips" data-single="activity">${[
            "bajo",
            "moderado",
            "alto",
          ]
            .map(function (a) {
              return NC.chip(
                a[0].toUpperCase() + a.slice(1),
                p.activity === a,
                'data-val="' + a + '"',
              );
            })
            .join("")}</div>
        </fieldset>
        <p class="hint">Puedes dejar vacío cualquier campo. Lo usamos solo para ajustar tus recomendaciones.</p>`;
    } else if (step === 2) {
      body = `<h2 class="h3">Paso 2. Objetivos</h2>
        <fieldset class="fs"><legend>¿Qué quieres mejorar? Puedes elegir varios.</legend>
          <div class="chips" data-multi="goals">${Object.keys(NC.GOALS)
            .map(function (g) {
              return NC.chip(
                NC.GOALS[g].label,
                p.goals.indexOf(g) >= 0,
                'data-val="' + g + '"',
              );
            })
            .join("")}</div>
        </fieldset>
        <p class="hint">Tus objetivos ordenan la pantalla Para ti.</p>`;
    } else {
      body = `<h2 class="h3">Paso 3. Preferencias y restricciones</h2>
        <fieldset class="fs"><legend>¿Tienes alguna restricción o condición que debamos tener en cuenta?</legend>
          <div class="chips" data-multi="restr">${Object.keys(NC.PROFILE_RESTR)
            .map(function (r) {
              return NC.chip(
                NC.PROFILE_RESTR[r].label,
                p.restr.indexOf(r) >= 0,
                'data-val="' + r + '"',
              );
            })
            .join(
              "",
            )}${NC.chip("Ninguna", !p.restr.length, 'data-val="ninguna"')}</div>
        </fieldset>
        <p class="hint">Con esto ocultamos recetas que no te convienen. Es un dato de salud: solo lo guardamos con tu autorización.</p>`;
    }
    return {
      title: "Perfil de salud",
      nav: "",
      html: `
      <h1 tabindex="-1">${q.nuevo ? "Arma tu perfil de salud" : "Mi perfil de salud"}</h1>
      <ol class="g g3 stepper" aria-label="Pasos del perfil">
        ${names
          .map(function (n, i) {
            var k = i + 1;
            return `<li><a class="pn step${k === step ? " cur" : ""}${k < step ? " done" : ""}" href="#/perfil?paso=${k}" ${k === step ? 'aria-current="step"' : ""}>
          ${k < step ? I("check", 18) : ""}<b>${k}. ${n}</b></a></li>`;
          })
          .join("")}
      </ol>
      <div class="split">
        <section class="pn" id="p-body">${body}</section>
        <aside class="pn v">
          <h2 class="h3">${I("shield", 20)} Tu privacidad</h2>
          ${NC.sw("Solo yo veo mi perfil", "No se comparte con otros usuarios.", u.privacy.soloYo, 'data-pv="soloYo"')}
          ${NC.sw("Personalizar con mis datos", "Puedes apagarlo cuando quieras.", u.privacy.personalizar, 'data-pv="personalizar"')}
          <label class="ck"><input type="checkbox" id="p-ok" ${u.consents.salud ? "checked" : ""}><span>Autorizo el tratamiento de mis datos de salud, que son datos sensibles, para las finalidades descritas en la política de datos.</span></label>
          <p class="err" id="p-ok-err" hidden></p>
          <a class="lk" href="#/legal">Leer la política de datos</a>
        </aside>
      </div>
      <div class="rw nav-steps">
        ${step > 1 ? `<a class="b s" href="#/perfil?paso=${step - 1}">Atrás</a>` : "<span></span>"}
        <span class="row"><button type="button" class="lk" id="p-skip">Omitir por ahora</button>
        <button type="button" class="b" id="p-next">${step < 3 ? "Continuar" : "Guardar perfil"}</button></span>
      </div>
      <button type="button" class="lk danger" id="p-del">Eliminar mi cuenta y mis datos</button>`,
      mount: function (root) {
        root.querySelectorAll("[data-single] .cp").forEach(function (c) {
          c.addEventListener("click", function () {
            c.parentNode.querySelectorAll(".cp").forEach(function (x) {
              x.classList.remove("on");
              x.setAttribute("aria-pressed", "false");
            });
            c.classList.add("on");
            c.setAttribute("aria-pressed", "true");
            p.activity = c.dataset.val;
          });
        });
        root.querySelectorAll("[data-multi] .cp").forEach(function (c) {
          c.addEventListener("click", function () {
            var key = c.parentNode.dataset.multi,
              v = c.dataset.val,
              box = c.parentNode;
            if (v === "ninguna") {
              p[key] = [];
            } else {
              var i = p[key].indexOf(v);
              if (i >= 0) p[key].splice(i, 1);
              else p[key].push(v);
            }
            box.querySelectorAll(".cp").forEach(function (x) {
              var on =
                x.dataset.val === "ninguna"
                  ? !p[key].length
                  : p[key].indexOf(x.dataset.val) >= 0;
              x.classList.toggle("on", on);
              x.setAttribute("aria-pressed", on);
            });
          });
        });
        root.querySelectorAll("[data-pv]").forEach(function (b) {
          b.addEventListener("click", function () {
            var k = b.dataset.pv;
            S.update(function (x) {
              x.privacy[k] = !x.privacy[k];
            });
            var on = S.user().privacy[k];
            b.classList.toggle("on", on);
            b.setAttribute("aria-checked", on);
          });
        });
        function collect() {
          if (step === 1) {
            p.age = root.querySelector("#p-age").value.trim();
            p.sex = root.querySelector("#p-sex").value;
            p.height = root.querySelector("#p-h").value.trim();
            p.weight = root.querySelector("#p-w").value.trim();
          }
        }
        function valid() {
          var ok = true,
            consent = root.querySelector("#p-ok").checked;
          if (step === 1) {
            var a = parseInt(p.age, 10);
            if (p.age && (isNaN(a) || a < 18 || a > 110)) {
              setErr(
                root,
                "p-age",
                "Escribe una edad entre 18 y 110 años. NutritimCo está pensado para personas adultas.",
              );
              ok = false;
            } else setErr(root, "p-age", "");
            var h = parseInt(p.height, 10),
              w = parseInt(p.weight, 10);
            if (p.height && (isNaN(h) || h < 90 || h > 230)) {
              setErr(
                root,
                "p-h",
                "Escribe la estatura en centímetros, por ejemplo 165.",
              );
              ok = false;
            } else setErr(root, "p-h", "");
            if (p.weight && (isNaN(w) || w < 25 || w > 300)) {
              setErr(
                root,
                "p-w",
                "Escribe el peso en kilogramos, por ejemplo 62.",
              );
              ok = false;
            } else setErr(root, "p-w", "");
          }
          var health =
            (step === 1 && (p.height || p.weight)) ||
            (step === 3 && p.restr.length);
          var ce = root.querySelector("#p-ok-err");
          if (health && !consent) {
            ce.textContent =
              "Para guardar estatura, peso o restricciones necesitamos tu autorización. También puedes dejarlos vacíos.";
            ce.hidden = false;
            ok = false;
          } else ce.hidden = true;
          return ok;
        }
        root.querySelector("#p-next").addEventListener("click", function () {
          collect();
          if (!valid()) {
            (
              root.querySelector('[aria-invalid="true"]') ||
              root.querySelector("#p-ok")
            ).focus();
            return;
          }
          var consent = root.querySelector("#p-ok").checked;
          S.update(function (x) {
            x.consents.salud = consent;
            if (step === 3) p.done = true;
            x.profile = p;
          });
          if (step < 3)
            location.hash =
              "#/perfil?paso=" + (step + 1) + (q.nuevo ? "&nuevo=1" : "");
          else {
            NC.toast("Perfil guardado. Estas son tus recomendaciones.");
            location.hash = "#/para-ti";
          }
        });
        root.querySelector("#p-skip").addEventListener("click", function () {
          NC.toast(
            "Puedes completar tu perfil cuando quieras desde el menú de tu cuenta.",
          );
          location.hash = "#/para-ti";
        });
        root.querySelector("#p-ok").addEventListener("change", function (e) {
          S.update(function (x) {
            x.consents.salud = e.target.checked;
          });
        });
        root
          .querySelector("#p-del")
          .addEventListener("click", NC.confirmDelete);
      },
    };
  };

  /* =========================================================
     Pantalla 4 · Explorar (búsqueda y filtros)
     ========================================================= */
  var TIME = {
    lt15: [
      "Menos de 15 min",
      function (m) {
        return m < 15;
      },
    ],
    "15a30": [
      "15 a 30 min",
      function (m) {
        return m >= 15 && m <= 30;
      },
    ],
    gt30: [
      "Más de 30 min",
      function (m) {
        return m > 30;
      },
    ],
  };
  V.explorar = function (q) {
    var st = {
      q: q.q || "",
      cat: (q.cat || "").split(",").filter(Boolean),
      time: (q.time || "").split(",").filter(Boolean),
      diff: (q.diff || "").split(",").filter(Boolean),
      rest: (q.rest || "").split(",").filter(Boolean),
      sort: q.sort || "relevancia",
      n: parseInt(q.n, 10) || 6,
    };
    var group = function (key, title, opts) {
      return `<fieldset class="fs"><legend>${title}</legend>${opts
        .map(function (o) {
          return `<label class="ck"><input type="checkbox" data-f="${key}" value="${o[0]}" ${st[key].indexOf(o[0]) >= 0 ? "checked" : ""}><span>${o[1]}</span></label>`;
        })
        .join("")}</fieldset>`;
    };
    var filters = `
      ${group(
        "cat",
        "Categoría",
        Object.keys(NC.CATS).map(function (k) {
          return [k, NC.CATS[k].name];
        }),
      )}
      ${group(
        "time",
        "Tiempo",
        Object.keys(TIME).map(function (k) {
          return [k, TIME[k][0]];
        }),
      )}
      ${group("diff", "Dificultad", [
        ["Fácil", "Fácil"],
        ["Media", "Media"],
      ])}
      ${group(
        "rest",
        "Restricción",
        Object.keys(NC.RESTR).map(function (k) {
          return [k, NC.RESTR[k]];
        }),
      )}
      <button type="button" class="lk" data-clear>Limpiar filtros</button>`;

    function results() {
      var words = norm(st.q).split(/\s+/).filter(Boolean);
      var list = S.recs()
        .map(function (r) {
          var hay = norm(
            r.title +
              " " +
              NC.CATS[r.cat].name +
              " " +
              r.tags
                .map(function (t) {
                  return NC.RESTR[t];
                })
                .join(" ") +
              " " +
              r.summary,
          );
          var t = norm(r.title),
            score = 0;
          words.forEach(function (w) {
            if (t.indexOf(w) >= 0) score += 3;
            else if (hay.indexOf(w) >= 0) score += 1;
            else score -= 100;
          });
          return { r: r, score: score };
        })
        .filter(function (x) {
          var r = x.r;
          if (words.length && x.score < 0) return false;
          if (st.cat.length && st.cat.indexOf(r.cat) < 0) return false;
          if (
            st.time.length &&
            !st.time.some(function (k) {
              return TIME[k][1](r.minutes);
            })
          )
            return false;
          if (st.diff.length && st.diff.indexOf(r.diff) < 0) return false;
          if (
            st.rest.length &&
            !st.rest.every(function (t) {
              return r.tags.indexOf(t) >= 0;
            })
          )
            return false;
          return true;
        });
      if (st.sort === "cortas")
        list.sort(function (a, b) {
          return a.r.minutes - b.r.minutes;
        });
      else if (st.sort === "az")
        list.sort(function (a, b) {
          return a.r.title.localeCompare(b.r.title, "es");
        });
      else
        list.sort(function (a, b) {
          return b.score - a.score;
        });
      return list.map(function (x) {
        return x.r;
      });
    }
    function chips() {
      var out = [];
      if (st.q) out.push(["q", st.q, "“" + st.q + "”"]);
      st.cat.forEach(function (v) {
        out.push(["cat", v, NC.CATS[v].name]);
      });
      st.time.forEach(function (v) {
        out.push(["time", v, TIME[v][0]]);
      });
      st.diff.forEach(function (v) {
        out.push(["diff", v, v]);
      });
      st.rest.forEach(function (v) {
        out.push(["rest", v, NC.RESTR[v].split(" (")[0]]);
      });
      return out;
    }
    function hashFor() {
      var parts = [];
      if (st.q) parts.push("q=" + encodeURIComponent(st.q));
      ["cat", "time", "diff", "rest"].forEach(function (k) {
        if (st[k].length)
          parts.push(k + "=" + encodeURIComponent(st[k].join(",")));
      });
      if (st.sort !== "relevancia") parts.push("sort=" + st.sort);
      if (st.n > 6) parts.push("n=" + st.n);
      return "#/explorar" + (parts.length ? "?" + parts.join("&") : "");
    }
    function renderResults(root) {
      var list = results(),
        shown = list.slice(0, st.n),
        ch = chips();
      root.querySelector("#res").innerHTML = `
        <div class="rw res-top">
          <div class="chips" aria-label="Filtros activos">${ch
            .map(function (c) {
              return `<button type="button" class="cp on" data-rm="${c[0]}" data-v="${esc(c[1])}" aria-label="Quitar filtro ${esc(c[2])}">${esc(c[2])} ${I("x", 14)}</button>`;
            })
            .join("")}</div>
          <div class="row res-meta"><span role="status">${plural(list.length, "resultado", "resultados")}</span>
            <label class="sort">Ordenar
              <select class="in" id="sort"><option value="relevancia"${st.sort === "relevancia" ? " selected" : ""}>Relevancia</option><option value="cortas"${st.sort === "cortas" ? " selected" : ""}>Más cortas primero</option><option value="az"${st.sort === "az" ? " selected" : ""}>A a Z</option></select>
            </label></div>
        </div>
        ${
          shown.length
            ? `<div class="g g3">${shown
                .map(function (r) {
                  return NC.card(r);
                })
                .join("")}</div>`
            : `
          <div class="pn empty">
            <h2 class="h3">Sin resultados</h2>
            <p>No encontramos nada con esos filtros. Quita un filtro o prueba otra palabra, por ejemplo “caminata” o “sin gluten”.</p>
            <button type="button" class="b" data-clear>Limpiar filtros</button>
          </div>`
        }
        ${list.length > st.n ? `<button type="button" class="b s center-b" id="more">Ver más (${list.length - st.n} restantes)</button>` : ""}`;
      root.querySelector("#f-count").textContent =
        ch.filter(function (c) {
          return c[0] !== "q";
        }).length || "";
      history.replaceState(null, "", hashFor());
    }
    return {
      title: "Explorar",
      nav: "Explorar",
      html: `
      <h1 tabindex="-1">Explorar recomendaciones</h1>
      <form class="search-row" role="search" id="sx">
        <label for="sx-q" class="vh">Buscar recomendaciones</label>
        <input class="in" id="sx-q" type="search" value="${esc(st.q)}" placeholder="Buscar recetas, rutinas, hábitos…" list="sugg" autocomplete="off">
        <button class="b" type="submit">${I("search", 18)}Buscar</button>
      </form>
      <button type="button" class="b s only-m" id="f-open" aria-controls="filters" aria-expanded="false">${I("filter", 18)}Filtros <span id="f-count" class="badge"></span></button>
      <div class="explore">
        <aside class="pn filters" id="filters" aria-label="Filtros">
          <div class="rw only-m"><h2 class="h3">Filtros</h2><button type="button" class="ib" id="f-close" aria-label="Cerrar filtros">${I("x")}</button></div>
          <h2 class="h3 only-d">Filtros</h2>
          ${filters}
          <button type="button" class="b full only-m" id="f-apply">Ver resultados</button>
        </aside>
        <section id="res" aria-live="polite"></section>
      </div>`,
      mount: function (root) {
        renderResults(root);
        root.querySelector("#sx").addEventListener("submit", function (e) {
          e.preventDefault();
          st.q = root.querySelector("#sx-q").value.trim();
          st.n = 6;
          renderResults(root);
        });
        root.querySelectorAll("[data-f]").forEach(function (cb) {
          cb.addEventListener("change", function () {
            var k = cb.dataset.f,
              i = st[k].indexOf(cb.value);
            if (cb.checked && i < 0) st[k].push(cb.value);
            if (!cb.checked && i >= 0) st[k].splice(i, 1);
            st.n = 6;
            renderResults(root);
          });
        });
        root.addEventListener("click", function (e) {
          var rm = e.target.closest("[data-rm]"),
            clr = e.target.closest("[data-clear]");
          if (rm) {
            var k = rm.dataset.rm,
              v = rm.dataset.v;
            if (k === "q") {
              st.q = "";
              root.querySelector("#sx-q").value = "";
            } else {
              st[k] = st[k].filter(function (x) {
                return x !== v;
              });
              var cb = root.querySelector(
                '[data-f="' + k + '"][value="' + v + '"]',
              );
              if (cb) cb.checked = false;
            }
            renderResults(root);
            root.querySelector("#sx-q").focus();
          }
          if (clr) {
            st.cat = [];
            st.time = [];
            st.diff = [];
            st.rest = [];
            st.q = "";
            st.n = 6;
            root.querySelector("#sx-q").value = "";
            root.querySelectorAll("[data-f]").forEach(function (c) {
              c.checked = false;
            });
            renderResults(root);
          }
          if (e.target.closest("#more")) {
            st.n += 6;
            renderResults(root);
          }
        });
        root.addEventListener("change", function (e) {
          if (e.target.id === "sort") {
            st.sort = e.target.value;
            renderResults(root);
          }
        });
        var panel = root.querySelector("#filters"),
          open = root.querySelector("#f-open");
        var toggle = function (on) {
          panel.classList.toggle("open", on);
          open.setAttribute("aria-expanded", on);
          document.body.classList.toggle("lock", on);
          if (on) panel.querySelector("input").focus();
          else open.focus();
        };
        open.addEventListener("click", function () {
          toggle(true);
        });
        root.querySelector("#f-close").addEventListener("click", function () {
          toggle(false);
        });
        root.querySelector("#f-apply").addEventListener("click", function () {
          toggle(false);
        });
      },
    };
  };

  /* =========================================================
     Pantalla 5 · Detalle de una recomendación
     ========================================================= */
  V.detalle = function (q, id) {
    var r = S.rec(id);
    if (!r || r.status !== "publicada") return V.noEncontrado();
    var c = NC.CATS[r.cat],
      fav = S.isFav(r.id),
      hab = S.hasHabit(r.id);
    var related = S.recs()
      .filter(function (x) {
        return x.cat === r.cat && x.id !== r.id;
      })
      .slice(0, 2);
    return {
      title: r.title,
      nav: "Explorar",
      html: `
      <nav class="crumbs" aria-label="Ruta de navegación"><a href="#/inicio">Inicio</a> / <a href="#/explorar">Explorar</a> / <a href="#/explorar?cat=${r.cat}">${c.name}</a> / <span aria-current="page">${esc(r.title)}</span></nav>
      <div class="split detail">
        <article class="stack">
          ${NC.img(r.img, { cat: r.cat, dataUrl: r.imgData, eager: true, cls: "detail-img", sizes: "(max-width: 760px) 100vw, 760px", w: 1200 })}
          ${NC.tag(r.cat)}
          <h1 tabindex="-1" class="h-detail">${esc(r.title)}</h1>
          <div class="chips static">
            <span class="cp">${I("clock", 16)}${r.minutes} min</span><span class="cp">${r.diff}</span>
            ${r.tags
              .map(function (t) {
                return `<span class="cp">${NC.RESTR[t].split(" (")[0]}</span>`;
              })
              .join("")}
            <span class="cp">${esc(r.portions || "")}</span>
          </div>
          <div class="row actions">
            <button type="button" class="b" data-act="fav" data-id="${r.id}" aria-pressed="${fav}">${I("heart", 20, fav)}<span>${fav ? "Guardado en favoritos" : "Guardar en favoritos"}</span></button>
            ${hab ? `<a class="b y" href="#/habitos">${I("check", 20)}Ya es un hábito. Ver</a>` : `<button type="button" class="b y" data-act="habit" data-id="${r.id}">${I("plus", 20)}Añadir como hábito</button>`}
            <button type="button" class="b s" id="share">${I("share", 20)}Compartir</button>
          </div>
          <div class="pn content">
            <h2 class="h3">Resumen</h2><p>${esc(r.summary)}</p>
            ${r.blocks
              .map(function (b) {
                var ordered = /prepar|pasos/i.test(b[0]);
                return `<h2 class="h3">${esc(b[0])}</h2><${ordered ? "ol" : "ul"}>${b[1]
                  .map(function (li) {
                    return "<li>" + esc(li) + "</li>";
                  })
                  .join("")}</${ordered ? "ol" : "ul"}>`;
              })
              .join("")}
          </div>
          <p class="hint">Revisado por: ${esc(r.reviewer || "Profesional de la salud (dato de ejemplo)")}, ${NC.fmtDate(r.updated)}. Fuente: ${esc(sourceText(r))}</p>
        </article>
        <aside class="stack">
          <div class="pn v"><h2 class="h3">Ficha rápida</h2><p>${esc(r.quick)}</p></div>
          ${
            related.length
              ? `<h2 class="h3">Relacionadas</h2>${related
                  .map(function (x) {
                    return NC.card(x, { small: true, cta: "Ver" });
                  })
                  .join("")}`
              : ""
          }
          <div class="pn warn"><p>Contenido informativo. No sustituye la consulta médica. Si tienes una condición de salud, consulta con tu profesional antes de cambiar tu alimentación o tu actividad física.</p></div>
        </aside>
      </div>`,
      mount: function (root) {
        root.querySelector("#share").addEventListener("click", function () {
          var link = location.href;
          if (navigator.share) {
            navigator
              .share({ title: r.title, url: link })
              .catch(function () {});
            return;
          }
          if (navigator.clipboard)
            navigator.clipboard.writeText(link).then(
              function () {
                NC.toast("Enlace copiado.");
              },
              function () {
                NC.toast("Copia este enlace: " + link);
              },
            );
          else NC.toast("Copia este enlace: " + link);
        });
      },
    };
  };

  /* =========================================================
     Pantalla 6 · Para ti
     ========================================================= */
  V.paraTi = function () {
    var u = S.user(),
      p = u.profile || {},
      list = S.personalize();
    var goals = (p.goals || []).map(function (g) {
      return NC.GOALS[g].label.toLowerCase();
    });
    var restr = (p.restr || []).map(function (r) {
      return NC.PROFILE_RESTR[r].label.toLowerCase();
    });
    var goalCats = (p.goals || []).map(function (g) {
      return NC.GOALS[g].cat;
    });
    var forGoal = list
      .filter(function (x) {
        return goalCats.indexOf(x.rec.cat) >= 0;
      })
      .slice(0, 3);
    if (!forGoal.length) forGoal = list.slice(0, 3);
    var used = forGoal.map(function (x) {
      return x.rec.id;
    });
    var today = list
      .filter(function (x) {
        return used.indexOf(x.rec.id) < 0;
      })
      .slice(0, 2);
    var sum = S.summary();
    var tune = [
      ["mas-descanso", "Más descanso"],
      ["menos-recetas-largas", "Menos recetas largas"],
      ["ejercicio-suave", "Más ejercicio suave"],
    ];
    return {
      title: "Para ti",
      nav: "Para ti",
      html: `
      <section class="pn v rw hello">
        <div><h1 tabindex="-1" class="h2">Hola, ${esc(first(u.name))}</h1>
          <p>${goals.length ? "Tu objetivo: " + goals.join(", ") + "." : "Aún no nos cuentas tu objetivo."} ${S.usesHealth(u) && restr.length ? "Restricción: " + restr.join(", ") + "." : ""}</p>
          ${!S.usesHealth(u) && restr.length ? '<p class="hint">No estamos usando tus datos de salud. Puedes activarlo en Privacidad y datos.</p>' : ""}
        </div>
        <a class="b s" href="#/perfil">${p.done ? "Editar perfil" : "Completar perfil"}</a>
      </section>
      ${!p.done ? '<div class="pn warn"><p>Completa tu perfil para que estas recomendaciones se ajusten mejor a ti. Te toma menos de un minuto.</p></div>' : ""}
      <section aria-labelledby="h-obj">
        <h2 id="h-obj">${goals.length ? "Para tu objetivo" : "Para empezar"}</h2>
        ${
          forGoal.length
            ? `<div class="g g3">${forGoal
                .map(function (x) {
                  return NC.card(x.rec, { why: x.why, cta: "Ver" });
                })
                .join("")}</div>`
            : '<div class="pn empty"><p>Ocultaste todas las sugerencias. Ajusta tus temas o vuelve a mostrarlas.</p><button type="button" class="b" id="undismiss">Volver a mostrar todo</button></div>'
        }
      </section>
      <div class="split">
        <section aria-labelledby="h-day"><h2 id="h-day">Para hoy</h2>
          <div class="g g2">${today
            .map(function (x) {
              return NC.card(x.rec, { why: x.why });
            })
            .join("")}</div>
        </section>
        <aside class="pn habits-mini"><h2 class="h3">Tus hábitos de hoy</h2>
          <p class="big">${sum.doneToday} de ${sum.total}</p><p class="muted">${sum.total ? "cumplidos hoy" : "Aún no tienes hábitos. Crea uno desde cualquier recomendación."}</p>
          <a class="b" href="#/habitos">Ir a hábitos</a></aside>
      </div>
      <section class="pn">
        <h2 class="h3">Afina lo que ves</h2>
        <div class="chips">${tune
          .map(function (t) {
            return NC.chip(
              t[1],
              (u.tune || []).indexOf(t[0]) >= 0,
              'data-tune="' + t[0] + '"',
            );
          })
          .join("")}</div>
        <p class="hint">Cambia el orden de tus recomendaciones sin rehacer el perfil. ${u.dismissed.length ? `Ocultaste ${plural(u.dismissed.length, "recomendación", "recomendaciones")}. <button type="button" class="lk" id="undismiss2">Volver a mostrarlas</button>` : ""}</p>
      </section>`,
      mount: function (root) {
        root.querySelectorAll("[data-tune]").forEach(function (c) {
          c.addEventListener("click", function () {
            var t = c.dataset.tune;
            S.update(function (x) {
              x.tune = x.tune || [];
              var i = x.tune.indexOf(t);
              if (i >= 0) x.tune.splice(i, 1);
              else x.tune.push(t);
            });
            NC.render();
            NC.toast("Actualizamos tus recomendaciones.");
          });
        });
        ["#undismiss", "#undismiss2"].forEach(function (s) {
          var b = root.querySelector(s);
          if (b)
            b.addEventListener("click", function () {
              S.update(function (x) {
                x.dismissed = [];
              });
              NC.render();
            });
        });
      },
    };
  };

  /* =========================================================
     Pantalla 7 · Favoritos
     ========================================================= */
  V.favoritos = function (q) {
    var u = S.user(),
      tab = q.cat || "todos",
      sort = q.sort || "recientes";
    var favs = u.favs
      .map(function (f) {
        return { at: f.at, rec: S.rec(f.id) };
      })
      .filter(function (f) {
        return f.rec && f.rec.status === "publicada";
      });
    var shown = favs.filter(function (f) {
      return tab === "todos" || f.rec.cat === tab;
    });
    if (sort === "az")
      shown.sort(function (a, b) {
        return a.rec.title.localeCompare(b.rec.title, "es");
      });
    else if (sort === "categoria")
      shown.sort(function (a, b) {
        return a.rec.cat.localeCompare(b.rec.cat);
      });
    else
      shown.sort(function (a, b) {
        return b.at - a.at;
      });
    var tabs = [["todos", "Todos"]].concat(
      Object.keys(NC.CATS).map(function (k) {
        return [k, NC.CATS[k].name];
      }),
    );
    return {
      title: "Favoritos",
      nav: "Favoritos",
      html: `
      <h1 tabindex="-1" class="h2">Mis favoritos</h1>
      <div class="rw wrap">
        <div class="chips" role="tablist" aria-label="Filtrar por categoría">${tabs
          .map(function (t) {
            var n =
              t[0] === "todos"
                ? favs.length
                : favs.filter(function (f) {
                    return f.rec.cat === t[0];
                  }).length;
            return `<a role="tab" aria-selected="${tab === t[0]}" class="cp${tab === t[0] ? " on" : ""}" href="#/favoritos?cat=${t[0]}&sort=${sort}">${t[1]} (${n})</a>`;
          })
          .join("")}</div>
        <label class="sort">Ordenar <select class="in" id="fav-sort">
          <option value="recientes"${sort === "recientes" ? " selected" : ""}>Más recientes</option><option value="az"${sort === "az" ? " selected" : ""}>A a Z</option><option value="categoria"${sort === "categoria" ? " selected" : ""}>Por categoría</option></select></label>
      </div>
      ${
        shown.length
          ? `<div class="g g3">${shown
              .map(function (f) {
                return NC.card(f.rec, { habit: true });
              })
              .join("")}</div>
        <p class="hint">Toca el corazón para quitar una recomendación. También puedes convertirla en hábito sin abrir el detalle.</p>`
          : `
        <div class="pn empty">
          <h2 class="h3">${favs.length ? "No tienes favoritos en esta categoría" : "Aún no tienes favoritos"}</h2>
          <p>Toca el corazón en cualquier recomendación para guardarla aquí.</p>
          <a class="b" href="#/explorar">Ir a Explorar</a>
        </div>`
      }`,
      mount: function (root) {
        root
          .querySelector("#fav-sort")
          .addEventListener("change", function (e) {
            location.hash =
              "#/favoritos?cat=" + tab + "&sort=" + e.target.value;
          });
      },
    };
  };

  /* =========================================================
     Pantalla 8 · Seguimiento de hábitos
     ========================================================= */
  V.habitos = function () {
    var u = S.user(),
      hs = S.habits(),
      sum = S.summary(),
      t = NC.today();
    var msg = !sum.total
      ? ""
      : sum.doneToday === sum.total
        ? "Cumpliste todos tus hábitos de hoy. Buen trabajo."
        : sum.doneToday === 0
          ? "Hoy es un buen día para empezar con uno. Elige el más fácil."
          : "Hoy cumpliste " +
            sum.doneToday +
            " de " +
            sum.total +
            ". Mañana sigues desde donde quedaste.";
    return {
      title: "Hábitos",
      nav: "Hábitos",
      html: `
      <h1 tabindex="-1" class="vh">Seguimiento de hábitos</h1>
      <div class="g g3 kpis">
        <div class="pn v"><b>Hoy</b><p class="big">${sum.doneToday} de ${sum.total}</p></div>
        <div class="pn v"><b>Racha</b><p class="big">${plural(sum.streak, "día", "días")}</p></div>
        <div class="pn v"><b>Esta semana</b><p class="big">${sum.pct} %</p></div>
      </div>
      <ol class="week" aria-label="Esta semana">${sum.week
        .map(function (d) {
          return `<li class="day${d.ok ? " ok" : ""}${d.today ? " today" : ""}${d.future ? " fut" : ""}"><span>${d.label}</span><span aria-hidden="true">${d.ok ? "✓" : ""}</span><span class="vh">${d.ok ? "con hábitos cumplidos" : d.future ? "por venir" : "sin hábitos cumplidos"}</span></li>`;
        })
        .join("")}</ol>
      <div class="rw"><h2>Hábitos de hoy</h2><button type="button" class="b y" id="h-add">${I("plus", 20)}Añadir hábito</button></div>
      ${
        hs.length
          ? `<ul class="hlist">${hs
              .map(function (h) {
                var r = S.rec(h.recId),
                  on = h.done.indexOf(t) >= 0,
                  n = S.streak(h);
                if (!r) return "";
                return `<li class="hb">
          <button type="button" role="checkbox" aria-checked="${on}" class="box${on ? " x" : ""}" data-hid="${h.id}" aria-label="Marcar como cumplido hoy: ${esc(r.title)}">${on ? I("check", 22) : ""}</button>
          <div class="hb-t"><a href="#/r/${r.id}"><b>${esc(r.title)}</b></a><small>Desde ${h.origin}. ${n ? "Racha de " + plural(n, "día", "días") : "Empieza hoy tu racha"}</small></div>
          <button type="button" class="ib" data-arch="${h.id}" aria-label="Archivar hábito ${esc(r.title)}">${I("archive", 20)}</button>
        </li>`;
              })
              .join("")}</ul>`
          : `
        <div class="pn empty"><h2 class="h3">Aún no tienes hábitos</h2><p>Convierte una recomendación en hábito para seguirla día a día.</p><button type="button" class="b" id="h-add2">Elegir un hábito</button></div>`
      }
      ${msg ? `<div class="pn v" role="status"><p>${msg}</p></div>` : ""}
      <div class="pn">
        ${NC.sw("Recordarme a las 8:00 p. m.", "Opcional. Puedes cambiarlo o apagarlo.", u.reminder, 'id="h-rem"')}
      </div>`,
      mount: function (root) {
        root.querySelectorAll("[data-hid]").forEach(function (b) {
          b.addEventListener("click", function () {
            var on = S.toggleHabitToday(b.dataset.hid);
            NC.render();
            var nb = document.querySelector(
              '[data-hid="' + b.dataset.hid + '"]',
            );
            if (nb) nb.focus();
            NC.toast(
              on ? "Hábito marcado como cumplido hoy." : "Marca quitada.",
            );
          });
        });
        root.querySelectorAll("[data-arch]").forEach(function (b) {
          b.addEventListener("click", function () {
            var id = b.dataset.arch;
            S.archiveHabit(id);
            NC.render();
            NC.toast("Hábito archivado.", {
              label: "Deshacer",
              fn: function () {
                S.restoreHabit(id);
                NC.render();
              },
            });
          });
        });
        root.querySelector("#h-rem").addEventListener("click", function () {
          S.update(function (x) {
            x.reminder = !x.reminder;
            x.consents.recordatorios = x.reminder;
          });
          NC.render();
          NC.toast(
            S.user().reminder
              ? "Recordatorio activado a las 8:00 p. m."
              : "Recordatorio apagado.",
          );
        });
        var pick = function () {
          var favIds = u.favs.map(function (f) {
            return f.id;
          });
          var opts = S.recs()
            .filter(function (r) {
              return !S.hasHabit(r.id);
            })
            .sort(function (a, b) {
              return (favIds.indexOf(b.id) >= 0) - (favIds.indexOf(a.id) >= 0);
            });
          NC.modal({
            title: "Añadir un hábito",
            body: opts.length
              ? `<p class="muted">Primero tus favoritos, luego el resto de recomendaciones.</p><ul class="pick">${opts
                  .map(function (r) {
                    var f = favIds.indexOf(r.id) >= 0;
                    return `<li><span>${NC.tag(r.cat)}<b>${esc(r.title)}</b>${f ? "<small>En tus favoritos</small>" : ""}</span><button type="button" class="b sm" data-pick="${r.id}" data-o="${f ? "favoritos" : "recomendación"}">Añadir</button></li>`;
                  })
                  .join("")}</ul>`
              : "<p>Ya agregaste todas las recomendaciones como hábitos.</p>",
            actions: [
              {
                label: "Listo",
                cls: "s",
                fn: function (c) {
                  c();
                },
              },
            ],
            onOpen: function (d, close) {
              d.querySelectorAll("[data-pick]").forEach(function (b) {
                b.addEventListener("click", function () {
                  S.addHabit(b.dataset.pick, b.dataset.o);
                  close();
                  NC.render();
                  NC.toast("Hábito añadido. Márcalo cuando lo cumplas.");
                });
              });
            },
          });
        };
        ["#h-add", "#h-add2"].forEach(function (s) {
          var b = root.querySelector(s);
          if (b) b.addEventListener("click", pick);
        });
      },
    };
  };

  /* =========================================================
     Pantalla 9 · Panel del editor
     ========================================================= */
  var STATUS = {
    publicada: "Publicada",
    revision: "En revisión",
    borrador: "Borrador",
  };
  V.editor = function (q) {
    var filter = q.estado || "todas",
      term = q.q || "",
      editId = q.editar || "";
    var editing = editId ? S.rec(editId) : null;
    var rows = S.recs(true).filter(function (r) {
      return (
        (filter === "todas" || r.status === filter) &&
        (!term || norm(r.title).indexOf(norm(term)) >= 0)
      );
    });
    var actions = function (r) {
      var a = `<a class="lk" href="#/editor?editar=${r.id}">Editar</a>`;
      if (r.status === "publicada")
        a += ` <button type="button" class="lk" data-st="borrador" data-id="${r.id}">Despublicar</button>`;
      if (r.status === "revision")
        a += ` <button type="button" class="lk" data-st="publicada" data-id="${r.id}">Aprobar</button>`;
      if (r.status === "borrador")
        a += ` <button type="button" class="lk danger" data-delrec="${r.id}">Eliminar</button>`;
      return a;
    };
    var e = editing || {
      title: "",
      cat: "",
      minutes: "",
      diff: "Fácil",
      summary: "",
      blocks: [],
      tags: [],
      source: "",
      reviewer: "",
    };
    var lines = ((e.blocks[0] && e.blocks[0][1]) || []).join("\n");
    var side = [
      ["todas", "Recomendaciones"],
      ["borrador", "Borradores"],
      ["revision", "En revisión"],
      ["publicada", "Publicadas"],
    ];
    return {
      title: "Panel del editor",
      nav: "",
      html: `
      <div class="rw"><h1 tabindex="-1" class="h2">Panel del editor</h1><span class="hint">Gestión de contenidos</span></div>
      <div class="editor">
        <nav class="pn v side" aria-label="Contenidos">
          <b>Contenidos</b>
          ${side
            .map(function (s) {
              return `<a href="#/editor?estado=${s[0]}" class="${filter === s[0] ? "on" : ""}">${s[1]}</a>`;
            })
            .join("")}
          <b>Organización</b>
          <a href="#/editor?ver=categorias">Categorías (${Object.keys(NC.CATS).length})</a>
          <a href="#/editor?ver=etiquetas">Etiquetas (${Object.keys(NC.RESTR).length})</a>
        </nav>
        <div class="stack">
          ${
            q.ver
              ? `<div class="pn"><h2 class="h3">${q.ver === "categorias" ? "Categorías" : "Etiquetas"}</h2><ul class="plain">${(q.ver ===
                "categorias"
                  ? Object.keys(NC.CATS).map(function (k) {
                      return (
                        NC.tag(k) +
                        " " +
                        plural(
                          S.recs(true).filter(function (r) {
                            return r.cat === k;
                          }).length,
                          "contenido",
                          "contenidos",
                        )
                      );
                    })
                  : Object.keys(NC.RESTR).map(function (k) {
                      return '<span class="cp">' + NC.RESTR[k] + "</span>";
                    })
                )
                  .map(function (x) {
                    return "<li>" + x + "</li>";
                  })
                  .join(
                    "",
                  )}</ul><p class="hint">La estructura admite nuevas categorías y etiquetas sin rediseñar las pantallas.</p></div>`
              : ""
          }
          <form class="rw wrap" id="ed-search" role="search">
            <label for="ed-q" class="vh">Buscar por título</label>
            <input class="in grow" id="ed-q" type="search" placeholder="Buscar por título…" value="${esc(term)}">
            <a class="b" href="#/editor?editar=nuevo">${I("plus", 20)}Nueva recomendación</a>
          </form>
          <div class="chips">${[
            ["todas", "Todas"],
            ["publicada", "Publicadas"],
            ["borrador", "Borradores"],
            ["revision", "En revisión"],
          ]
            .map(function (c) {
              return `<a class="cp${filter === c[0] ? " on" : ""}" href="#/editor?estado=${c[0]}" aria-current="${filter === c[0]}">${c[1]}</a>`;
            })
            .join("")}</div>
          <div class="pn table-wrap">
            <table class="tb">
              <caption class="vh">Recomendaciones y su estado de publicación</caption>
              <thead><tr><th scope="col">Título</th><th scope="col">Categoría</th><th scope="col">Estado</th><th scope="col">Actualizada</th><th scope="col">Acciones</th></tr></thead>
              <tbody>${
                rows.length
                  ? rows
                      .map(function (r) {
                        return `<tr><td>${esc(r.title)}</td><td>${NC.CATS[r.cat].name}</td><td><span class="pill ${r.status}">${STATUS[r.status]}</span></td><td>${NC.fmtDate(r.updated)}</td><td class="acts">${actions(r)}</td></tr>`;
                      })
                      .join("")
                  : '<tr><td colspan="5">No hay contenidos con ese filtro.</td></tr>'
              }</tbody>
            </table>
          </div>
          <form class="pn" id="form" novalidate>
            <h2 class="h3">${editing ? "Editar: " + esc(editing.title) : "Nueva recomendación"}</h2>
            <div class="g g2">
              ${field("e-title", "Título", `<input class="in" id="e-title" value="${esc(e.title)}">`)}
              ${field(
                "e-cat",
                "Categoría",
                `<select class="in" id="e-cat"><option value="">Seleccionar</option>${Object.keys(
                  NC.CATS,
                )
                  .map(function (k) {
                    return `<option value="${k}"${e.cat === k ? " selected" : ""}>${NC.CATS[k].name}</option>`;
                  })
                  .join("")}</select>`,
              )}
              ${field("e-min", "Tiempo en minutos", `<input class="in" id="e-min" type="number" min="1" max="240" value="${esc(e.minutes)}">`)}
              ${field("e-diff", "Dificultad", `<select class="in" id="e-diff"><option${e.diff === "Fácil" ? " selected" : ""}>Fácil</option><option${e.diff === "Media" ? " selected" : ""}>Media</option></select>`)}
            </div>
            ${field("e-sum", "Resumen", `<textarea class="in" id="e-sum" rows="2">${esc(e.summary)}</textarea>`)}
            ${field("e-body", "Contenido", `<textarea class="in" id="e-body" rows="5">${esc(lines)}</textarea>`, "Escribe un paso o un ingrediente por línea.")}
            <div class="g g2">
              <fieldset class="fs"><legend>Etiquetas y restricciones</legend>${Object.keys(
                NC.RESTR,
              )
                .map(function (k) {
                  return `<label class="ck"><input type="checkbox" data-tag value="${k}" ${e.tags.indexOf(k) >= 0 ? "checked" : ""}><span>${NC.RESTR[k]}</span></label>`;
                })
                .join("")}</fieldset>
              ${field("e-img", "Imagen", '<input class="in" id="e-img" type="file" accept="image/*">', "JPG o PNG de hasta 1 MB. Recuerda anotar el autor y la licencia de la foto.")}
            </div>
            <div class="g g2">
              ${field("e-src", "Fuente", `<input class="in" id="e-src" value="${esc(e.sourceText || (e.source ? NC.SOURCES[e.source] : ""))}">`)}
              ${field("e-rev", "Revisor", `<input class="in" id="e-rev" value="${esc(e.reviewer || "")}" placeholder="Nombre y profesión de quien revisa">`)}
            </div>
            <p class="hint">Para publicar se exige fuente y revisor. Así el contenido de salud tiene respaldo.</p>
            <div class="row">
              <button type="button" class="b s" data-save="borrador">Guardar borrador</button>
              <button type="button" class="b s" id="e-prev">Vista previa</button>
              ${editing && editing.status === "publicada" ? "" : '<button type="button" class="b s" data-save="revision">Enviar a revisión</button>'}
              <button type="button" class="b" data-save="publicada">Publicar</button>
            </div>
          </form>
        </div>
      </div>`,
      mount: function (root) {
        var imgData = editing ? editing.imgData : null;
        if (q.editar)
          setTimeout(function () {
            var f = root.querySelector("#form");
            f.scrollIntoView({ block: "start" });
            f.querySelector("input").focus({ preventScroll: true });
          }, 30);
        root
          .querySelector("#ed-search")
          .addEventListener("submit", function (ev) {
            ev.preventDefault();
            location.hash =
              "#/editor?estado=" +
              filter +
              "&q=" +
              encodeURIComponent(root.querySelector("#ed-q").value);
          });
        root.querySelectorAll("[data-st]").forEach(function (b) {
          b.addEventListener("click", function () {
            S.setStatus(b.dataset.id, b.dataset.st);
            NC.render();
            NC.toast(
              b.dataset.st === "publicada"
                ? "Recomendación aprobada y publicada."
                : "Recomendación despublicada. Ya no se ve en Explorar.",
            );
          });
        });
        root.querySelectorAll("[data-delrec]").forEach(function (b) {
          b.addEventListener("click", function () {
            var r = S.rec(b.dataset.delrec);
            NC.modal({
              title: "Eliminar borrador",
              body:
                "<p>Se eliminará “" +
                esc(r.title) +
                "”. Esta acción no se puede deshacer.</p>",
              actions: [
                {
                  label: "Cancelar",
                  cls: "s",
                  fn: function (c) {
                    c();
                  },
                },
                {
                  label: "Eliminar",
                  fn: function (c) {
                    S.removeRec(r.id);
                    c();
                    NC.render();
                    NC.toast("Borrador eliminado.");
                  },
                },
              ],
            });
          });
        });
        root.querySelector("#e-img").addEventListener("change", function (ev) {
          var f = ev.target.files[0];
          if (!f) return;
          if (f.size > 1024 * 1024) {
            setErr(
              root,
              "e-img",
              "La imagen pesa más de 1 MB. Comprímela e inténtalo de nuevo.",
            );
            ev.target.value = "";
            return;
          }
          setErr(root, "e-img", "");
          var rd = new FileReader();
          rd.onload = function () {
            imgData = rd.result;
          };
          rd.readAsDataURL(f);
        });
        function read() {
          var cat = root.querySelector("#e-cat").value;
          return {
            id: editing ? editing.id : "r-" + NC.uid(),
            cat: cat,
            kind:
              cat === "alimentacion"
                ? "receta"
                : cat === "actividad"
                  ? "rutina"
                  : "habito",
            title: root.querySelector("#e-title").value.trim(),
            minutes: parseInt(root.querySelector("#e-min").value, 10) || 0,
            diff: root.querySelector("#e-diff").value,
            portions: editing ? editing.portions : "",
            tags: Array.prototype.map.call(
              root.querySelectorAll("[data-tag]:checked"),
              function (c) {
                return c.value;
              },
            ),
            summary: root.querySelector("#e-sum").value.trim(),
            blocks: [
              [
                cat === "alimentacion" ? "Ingredientes y preparación" : "Pasos",
                root
                  .querySelector("#e-body")
                  .value.split("\n")
                  .map(function (l) {
                    return l.trim();
                  })
                  .filter(Boolean),
              ],
            ],
            quick:
              "Duración: " +
              (parseInt(root.querySelector("#e-min").value, 10) || "–") +
              " minutos. Nivel: " +
              root.querySelector("#e-diff").value.toLowerCase() +
              ".",
            sourceText: root.querySelector("#e-src").value.trim(),
            source: "",
            reviewer: root.querySelector("#e-rev").value.trim(),
            img: editing ? editing.img : null,
            imgData: imgData,
            status: editing ? editing.status : "borrador",
          };
        }
        function check(r, full) {
          var ok = true;
          var need = function (id, cond, msg) {
            setErr(root, id, cond ? "" : msg);
            if (!cond) ok = false;
          };
          need(
            "e-title",
            r.title.length >= 5,
            "Escribe un título de al menos 5 caracteres.",
          );
          if (full) {
            need("e-cat", !!r.cat, "Elige una categoría.");
            need("e-min", r.minutes > 0, "Indica cuántos minutos toma.");
            need(
              "e-sum",
              r.summary.length >= 20,
              "Escribe un resumen de al menos 20 caracteres.",
            );
            need(
              "e-body",
              r.blocks[0][1].length > 0,
              "Agrega al menos un paso o ingrediente.",
            );
            need("e-src", !!r.sourceText, "Indica la fuente del contenido.");
            need("e-rev", !!r.reviewer, "Indica quién revisó el contenido.");
          } else {
            ["e-cat", "e-min", "e-sum", "e-body", "e-src", "e-rev"].forEach(
              function (id) {
                setErr(root, id, "");
              },
            );
          }
          if (!ok) root.querySelector('[aria-invalid="true"]').focus();
          return ok;
        }
        root.querySelectorAll("[data-save]").forEach(function (b) {
          b.addEventListener("click", function () {
            var st = b.dataset.save,
              r = read();
            if (!check(r, st !== "borrador")) return;
            if (!r.cat) r.cat = "bienestar";
            r.status = st;
            S.upsertRec(r);
            if (location.hash === "#/editor?estado=todas") NC.render();
            else location.hash = "#/editor?estado=todas";
            if (st === "publicada")
              NC.toast("Recomendación publicada.", {
                label: "Ver en Explorar",
                href: "#/r/" + r.id,
              });
            else
              NC.toast(
                st === "revision"
                  ? "Enviada a revisión."
                  : "Borrador guardado.",
              );
          });
        });
        root.querySelector("#e-prev").addEventListener("click", function () {
          var r = read();
          if (!r.cat) r.cat = "bienestar";
          NC.modal({
            title: "Vista previa",
            body: `<div class="preview">${NC.img(r.img, { cat: r.cat, dataUrl: r.imgData, ratio: "16/9" })}${NC.tag(r.cat)}<h3>${esc(r.title || "Sin título")}</h3>
              <p class="cd-m">${I("clock", 16)}${r.minutes || "–"} min, ${r.diff.toLowerCase()}</p><p>${esc(r.summary || "Sin resumen.")}</p>
              <ol>${r.blocks[0][1]
                .map(function (l) {
                  return "<li>" + esc(l) + "</li>";
                })
                .join("")}</ol>
              <p class="hint">Revisado por: ${esc(r.reviewer || "pendiente")}. Fuente: ${esc(r.sourceText || "pendiente")}</p></div>`,
            actions: [
              {
                label: "Seguir editando",
                cls: "s",
                fn: function (c) {
                  c();
                },
              },
            ],
          });
        });
      },
    };
  };

  /* =========================================================
     Pantalla 10 · Privacidad y datos
     ========================================================= */
  V.privacidad = function () {
    var u = S.user(),
      c = u.consents;
    return {
      title: "Privacidad y datos",
      nav: "",
      html: `
      <h1 tabindex="-1" class="h2">Privacidad y datos</h1>
      <div class="editor">
        <nav class="pn v side" aria-label="Secciones">
          <b>Mis datos</b>
          <a href="#consent" data-jump>Consentimientos</a><a href="#export" data-jump>Descargar mis datos</a>
          <a href="#delete" data-jump>Eliminar cuenta</a><a href="#rights" data-jump>Derechos y reclamos</a>
        </nav>
        <div class="stack">
          <section class="pn" id="consent">
            <h2 class="h3">Consentimientos</h2>
            <p class="muted">Cada autorización es independiente. Puedes retirarla cuando quieras y el cambio aplica de inmediato.</p>
            ${NC.sw("Funcionamiento de la cuenta", "Necesario para usar NutritimCo. Se retira eliminando la cuenta.", true, 'data-c="cuenta"', true)}
            ${NC.sw("Datos de salud para personalizar", "Opcional. Dato sensible. Si lo apagas, Para ti deja de usar tus restricciones.", c.salud, 'data-c="salud"')}
            ${NC.sw("Recordatorios de hábitos", "Opcional.", c.recordatorios, 'data-c="recordatorios"')}
            ${NC.sw("Estadísticas de uso sin identificarte", "Opcional. Nos ayuda a mejorar el servicio.", c.estadisticas, 'data-c="estadisticas"')}
          </section>
          <section class="pn v" id="rights">
            <h2 class="h3">Tus derechos como titular</h2>
            <p>Puedes conocer, actualizar y rectificar tus datos, pedir prueba de tu autorización, revocarla o solicitar que se eliminen, y presentar una queja ante la Superintendencia de Industria y Comercio (Ley 1581 de 2012).</p>
            <p class="hint">Responsable del tratamiento: NutritimCo (proyecto académico). Canal para consultas y reclamos: privacidad@nutritimco.example (correo ficticio del prototipo).</p>
          </section>
          <section class="pn" id="export">
            <h2 class="h3">Descargar mis datos</h2>
            <p class="muted">Recibe un archivo con tu cuenta, tu perfil de salud, tus consentimientos, tus favoritos y tus hábitos.</p>
            <button type="button" class="b s" id="dl">${I("download", 20)}Descargar mis datos</button>
          </section>
          <section class="pn" id="delete">
            <h2 class="h3">Eliminar cuenta</h2>
            <p class="muted">Borra tu cuenta y todos tus datos de forma definitiva.</p>
            <button type="button" class="b" id="del">${I("trash", 20)}Eliminar mi cuenta</button>
          </section>
        </div>
      </div>`,
      mount: function (root) {
        root.querySelectorAll("[data-c]").forEach(function (b) {
          b.addEventListener("click", function () {
            var k = b.dataset.c;
            S.update(function (x) {
              x.consents[k] = !x.consents[k];
              if (k === "recordatorios") x.reminder = x.consents[k];
            });
            var on = S.user().consents[k];
            b.classList.toggle("on", on);
            b.setAttribute("aria-checked", on);
            NC.toast(on ? "Autorización activada." : "Autorización retirada.");
          });
        });
        root.querySelectorAll("[data-jump]").forEach(function (a) {
          a.addEventListener("click", function (e) {
            e.preventDefault();
            var t = root.querySelector(a.getAttribute("href"));
            t.scrollIntoView({ behavior: "smooth" });
            t.setAttribute("tabindex", "-1");
            t.focus({ preventScroll: true });
          });
        });
        root.querySelector("#dl").addEventListener("click", function () {
          var blob = new Blob([JSON.stringify(S.exportData(), null, 2)], {
            type: "application/json",
          });
          var a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = "nutritimco-mis-datos.json";
          document.body.appendChild(a);
          a.click();
          a.remove();
          setTimeout(function () {
            URL.revokeObjectURL(a.href);
          }, 1000);
          NC.toast("Descargamos tus datos en un archivo JSON.");
        });
        root.querySelector("#del").addEventListener("click", NC.confirmDelete);
      },
    };
  };

  /* =========================================================
     Páginas de apoyo: legal, créditos y no encontrado
     ========================================================= */
  V.legal = function () {
    return {
      title: "Política de datos y aviso médico",
      nav: "",
      html: `
      <h1 tabindex="-1" class="h2">Política de datos, términos y aviso médico</h1>
      <div class="prose">
        <section class="pn" id="datos"><h2 class="h3">Política de tratamiento de datos (resumen)</h2>
          <p>NutritimCo trata tus datos personales conforme a la Ley 1581 de 2012. Usamos tu nombre y correo para la cuenta, y los datos de salud que decidas contarnos solo para personalizar recomendaciones.</p>
          <p>Los datos de salud son datos sensibles. Solo los guardamos con tu autorización expresa, todos son opcionales y puedes retirarla cuando quieras desde Privacidad y datos.</p>
          <p>No vendemos ni compartimos tus datos con terceros para publicidad.</p></section>
        <section class="pn" id="terminos"><h2 class="h3">Términos de uso</h2>
          <p>Este sitio es un prototipo académico de la asignatura Ingeniería Web (CUN). Las cuentas y los datos que ingreses se guardan solo en el navegador.</p></section>
        <section class="pn warn" id="aviso"><h2 class="h3">Aviso médico</h2>
          <p>El contenido es informativo y no reemplaza la consulta con un profesional de la salud. Si tienes una condición de salud, consulta antes de cambiar tu alimentación o tu actividad física.</p></section>
        <section class="pn" id="contacto"><h2 class="h3">Contacto de privacidad</h2>
          <p>privacidad@nutritimco.example.</p></section>
      </div>`,
    };
  };

  V.creditos = function () {
    return {
      title: "Créditos y referencias",
      nav: "",
      html: `
      <h1 tabindex="-1" class="h2">Créditos y referencias</h1>
      <p class="muted">Las fotografías se muestran desde su sitio de origen. Cada una se verificó en su ficha (autor y licencia).</p>
      <div class="pn table-wrap"><table class="tb credits">
        <caption class="vh">Créditos de las fotografías</caption>
        <thead><tr><th scope="col">Foto</th><th scope="col">Autor</th><th scope="col">Fuente</th><th scope="col">Licencia</th></tr></thead>
        <tbody>${Object.keys(NC.IMAGES)
          .map(function (k) {
            var im = NC.IMAGES[k];
            return `<tr><td>${esc(im.caption)}</td><td>${esc(im.author)}</td><td><a class="lk" href="${im.page}" target="_blank" rel="noopener">${im.source}</a></td><td><a class="lk" href="${im.licenseUrl}" target="_blank" rel="noopener">${esc(im.license)}</a></td></tr>`;
          })
          .join("")}</tbody>
      </table></div>
      <section class="pn prose">
        <h2 class="h3">Tipografías e iconos</h2>
        <p>Young Serif y Atkinson Hyperlegible, servidas por Google Fonts con licencia SIL Open Font License. Atkinson Hyperlegible fue creada por el Braille Institute. Los iconos son de línea, dibujados en SVG para este proyecto.</p>
        <h2 class="h3">Fuentes del contenido</h2>
        <ul><li>${NC.SOURCES.oms}</li><li>${NC.SOURCES.icbf}</li><li>Congreso de la República de Colombia (2012). Ley Estatutaria 1581 de 2012, por la cual se dictan disposiciones generales para la protección de datos personales.</li></ul>
        <p class="hint">Los textos de las recomendaciones son de ejemplo para el prototipo y no fueron revisados por un profesional de la salud.</p>
      </section>`,
    };
  };

  V.noEncontrado = function () {
    return {
      title: "Página no encontrada",
      nav: "",
      html: `
      <div class="pn empty"><h1 tabindex="-1" class="h2">No encontramos esta página</h1><p>Puede que el enlace esté incompleto o que el contenido ya no esté publicado.</p>
      <div class="row"><a class="b" href="#/explorar">Ir a Explorar</a><a class="b s" href="#/inicio">Volver al inicio</a></div></div>`,
    };
  };

  V.soloEditores = function () {
    return {
      title: "Solo para editores",
      nav: "",
      html: `
      <div class="pn empty"><h1 tabindex="-1" class="h2">Esta sección es solo para editores</h1><p>Ingresa con una cuenta de editor para gestionar los contenidos. En el prototipo puedes usar editor@nutritimco.example.</p>
      <div class="row"><a class="b" href="#/acceso?modo=ingresar&next=${encodeURIComponent("/editor")}">Ingresar como editor</a><a class="b s" href="#/inicio">Volver al inicio</a></div></div>`,
    };
  };
})();

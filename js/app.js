/* NutritimCo · Enrutador y estructura general */
(function () {
  var S = NC.store,
    I = NC.icon,
    esc = NC.esc;
  var NAV = [
    ["Inicio", "#/inicio", "home"],
    ["Explorar", "#/explorar", "compass"],
    ["Para ti", "#/para-ti", "spark"],
    ["Favoritos", "#/favoritos", "heart"],
    ["Hábitos", "#/habitos", "check"],
  ];
  /* Rutas: [vista, requiere sesión, requiere rol editor] */
  var ROUTES = {
    inicio: ["inicio"],
    acceso: ["acceso"],
    explorar: ["explorar"],
    r: ["detalle"],
    "para-ti": ["paraTi", true],
    favoritos: ["favoritos", true],
    habitos: ["habitos", true],
    perfil: ["perfil", true],
    privacidad: ["privacidad", true],
    editor: ["editor", true, true],
    legal: ["legal"],
    creditos: ["creditos"],
  };
  var GUARD_MSG = {
    "para-ti": "Ingresa para ver tus recomendaciones personalizadas.",
    favoritos: "Ingresa para ver tus favoritos.",
    habitos: "Ingresa para seguir tus hábitos.",
    perfil: "Ingresa para editar tu perfil de salud.",
    privacidad: "Ingresa para gestionar tu privacidad.",
    editor: "Ingresa con la cuenta de editor.",
  };

  function parse() {
    var h = location.hash.replace(/^#/, "") || "/inicio";
    var qi = h.indexOf("?"),
      path = qi >= 0 ? h.slice(0, qi) : h,
      qs = qi >= 0 ? h.slice(qi + 1) : "";
    var parts = path.split("/").filter(Boolean),
      q = {};
    qs.split("&")
      .filter(Boolean)
      .forEach(function (kv) {
        var p = kv.split("=");
        q[decodeURIComponent(p[0])] = decodeURIComponent(
          (p[1] || "").replace(/\+/g, " "),
        );
      });
    return {
      name: parts[0] || "inicio",
      id: parts[1],
      q: q,
      full: path + (qs ? "?" + qs : ""),
    };
  }

  function header(view) {
    var u = S.user();
    if (view.bare) {
      return (
        '<div class="hd-in"><a class="lg" href="#/inicio">NutritimCo</a><a class="lk-strong" href="#/inicio">' +
        I("back", 18) +
        "Volver al inicio</a></div>"
      );
    }
    var titles = S.recs()
      .map(function (r) {
        return '<option value="' + esc(r.title) + '">';
      })
      .join("");
    return (
      '<div class="hd-in">' +
      '<a class="lg" href="#/inicio">NutritimCo</a>' +
      '<nav class="top-nav" aria-label="Principal">' +
      NAV.map(function (n) {
        return (
          '<a href="' +
          n[1] +
          '"' +
          (view.nav === n[0] ? ' class="on" aria-current="page"' : "") +
          ">" +
          n[0] +
          "</a>"
        );
      }).join("") +
      "</nav>" +
      '<form class="hd-search" role="search" id="hd-search"><label for="hd-q" class="vh">Buscar</label>' +
      I("search", 18) +
      '<input id="hd-q" type="search" placeholder="Buscar recetas, rutinas…" list="sugg" autocomplete="off"></form>' +
      '<datalist id="sugg">' +
      titles +
      "</datalist>" +
      (u
        ? '<div class="acct"><button type="button" class="av" id="acct-b" aria-haspopup="true" aria-expanded="false" aria-controls="acct-m" aria-label="Menú de tu cuenta">' +
          esc(u.name.charAt(0).toUpperCase()) +
          "</button>" +
          '<div class="acct-m" id="acct-m" hidden><p class="acct-n"><b>' +
          esc(u.name) +
          "</b><small>" +
          esc(u.email) +
          "</small></p>" +
          '<a href="#/perfil">' +
          I("user", 18) +
          "Mi perfil de salud</a>" +
          '<a href="#/privacidad">' +
          I("shield", 18) +
          "Privacidad y datos</a>" +
          (u.role === "editor"
            ? '<a href="#/editor">' + I("edit", 18) + "Panel del editor</a>"
            : "") +
          '<button type="button" id="logout">' +
          I("back", 18) +
          "Cerrar sesión</button></div></div>"
        : '<div class="row hd-auth"><a class="b s sm" href="#/acceso?modo=ingresar">Ingresar</a><a class="b sm" href="#/acceso?modo=registro">Crear cuenta</a></div>') +
      "</div>"
    );
  }

  function tabbar(view) {
    if (view.bare) return "";
    return NAV.map(function (n) {
      return (
        '<a href="' +
        n[1] +
        '"' +
        (view.nav === n[0] ? ' class="on" aria-current="page"' : "") +
        ">" +
        I(n[2], 22) +
        "<span>" +
        n[0] +
        "</span></a>"
      );
    }).join("");
  }

  function footer() {
    return (
      '<div class="ft-in"><p><b>NutritimCo</b> trata tus datos personales conforme a la Ley 1581 de 2012. El contenido es informativo y no reemplaza la consulta con un profesional de la salud.</p>' +
      '<p class="ft-l"><a href="#/legal">Política de datos</a><a href="#/legal">Términos</a><a href="#/legal">Aviso médico</a><a href="#/legal">Contacto de privacidad</a><a href="#/creditos">Créditos de imágenes</a>' +
      '<button type="button" id="reset">Reiniciar datos de prueba</button></p></div>'
    );
  }

  var current = null;
  function render(keep) {
    var r = parse(),
      route = ROUTES[r.name],
      view;
    var u = S.user();
    if (!route) view = NC.views.noEncontrado();
    else if (route[1] && !u) {
      NC.toast(GUARD_MSG[r.name] || "Ingresa para continuar.");
      location.replace(
        "#/acceso?modo=ingresar&next=" + encodeURIComponent(r.full),
      );
      return;
    } else if (route[2] && u.role !== "editor") view = NC.views.soloEditores();
    else view = NC.views[route[0]](r.q, r.id);

    var changed = !current || current.name !== r.name || current.id !== r.id;
    var focusSel = null;
    if (keep && document.activeElement && document.activeElement.dataset) {
      var a = document.activeElement;
      if (a.dataset.act)
        focusSel =
          '[data-act="' + a.dataset.act + '"][data-id="' + a.dataset.id + '"]';
    }
    document.title = view.title + " · NutritimCo";
    document.getElementById("hd").innerHTML = header(view);
    document.getElementById("tabbar").innerHTML = tabbar(view);
    document.body.classList.toggle("bare", !!view.bare);
    var main = document.getElementById("main");
    main.className = view.bare ? "bare-main" : "";
    main.innerHTML = view.html;
    if (view.mount) view.mount(main);
    bindHeader();
    document.body.classList.remove("lock");
    if (changed && !keep) {
      window.scrollTo(0, 0);
      var h1 = main.querySelector("h1");
      if (h1 && current) h1.focus({ preventScroll: true });
    } else if (focusSel) {
      var f = main.querySelector(focusSel);
      if (f) f.focus({ preventScroll: true });
    }
    current = r;
  }
  NC.render = function () {
    render(true);
  };

  function bindHeader() {
    var f = document.getElementById("hd-search");
    if (f)
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        var v = document.getElementById("hd-q").value.trim();
        location.hash = "#/explorar" + (v ? "?q=" + encodeURIComponent(v) : "");
      });
    var b = document.getElementById("acct-b"),
      m = document.getElementById("acct-m");
    if (b) {
      b.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = m.hidden;
        m.hidden = !open;
        b.setAttribute("aria-expanded", open);
        if (open) m.querySelector("a").focus();
      });
      m.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          m.hidden = true;
          b.setAttribute("aria-expanded", "false");
          b.focus();
        }
      });
      document.getElementById("logout").addEventListener("click", function () {
        S.logout();
        location.hash = "#/inicio";
        NC.toast("Cerraste sesión.");
        render();
      });
    }
  }
  document.addEventListener("click", function (e) {
    var m = document.getElementById("acct-m");
    if (m && !m.hidden && !e.target.closest(".acct")) {
      m.hidden = true;
      document.getElementById("acct-b").setAttribute("aria-expanded", "false");
    }
  });

  /* Acciones globales sobre tarjetas y detalle */
  function needLogin(msg) {
    var here = location.hash.replace(/^#/, "") || "/inicio";
    NC.toast(msg, {
      label: "Ingresar",
      href: "#/acceso?modo=ingresar&next=" + encodeURIComponent(here),
    });
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-act]");
    if (!t) return;
    var id = t.dataset.id,
      act = t.dataset.act,
      rec = S.rec(id);
    if (act === "fav") {
      if (!S.user()) return needLogin("Ingresa para guardar tus favoritos.");
      var on = S.toggleFav(id);
      NC.render();
      if (on)
        NC.toast("Guardado en favoritos.", {
          label: "Ver favoritos",
          href: "#/favoritos",
        });
      else
        NC.toast("Quitado de favoritos.", {
          label: "Deshacer",
          fn: function () {
            S.toggleFav(id);
            NC.render();
          },
        });
    }
    if (act === "habit") {
      if (!S.user()) return needLogin("Ingresa para crear hábitos.");
      if (S.hasHabit(id)) {
        NC.toast("Ya está en tus hábitos.", {
          label: "Ver hábitos",
          href: "#/habitos",
        });
        return;
      }
      S.addHabit(id, S.isFav(id) ? "favoritos" : "recomendación");
      NC.render();
      NC.toast("Añadido a tus hábitos: " + rec.title + ".", {
        label: "Ver hábitos",
        href: "#/habitos",
      });
    }
    if (act === "dismiss") {
      S.update(function (u) {
        if (u.dismissed.indexOf(id) < 0) u.dismissed.push(id);
      });
      NC.render();
      NC.toast("No volveremos a mostrarte esta recomendación.", {
        label: "Deshacer",
        fn: function () {
          S.update(function (u) {
            u.dismissed = u.dismissed.filter(function (x) {
              return x !== id;
            });
          });
          NC.render();
        },
      });
    }
  });

  window.addEventListener("hashchange", function () {
    render();
  });
  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("ft").innerHTML = footer();
    document.getElementById("reset").addEventListener("click", function () {
      NC.modal({
        title: "Reiniciar datos de prueba",
        body: "<p>Se borran las cuentas nuevas, los cambios y la sesión, y vuelven los datos de ejemplo del prototipo.</p>",
        actions: [
          {
            label: "Cancelar",
            cls: "s",
            fn: function (c) {
              c();
            },
          },
          {
            label: "Reiniciar",
            fn: function (c) {
              S.reset();
              c();
              location.hash = "#/inicio";
              render();
              NC.toast("Datos de prueba restablecidos.");
            },
          },
        ],
      });
    });
    render();
  });
})();

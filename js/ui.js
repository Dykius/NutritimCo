/* NutritimCo · Componentes reutilizables (RNF2: un mismo componente sirve en todas las pantallas) */
(function () {
  var esc = (NC.esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[c];
    });
  });

  /* Iconos de línea fina dibujados para el proyecto (trazo 1,6 px, sin relleno) */
  var P = {
    heart:
      '<path d="M12 20s-7.5-4.6-8.8-9.2A4.9 4.9 0 0 1 12 7a4.9 4.9 0 0 1 8.8 3.8C19.5 15.4 12 20 12 20z"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
    home: '<path d="M4 11l8-6.5 8 6.5V20h-5v-5.5H9V20H4z"/>',
    compass:
      '<circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5l-2.2 4.8-4.8 2.2 2.2-4.8z"/>',
    spark:
      '<path d="M12 3.5l2.2 5.3 5.3 2.2-5.3 2.2L12 18.5l-2.2-5.3L4.5 11l5.3-2.2z"/>',
    check:
      '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8.5 12.2l2.4 2.4 4.6-5"/>',
    user: '<circle cx="12" cy="8.5" r="3.8"/><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5"/>',
    x: '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    share:
      '<circle cx="17.5" cy="6" r="2.5"/><circle cx="6.5" cy="12" r="2.5"/><circle cx="17.5" cy="18" r="2.5"/><path d="M8.7 10.8l6.6-3.6M8.7 13.2l6.6 3.6"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    filter: '<path d="M4 6.5h16M7 12h10M10 17.5h4"/>',
    download: '<path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 19.5h14"/>',
    trash: '<path d="M5 7h14M10 7V5h4v2M7 7l1 12.5h8L17 7"/>',
    bell: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20.5a2 2 0 0 0 4 0"/>',
    shield: '<path d="M12 3.5l7 2.5v5.5c0 4.4-3 7.7-7 9-4-1.3-7-4.6-7-9V6z"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/>',
    edit: '<path d="M4 20h4L18.5 9.5l-4-4L4 16z"/>',
    calendar:
      '<rect x="4" y="5.5" width="16" height="14.5" rx="2"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>',
    archive:
      '<rect x="3.5" y="4.5" width="17" height="4" rx="1"/><path d="M5 8.5V19h14V8.5M10 12.5h4"/>',
    chevron: '<path d="M9 6l6 6-6 6"/>',
    back: '<path d="M15 6l-6 6 6 6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  };
  NC.icon = function (name, size, filled) {
    size = size || 22;
    return (
      '<svg class="ic" width="' +
      size +
      '" height="' +
      size +
      '" viewBox="0 0 24 24" fill="' +
      (filled ? "currentColor" : "none") +
      '" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      (P[name] || "") +
      "</svg>"
    );
  };

  /* Imagen optimizada: tamaños según pantalla, carga diferida y respaldo si falla (RNF1) */
  function url(im, w) {
    if (im.kind === "unsplash")
      return (
        "https://images.unsplash.com/" +
        im.id +
        "?auto=format&fit=crop&w=" +
        w +
        "&q=70"
      );
    if (im.kind === "commons")
      return (
        "https://commons.wikimedia.org/wiki/Special:FilePath/" +
        im.file +
        "?width=" +
        w
      );
    return im.src || "";
  }
  NC.img = function (key, opts) {
    opts = opts || {};
    var cat = NC.CATS[opts.cat] || NC.CATS.actividad;
    var im = typeof key === "string" ? NC.IMAGES[key] : null;
    var cls = "ph " + (opts.cls || "");
    var style =
      "background:" +
      cat.tint +
      ";" +
      (opts.ratio ? "aspect-ratio:" + opts.ratio + ";" : "");
    if (opts.dataUrl) {
      return (
        '<div class="' +
        cls +
        '" style="' +
        style +
        '"><img src="' +
        opts.dataUrl +
        '" alt="' +
        esc(opts.alt || "") +
        '" loading="lazy"></div>'
      );
    }
    if (!im) {
      return (
        '<div class="' +
        cls +
        ' ph-empty" style="' +
        style +
        '"><small>Sin foto todavía</small></div>'
      );
    }
    var sizes = opts.sizes || "(max-width: 760px) 100vw, 400px";
    var src = url(im, opts.w || 800);
    var set = [480, 800, 1200]
      .map(function (w) {
        return url(im, w) + " " + w + "w";
      })
      .join(", ");
    return (
      '<div class="' +
      cls +
      '" style="' +
      style +
      '">' +
      '<img src="' +
      src +
      '" srcset="' +
      set +
      '" sizes="' +
      sizes +
      '" alt="' +
      esc(im.alt) +
      '" width="800" height="600" ' +
      (opts.eager ? 'fetchpriority="high"' : 'loading="lazy"') +
      ' decoding="async" data-caption="' +
      esc(im.caption) +
      '">' +
      "</div>"
    );
  };
  /* Si una foto no carga, se muestra el bloque de color con su descripción */
  document.addEventListener(
    "error",
    function (e) {
      var t = e.target;
      if (
        t &&
        t.tagName === "IMG" &&
        t.parentNode &&
        t.parentNode.classList.contains("ph")
      ) {
        var cap = t.getAttribute("data-caption") || t.alt;
        t.parentNode.classList.add("ph-empty");
        t.outerHTML = "<small>Foto: " + esc(cap) + "</small>";
      }
    },
    true,
  );

  NC.tag = function (cat) {
    var c = NC.CATS[cat];
    return (
      '<span class="tg" style="border-color:' +
      c.color +
      '">' +
      c.name +
      "</span>"
    );
  };
  NC.meta = function (r) {
    return r.minutes + " min, " + r.diff.toLowerCase();
  };

  NC.heartBtn = function (r, big) {
    var on = NC.store.isFav(r.id);
    return (
      '<button type="button" class="hr' +
      (big ? " hr-big" : "") +
      '" data-act="fav" data-id="' +
      r.id +
      '" aria-pressed="' +
      on +
      '" aria-label="' +
      (on ? "Quitar de favoritos: " : "Guardar en favoritos: ") +
      esc(r.title) +
      '">' +
      NC.icon("heart", 22, on) +
      "</button>"
    );
  };

  /* Tarjeta de recomendación (se reutiliza en Inicio, Explorar, Para ti, Favoritos y Detalle) */
  NC.card = function (r, o) {
    o = o || {};
    var href = "#/r/" + r.id;
    var action = o.habit
      ? '<button type="button" class="b s sm" data-act="habit" data-id="' +
        r.id +
        '">' +
        NC.icon("plus", 18) +
        "Añadir hábito</button>"
      : '<a class="b sm" href="' +
        href +
        '">' +
        (o.cta || "Ver detalle") +
        "</a>";
    return (
      '<article class="cd">' +
      '<a href="' +
      href +
      '" class="cd-img" tabindex="-1" aria-hidden="true">' +
      NC.img(r.img, {
        cat: r.cat,
        dataUrl: r.imgData,
        cls: o.small ? "ph-sm" : "",
      }) +
      "</a>" +
      '<div class="cb">' +
      NC.tag(r.cat) +
      '<h3 class="cd-t"><a href="' +
      href +
      '">' +
      esc(r.title) +
      "</a></h3>" +
      '<p class="cd-m">' +
      NC.icon("clock", 16) +
      NC.meta(r) +
      "</p>" +
      (o.why
        ? '<p class="why">Te lo recomendamos porque ' + esc(o.why) + ".</p>"
        : "") +
      '<div class="cf">' +
      action +
      NC.heartBtn(r) +
      "</div>" +
      (o.why
        ? '<button type="button" class="lk" data-act="dismiss" data-id="' +
          r.id +
          '">No me interesa</button>'
        : "") +
      "</div></article>"
    );
  };

  NC.chip = function (label, on, attrs) {
    return (
      '<button type="button" class="cp' +
      (on ? " on" : "") +
      '" aria-pressed="' +
      !!on +
      '" ' +
      (attrs || "") +
      ">" +
      esc(label) +
      "</button>"
    );
  };
  NC.sw = function (title, desc, on, attrs, locked) {
    return (
      '<div class="rw sw-row"><div><b>' +
      esc(title) +
      '</b><p class="hint">' +
      esc(desc) +
      "</p></div>" +
      '<button type="button" role="switch" class="sw' +
      (on ? " on" : "") +
      '" aria-checked="' +
      !!on +
      '" aria-label="' +
      esc(title) +
      '" ' +
      (locked ? "disabled" : "") +
      " " +
      (attrs || "") +
      "></button></div>"
    );
  };

  /* Avisos breves con acción opcional (retroalimentación, RNF4) */
  NC.toast = function (msg, action) {
    var box = document.getElementById("toasts");
    var el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = "<span>" + esc(msg) + "</span>";
    if (action) {
      var b = document.createElement(action.href ? "a" : "button");
      b.className = "toast-a";
      b.textContent = action.label;
      if (action.href) b.href = action.href;
      else b.type = "button";
      b.addEventListener("click", function () {
        if (action.fn) action.fn();
        el.remove();
      });
      el.appendChild(b);
    }
    box.appendChild(el);
    setTimeout(
      function () {
        el.classList.add("out");
        setTimeout(function () {
          el.remove();
        }, 300);
      },
      action ? 6000 : 3200,
    );
  };

  /* Ventana modal accesible con <dialog> */
  NC.modal = function (o) {
    var d = document.createElement("dialog");
    d.className = "modal";
    d.setAttribute("aria-labelledby", "mdl-t");
    d.innerHTML =
      '<div class="modal-in"><div class="rw"><h2 id="mdl-t">' +
      esc(o.title) +
      "</h2>" +
      '<button type="button" class="ib" data-close aria-label="Cerrar">' +
      NC.icon("x") +
      "</button></div>" +
      '<div class="modal-b">' +
      o.body +
      '</div><div class="modal-f"></div></div>';
    var foot = d.querySelector(".modal-f");
    (o.actions || []).forEach(function (a) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "b " + (a.cls || "");
      b.textContent = a.label;
      b.addEventListener("click", function () {
        a.fn(close, d);
      });
      foot.appendChild(b);
    });
    function close() {
      d.close();
      d.remove();
    }
    d.addEventListener("click", function (e) {
      if (e.target === d || e.target.closest("[data-close]")) close();
    });
    d.addEventListener("cancel", function (e) {
      e.preventDefault();
      close();
    });
    document.body.appendChild(d);
    if (d.showModal) d.showModal();
    else d.setAttribute("open", "");
    if (o.onOpen) o.onOpen(d, close);
    return { close: close, el: d };
  };

  NC.confirmDelete = function () {
    NC.modal({
      title: "Eliminar tu cuenta",
      body:
        "<p>Se borrarán tu perfil de salud, tus favoritos y tus hábitos. Esta acción no se puede deshacer.</p>" +
        '<label class="ck"><input type="checkbox" id="del-ok"><span>Entiendo que mis datos se eliminan de forma definitiva.</span></label>' +
        '<p class="err" id="del-err" hidden>Marca la casilla para confirmar.</p>',
      actions: [
        {
          label: "Cancelar",
          cls: "s",
          fn: function (c) {
            c();
          },
        },
        {
          label: "Eliminar mi cuenta",
          fn: function (c, d) {
            if (!d.querySelector("#del-ok").checked) {
              d.querySelector("#del-err").hidden = false;
              return;
            }
            NC.store.deleteAccount();
            c();
            location.hash = "#/inicio";
            NC.toast("Tu cuenta y tus datos se eliminaron.");
          },
        },
      ],
    });
  };
})();

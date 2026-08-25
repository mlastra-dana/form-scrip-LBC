(function () {
  var attempts = 0;
  var maxAttempts = 120;

  var CONFIG = {
    formId: "form_8569",
    containerId: "form_container",
    segment: "detractor",
    brand: "LBC Seguros",
    logoUrl: "https://cmslbc.lbc.bo/uploads/logo-lbc-seguros-2026.svg",
    eyebrow: "Encuesta de experiencia",
    title: "Gracias por contarnos tu experiencia.",
    subtitle: "Queremos entender qué podemos mejorar para brindarte una atención más clara, simple y cercana.",
    introCardTitle: "Tu opinión nos ayuda a mejorar.",
    introCardText: "Selecciona una o varias opciones y envía tu feedback. En este flujo no mostraremos ofertas comerciales.",
    questionLiId: "li_1",
    buttonsLiId: "li_buttons",
    submitId: "submit_form"
  };

  function get(id) {
    return document.getElementById(id);
  }

  function setStyle(el, styles) {
    if (!el) return;
    Object.keys(styles).forEach(function (key) {
      el.style.setProperty(key, styles[key], "important");
    });
  }

  function normalize(text) {
    return String(text || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function applyGlobalBase() {
    setStyle(document.documentElement, {
      "margin": "0",
      "padding": "0",
      "background": "linear-gradient(180deg, #ffffff 0%, #f3f7fc 100%)"
    });

    setStyle(document.body, {
      "margin": "0",
      "padding": "0",
      "min-height": "100vh",
      "background": "linear-gradient(180deg, #ffffff 0%, #f3f7fc 100%)",
      "font-family": "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
      "color": "#173b6c"
    });
  }

  function hideOriginalHeader(formContainer, form) {
    Array.from(formContainer.children).forEach(function (child) {
      if (child === form || child.id === "lbc_nps_header") return;

      var text = normalize(child.innerText || child.textContent || "");
      var hasField = child.querySelector && child.querySelector("input, select, textarea, button");

      if (!hasField || text.indexOf("la boliviana ciacruz") !== -1) {
        setStyle(child, {
          "display": "none",
          "height": "0",
          "margin": "0",
          "padding": "0",
          "overflow": "hidden",
          "visibility": "hidden"
        });
      }
    });

    Array.from(form.querySelectorAll("h1, h2, h3, h4, p, .form_description")).forEach(function (el) {
      var text = normalize(el.innerText || el.textContent || "");

      if (
        text.indexOf("la boliviana ciacruz") !== -1 ||
        text.indexOf("cuéntanos brevemente") !== -1 ||
        text.indexOf("influyó en tu calificación") !== -1
      ) {
        setStyle(el, {
          "display": "none",
          "height": "0",
          "margin": "0",
          "padding": "0",
          "overflow": "hidden",
          "visibility": "hidden"
        });
      }
    });
  }

  function createHeader(form) {
    if (get("lbc_nps_header")) return;

    var header = document.createElement("div");
    header.id = "lbc_nps_header";

    var top = document.createElement("div");
    top.id = "lbc_nps_brand_row";

    var logoWrap = document.createElement("div");
    logoWrap.id = "lbc_nps_logo_wrap";

    var logo = document.createElement("img");
    logo.id = "lbc_nps_logo";
    logo.src = CONFIG.logoUrl;
    logo.alt = CONFIG.brand;

    logoWrap.appendChild(logo);

    var secure = document.createElement("div");
    secure.id = "lbc_nps_secure";
    secure.textContent = "Enlace personal seguro";

    top.appendChild(logoWrap);
    top.appendChild(secure);

    var icon = document.createElement("div");
    icon.id = "lbc_nps_icon";
    icon.textContent = "✓";

    var eyebrow = document.createElement("div");
    eyebrow.id = "lbc_nps_eyebrow";
    eyebrow.textContent = CONFIG.eyebrow;

    var title = document.createElement("div");
    title.id = "lbc_nps_title";
    title.textContent = CONFIG.title;

    var subtitle = document.createElement("div");
    subtitle.id = "lbc_nps_subtitle";
    subtitle.textContent = CONFIG.subtitle;

    var card = document.createElement("div");
    card.id = "lbc_nps_intro_card";

    var cardTitle = document.createElement("strong");
    cardTitle.textContent = CONFIG.introCardTitle;

    var cardText = document.createElement("span");
    cardText.textContent = CONFIG.introCardText;

    card.appendChild(cardTitle);
    card.appendChild(cardText);

    header.appendChild(top);
    header.appendChild(icon);
    header.appendChild(eyebrow);
    header.appendChild(title);
    header.appendChild(subtitle);
    header.appendChild(card);

    form.insertBefore(header, form.firstChild);
  }

  function styleLayout(formContainer, form, ul) {
    setStyle(formContainer, {
      "width": "100%",
      "max-width": "540px",
      "margin": "32px auto",
      "padding": "0",
      "background": "#ffffff",
      "background-image": "none",
      "border": "1px solid #dbe7f6",
      "border-radius": "28px",
      "box-shadow": "0 18px 52px rgba(23, 59, 108, 0.12)",
      "overflow": "hidden",
      "box-sizing": "border-box"
    });

    setStyle(form, {
      "width": "100%",
      "margin": "0",
      "padding": "0 22px 24px 22px",
      "background": "#ffffff",
      "background-image": "none",
      "border": "0",
      "box-shadow": "none",
      "font-family": "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
      "box-sizing": "border-box"
    });

    setStyle(ul, {
      "list-style": "none",
      "margin": "0",
      "padding": "0",
      "width": "100%"
    });
  }

  function styleHeader() {
    setStyle(get("lbc_nps_header"), {
      "margin": "0 -22px 18px -22px",
      "padding": "18px 22px 20px 22px",
      "background": "linear-gradient(180deg, #ffffff 0%, #f7faff 100%)",
      "border-bottom": "1px solid #dbe7f6"
    });

    setStyle(get("lbc_nps_brand_row"), {
      "display": "flex",
      "align-items": "center",
      "justify-content": "space-between",
      "gap": "12px",
      "margin": "0 0 20px 0"
    });

    setStyle(get("lbc_nps_logo_wrap"), {
      "display": "flex",
      "align-items": "center",
      "justify-content": "flex-start",
      "max-width": "205px",
      "height": "46px"
    });

    setStyle(get("lbc_nps_logo"), {
      "display": "block",
      "max-width": "205px",
      "max-height": "46px",
      "width": "auto",
      "height": "auto"
    });

    setStyle(get("lbc_nps_secure"), {
      "color": "#5f6f89",
      "font-size": "10px",
      "font-weight": "700",
      "line-height": "1.2",
      "background": "#eef5ff",
      "border": "1px solid #d7e7fb",
      "border-radius": "999px",
      "padding": "6px 9px",
      "white-space": "nowrap"
    });

    setStyle(get("lbc_nps_icon"), {
      "width": "48px",
      "height": "48px",
      "border-radius": "15px",
      "display": "flex",
      "align-items": "center",
      "justify-content": "center",
      "background": "#005baa",
      "color": "#ffffff",
      "font-size": "22px",
      "font-weight": "800",
      "margin": "0 0 12px 0",
      "box-shadow": "0 10px 20px rgba(0, 91, 170, 0.18)"
    });

    setStyle(get("lbc_nps_eyebrow"), {
      "color": "#005baa",
      "font-size": "10px",
      "font-weight": "850",
      "line-height": "1.2",
      "letter-spacing": "0.12em",
      "text-transform": "uppercase",
      "margin": "0 0 7px 0"
    });

    setStyle(get("lbc_nps_title"), {
      "color": "#173b6c",
      "font-size": "24px",
      "font-weight": "850",
      "line-height": "1.08",
      "letter-spacing": "-0.035em",
      "margin": "0 0 8px 0"
    });

    setStyle(get("lbc_nps_subtitle"), {
      "color": "#5f6f89",
      "font-size": "13px",
      "font-weight": "400",
      "line-height": "1.45",
      "margin": "0 0 14px 0"
    });

    setStyle(get("lbc_nps_intro_card"), {
      "display": "block",
      "padding": "13px 14px",
      "background": "#f0f6ff",
      "border": "1px solid #cfe1f7",
      "border-left": "4px solid #005baa",
      "border-radius": "16px",
      "color": "#173b6c",
      "box-sizing": "border-box"
    });

    var card = get("lbc_nps_intro_card");

    if (card) {
      setStyle(card.querySelector("strong"), {
        "display": "block",
        "font-size": "13px",
        "font-weight": "850",
        "line-height": "1.25",
        "margin": "0 0 4px 0",
        "color": "#173b6c"
      });

      setStyle(card.querySelector("span"), {
        "display": "block",
        "font-size": "11px",
        "font-weight": "400",
        "line-height": "1.4",
        "color": "#5f6f89"
      });
    }
  }

  function styleQuestion() {
    var li = get(CONFIG.questionLiId);
    if (!li) return;

    setStyle(li, {
      "list-style": "none",
      "margin": "0 0 18px 0",
      "padding": "0",
      "width": "100%",
      "background": "transparent",
      "border": "0",
      "box-shadow": "none",
      "box-sizing": "border-box"
    });

    Array.from(li.querySelectorAll("label.description, .description")).forEach(function (label) {
      setStyle(label, {
        "display": "block",
        "color": "#173b6c",
        "font-size": "15px",
        "font-weight": "850",
        "line-height": "1.25",
        "letter-spacing": "-0.01em",
        "margin": "0 0 12px 0",
        "padding": "0"
      });
    });

    Array.from(li.querySelectorAll(".required, .asterisk")).forEach(function (el) {
      setStyle(el, {
        "color": "#d93939",
        "font-weight": "850"
      });
    });

    var optionsWrap = li.querySelector("div");

    if (optionsWrap) {
      setStyle(optionsWrap, {
        "display": "grid",
        "grid-template-columns": "1fr",
        "gap": "8px",
        "width": "100%",
        "height": "auto",
        "margin": "0",
        "padding": "0",
        "background": "transparent",
        "border": "0"
      });
    }

    Array.from(li.querySelectorAll("span")).forEach(function (span) {
      var checkbox = span.querySelector("input[type='checkbox']");
      if (!checkbox) return;

      setStyle(span, {
        "display": "flex",
        "align-items": "center",
        "gap": "10px",
        "width": "100%",
        "min-height": "44px",
        "height": "auto",
        "margin": "0",
        "padding": "10px 12px",
        "background": "#ffffff",
        "border": "1px solid #dbe7f6",
        "border-radius": "14px",
        "box-shadow": "none",
        "color": "#475467",
        "font-size": "13px",
        "font-weight": "650",
        "line-height": "1.25",
        "box-sizing": "border-box",
        "cursor": "pointer"
      });
    });

    Array.from(li.querySelectorAll("input[type='checkbox']")).forEach(function (checkbox) {
      checkbox.style.setProperty("accent-color", "#005baa", "important");

      setStyle(checkbox, {
        "width": "16px",
        "height": "16px",
        "min-width": "16px",
        "min-height": "16px",
        "margin": "0",
        "padding": "0",
        "cursor": "pointer"
      });

      if (!checkbox.getAttribute("data-lbc-nps-bound")) {
        checkbox.setAttribute("data-lbc-nps-bound", "true");

        checkbox.addEventListener("change", function () {
          updateOptionState();
        });
      }
    });

    updateOptionState();
  }

  function updateOptionState() {
    var li = get(CONFIG.questionLiId);
    if (!li) return;

    Array.from(li.querySelectorAll("span")).forEach(function (span) {
      var checkbox = span.querySelector("input[type='checkbox']");
      if (!checkbox) return;

      if (checkbox.checked) {
        setStyle(span, {
          "background": "#eef5ff",
          "border-color": "#8bbce8",
          "color": "#005baa"
        });
      } else {
        setStyle(span, {
          "background": "#ffffff",
          "border-color": "#dbe7f6",
          "color": "#475467"
        });
      }
    });
  }

  function styleSubmit() {
    var li = get(CONFIG.buttonsLiId);
    var submit = get(CONFIG.submitId);

    if (li) {
      setStyle(li, {
        "list-style": "none",
        "margin": "8px 0 0 0",
        "padding": "0",
        "width": "100%",
        "height": "auto",
        "background": "transparent",
        "border": "0",
        "box-shadow": "none",
        "box-sizing": "border-box"
      });
    }

    if (submit) {
      submit.value = "Enviar feedback";

      setStyle(submit, {
        "display": "block",
        "width": "100%",
        "height": "auto",
        "min-height": "46px",
        "background": "#005baa",
        "background-color": "#005baa",
        "background-image": "none",
        "color": "#ffffff",
        "border": "0",
        "border-radius": "14px",
        "padding": "12px 16px",
        "font-family": "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
        "font-size": "14px",
        "font-weight": "850",
        "line-height": "1.2",
        "text-align": "center",
        "box-shadow": "0 10px 20px rgba(0, 91, 170, 0.20)",
        "text-shadow": "none",
        "text-transform": "none",
        "cursor": "pointer",
        "box-sizing": "border-box"
      });
    }
  }

  function applyMobile() {
    if (window.innerWidth > 640) return;

    var formContainer = get(CONFIG.containerId);
    var form = get(CONFIG.formId);

    setStyle(formContainer, {
      "max-width": "calc(100vw - 28px)",
      "margin": "18px auto",
      "border-radius": "24px"
    });

    setStyle(form, {
      "padding": "0 18px 22px 18px"
    });

    setStyle(get("lbc_nps_header"), {
      "margin": "0 -18px 18px -18px",
      "padding": "15px 18px 18px 18px"
    });

    setStyle(get("lbc_nps_title"), {
      "font-size": "22px"
    });

    setStyle(get("lbc_nps_logo_wrap"), {
      "max-width": "160px",
      "height": "40px"
    });

    setStyle(get("lbc_nps_logo"), {
      "max-width": "160px",
      "max-height": "40px"
    });

    setStyle(get("lbc_nps_secure"), {
      "font-size": "9px",
      "padding": "5px 8px"
    });
  }

  function applyFormStyle() {
    var formContainer = get(CONFIG.containerId);
    var form = get(CONFIG.formId);

    if (!formContainer || !form) return false;

    var ul = form.querySelector("ul");
    if (!ul) return false;

    applyGlobalBase();
    hideOriginalHeader(formContainer, form);
    createHeader(form);
    styleLayout(formContainer, form, ul);
    styleHeader();
    styleQuestion();
    styleSubmit();
    applyMobile();

    console.log("LBC NPS detractor v2 aplicado correctamente.");
    return true;
  }

  function wait() {
    attempts += 1;

    if (applyFormStyle()) return;

    if (attempts < maxAttempts) {
      setTimeout(wait, 250);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wait);
  } else {
    wait();
  }
})();

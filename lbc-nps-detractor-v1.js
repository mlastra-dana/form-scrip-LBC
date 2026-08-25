(function () {
  var attempts = 0;
  var maxAttempts = 120;

  var CONFIG = {
    formId: "form_8569",
    containerId: "form_container",
    segment: "detractor",
    brand: "La Boliviana Ciacruz",
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
      "background": "linear-gradient(180deg, #fbfcff 0%, #f5f7fb 100%)"
    });

    setStyle(document.body, {
      "margin": "0",
      "padding": "0",
      "min-height": "100vh",
      "background": "linear-gradient(180deg, #fbfcff 0%, #f5f7fb 100%)",
      "font-family": "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
      "color": "#101828"
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

    var brand = document.createElement("div");
    brand.id = "lbc_nps_brand";
    brand.textContent = CONFIG.brand;

    var secure = document.createElement("div");
    secure.id = "lbc_nps_secure";
    secure.textContent = "Enlace personal seguro";

    top.appendChild(brand);
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
      "max-width": "520px",
      "margin": "32px auto",
      "padding": "0",
      "background": "#ffffff",
      "background-image": "none",
      "border": "1px solid #e4e7ec",
      "border-radius": "28px",
      "box-shadow": "0 18px 52px rgba(24, 37, 84, 0.10)",
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
      "padding": "16px 22px 18px 22px",
      "background": "#ffffff",
      "border-bottom": "1px solid #edf0f4"
    });

    setStyle(get("lbc_nps_brand_row"), {
      "display": "flex",
      "align-items": "center",
      "justify-content": "space-between",
      "gap": "12px",
      "margin": "0 0 18px 0"
    });

    setStyle(get("lbc_nps_brand"), {
      "color": "#193471",
      "font-size": "16px",
      "font-weight": "850",
      "line-height": "1.2",
      "letter-spacing": "-0.01em"
    });

    setStyle(get("lbc_nps_secure"), {
      "color": "#667085",
      "font-size": "10px",
      "font-weight": "600",
      "line-height": "1.2"
    });

    setStyle(get("lbc_nps_icon"), {
      "width": "48px",
      "height": "48px",
      "border-radius": "15px",
      "display": "flex",
      "align-items": "center",
      "justify-content": "center",
      "background": "linear-gradient(135deg, #1f5eff 0%, #742bd1 100%)",
      "color": "#ffffff",
      "font-size": "22px",
      "font-weight": "800",
      "margin": "0 0 12px 0",
      "box-shadow": "0 10px 20px rgba(65, 48, 182, 0.18)"
    });

    setStyle(get("lbc_nps_eyebrow"), {
      "color": "#bd3642",
      "font-size": "10px",
      "font-weight": "850",
      "line-height": "1.2",
      "letter-spacing": "0.12em",
      "text-transform": "uppercase",
      "margin": "0 0 7px 0"
    });

    setStyle(get("lbc_nps_title"), {
      "color": "#101828",
      "font-size": "24px",
      "font-weight": "850",
      "line-height": "1.08",
      "letter-spacing": "-0.035em",
      "margin": "0 0 8px 0"
    });

    setStyle(get("lbc_nps_subtitle"), {
      "color": "#667085",
      "font-size": "13px",
      "font-weight": "400",
      "line-height": "1.45",
      "margin": "0 0 14px 0"
    });

    setStyle(get("lbc_nps_intro_card"), {
      "display": "block",
      "padding": "13px 14px",
      "background": "#fff0f1",
      "border": "1px solid #f1c1c5",
      "border-radius": "16px",
      "color": "#bd3642",
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
        "color": "#bd3642"
      });

      setStyle(card.querySelector("span"), {
        "display": "block",
        "font-size": "11px",
        "font-weight": "400",
        "line-height": "1.4",
        "color": "#667085"
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
        "color": "#101828",
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
        "color": "#bd3642",
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
        "border": "1px solid #e4e7ec",
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
      checkbox.style.setProperty("accent-color", "#1f5eff", "important");

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
          "background": "#eef3ff",
          "border-color": "#9eb7ff",
          "color": "#214eb2"
        });
      } else {
        setStyle(span, {
          "background": "#ffffff",
          "border-color": "#e4e7ec",
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
        "background": "linear-gradient(110deg, #1f5eff 0%, #742bd1 100%)",
        "background-color": "#1f5eff",
        "background-image": "linear-gradient(110deg, #1f5eff 0%, #742bd1 100%)",
        "color": "#ffffff",
        "border": "0",
        "border-radius": "14px",
        "padding": "12px 16px",
        "font-family": "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
        "font-size": "14px",
        "font-weight": "850",
        "line-height": "1.2",
        "text-align": "center",
        "box-shadow": "0 10px 20px rgba(65, 48, 182, 0.18)",
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

    console.log("LBC NPS detractor aplicado correctamente.");
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

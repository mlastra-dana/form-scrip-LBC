(function () {
  var attempts = 0;
  var maxAttempts = 120;

  var CONFIG = {
    formId: "form_8568",
    containerId: "form_container",
    brand: "LBC Seguros",
    logoUrl: "https://cmslbc.lbc.bo/uploads/logo-lbc-seguros-2026.svg",
    eyebrow: "Encuesta de experiencia",
    title: "Ayúdanos a mejorar tu experiencia.",
    subtitle: "Queremos saber qué aspecto podríamos fortalecer para que tu experiencia con LBC Seguros sea excelente.",
    introCardTitle: "Tu opinión nos ayuda a seguir mejorando.",
    introCardText: "Selecciona el aspecto que más influyó en tu experiencia y, si deseas, déjanos un canal para contactarte.",
    feedbackLiId: "li_1",
    optionsLiId: "li_3",
    contactLiId: "li_4",
    phoneLiId: "li_5",
    phoneInputId: "element_5",
    emailLiId: "li_6",
    emailInputId: "element_6",
    buttonsLiId: "li_buttons",
    submitId: "submit_form"
  };

  var RECOMMENDATIONS = {
    "Revisar mi cobertura actual": {
      icon: "🛡️",
      title: "Revisar mi cobertura actual",
      description: "Conoce una opción simple para mejorar tu protección actual.",
      tags: ["Recomendada", "Mismo producto"]
    },
    "Accidentes Personales": {
      icon: "🩹",
      title: "Accidentes Personales",
      description: "Una cobertura complementaria sencilla para imprevistos.",
      tags: ["Complementario"]
    }
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
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function normalizeLower(text) {
    return normalize(text).toLowerCase();
  }

  function onlyDigits(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function isHiddenByPlatform(el) {
    if (!el) return false;
    return el.offsetWidth === 0 && el.offsetHeight === 0;
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

  function injectWhiteSelectionStyles() {
    if (document.getElementById("lbc_nps_pasivo_white_selection_v6")) return;

    var style = document.createElement("style");
    style.id = "lbc_nps_pasivo_white_selection_v6";

    style.textContent =
      "#form_8568 li," +
      "#form_8568 li:hover," +
      "#form_8568 li:focus," +
      "#form_8568 li:active," +
      "#form_8568 li.highlighted," +
      "#form_8568 li.selected," +
      "#form_8568 li.focused," +
      "#form_8568 li:focus-within{" +
      "background:#ffffff!important;" +
      "background-color:#ffffff!important;" +
      "background-image:none!important;" +
      "box-shadow:none!important;" +
      "}" +

      "#form_8568 li>div," +
      "#form_8568 li>div:hover," +
      "#form_8568 li>div:focus," +
      "#form_8568 li>div:active," +
      "#form_8568 li:focus-within>div{" +
      "background:#ffffff!important;" +
      "background-color:#ffffff!important;" +
      "background-image:none!important;" +
      "box-shadow:none!important;" +
      "}" +

      "#form_8568 li.checkboxes span{" +
      "background:#ffffff!important;" +
      "background-color:#ffffff!important;" +
      "background-image:none!important;" +
      "box-shadow:none!important;" +
      "}" +

      "#form_8568 li.checkboxes span.lbc-selected{" +
      "background:#ffffff!important;" +
      "background-color:#ffffff!important;" +
      "border-color:#005baa!important;" +
      "color:#005baa!important;" +
      "}" +

      "#form_8568 select," +
      "#form_8568 select:hover," +
      "#form_8568 select:focus," +
      "#form_8568 select:active," +
      "#form_8568 input[type='text']," +
      "#form_8568 input[type='text']:hover," +
      "#form_8568 input[type='text']:focus," +
      "#form_8568 input[type='email']," +
      "#form_8568 input[type='email']:hover," +
      "#form_8568 input[type='email']:focus," +
      "#form_8568 input[type='tel']," +
      "#form_8568 input[type='tel']:hover," +
      "#form_8568 input[type='tel']:focus{" +
      "background:#ffffff!important;" +
      "background-color:#ffffff!important;" +
      "background-image:none!important;" +
      "box-shadow:none!important;" +
      "}";

    document.head.appendChild(style);
  }

  function forceWhiteFieldBackgrounds() {
    [
      CONFIG.feedbackLiId,
      CONFIG.optionsLiId,
      CONFIG.contactLiId,
      CONFIG.phoneLiId,
      CONFIG.emailLiId
    ].forEach(function (id) {
      var li = get(id);
      if (!li) return;

      setStyle(li, {
        "background": "#ffffff",
        "background-color": "#ffffff",
        "background-image": "none",
        "box-shadow": "none"
      });

      Array.from(li.querySelectorAll("div")).forEach(function (div) {
        if (div.id && div.id.indexOf("lbc_") === 0) return;

        setStyle(div, {
          "background": "#ffffff",
          "background-color": "#ffffff",
          "background-image": "none",
          "box-shadow": "none"
        });
      });
    });
  }

  function hideOriginalHeader(formContainer, form) {
    Array.from(formContainer.children).forEach(function (child) {
      if (child === form || child.id === "lbc_nps_header") return;

      var text = normalizeLower(child.innerText || child.textContent || "");
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
      var text = normalizeLower(el.innerText || el.textContent || "");

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

    var logoArea = document.createElement("div");
    logoArea.id = "lbc_nps_logo_area";

    var logo = document.createElement("img");
    logo.id = "lbc_nps_logo";
    logo.src = CONFIG.logoUrl;
    logo.alt = CONFIG.brand;

    var fallback = document.createElement("div");
    fallback.id = "lbc_nps_logo_fallback";
    fallback.textContent = CONFIG.brand;

    logo.onerror = function () {
      setStyle(logo, { "display": "none" });
      setStyle(fallback, { "display": "block" });
    };

    logo.onload = function () {
      setStyle(fallback, { "display": "none" });
      setStyle(logo, { "display": "block" });
    };

    logoArea.appendChild(logo);
    logoArea.appendChild(fallback);

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

    header.appendChild(logoArea);
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
      "background-color": "#ffffff",
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
      "background-color": "#ffffff",
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
      "width": "100%",
      "background": "#ffffff",
      "background-color": "#ffffff",
      "background-image": "none"
    });
  }

  function styleHeader() {
    setStyle(get("lbc_nps_header"), {
      "margin": "0 -22px 18px -22px",
      "padding": "24px 22px 20px 22px",
      "background": "linear-gradient(180deg, #ffffff 0%, #f7faff 100%)",
      "border-bottom": "1px solid #dbe7f6"
    });

    setStyle(get("lbc_nps_logo_area"), {
      "display": "flex",
      "align-items": "center",
      "justify-content": "center",
      "width": "100%",
      "height": "64px",
      "margin": "0 0 22px 0",
      "padding": "0",
      "text-align": "center"
    });

    setStyle(get("lbc_nps_logo"), {
      "display": "block",
      "width": "230px",
      "max-width": "230px",
      "height": "auto",
      "max-height": "64px",
      "object-fit": "contain",
      "margin": "0 auto"
    });

    setStyle(get("lbc_nps_logo_fallback"), {
      "display": "none",
      "color": "#005baa",
      "font-size": "22px",
      "font-weight": "850",
      "line-height": "1.1",
      "letter-spacing": "-0.02em",
      "text-align": "center"
    });

    setStyle(get("lbc_nps_eyebrow"), {
      "color": "#005baa",
      "font-size": "10px",
      "font-weight": "750",
      "line-height": "1.2",
      "letter-spacing": "0.12em",
      "text-transform": "uppercase",
      "margin": "0 0 7px 0"
    });

    setStyle(get("lbc_nps_title"), {
      "color": "#173b6c",
      "font-size": "23px",
      "font-weight": "750",
      "line-height": "1.12",
      "letter-spacing": "-0.025em",
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
        "font-weight": "700",
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

  function styleFieldBlock(li) {
    if (!li) return;

    setStyle(li, {
      "list-style": "none",
      "margin": "0 0 18px 0",
      "padding": "0",
      "width": "100%",
      "background": "#ffffff",
      "background-color": "#ffffff",
      "background-image": "none",
      "border": "0",
      "box-shadow": "none",
      "box-sizing": "border-box"
    });

    Array.from(li.querySelectorAll("label.description, .description")).forEach(function (label) {
      setStyle(label, {
        "display": "block",
        "color": "#173b6c",
        "font-size": "15px",
        "font-weight": "700",
        "line-height": "1.25",
        "letter-spacing": "-0.01em",
        "margin": "0 0 12px 0",
        "padding": "0",
        "background": "#ffffff",
        "background-color": "#ffffff",
        "background-image": "none"
      });
    });

    Array.from(li.querySelectorAll(".required, .asterisk")).forEach(function (el) {
      setStyle(el, {
        "color": "#d93939",
        "font-weight": "800"
      });
    });
  }

  function styleStandardCheckboxGroup(li) {
    if (!li || isHiddenByPlatform(li)) return;

    styleFieldBlock(li);

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
        "background": "#ffffff",
        "background-color": "#ffffff",
        "background-image": "none",
        "border": "0",
        "box-shadow": "none"
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
        "background-color": "#ffffff",
        "background-image": "none",
        "border": "1px solid #dbe7f6",
        "border-radius": "14px",
        "box-shadow": "none",
        "color": "#475467",
        "font-size": "12px",
        "font-weight": "500",
        "line-height": "1.25",
        "box-sizing": "border-box",
        "cursor": "pointer"
      });
    });

    bindCheckboxes(li);
  }

  function styleRecommendationCheckboxGroup(li) {
    if (!li || isHiddenByPlatform(li)) return;

    styleFieldBlock(li);

    var label = li.querySelector("label.description, .description");
    if (label) {
      label.textContent = "Encontramos 2 opciones que podrían interesarte.";
      setStyle(label, {
        "font-size": "18px",
        "font-weight": "750",
        "line-height": "1.15",
        "margin": "0 0 12px 0"
      });
    }

    var optionsWrap = li.querySelector("div");

    if (optionsWrap) {
      setStyle(optionsWrap, {
        "display": "grid",
        "grid-template-columns": "1fr",
        "gap": "10px",
        "width": "100%",
        "height": "auto",
        "margin": "0",
        "padding": "0",
        "background": "#ffffff",
        "background-color": "#ffffff",
        "background-image": "none",
        "border": "0",
        "box-shadow": "none"
      });
    }

    Array.from(li.querySelectorAll("span")).forEach(function (span) {
      var checkbox = span.querySelector("input[type='checkbox']");
      if (!checkbox) return;

      var originalText = getSpanTextWithoutInput(span);
      var data = RECOMMENDATIONS[originalText] || {
        icon: "✓",
        title: originalText,
        description: "Opción recomendada según tu experiencia.",
        tags: ["Recomendada"]
      };

      if (!span.getAttribute("data-lbc-card-ready")) {
        span.setAttribute("data-lbc-card-ready", "true");

        while (span.firstChild) {
          span.removeChild(span.firstChild);
        }

        var card = document.createElement("div");
        card.className = "lbc-reco-card";

        var icon = document.createElement("div");
        icon.className = "lbc-reco-icon";
        icon.textContent = data.icon;

        var content = document.createElement("div");
        content.className = "lbc-reco-content";

        var title = document.createElement("div");
        title.className = "lbc-reco-title";
        title.textContent = data.title;

        var desc = document.createElement("div");
        desc.className = "lbc-reco-desc";
        desc.textContent = data.description;

        var tags = document.createElement("div");
        tags.className = "lbc-reco-tags";

        data.tags.forEach(function (tagText) {
          var tag = document.createElement("span");
          tag.className = "lbc-reco-tag";
          tag.textContent = tagText;
          tags.appendChild(tag);
        });

        content.appendChild(title);
        content.appendChild(desc);
        content.appendChild(tags);

        span.appendChild(checkbox);
        card.appendChild(icon);
        card.appendChild(content);
        span.appendChild(card);
      }

      setStyle(span, {
        "display": "flex",
        "align-items": "center",
        "gap": "10px",
        "width": "100%",
        "min-height": "88px",
        "height": "auto",
        "margin": "0",
        "padding": "12px",
        "background": "#ffffff",
        "background-color": "#ffffff",
        "background-image": "none",
        "border": "1px solid #dbe7f6",
        "border-radius": "18px",
        "box-shadow": "none",
        "color": "#475467",
        "font-size": "12px",
        "font-weight": "500",
        "line-height": "1.25",
        "box-sizing": "border-box",
        "cursor": "pointer"
      });

      styleRecommendationCard(span);
    });

    bindCheckboxes(li);
  }

  function getSpanTextWithoutInput(span) {
    var clone = span.cloneNode(true);
    Array.from(clone.querySelectorAll("input, .lbc-reco-card")).forEach(function (el) {
      el.remove();
    });
    return normalize(clone.textContent || "");
  }

  function styleRecommendationCard(span) {
    var checkbox = span.querySelector("input[type='checkbox']");
    var card = span.querySelector(".lbc-reco-card");
    var icon = span.querySelector(".lbc-reco-icon");
    var content = span.querySelector(".lbc-reco-content");
    var title = span.querySelector(".lbc-reco-title");
    var desc = span.querySelector(".lbc-reco-desc");
    var tags = span.querySelector(".lbc-reco-tags");

    if (checkbox) {
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
    }

    setStyle(card, {
      "display": "flex",
      "align-items": "flex-start",
      "gap": "12px",
      "width": "100%",
      "background": "transparent",
      "background-color": "transparent",
      "background-image": "none",
      "box-shadow": "none"
    });

    setStyle(icon, {
      "width": "46px",
      "height": "46px",
      "min-width": "46px",
      "border-radius": "14px",
      "display": "flex",
      "align-items": "center",
      "justify-content": "center",
      "background": "#f0f6ff",
      "color": "#005baa",
      "font-size": "20px",
      "line-height": "1"
    });

    setStyle(content, {
      "display": "block",
      "width": "100%",
      "background": "transparent",
      "background-color": "transparent",
      "background-image": "none"
    });

    setStyle(title, {
      "color": "#173b6c",
      "font-size": "14px",
      "font-weight": "750",
      "line-height": "1.2",
      "margin": "1px 0 5px 0"
    });

    setStyle(desc, {
      "color": "#5f6f89",
      "font-size": "12px",
      "font-weight": "400",
      "line-height": "1.35",
      "margin": "0 0 8px 0"
    });

    setStyle(tags, {
      "display": "flex",
      "flex-wrap": "wrap",
      "gap": "6px",
      "background": "transparent",
      "background-color": "transparent",
      "background-image": "none"
    });

    Array.from(span.querySelectorAll(".lbc-reco-tag")).forEach(function (tag) {
      setStyle(tag, {
        "display": "inline-flex",
        "align-items": "center",
        "justify-content": "center",
        "height": "22px",
        "padding": "0 9px",
        "border-radius": "999px",
        "background": "#eef5ff",
        "color": "#005baa",
        "font-size": "10px",
        "font-weight": "700",
        "line-height": "1",
        "letter-spacing": "0.02em"
      });
    });
  }

  function bindCheckboxes(li) {
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
          forceWhiteFieldBackgrounds();

          setTimeout(function () {
            updateOptionState();
            forceWhiteFieldBackgrounds();
          }, 50);

          setTimeout(function () {
            updateOptionState();
            forceWhiteFieldBackgrounds();
          }, 150);
        });
      }
    });
  }

  function styleTextField(li) {
    if (!li || isHiddenByPlatform(li)) return;

    styleFieldBlock(li);

    Array.from(li.querySelectorAll("input[type='text'], input[type='email'], input[type='tel'], textarea")).forEach(function (field) {
      setStyle(field, {
        "width": "100%",
        "height": "46px",
        "min-height": "46px",
        "background": "#ffffff",
        "background-color": "#ffffff",
        "background-image": "none",
        "color": "#173b6c",
        "border": "1px solid #dbe7f6",
        "border-radius": "14px",
        "box-shadow": "none",
        "outline": "none",
        "font-family": "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
        "font-size": "13px",
        "font-weight": "500",
        "line-height": "1.3",
        "padding": "10px 12px",
        "box-sizing": "border-box"
      });
    });
  }

  function configureBoliviaPhone() {
    var phone = get(CONFIG.phoneInputId);
    var phoneLi = get(CONFIG.phoneLiId);

    if (!phone) return;

    phone.setAttribute("type", "text");
    phone.setAttribute("inputmode", "numeric");
    phone.setAttribute("maxlength", "8");
    phone.setAttribute("autocomplete", "tel");
    phone.setAttribute("placeholder", "Ej: 71234567");
    phone.setAttribute("pattern", "[0-9]{8}");

    var hintId = "lbc_phone_hint";
    var existing = get(hintId);

    if (!existing && phoneLi) {
      var hint = document.createElement("div");
      hint.id = hintId;
      hint.textContent = "Ingresa un número de Bolivia de 8 dígitos. Ejemplo: 71234567.";
      phoneLi.appendChild(hint);

      setStyle(hint, {
        "color": "#5f6f89",
        "font-size": "11px",
        "font-weight": "400",
        "line-height": "1.35",
        "margin": "6px 0 0 0",
        "padding": "0"
      });
    }

    if (!phone.getAttribute("data-lbc-phone-bound")) {
      phone.setAttribute("data-lbc-phone-bound", "true");

      phone.addEventListener("input", function () {
        phone.value = onlyDigits(phone.value).slice(0, 8);
      });
    }
  }

  function configureEmailField() {
    var email = get(CONFIG.emailInputId);

    if (!email) return;

    email.setAttribute("type", "email");
    email.setAttribute("autocomplete", "email");
    email.setAttribute("placeholder", "Ej: nombre@correo.com");
  }

  function updateOptionState() {
    [CONFIG.feedbackLiId, CONFIG.optionsLiId, CONFIG.contactLiId].forEach(function (id) {
      var li = get(id);
      if (!li || isHiddenByPlatform(li)) return;

      Array.from(li.querySelectorAll("span")).forEach(function (span) {
        var checkbox = span.querySelector("input[type='checkbox']");
        if (!checkbox) return;

        if (checkbox.checked) {
          span.classList.add("lbc-selected");

          setStyle(span, {
            "background": "#ffffff",
            "background-color": "#ffffff",
            "background-image": "none",
            "border-color": "#005baa",
            "color": "#005baa"
          });
        } else {
          span.classList.remove("lbc-selected");

          setStyle(span, {
            "background": "#ffffff",
            "background-color": "#ffffff",
            "background-image": "none",
            "border-color": "#dbe7f6",
            "color": "#475467"
          });
        }
      });
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
        "background": "#ffffff",
        "background-color": "#ffffff",
        "background-image": "none",
        "border": "0",
        "box-shadow": "none",
        "box-sizing": "border-box"
      });
    }

    if (submit) {
      submit.value = "Enviar";

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
        "font-weight": "750",
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

  function styleAllFields() {
    styleStandardCheckboxGroup(get(CONFIG.feedbackLiId));
    styleRecommendationCheckboxGroup(get(CONFIG.optionsLiId));
    styleStandardCheckboxGroup(get(CONFIG.contactLiId));
    styleTextField(get(CONFIG.phoneLiId));
    styleTextField(get(CONFIG.emailLiId));
    configureBoliviaPhone();
    configureEmailField();
    updateOptionState();
    forceWhiteFieldBackgrounds();
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
      "padding": "20px 18px 18px 18px"
    });

    setStyle(get("lbc_nps_logo_area"), {
      "height": "56px",
      "margin": "0 0 18px 0"
    });

    setStyle(get("lbc_nps_logo"), {
      "width": "190px",
      "max-width": "190px",
      "max-height": "56px"
    });

    setStyle(get("lbc_nps_title"), {
      "font-size": "21px"
    });
  }

  function applyFormStyle() {
    var formContainer = get(CONFIG.containerId);
    var form = get(CONFIG.formId);

    if (!formContainer || !form) return false;

    var ul = form.querySelector("ul");
    if (!ul) return false;

    applyGlobalBase();
    injectWhiteSelectionStyles();
    hideOriginalHeader(formContainer, form);
    createHeader(form);
    styleLayout(formContainer, form, ul);
    styleHeader();
    styleAllFields();
    styleSubmit();
    applyMobile();

    console.log("LBC NPS pasivo v6 aplicado correctamente.");
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

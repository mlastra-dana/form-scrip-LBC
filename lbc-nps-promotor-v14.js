(function () {
  var attempts = 0;
  var maxAttempts = 120;

  var CONFIG = {
    formId: "form_8567",
    containerId: "form_container",
    brand: "LBC Seguros",
    logoUrl: "https://cmslbc.lbc.bo/uploads/logo-lbc-seguros-2026.svg",

    thanksTitle: "¡Gracias por tu excelente evaluación!",
    thanksSubtitle: "Nos alegra saber que tu experiencia fue positiva.",
    thanksCardTitle: "Encuesta completada",
    thanksCardText: "Aquí termina tu feedback. Si deseas conocer alternativas pensadas para ti, puedes continuar",

    contextEyebrow: "Por ser un buen cliente",
    contextTitle: "Tenemos opciones personalizadas para ti.",
    contextText: "Seleccionamos algunas alternativas de protección que podrían ser relevantes según tu relación con nosotros.",

    productsEyebrow: "Opciones personalizadas",
    productsTitle: "Opciones seleccionadas para ti",
    productsSubtitle: "Puedes explorar alternativas pensadas para seguir protegiéndote. Una aparece recomendada.",

    recommendationLiId: "li_13",
    contactLiId: "li_9",
    phoneLiId: "li_10",
    phoneInputId: "element_10",
    emailLiId: "li_11",
    emailInputId: "element_11",
    buttonsLiId: "li_buttons",
    submitId: "submit_form",
    primaryNextId: "submit_primary",
    nextText: "Interés en productos",
    submitText: "Enviar"
  };

  var COLORS = {
    blue: "#0066b3",
    blueDark: "#123d73",
    blueSoft: "#eaf4ff",
    green: "#22b14c",
    ink: "#111827",
    muted: "#5f6f89",
    border: "#dbe7f6"
  };

  var RECOMMENDATIONS = {
    "mejora tu cobertura": {
      icon: "🛡️",
      title: "Mejora tu cobertura",
      description: "Más protección para tu vehículo con una cobertura superior.",
      tags: ["Mismo producto", "Recomendada"],
      recommended: true
    },
    "accidentes personales": {
      icon: "🩹",
      title: "Accidentes Personales",
      description: "Protección sencilla para ti ante accidentes dentro o fuera del vehículo.",
      tags: ["Complementario"],
      recommended: false
    },
    "movilidad plus": {
      icon: "🚗",
      title: "Movilidad Plus",
      description: "Asistencia, grúa y beneficios de movilidad.",
      tags: ["Asistencia"],
      recommended: false
    },
    "hogar / contenidos": {
      icon: "🏠",
      title: "Hogar / Contenidos",
      description: "Protege tu vivienda y tus pertenencias.",
      tags: ["Cross-sell"],
      recommended: false
    },
    "vida / protección familiar": {
      icon: "❤️",
      title: "Vida / Protección familiar",
      description: "Amplía la protección de quienes dependen de ti.",
      tags: ["Cross-sell"],
      recommended: false
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

  function isVisible(el) {
    if (!el) return false;
    return el.offsetWidth > 0 || el.offsetHeight > 0;
  }

  function isProductsPage() {
    var recommendationLi = get(CONFIG.recommendationLiId);
    return isVisible(recommendationLi);
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
      "color": COLORS.blueDark
    });
  }

  function injectStyles() {
    if (document.getElementById("lbc_nps_promotor_v13_styles")) return;

    var style = document.createElement("style");
    style.id = "lbc_nps_promotor_v13_styles";

    style.textContent =
      "#form_8567 li," +
      "#form_8567 li:hover," +
      "#form_8567 li:focus," +
      "#form_8567 li:active," +
      "#form_8567 li.highlighted," +
      "#form_8567 li.selected," +
      "#form_8567 li.focused," +
      "#form_8567 li:focus-within{" +
      "background:#ffffff!important;" +
      "background-color:#ffffff!important;" +
      "background-image:none!important;" +
      "box-shadow:none!important;" +
      "}" +

      "#form_8567 li>div," +
      "#form_8567 li>div:hover," +
      "#form_8567 li>div:focus," +
      "#form_8567 li>div:active," +
      "#form_8567 li:focus-within>div{" +
      "background:#ffffff!important;" +
      "background-color:#ffffff!important;" +
      "background-image:none!important;" +
      "box-shadow:none!important;" +
      "}" +

      "#form_8567 li.checkboxes span{" +
      "background:#ffffff!important;" +
      "background-color:#ffffff!important;" +
      "background-image:none!important;" +
      "box-shadow:none!important;" +
      "}" +

      "#form_8567 li.checkboxes span.lbc-selected{" +
      "background:#ffffff!important;" +
      "background-color:#ffffff!important;" +
      "border-color:" + COLORS.blue + "!important;" +
      "color:" + COLORS.blue + "!important;" +
      "}" +

      "#form_8567 input[type='text']," +
      "#form_8567 input[type='text']:hover," +
      "#form_8567 input[type='text']:focus," +
      "#form_8567 input[type='email']," +
      "#form_8567 input[type='email']:hover," +
      "#form_8567 input[type='email']:focus," +
      "#form_8567 input[type='tel']," +
      "#form_8567 input[type='tel']:hover," +
      "#form_8567 input[type='tel']:focus," +
      "#form_8567 textarea," +
      "#form_8567 textarea:hover," +
      "#form_8567 textarea:focus," +
      "#form_8567 select," +
      "#form_8567 select:hover," +
      "#form_8567 select:focus{" +
      "background:#ffffff!important;" +
      "background-color:#ffffff!important;" +
      "background-image:none!important;" +
      "box-shadow:none!important;" +
      "}" +

      "#form_8567 a[href*='previous']," +
      "#form_8567 a[href*='back']," +
      "#form_8567 a[id*='previous']," +
      "#form_8567 a[id*='back']," +
      "#form_8567 input[id*='previous']," +
      "#form_8567 input[id*='back']," +
      "#form_8567 button[id*='previous']," +
      "#form_8567 button[id*='back']{" +
      "display:inline-flex!important;" +
      "align-items:center!important;" +
      "justify-content:center!important;" +
      "width:auto!important;" +
      "min-width:118px!important;" +
      "max-width:180px!important;" +
      "min-height:38px!important;" +
      "margin:14px auto 0 auto!important;" +
      "padding:10px 16px!important;" +
      "background:#f8fbff!important;" +
      "background-color:#f8fbff!important;" +
      "background-image:none!important;" +
      "color:" + COLORS.blueDark + "!important;" +
      "border:1px solid #cfe1f7!important;" +
      "border-radius:999px!important;" +
      "font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif!important;" +
      "font-size:12px!important;" +
      "font-weight:700!important;" +
      "line-height:1.2!important;" +
      "text-align:center!important;" +
      "text-decoration:none!important;" +
      "box-shadow:none!important;" +
      "text-shadow:none!important;" +
      "box-sizing:border-box!important;" +
      "cursor:pointer!important;" +
      "float:none!important;" +
      "clear:both!important;" +
      "}";

    document.head.appendChild(style);
  }

  function forceWhiteBackgrounds(form) {
    if (!form) return;

    Array.from(form.querySelectorAll("li")).forEach(function (li) {
      if (li.id === "lbc_product_context_li") return;

      setStyle(li, {
        "background": "#ffffff",
        "background-color": "#ffffff",
        "background-image": "none",
        "box-shadow": "none"
      });

      Array.from(li.querySelectorAll("div")).forEach(function (div) {
        if (div.id && div.id.indexOf("lbc_") === 0) return;
        if (div.className && String(div.className).indexOf("lbc-") !== -1) return;

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
        text.indexOf("opciones personalizadas") !== -1 ||
        text.indexOf("opciones seleccionadas") !== -1 ||
        text.indexOf("puedes explorar alternativas") !== -1 ||
        text.indexOf("gracias por tu excelente") !== -1 ||
        text.indexOf("nos alegra saber") !== -1 ||
        text.indexOf("encuesta completada") !== -1 ||
        text.indexOf("aquí termina") !== -1 ||
        text.indexOf("por ser un buen cliente") !== -1 ||
        text.indexOf("tenemos opciones personalizadas") !== -1 ||
        text.indexOf("seleccionamos algunas alternativas") !== -1 ||
        text.indexOf("la boliviana ciacruz") !== -1
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

  function hideOriginalContextBlock(form) {
    Array.from(form.querySelectorAll("li, div, section")).forEach(function (el) {
      if (el.id === "lbc_product_context_li") return;
      if (el.id === "lbc_product_context_card") return;
      if (el.id === CONFIG.buttonsLiId) return;
      if (el.querySelector && el.querySelector("input[type='submit'], button")) return;

      var text = normalizeLower(el.innerText || el.textContent || "");

      if (
        text.indexOf("por ser un buen cliente") !== -1 &&
        text.indexOf("tenemos opciones personalizadas") !== -1
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

    var thanksIcon = document.createElement("div");
    thanksIcon.id = "lbc_nps_thanks_icon";
    thanksIcon.textContent = "★";

    var eyebrow = document.createElement("div");
    eyebrow.id = "lbc_nps_eyebrow";

    var title = document.createElement("div");
    title.id = "lbc_nps_title";

    var subtitle = document.createElement("div");
    subtitle.id = "lbc_nps_subtitle";

    var card = document.createElement("div");
    card.id = "lbc_nps_thanks_card";

    var cardTitle = document.createElement("strong");
    cardTitle.id = "lbc_nps_thanks_card_title";

    var cardText = document.createElement("span");
    cardText.id = "lbc_nps_thanks_card_text";

    card.appendChild(cardTitle);
    card.appendChild(cardText);

    header.appendChild(logoArea);
    header.appendChild(thanksIcon);
    header.appendChild(eyebrow);
    header.appendChild(title);
    header.appendChild(subtitle);
    header.appendChild(card);

    form.insertBefore(header, form.firstChild);
  }

  function createProductContextCard(form) {
    if (isProductsPage()) return;

    var ul = form.querySelector("ul");
    var buttonsLi = get(CONFIG.buttonsLiId);

    if (!ul || !buttonsLi) return;

    var contextLi = get("lbc_product_context_li");

    if (!contextLi) {
      contextLi = document.createElement("li");
      contextLi.id = "lbc_product_context_li";

      var card = document.createElement("div");
      card.id = "lbc_product_context_card";

      var eyebrow = document.createElement("div");
      eyebrow.id = "lbc_product_context_eyebrow";
      eyebrow.textContent = CONFIG.contextEyebrow;

      var title = document.createElement("div");
      title.id = "lbc_product_context_title";
      title.textContent = CONFIG.contextTitle;

      var text = document.createElement("div");
      text.id = "lbc_product_context_text";
      text.textContent = CONFIG.contextText;

      var slot = document.createElement("div");
      slot.id = "lbc_product_context_cta_slot";

      card.appendChild(eyebrow);
      card.appendChild(title);
      card.appendChild(text);
      card.appendChild(slot);
      contextLi.appendChild(card);

      ul.insertBefore(contextLi, buttonsLi);
    }

    setStyle(contextLi, {
      "list-style": "none",
      "display": "block",
      "margin": "18px 0 0 0",
      "padding": "0",
      "background": "transparent",
      "background-color": "transparent",
      "background-image": "none",
      "border": "0",
      "box-shadow": "none"
    });

    setStyle(get("lbc_product_context_card"), {
      "display": "block",
      "width": "100%",
      "padding": "22px 18px 18px 18px",
      "background": "linear-gradient(135deg, #123d73 0%, #0066b3 58%, #12a84f 135%)",
      "background-color": "#0066b3",
      "background-image": "linear-gradient(135deg, #123d73 0%, #0066b3 58%, #12a84f 135%)",
      "border": "0",
      "border-radius": "22px",
      "box-shadow": "0 16px 30px rgba(0, 102, 179, 0.20)",
      "box-sizing": "border-box",
      "color": "#ffffff"
    });

    setStyle(get("lbc_product_context_eyebrow"), {
      "display": "block",
      "color": "#d9ecff",
      "font-size": "12px",
      "font-weight": "700",
      "line-height": "1.2",
      "letter-spacing": "0.08em",
      "text-transform": "uppercase",
      "margin": "0 0 10px 0"
    });

    setStyle(get("lbc_product_context_title"), {
      "display": "block",
      "color": "#ffffff",
      "font-size": "24px",
      "font-weight": "800",
      "line-height": "1.18",
      "letter-spacing": "-0.035em",
      "margin": "0 0 12px 0"
    });

    setStyle(get("lbc_product_context_text"), {
      "display": "block",
      "color": "#eef7ff",
      "font-size": "13px",
      "font-weight": "400",
      "line-height": "1.42",
      "margin": "0 0 18px 0"
    });

    setStyle(get("lbc_product_context_cta_slot"), {
      "display": "block",
      "width": "100%",
      "margin": "0",
      "padding": "0",
      "background": "transparent",
      "background-color": "transparent",
      "background-image": "none"
    });
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
    var productsPage = isProductsPage();

    setStyle(get("lbc_nps_header"), {
      "margin": "0 -22px 18px -22px",
      "padding": productsPage ? "24px 22px 18px 22px" : "24px 22px 12px 22px",
      "background": "linear-gradient(180deg, #ffffff 0%, #f7faff 100%)",
      "border-bottom": productsPage ? "1px solid #dbe7f6" : "0"
    });

    setStyle(get("lbc_nps_logo_area"), {
      "display": "flex",
      "align-items": "center",
      "justify-content": "center",
      "width": "100%",
      "height": "64px",
      "margin": productsPage ? "0 0 22px 0" : "0 0 20px 0",
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
      "color": COLORS.blue,
      "font-size": "22px",
      "font-weight": "850",
      "line-height": "1.1",
      "letter-spacing": "-0.02em",
      "text-align": "center"
    });

    setStyle(get("lbc_nps_thanks_icon"), {
      "display": productsPage ? "none" : "flex",
      "align-items": "center",
      "justify-content": "center",
      "width": "56px",
      "height": "56px",
      "border-radius": "18px",
      "background": "linear-gradient(135deg, #0066b3 0%, #22b14c 130%)",
      "color": "#ffffff",
      "font-size": "30px",
      "font-weight": "800",
      "line-height": "1",
      "margin": "0 0 18px 0",
      "box-shadow": "0 14px 28px rgba(0, 102, 179, 0.18)"
    });

    get("lbc_nps_eyebrow").textContent = productsPage ? CONFIG.productsEyebrow : "";
    get("lbc_nps_title").textContent = productsPage ? CONFIG.productsTitle : CONFIG.thanksTitle;
    get("lbc_nps_subtitle").textContent = productsPage ? CONFIG.productsSubtitle : CONFIG.thanksSubtitle;
    get("lbc_nps_thanks_card_title").textContent = CONFIG.thanksCardTitle;
    get("lbc_nps_thanks_card_text").textContent = CONFIG.thanksCardText;

    setStyle(get("lbc_nps_eyebrow"), {
      "display": productsPage ? "block" : "none",
      "color": COLORS.blue,
      "font-size": "10px",
      "font-weight": "800",
      "line-height": "1.2",
      "letter-spacing": "0.18em",
      "text-transform": "uppercase",
      "margin": "0 0 8px 0"
    });

    setStyle(get("lbc_nps_title"), {
      "display": "block",
      "color": COLORS.ink,
      "font-size": productsPage ? "28px" : "27px",
      "font-weight": "800",
      "line-height": "1.14",
      "letter-spacing": "-0.035em",
      "margin": "0 0 10px 0"
    });

    setStyle(get("lbc_nps_subtitle"), {
      "display": "block",
      "color": COLORS.muted,
      "font-size": "13px",
      "font-weight": "400",
      "line-height": "1.45",
      "margin": productsPage ? "0" : "0 0 18px 0"
    });

    setStyle(get("lbc_nps_thanks_card"), {
      "display": productsPage ? "none" : "block",
      "padding": "15px 16px",
      "background": "#ecfdf3",
      "border": "1px solid #abe8c6",
      "border-radius": "18px",
      "color": COLORS.ink,
      "box-sizing": "border-box",
      "margin": "0"
    });

    setStyle(get("lbc_nps_thanks_card_title"), {
      "display": "block",
      "color": COLORS.ink,
      "font-size": "15px",
      "font-weight": "800",
      "line-height": "1.25",
      "margin": "0 0 7px 0"
    });

    setStyle(get("lbc_nps_thanks_card_text"), {
      "display": "block",
      "color": COLORS.muted,
      "font-size": "12px",
      "font-weight": "400",
      "line-height": "1.45",
      "margin": "0"
    });
  }

  function getOptionText(span) {
    var clone = span.cloneNode(true);
    Array.from(clone.querySelectorAll("input, .lbc-reco-card")).forEach(function (el) {
      el.remove();
    });
    return normalize(clone.textContent || "");
  }

  function styleFieldBlock(li) {
    if (!li || !isVisible(li)) return;

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
        "color": COLORS.blueDark,
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
  }

  function styleRecommendationCheckboxGroup(li) {
    if (!li || !isVisible(li)) return;

    styleFieldBlock(li);

    var label = li.querySelector("label.description, .description");
    if (label) {
      setStyle(label, { "display": "none" });
    }

    var optionsWrap = li.querySelector("div");

    if (optionsWrap) {
      setStyle(optionsWrap, {
        "display": "grid",
        "grid-template-columns": "1fr",
        "gap": "12px",
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

      var optionKey = normalizeLower(getOptionText(span));
      var data = RECOMMENDATIONS[optionKey] || {
        icon: "✓",
        title: getOptionText(span),
        description: "Opción recomendada según tu experiencia.",
        tags: ["Recomendada"],
        recommended: false
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

        var titleRow = document.createElement("div");
        titleRow.className = "lbc-reco-title-row";

        var title = document.createElement("div");
        title.className = "lbc-reco-title";
        title.textContent = data.title;

        titleRow.appendChild(title);

        if (data.recommended) {
          var badge = document.createElement("div");
          badge.className = "lbc-reco-main-badge";
          badge.textContent = "RECOMENDADA";
          titleRow.appendChild(badge);
        }

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

        content.appendChild(titleRow);
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
        "min-height": "112px",
        "height": "auto",
        "margin": "0",
        "padding": "14px",
        "background": "#ffffff",
        "background-color": "#ffffff",
        "background-image": "none",
        "border": data.recommended ? "1px solid #8fc2ff" : "1px solid #dbe7f6",
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

  function styleRecommendationCard(span) {
    var checkbox = span.querySelector("input[type='checkbox']");
    var card = span.querySelector(".lbc-reco-card");
    var icon = span.querySelector(".lbc-reco-icon");
    var content = span.querySelector(".lbc-reco-content");
    var titleRow = span.querySelector(".lbc-reco-title-row");
    var title = span.querySelector(".lbc-reco-title");
    var desc = span.querySelector(".lbc-reco-desc");
    var tags = span.querySelector(".lbc-reco-tags");
    var badge = span.querySelector(".lbc-reco-main-badge");

    if (checkbox) {
      checkbox.style.setProperty("accent-color", COLORS.blue, "important");

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
      "width": "48px",
      "height": "48px",
      "min-width": "48px",
      "border-radius": "14px",
      "display": "flex",
      "align-items": "center",
      "justify-content": "center",
      "background": COLORS.blueSoft,
      "color": COLORS.blue,
      "font-size": "22px",
      "line-height": "1"
    });

    setStyle(content, {
      "display": "block",
      "width": "100%",
      "min-width": "0",
      "background": "transparent",
      "background-color": "transparent",
      "background-image": "none"
    });

    setStyle(titleRow, {
      "display": "flex",
      "align-items": "center",
      "justify-content": "space-between",
      "gap": "8px",
      "width": "100%",
      "background": "transparent",
      "background-color": "transparent",
      "background-image": "none"
    });

    setStyle(title, {
      "color": COLORS.ink,
      "font-size": "15px",
      "font-weight": "800",
      "line-height": "1.2",
      "margin": "1px 0 6px 0"
    });

    setStyle(desc, {
      "color": COLORS.muted,
      "font-size": "12px",
      "font-weight": "400",
      "line-height": "1.35",
      "margin": "0 0 10px 0"
    });

    setStyle(tags, {
      "display": "flex",
      "flex-wrap": "wrap",
      "gap": "6px",
      "background": "transparent",
      "background-color": "transparent",
      "background-image": "none"
    });

    if (badge) {
      setStyle(badge, {
        "display": "inline-flex",
        "align-items": "center",
        "justify-content": "center",
        "height": "24px",
        "padding": "0 10px",
        "border-radius": "999px",
        "background": COLORS.blueSoft,
        "color": COLORS.blue,
        "font-size": "10px",
        "font-weight": "800",
        "line-height": "1",
        "letter-spacing": "0.04em",
        "white-space": "nowrap"
      });
    }

    Array.from(span.querySelectorAll(".lbc-reco-tag")).forEach(function (tag) {
      setStyle(tag, {
        "display": "inline-flex",
        "align-items": "center",
        "justify-content": "center",
        "height": "22px",
        "padding": "0 9px",
        "border-radius": "999px",
        "background": "#f3f4f6",
        "color": "#667085",
        "font-size": "10px",
        "font-weight": "600",
        "line-height": "1",
        "letter-spacing": "0.01em"
      });
    });
  }

  function styleStandardCheckboxGroup(li) {
    if (!li || !isVisible(li)) return;

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

  function bindCheckboxes(li) {
    Array.from(li.querySelectorAll("input[type='checkbox']")).forEach(function (checkbox) {
      checkbox.style.setProperty("accent-color", COLORS.blue, "important");

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
          forceWhiteBackgrounds(get(CONFIG.formId));

          setTimeout(function () {
            updateOptionState();
            forceWhiteBackgrounds(get(CONFIG.formId));
          }, 50);

          setTimeout(function () {
            updateOptionState();
            forceWhiteBackgrounds(get(CONFIG.formId));
          }, 150);
        });
      }
    });
  }

  function styleTextField(li) {
    if (!li || !isVisible(li)) return;

    styleFieldBlock(li);

    Array.from(li.querySelectorAll("input[type='text'], input[type='email'], input[type='tel'], textarea, select")).forEach(function (field) {
      setStyle(field, {
        "width": "100%",
        "height": "46px",
        "min-height": "46px",
        "background": "#ffffff",
        "background-color": "#ffffff",
        "background-image": "none",
        "color": COLORS.blueDark,
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
        "color": COLORS.muted,
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
    var form = get(CONFIG.formId);
    if (!form) return;

    Array.from(form.querySelectorAll("li")).forEach(function (li) {
      Array.from(li.querySelectorAll("span")).forEach(function (span) {
        var checkbox = span.querySelector("input[type='checkbox']");
        if (!checkbox) return;

        if (checkbox.checked) {
          span.classList.add("lbc-selected");

          setStyle(span, {
            "background": "#ffffff",
            "background-color": "#ffffff",
            "background-image": "none",
            "border-color": COLORS.blue,
            "color": COLORS.blue
          });
        } else {
          span.classList.remove("lbc-selected");

          if (li.id === CONFIG.recommendationLiId) {
            var optionKey = normalizeLower(getOptionText(span));
            var data = RECOMMENDATIONS[optionKey];

            setStyle(span, {
              "background": "#ffffff",
              "background-color": "#ffffff",
              "background-image": "none",
              "border-color": data && data.recommended ? "#8fc2ff" : "#dbe7f6",
              "color": "#475467"
            });
          } else {
            setStyle(span, {
              "background": "#ffffff",
              "background-color": "#ffffff",
              "background-image": "none",
              "border-color": "#dbe7f6",
              "color": "#475467"
            });
          }
        }
      });
    });
  }

  function styleBackLinks() {
    var form = get(CONFIG.formId);
    var formContainer = get(CONFIG.containerId);
    var scope = formContainer || form || document;

    Array.from(scope.querySelectorAll("a, button, input[type='button'], input[type='submit']")).forEach(function (el) {
      var text = normalizeLower(el.value || el.innerText || el.textContent || "");
      var id = normalizeLower(el.id || "");
      var name = normalizeLower(el.name || "");
      var href = normalizeLower(el.getAttribute ? el.getAttribute("href") : "");

      var isBack =
        text.indexOf("volver") !== -1 ||
        text.indexOf("anterior") !== -1 ||
        id.indexOf("previous") !== -1 ||
        id.indexOf("back") !== -1 ||
        name.indexOf("previous") !== -1 ||
        name.indexOf("back") !== -1 ||
        href.indexOf("previous") !== -1 ||
        href.indexOf("back") !== -1;

      if (!isBack) return;
      if (el.id === CONFIG.primaryNextId) return;
      if (el.id === CONFIG.submitId) return;

      if (el.tagName === "A") {
        el.innerHTML = "← Volver";
        el.removeAttribute("style");
      } else if ("value" in el) {
        el.value = "← Volver";
      } else {
        el.textContent = "← Volver";
      }

      setStyle(el, {
        "display": "inline-flex",
        "align-items": "center",
        "justify-content": "center",
        "width": "auto",
        "min-width": "118px",
        "max-width": "180px",
        "min-height": "38px",
        "margin": "14px auto 0 auto",
        "padding": "10px 16px",
        "background": "#f8fbff",
        "background-color": "#f8fbff",
        "background-image": "none",
        "color": COLORS.blueDark,
        "border": "1px solid #cfe1f7",
        "border-radius": "999px",
        "font-family": "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
        "font-size": "12px",
        "font-weight": "700",
        "line-height": "1.2",
        "text-align": "center",
        "text-decoration": "none",
        "box-shadow": "none",
        "text-shadow": "none",
        "box-sizing": "border-box",
        "cursor": "pointer",
        "float": "none",
        "clear": "both"
      });

      if (el.parentElement) {
        setStyle(el.parentElement, {
          "text-align": "center",
          "background": "transparent",
          "background-color": "transparent",
          "background-image": "none"
        });
      }
    });
  }

  function styleSubmit() {
    var li = get(CONFIG.buttonsLiId);
    var submit = get(CONFIG.submitId);
    var next = get(CONFIG.primaryNextId);
    var productsPage = isProductsPage();

    if (li) {
      setStyle(li, {
        "list-style": "none",
        "margin": productsPage ? "10px 0 0 0" : "0",
        "padding": "0",
        "width": "100%",
        "height": productsPage ? "auto" : "0",
        "background": "transparent",
        "background-color": "transparent",
        "background-image": "none",
        "border": "0",
        "box-shadow": "none",
        "box-sizing": "border-box"
      });
    }

    if (next && isVisible(next)) {
      next.value = productsPage ? CONFIG.submitText : CONFIG.nextText;

      var slot = get("lbc_product_context_cta_slot");
      if (!productsPage && slot && next.parentNode !== slot) {
        slot.appendChild(next);
      }

      setStyle(next, {
        "display": "block",
        "width": "100%",
        "height": "auto",
        "min-height": productsPage ? "46px" : "52px",
        "background": productsPage ? COLORS.blue : "#ffffff",
        "background-color": productsPage ? COLORS.blue : "#ffffff",
        "background-image": "none",
        "color": productsPage ? "#ffffff" : COLORS.blueDark,
        "border": "0",
        "border-radius": productsPage ? "14px" : "18px",
        "padding": productsPage ? "12px 16px" : "13px 16px",
        "font-family": "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
        "font-size": productsPage ? "14px" : "16px",
        "font-weight": "800",
        "line-height": "1.2",
        "text-align": "center",
        "box-shadow": productsPage ? "0 10px 20px rgba(0, 102, 179, 0.18)" : "none",
        "text-shadow": "none",
        "text-transform": "none",
        "cursor": "pointer",
        "box-sizing": "border-box"
      });
    }

    if (submit && isVisible(submit)) {
      submit.value = CONFIG.submitText;

      setStyle(submit, {
        "display": "block",
        "width": "100%",
        "height": "auto",
        "min-height": "46px",
        "background": COLORS.blue,
        "background-color": COLORS.blue,
        "background-image": "none",
        "color": "#ffffff",
        "border": "0",
        "border-radius": "14px",
        "padding": "12px 16px",
        "font-family": "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
        "font-size": "14px",
        "font-weight": "800",
        "line-height": "1.2",
        "text-align": "center",
        "box-shadow": "0 10px 20px rgba(0, 102, 179, 0.18)",
        "text-shadow": "none",
        "text-transform": "none",
        "cursor": "pointer",
        "box-sizing": "border-box"
      });
    }

    styleBackLinks();
  }

  function styleAllFields() {
    var recommendationLi = get(CONFIG.recommendationLiId);
    var contactLi = get(CONFIG.contactLiId);
    var phoneLi = get(CONFIG.phoneLiId);
    var emailLi = get(CONFIG.emailLiId);

    styleRecommendationCheckboxGroup(recommendationLi);
    styleStandardCheckboxGroup(contactLi);
    styleTextField(phoneLi);
    styleTextField(emailLi);
    configureBoliviaPhone();
    configureEmailField();
    updateOptionState();
  }

  function applyMobile() {
    if (window.innerWidth > 640) return;

    var formContainer = get(CONFIG.containerId);
    var form = get(CONFIG.formId);
    var productsPage = isProductsPage();

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
      "padding": productsPage ? "20px 18px 18px 18px" : "20px 18px 12px 18px"
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
      "font-size": productsPage ? "25px" : "24px"
    });

    setStyle(get("lbc_product_context_title"), {
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
    injectStyles();
    hideOriginalHeader(formContainer, form);
    hideOriginalContextBlock(form);
    createHeader(form);
    styleLayout(formContainer, form, ul);
    createProductContextCard(form);
    styleHeader();
    styleAllFields();
    styleSubmit();
    setTimeout(styleBackLinks, 100);
    setTimeout(styleBackLinks, 300);
    setTimeout(styleBackLinks, 700);
    forceWhiteBackgrounds(form);
    applyMobile();

    console.log("LBC NPS promotor v13 aplicado correctamente.");
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

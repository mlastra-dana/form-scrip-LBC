(function () {
  var attempts = 0;
  var maxAttempts = 120;

  var CONFIG = {
    formId: "form_8568",
    containerId: "form_container",
    logoUrl: "https://cmslbc.lbc.bo/uploads/logo-lbc-seguros-2026.svg",

    questionOneLiId: "li_1",
    questionTwoLiId: "li_7",

    buttonsLiId: "li_buttons",
    primaryButtonId: "submit_primary",

    page1ButtonText: "Enviar respuestas",
    page2ButtonText: "Quiero conocerlas",
    page3ButtonText: "Enviar",

    page1Eyebrow: "Encuesta de experiencia",
    page1Title: "Ayúdanos a mejorar tu experiencia.",
    page1Subtitle: "Queremos saber qué aspecto podríamos fortalecer para que tu experiencia con LBC Seguros sea excelente.",
    page1CardTitle: "Tu opinión nos ayuda a seguir mejorando.",
    page1CardText: "Selecciona el aspecto que más influyó en tu experiencia.",

    page2Title: "Gracias por tus respuestas.",
    page2Subtitle: "Tu feedback ya fue registrado.",
    page2ContextEyebrow: "Si quieres continuar",
    page2ContextTitle: "Encontramos 2 opciones que podrían interesarte.",
    page2ContextText: "Son alternativas simples y cercanas a lo que nos dijiste que valoras.",

    page3Eyebrow: "Opciones personalizadas",
    page3Title: "2 opciones simples para ti",
    page3Subtitle: "Sólo mostramos dos alternativas de baja fricción.",

    productInterestValue: "Sí",
    productInterestTerms: [
      "interés en productos",
      "interes en productos",
      "interés en producto",
      "interes en producto"
    ]
  };

  var COLORS = {
    blue: "#0066b3",
    blueDark: "#123d73",
    blueSoft: "#eaf4ff",
    ink: "#111827",
    muted: "#5f6f89",
    border: "#dbe7f6"
  };

  var RECOMMENDATIONS = {
    "revisar mi cobertura actual": {
      icon: "🛡️",
      title: "Revisar mi cobertura actual",
      description: "Conoce una opción simple para mejorar tu protección actual.",
      tags: ["Mismo producto", "Recomendada"],
      recommended: true
    },
    "accidentes personales": {
      icon: "🩹",
      title: "Accidentes Personales",
      description: "Una cobertura complementaria sencilla para imprevistos.",
      tags: ["Complementario"],
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

  function getPageNumber() {
    var page = document.querySelector("#" + CONFIG.formId + " input[name='page_number']");
    return page ? String(page.value || "").trim() : "";
  }

  function getFormText() {
    var form = get(CONFIG.formId);
    return normalizeLower(form ? form.innerText || form.textContent || "" : "");
  }

  function isPage1() {
    var page = getPageNumber();

    if (page) {
      return page === "1";
    }

    return isVisible(get(CONFIG.questionOneLiId)) || isVisible(get(CONFIG.questionTwoLiId));
  }

  function isPage2() {
    var page = getPageNumber();

    if (page) {
      return page === "2";
    }

    var text = getFormText();

    return (
      text.indexOf("gracias por tus respuestas") !== -1 &&
      text.indexOf("quiero conocerlas") !== -1
    );
  }

  function isPage3() {
    var page = getPageNumber();

    if (page) {
      return page === "3";
    }

    var text = getFormText();

    return (
      text.indexOf("canal preferido de contacto") !== -1 ||
      text.indexOf("teléfono") !== -1 ||
      text.indexOf("telefono") !== -1 ||
      text.indexOf("interés en productos") !== -1 ||
      text.indexOf("interes en productos") !== -1
    );
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
    if (document.getElementById("lbc_nps_pasivo_v12_styles")) return;

    var style = document.createElement("style");
    style.id = "lbc_nps_pasivo_v12_styles";

    style.textContent =
      "#form_8568 li,#form_8568 li:hover,#form_8568 li:focus,#form_8568 li:active,#form_8568 li.highlighted,#form_8568 li.selected,#form_8568 li.focused,#form_8568 li:focus-within{" +
      "background:#ffffff!important;background-color:#ffffff!important;background-image:none!important;box-shadow:none!important;" +
      "}" +

      "#form_8568 li>div,#form_8568 li>div:hover,#form_8568 li>div:focus,#form_8568 li>div:active,#form_8568 li:focus-within>div{" +
      "background:#ffffff!important;background-color:#ffffff!important;background-image:none!important;box-shadow:none!important;" +
      "}" +

      "#form_8568 li.checkboxes span{" +
      "background:#ffffff!important;background-color:#ffffff!important;background-image:none!important;box-shadow:none!important;" +
      "}" +

      "#form_8568 li.checkboxes span.lbc-selected{" +
      "background:#ffffff!important;background-color:#ffffff!important;border-color:" + COLORS.blue + "!important;color:" + COLORS.blue + "!important;" +
      "}" +

      "#form_8568 input[type='text'],#form_8568 input[type='text']:hover,#form_8568 input[type='text']:focus,#form_8568 input[type='email'],#form_8568 input[type='email']:hover,#form_8568 input[type='email']:focus,#form_8568 input[type='tel'],#form_8568 input[type='tel']:hover,#form_8568 input[type='tel']:focus,#form_8568 textarea,#form_8568 textarea:hover,#form_8568 textarea:focus,#form_8568 select,#form_8568 select:hover,#form_8568 select:focus{" +
      "background:#ffffff!important;background-color:#ffffff!important;background-image:none!important;box-shadow:none!important;" +
      "}" +

      "#form_8568 a[href*='previous'],#form_8568 a[href*='back'],#form_8568 a[id*='previous'],#form_8568 a[id*='back'],#form_8568 input[id*='previous'],#form_8568 input[id*='back'],#form_8568 button[id*='previous'],#form_8568 button[id*='back']{" +
      "display:inline-flex!important;align-items:center!important;justify-content:center!important;width:auto!important;min-width:118px!important;max-width:180px!important;min-height:38px!important;margin:14px auto 0 auto!important;padding:10px 16px!important;background:#f8fbff!important;background-color:#f8fbff!important;background-image:none!important;color:" + COLORS.blueDark + "!important;border:1px solid #cfe1f7!important;border-radius:999px!important;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif!important;font-size:12px!important;font-weight:700!important;line-height:1.2!important;text-align:center!important;text-decoration:none!important;box-shadow:none!important;text-shadow:none!important;box-sizing:border-box!important;cursor:pointer!important;float:none!important;clear:both!important;" +
      "}";

    document.head.appendChild(style);
  }

  function forceWhiteBackgrounds(form) {
    if (!form) return;

    Array.from(form.querySelectorAll("li")).forEach(function (li) {
      if (li.id === "lbc_pasivo_context_li") return;
      if (li.getAttribute("data-lbc-hidden-interest") === "true") return;

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

  function createHeader(form) {
    if (get("lbc_nps_header")) return;

    var header = document.createElement("div");
    header.id = "lbc_nps_header";

    var logoArea = document.createElement("div");
    logoArea.id = "lbc_nps_logo_area";

    var logo = document.createElement("img");
    logo.id = "lbc_nps_logo";
    logo.src = CONFIG.logoUrl;
    logo.alt = "LBC Seguros";

    var icon = document.createElement("div");
    icon.id = "lbc_nps_icon";

    var eyebrow = document.createElement("div");
    eyebrow.id = "lbc_nps_eyebrow";

    var title = document.createElement("div");
    title.id = "lbc_nps_title";

    var subtitle = document.createElement("div");
    subtitle.id = "lbc_nps_subtitle";

    var card = document.createElement("div");
    card.id = "lbc_nps_info_card";

    var cardTitle = document.createElement("strong");
    cardTitle.id = "lbc_nps_info_card_title";

    var cardText = document.createElement("span");
    cardText.id = "lbc_nps_info_card_text";

    card.appendChild(cardTitle);
    card.appendChild(cardText);

    logoArea.appendChild(logo);
    header.appendChild(logoArea);
    header.appendChild(icon);
    header.appendChild(eyebrow);
    header.appendChild(title);
    header.appendChild(subtitle);
    header.appendChild(card);

    form.insertBefore(header, form.firstChild);
  }

  function hideOriginalTexts(formContainer, form) {
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
        text.indexOf("encuesta de experiencia") !== -1 ||
        text.indexOf("ayúdanos a mejorar") !== -1 ||
        text.indexOf("ayudanos a mejorar") !== -1 ||
        text.indexOf("queremos saber qué aspecto") !== -1 ||
        text.indexOf("queremos saber que aspecto") !== -1 ||
        text.indexOf("tu opinión nos ayuda") !== -1 ||
        text.indexOf("tu opinion nos ayuda") !== -1 ||
        text.indexOf("selecciona el aspecto") !== -1 ||
        text.indexOf("gracias por tus respuestas") !== -1 ||
        text.indexOf("tu feedback ya fue registrado") !== -1 ||
        text.indexOf("si quieres continuar") !== -1 ||
        text.indexOf("encontramos 2 opciones") !== -1 ||
        text.indexOf("son alternativas simples") !== -1 ||
        text.indexOf("opciones personalizadas") !== -1 ||
        text.indexOf("2 opciones simples") !== -1 ||
        text.indexOf("sólo mostramos") !== -1 ||
        text.indexOf("solo mostramos") !== -1 ||
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

  function hideOriginalPage2Text(form) {
    if (!isPage2()) return;

    Array.from(form.querySelectorAll("li, div, section")).forEach(function (el) {
      if (el.id && el.id.indexOf("lbc_") === 0) return;
      if (el.className && String(el.className).indexOf("lbc-") !== -1) return;
      if (el.id === CONFIG.buttonsLiId) return;
      if (el.querySelector && el.querySelector("input[type='submit'], button")) return;

      var text = normalizeLower(el.innerText || el.textContent || "");

      if (
        text.indexOf("gracias por tus respuestas") !== -1 ||
        text.indexOf("tu feedback ya fue registrado") !== -1 ||
        text.indexOf("si quieres continuar") !== -1 ||
        text.indexOf("encontramos 2 opciones") !== -1 ||
        text.indexOf("son alternativas simples") !== -1
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
    var p1 = isPage1();
    var p2 = isPage2();
    var p3 = isPage3();

    setStyle(get("lbc_nps_header"), {
      "margin": "0 -22px 18px -22px",
      "padding": p3 ? "24px 22px 18px 22px" : "24px 22px 22px 22px",
      "background": "linear-gradient(180deg, #ffffff 0%, #f7faff 100%)",
      "border-bottom": p3 ? "1px solid #dbe7f6" : "0",
      "display": "block"
    });

    setStyle(get("lbc_nps_logo_area"), {
      "display": "flex",
      "align-items": "center",
      "justify-content": "center",
      "width": "100%",
      "height": "64px",
      "margin": "0 0 20px 0",
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

    if (p1) {
      get("lbc_nps_icon").textContent = "";
      get("lbc_nps_eyebrow").textContent = CONFIG.page1Eyebrow;
      get("lbc_nps_title").textContent = CONFIG.page1Title;
      get("lbc_nps_subtitle").textContent = CONFIG.page1Subtitle;
      get("lbc_nps_info_card_title").textContent = CONFIG.page1CardTitle;
      get("lbc_nps_info_card_text").textContent = CONFIG.page1CardText;
    }

    if (p2) {
      get("lbc_nps_icon").textContent = "✓";
      get("lbc_nps_eyebrow").textContent = "";
      get("lbc_nps_title").textContent = CONFIG.page2Title;
      get("lbc_nps_subtitle").textContent = CONFIG.page2Subtitle;
      get("lbc_nps_info_card_title").textContent = "";
      get("lbc_nps_info_card_text").textContent = "";
    }

    if (p3) {
      get("lbc_nps_icon").textContent = "";
      get("lbc_nps_eyebrow").textContent = CONFIG.page3Eyebrow;
      get("lbc_nps_title").textContent = CONFIG.page3Title;
      get("lbc_nps_subtitle").textContent = CONFIG.page3Subtitle;
      get("lbc_nps_info_card_title").textContent = "";
      get("lbc_nps_info_card_text").textContent = "";
    }

    setStyle(get("lbc_nps_icon"), {
      "display": p2 ? "flex" : "none",
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

    setStyle(get("lbc_nps_eyebrow"), {
      "display": p1 || p3 ? "block" : "none",
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
      "font-size": p3 ? "28px" : "27px",
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
      "margin": p1 ? "0 0 18px 0" : "0"
    });

    setStyle(get("lbc_nps_info_card"), {
      "display": p1 ? "block" : "none",
      "padding": "15px 16px",
      "background": COLORS.blueSoft,
      "border": "1px solid #c9def7",
      "border-left": "4px solid " + COLORS.blue,
      "border-radius": "18px",
      "color": COLORS.ink,
      "box-sizing": "border-box",
      "margin": "0"
    });

    setStyle(get("lbc_nps_info_card_title"), {
      "display": "block",
      "color": COLORS.blueDark,
      "font-size": "15px",
      "font-weight": "800",
      "line-height": "1.25",
      "margin": "0 0 7px 0"
    });

    setStyle(get("lbc_nps_info_card_text"), {
      "display": "block",
      "color": COLORS.muted,
      "font-size": "12px",
      "font-weight": "400",
      "line-height": "1.45",
      "margin": "0"
    });
  }

  function createPage2ContextCard(form) {
    if (!isPage2()) return;

    var ul = form.querySelector("ul");
    var buttonsLi = get(CONFIG.buttonsLiId);

    if (!ul || !buttonsLi) return;

    var contextLi = get("lbc_pasivo_context_li");

    if (!contextLi) {
      contextLi = document.createElement("li");
      contextLi.id = "lbc_pasivo_context_li";

      var card = document.createElement("div");
      card.id = "lbc_pasivo_context_card";

      var eyebrow = document.createElement("div");
      eyebrow.id = "lbc_pasivo_context_eyebrow";
      eyebrow.textContent = CONFIG.page2ContextEyebrow;

      var title = document.createElement("div");
      title.id = "lbc_pasivo_context_title";
      title.textContent = CONFIG.page2ContextTitle;

      var text = document.createElement("div");
      text.id = "lbc_pasivo_context_text";
      text.textContent = CONFIG.page2ContextText;

      var slot = document.createElement("div");
      slot.id = "lbc_pasivo_context_cta_slot";

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

    setStyle(get("lbc_pasivo_context_card"), {
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

    setStyle(get("lbc_pasivo_context_eyebrow"), {
      "display": "block",
      "color": "#d9ecff",
      "font-size": "12px",
      "font-weight": "700",
      "line-height": "1.2",
      "letter-spacing": "0.08em",
      "text-transform": "uppercase",
      "margin": "0 0 10px 0"
    });

    setStyle(get("lbc_pasivo_context_title"), {
      "display": "block",
      "color": "#ffffff",
      "font-size": "24px",
      "font-weight": "800",
      "line-height": "1.18",
      "letter-spacing": "-0.035em",
      "margin": "0 0 12px 0"
    });

    setStyle(get("lbc_pasivo_context_text"), {
      "display": "block",
      "color": "#eef7ff",
      "font-size": "13px",
      "font-weight": "400",
      "line-height": "1.42",
      "margin": "0 0 18px 0"
    });

    setStyle(get("lbc_pasivo_context_cta_slot"), {
      "display": "block",
      "width": "100%",
      "margin": "0",
      "padding": "0",
      "background": "transparent",
      "background-color": "transparent",
      "background-image": "none"
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

  function styleStandardCheckboxGroup(li) {
    if (!li || !isVisible(li)) return;

    styleFieldBlock(li);

    var wrap = li.querySelector("div");

    if (wrap) {
      setStyle(wrap, {
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
    if (!li || !isVisible(li)) return;

    styleFieldBlock(li);

    var label = li.querySelector("label.description, .description");

    if (label) {
      label.innerHTML = "Encontramos 2 opciones que podrían interesarte.";

      setStyle(label, {
        "display": "block",
        "color": COLORS.blueDark,
        "font-size": "21px",
        "font-weight": "800",
        "line-height": "1.18",
        "letter-spacing": "-0.035em",
        "margin": "0 0 14px 0",
        "padding": "0",
        "background": "#ffffff",
        "background-color": "#ffffff",
        "background-image": "none"
      });
    }

    var wrap = li.querySelector("div");

    if (wrap) {
      setStyle(wrap, {
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

  function bindCheckboxes(li) {
    if (!li) return;

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

          var optionKey = normalizeLower(getOptionText(span));
          var data = RECOMMENDATIONS[optionKey];

          setStyle(span, {
            "background": "#ffffff",
            "background-color": "#ffffff",
            "background-image": "none",
            "border-color": data && data.recommended ? "#8fc2ff" : "#dbe7f6",
            "color": "#475467"
          });
        }
      });
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
    var form = get(CONFIG.formId);
    if (!form) return;

    Array.from(form.querySelectorAll("input[type='text'], input[type='tel']")).forEach(function (input) {
      var li = input.closest ? input.closest("li") : null;
      var labelText = normalizeLower(li ? li.innerText || li.textContent || "" : "");

      if (labelText.indexOf("teléfono") === -1 && labelText.indexOf("telefono") === -1) return;

      input.setAttribute("type", "text");
      input.setAttribute("inputmode", "numeric");
      input.setAttribute("maxlength", "8");
      input.setAttribute("autocomplete", "tel");
      input.setAttribute("placeholder", "Ej: 71234567");
      input.setAttribute("pattern", "[0-9]{8}");

      if (!input.getAttribute("data-lbc-phone-bound")) {
        input.setAttribute("data-lbc-phone-bound", "true");

        input.addEventListener("input", function () {
          input.value = onlyDigits(input.value).slice(0, 8);
        });
      }

      var hintId = "lbc_phone_hint_" + (input.id || input.name || "field");
      var existing = get(hintId);

      if (!existing && li) {
        var hint = document.createElement("div");
        hint.id = hintId;
        hint.textContent = "Ingresa un número de Bolivia de 8 dígitos. Ejemplo: 71234567.";
        li.appendChild(hint);

        setStyle(hint, {
          "color": COLORS.muted,
          "font-size": "11px",
          "font-weight": "400",
          "line-height": "1.35",
          "margin": "6px 0 0 0",
          "padding": "0"
        });
      }
    });
  }

  function configureEmailField() {
    var form = get(CONFIG.formId);
    if (!form) return;

    Array.from(form.querySelectorAll("input[type='text'], input[type='email']")).forEach(function (input) {
      var li = input.closest ? input.closest("li") : null;
      var labelText = normalizeLower(li ? li.innerText || li.textContent || "" : "");

      if (labelText.indexOf("email") === -1 && labelText.indexOf("correo") === -1) return;

      input.setAttribute("type", "email");
      input.setAttribute("autocomplete", "email");
      input.setAttribute("placeholder", "Ej: nombre@correo.com");
    });
  }

  function findProductInterestField() {
    var form = get(CONFIG.formId);
    if (!form) return null;

    var fields = Array.from(form.querySelectorAll("input[type='text'], input[type='hidden'], textarea, select"));

    for (var i = 0; i < fields.length; i += 1) {
      var field = fields[i];

      if (
        field.name === "form_id" ||
        field.name === "dana_code" ||
        field.name === "hashcode" ||
        field.name === "submit_form" ||
        field.name === "page_number"
      ) {
        continue;
      }

      var li = field.closest ? field.closest("li") : null;
      var liText = normalizeLower(li ? li.innerText || li.textContent || "" : "");
      var fieldMeta = normalizeLower((field.id || "") + " " + (field.name || "") + " " + (field.placeholder || ""));

      for (var j = 0; j < CONFIG.productInterestTerms.length; j += 1) {
        var term = CONFIG.productInterestTerms[j];

        if (liText.indexOf(term) !== -1 || fieldMeta.indexOf(term) !== -1) {
          return field;
        }
      }
    }

    return null;
  }

  function setProductInterestValue() {
    var field = findProductInterestField();

    try {
      sessionStorage.setItem("lbc_pasivo_interes_productos", CONFIG.productInterestValue);
    } catch (e) {}

    if (!field) return false;

    field.value = CONFIG.productInterestValue;
    field.setAttribute("value", CONFIG.productInterestValue);

    try {
      field.dispatchEvent(new Event("input", { bubbles: true }));
      field.dispatchEvent(new Event("change", { bubbles: true }));
    } catch (e) {}

    return true;
  }

  function restoreProductInterestValue() {
    var field = findProductInterestField();
    if (!field) return;

    var stored = "";

    try {
      stored = sessionStorage.getItem("lbc_pasivo_interes_productos") || "";
    } catch (e) {}

    if (!stored) return;

    field.value = stored;
    field.setAttribute("value", stored);

    try {
      field.dispatchEvent(new Event("input", { bubbles: true }));
      field.dispatchEvent(new Event("change", { bubbles: true }));
    } catch (e) {}
  }

  function hideProductInterestField() {
    var field = findProductInterestField();
    if (!field) return;

    var li = field.closest ? field.closest("li") : null;

    if (li) {
      li.setAttribute("data-lbc-hidden-interest", "true");

      setStyle(li, {
        "display": "none",
        "height": "0",
        "margin": "0",
        "padding": "0",
        "overflow": "hidden",
        "visibility": "hidden"
      });
    } else {
      setStyle(field, {
        "display": "none",
        "height": "0",
        "margin": "0",
        "padding": "0",
        "overflow": "hidden",
        "visibility": "hidden"
      });
    }
  }

  function bindProductInterestClick() {
    var form = get(CONFIG.formId);
    var button = get(CONFIG.primaryButtonId);

    if (!form || !button) return;

    hideProductInterestField();
    restoreProductInterestValue();

    if (!button.getAttribute("data-lbc-interest-bound")) {
      button.setAttribute("data-lbc-interest-bound", "true");

      button.addEventListener("mousedown", function () {
        if (isPage2()) setProductInterestValue();
      }, true);

      button.addEventListener("touchstart", function () {
        if (isPage2()) setProductInterestValue();
      }, true);

      button.addEventListener("click", function () {
        if (isPage2()) setProductInterestValue();
      }, true);
    }

    if (!form.getAttribute("data-lbc-interest-submit-bound")) {
      form.setAttribute("data-lbc-interest-submit-bound", "true");

      form.addEventListener("submit", function () {
        if (isPage2()) {
          setProductInterestValue();
        }

        if (isPage3()) {
          restoreProductInterestValue();
        }
      }, true);
    }
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
      if (el.id === CONFIG.primaryButtonId) return;

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
    var button = get(CONFIG.primaryButtonId);

    var p1 = isPage1();
    var p2 = isPage2();
    var p3 = isPage3();

    if (li) {
      setStyle(li, {
        "list-style": "none",
        "margin": p2 ? "0" : "10px 0 0 0",
        "padding": "0",
        "width": "100%",
        "height": "auto",
        "background": "transparent",
        "background-color": "transparent",
        "background-image": "none",
        "border": "0",
        "box-shadow": "none",
        "box-sizing": "border-box"
      });
    }

    if (button && isVisible(button)) {
      if (p1) button.value = CONFIG.page1ButtonText;
      if (p2) button.value = CONFIG.page2ButtonText;
      if (p3) button.value = CONFIG.page3ButtonText;

      var slot = get("lbc_pasivo_context_cta_slot");

      if (p2 && slot && button.parentNode !== slot) {
        slot.appendChild(button);
      }

      setStyle(button, {
        "display": "block",
        "width": "100%",
        "height": "auto",
        "min-height": p2 ? "52px" : "46px",
        "background": p2 ? "#ffffff" : COLORS.blue,
        "background-color": p2 ? "#ffffff" : COLORS.blue,
        "background-image": "none",
        "color": p2 ? COLORS.blueDark : "#ffffff",
        "border": "0",
        "border-radius": p2 ? "18px" : "14px",
        "padding": p2 ? "13px 16px" : "12px 16px",
        "font-family": "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
        "font-size": p2 ? "16px" : "14px",
        "font-weight": "800",
        "line-height": "1.2",
        "text-align": "center",
        "box-shadow": p2 ? "none" : "0 10px 20px rgba(0, 102, 179, 0.18)",
        "text-shadow": "none",
        "text-transform": "none",
        "cursor": "pointer",
        "box-sizing": "border-box"
      });
    }

    styleBackLinks();
    bindProductInterestClick();
  }

  function findRecommendationLi() {
    var form = get(CONFIG.formId);
    if (!form) return null;

    var candidates = Array.from(form.querySelectorAll("li.checkboxes"));

    for (var i = 0; i < candidates.length; i += 1) {
      var text = normalizeLower(candidates[i].innerText || candidates[i].textContent || "");

      if (
        text.indexOf("revisar mi cobertura actual") !== -1 ||
        text.indexOf("accidentes personales") !== -1
      ) {
        return candidates[i];
      }
    }

    return null;
  }

  function findContactLi() {
    var form = get(CONFIG.formId);
    if (!form) return null;

    var candidates = Array.from(form.querySelectorAll("li.checkboxes"));

    for (var i = 0; i < candidates.length; i += 1) {
      var text = normalizeLower(candidates[i].innerText || candidates[i].textContent || "");

      if (
        text.indexOf("canal preferido de contacto") !== -1 ||
        (
          text.indexOf("whatsapp") !== -1 &&
          text.indexOf("llamada") !== -1 &&
          text.indexOf("email") !== -1
        )
      ) {
        return candidates[i];
      }
    }

    return null;
  }

  function styleAllFields() {
    var form = get(CONFIG.formId);
    if (!form) return;

    if (isPage1()) {
      styleStandardCheckboxGroup(get(CONFIG.questionOneLiId));
      styleStandardCheckboxGroup(get(CONFIG.questionTwoLiId));
    }

    if (isPage2()) {
      createPage2ContextCard(form);
      hideOriginalPage2Text(form);
    }

    if (isPage3()) {
      styleRecommendationCheckboxGroup(findRecommendationLi());
      styleStandardCheckboxGroup(findContactLi());

      Array.from(form.querySelectorAll("li")).forEach(function (li) {
        var text = normalizeLower(li.innerText || li.textContent || "");

        if (
          text.indexOf("teléfono") !== -1 ||
          text.indexOf("telefono") !== -1 ||
          text.indexOf("email") !== -1 ||
          text.indexOf("correo") !== -1
        ) {
          styleTextField(li);
        }
      });

      configureBoliviaPhone();
      configureEmailField();
      restoreProductInterestValue();
    }

    hideProductInterestField();
    updateOptionState();
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
      "padding": isPage3() ? "20px 18px 18px 18px" : "20px 18px 22px 18px"
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
      "font-size": isPage3() ? "25px" : "24px"
    });

    setStyle(get("lbc_pasivo_context_title"), {
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
    createHeader(form);
    hideOriginalTexts(formContainer, form);
    styleLayout(formContainer, form, ul);
    styleHeader();
    styleAllFields();
    styleSubmit();
    bindProductInterestClick();
    forceWhiteBackgrounds(form);
    applyMobile();

    setTimeout(function () {
      styleHeader();
      styleAllFields();
      styleSubmit();
      forceWhiteBackgrounds(form);
      applyMobile();
    }, 100);

    setTimeout(function () {
      styleHeader();
      styleAllFields();
      styleSubmit();
      forceWhiteBackgrounds(form);
      applyMobile();
    }, 300);

    setTimeout(function () {
      styleHeader();
      styleAllFields();
      styleSubmit();
      forceWhiteBackgrounds(form);
      applyMobile();
    }, 700);

    console.log("LBC NPS pasivo v12 aplicado correctamente.");
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

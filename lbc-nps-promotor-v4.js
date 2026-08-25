(function () {
  var attempts = 0;
  var maxAttempts = 120;

  var CONFIG = {
    formId: "form_8567",
    containerId: "form_container",
    brand: "LBC Seguros",
    logoUrl: "https://cmslbc.lbc.bo/uploads/logo-lbc-seguros-2026.svg",
    eyebrow: "Encuesta de experiencia",
    title: "Gracias por valorar tu experiencia con LBC Seguros.",
    subtitle: "Nos alegra saber que tu experiencia fue positiva. También podemos acompañarte con nuevas opciones de protección.",
    introCardTitle: "Tu opinión nos ayuda a seguir mejorando.",
    introCardText: "Cuéntanos qué valoraste más y, si deseas, indícanos qué tipo de protección te gustaría conocer.",
    valueLiId: "li_4",
    interestLiId: "li_7",
    productLiId: "li_8",
    contactLiId: "li_9",
    phoneLiId: "li_10",
    phoneInputId: "element_10",
    emailLiId: "li_11",
    emailInputId: "element_11",
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

  function injectAntiGrayStyles() {
    if (document.getElementById("lbc_nps_promotor_antigray_v4")) return;

    var style = document.createElement("style");
    style.id = "lbc_nps_promotor_antigray_v4";
    style.textContent =
      "#form_8567 li.checkboxes," +
      "#form_8567 li.checkboxes:hover," +
      "#form_8567 li.checkboxes:focus," +
      "#form_8567 li.checkboxes:active," +
      "#form_8567 li.checkboxes.highlighted," +
      "#form_8567 li.checkboxes.selected," +
      "#form_8567 li.checkboxes.focused," +
      "#form_8567 li.dropdown," +
      "#form_8567 li.dropdown:hover," +
      "#form_8567 li.dropdown:focus," +
      "#form_8567 li.dropdown:active," +
      "#form_8567 li.dropdown.highlighted," +
      "#form_8567 li.dropdown.selected," +
      "#form_8567 li.dropdown.focused{" +
      "background:transparent!important;" +
      "background-color:transparent!important;" +
      "background-image:none!important;" +
      "box-shadow:none!important;" +
      "}" +

      "#form_8567 li.checkboxes>div," +
      "#form_8567 li.checkboxes>div:hover," +
      "#form_8567 li.checkboxes>div:focus," +
      "#form_8567 li.checkboxes>div:active," +
      "#form_8567 li.dropdown>div," +
      "#form_8567 li.dropdown>div:hover," +
      "#form_8567 li.dropdown>div:focus," +
      "#form_8567 li.dropdown>div:active{" +
      "background:transparent!important;" +
      "background-color:transparent!important;" +
      "background-image:none!important;" +
      "box-shadow:none!important;" +
      "}" +

      "#form_8567 li.checkboxes span{" +
      "background-image:none!important;" +
      "box-shadow:none!important;" +
      "}" +

      "#form_8567 li.checkboxes span.lbc-selected{" +
      "background:#eef5ff!important;" +
      "background-color:#eef5ff!important;" +
      "border-color:#8bbce8!important;" +
      "color:#005baa!important;" +
      "}" +

      "#form_8567 li.checkboxes span:not(.lbc-selected){" +
      "background:#ffffff!important;" +
      "background-color:#ffffff!important;" +
      "border-color:#dbe7f6!important;" +
      "color:#475467!important;" +
      "}";

    document.head.appendChild(style);
  }

  function cleanDanaGrayBackgrounds() {
    [CONFIG.valueLiId, CONFIG.productLiId, CONFIG.contactLiId].forEach(function (id) {
      var li = get(id);
      if (!li) return;

      setStyle(li, {
        "background": "transparent",
        "background-color": "transparent",
        "background-image": "none",
        "box-shadow": "none"
      });

      Array.from(li.querySelectorAll("div")).forEach(function (div) {
        setStyle(div, {
          "background": "transparent",
          "background-color": "transparent",
          "background-image": "none",
          "box-shadow": "none"
        });
      });
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
      setStyle(logo, {
        "display": "none"
      });
      setStyle(fallback, {
        "display": "block"
      });
    };

    logo.onload = function () {
      setStyle(fallback, {
        "display": "none"
      });
      setStyle(logo, {
        "display": "block"
      });
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
      "width": "100%",
      "background": "transparent",
      "background-color": "transparent",
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
      "background": "transparent",
      "background-color": "transparent",
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
        "background": "transparent",
        "background-color": "transparent",
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

  function styleCheckboxGroup(li) {
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
        "background": "transparent",
        "background-color": "transparent",
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
          cleanDanaGrayBackgrounds();

          setTimeout(function () {
            updateOptionState();
            cleanDanaGrayBackgrounds();
          }, 50);

          setTimeout(function () {
            updateOptionState();
            cleanDanaGrayBackgrounds();
          }, 150);

          setTimeout(function () {
            updateOptionState();
            cleanDanaGrayBackgrounds();
          }, 300);
        });
      }
    });
  }

  function styleSelectField(li) {
    if (!li || isHiddenByPlatform(li)) return;

    styleFieldBlock(li);

    Array.from(li.querySelectorAll("select")).forEach(function (select) {
      setStyle(select, {
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
        "line-height": "22px",
        "padding": "10px 12px",
        "box-sizing": "border-box",
        "cursor": "pointer"
      });
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
        var value = onlyDigits(phone.value).slice(0, 8);
        phone.value = value;
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
    [CONFIG.valueLiId, CONFIG.productLiId, CONFIG.contactLiId].forEach(function (id) {
      var li = get(id);
      if (!li || isHiddenByPlatform(li)) return;

      setStyle(li, {
        "background": "transparent",
        "background-color": "transparent",
        "background-image": "none",
        "box-shadow": "none"
      });

      Array.from(li.querySelectorAll("div")).forEach(function (div) {
        setStyle(div, {
          "background": "transparent",
          "background-color": "transparent",
          "background-image": "none",
          "box-shadow": "none"
        });
      });

      Array.from(li.querySelectorAll("span")).forEach(function (span) {
        var checkbox = span.querySelector("input[type='checkbox']");
        if (!checkbox) return;

        if (checkbox.checked) {
          span.classList.add("lbc-selected");
          setStyle(span, {
            "background": "#eef5ff",
            "background-color": "#eef5ff",
            "background-image": "none",
            "border-color": "#8bbce8",
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
        "background": "transparent",
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
    styleCheckboxGroup(get(CONFIG.valueLiId));
    styleSelectField(get(CONFIG.interestLiId));
    styleCheckboxGroup(get(CONFIG.productLiId));
    styleCheckboxGroup(get(CONFIG.contactLiId));
    styleTextField(get(CONFIG.phoneLiId));
    styleTextField(get(CONFIG.emailLiId));
    configureBoliviaPhone();
    configureEmailField();
    updateOptionState();
    cleanDanaGrayBackgrounds();
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
    injectAntiGrayStyles();
    hideOriginalHeader(formContainer, form);
    createHeader(form);
    styleLayout(formContainer, form, ul);
    styleHeader();
    styleAllFields();
    styleSubmit();
    applyMobile();

    console.log("LBC NPS promotor v4 aplicado correctamente.");
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

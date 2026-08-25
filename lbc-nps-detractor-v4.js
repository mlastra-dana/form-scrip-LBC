(function () {
  var attempts = 0;
  var maxAttempts = 120;

  var CONFIG = {
    formId: "form_8569",
    containerId: "form_container",
    brand: "LBC Seguros",
    logoUrl: "https://cmslbc.lbc.bo/uploads/logo-lbc-seguros-2026.svg",
    eyebrow: "Encuesta de experiencia",
    title: "Gracias por contarnos tu experiencia.",
    subtitle: "Queremos entender qué podemos mejorar para brindarte una atención más clara, simple y cercana.",
    introCardTitle: "Tu opinión nos ayuda a mejorar.",
    introCardText: "Selecciona una o varias opciones y envía tu respuesta. En este flujo no mostraremos ofertas comerciales.",
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
      margin: "0",
      padding: "0",
      background: "linear-gradient(180deg, #ffffff 0%, #f3f7fc 100%)"
    });

    setStyle(document.body, {
      margin: "0",
      padding: "0",
      minHeight: "100vh",
      background: "linear-gradient(180deg, #ffffff 0%, #f3f7fc 100%)",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
      color: "#173b6c"
    });
  }

  function hideOriginalHeader(formContainer, form) {
    Array.from(formContainer.children).forEach(function (child) {
      if (child === form || child.id === "lbc_nps_header") return;

      var text = normalize(child.innerText || child.textContent || "");
      var hasField = child.querySelector && child.querySelector("input, select, textarea, button");

      if (!hasField || text.indexOf("la boliviana ciacruz") !== -1) {
        setStyle(child, {
          display: "none",
          height: "0",
          margin: "0",
          padding: "0",
          overflow: "hidden",
          visibility: "hidden"
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
          display: "none",
          height: "0",
          margin: "0",
          padding: "0",
          overflow: "hidden",
          visibility: "hidden"
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
        display: "none"
      });
      setStyle(fallback, {
        display: "block"
      });
    };

    logo.onload = function () {
      setStyle(fallback, {
        display: "none"
      });
      setStyle(logo, {
        display: "block"
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
      width: "100%",
      maxWidth: "540px",
      margin: "32px auto",
      padding: "0",
      background: "#ffffff",
      backgroundImage: "none",
      border: "1px solid #dbe7f6",
      borderRadius: "28px",
      boxShadow: "0 18px 52px rgba(23, 59, 108, 0.12)",
      overflow: "hidden",
      boxSizing: "border-box"
    });

    setStyle(form, {
      width: "100%",
      margin: "0",
      padding: "0 22px 24px 22px",
      background: "#ffffff",
      backgroundImage: "none",
      border: "0",
      boxShadow: "none",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
      boxSizing: "border-box"
    });

    setStyle(ul, {
      listStyle: "none",
      margin: "0",
      padding: "0",
      width: "100%"
    });
  }

  function styleHeader() {
    setStyle(get("lbc_nps_header"), {
      margin: "0 -22px 18px -22px",
      padding: "24px 22px 20px 22px",
      background: "linear-gradient(180deg, #ffffff 0%, #f7faff 100%)",
      borderBottom: "1px solid #dbe7f6"
    });

    setStyle(get("lbc_nps_logo_area"), {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "64px",
      margin: "0 0 18px 0",
      padding: "0",
      textAlign: "center"
    });

    setStyle(get("lbc_nps_logo"), {
      display: "block",
      width: "240px",
      maxWidth: "240px",
      height: "auto",
      maxHeight: "64px",
      objectFit: "contain",
      margin: "0 auto"
    });

    setStyle(get("lbc_nps_logo_fallback"), {
      display: "none",
      color: "#005baa",
      fontSize: "22px",
      fontWeight: "850",
      lineHeight: "1.1",
      letterSpacing: "-0.02em",
      textAlign: "center"
    });

    setStyle(get("lbc_nps_eyebrow"), {
      color: "#005baa",
      fontSize: "10px",
      fontWeight: "850",
      lineHeight: "1.2",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      margin: "0 0 7px 0"
    });

    setStyle(get("lbc_nps_title"), {
      color: "#173b6c",
      fontSize: "24px",
      fontWeight: "850",
      lineHeight: "1.08",
      letterSpacing: "-0.035em",
      margin: "0 0 8px 0"
    });

    setStyle(get("lbc_nps_subtitle"), {
      color: "#5f6f89",
      fontSize: "13px",
      fontWeight: "400",
      lineHeight: "1.45",
      margin: "0 0 14px 0"
    });

    setStyle(get("lbc_nps_intro_card"), {
      display: "block",
      padding: "13px 14px",
      background: "#f0f6ff",
      border: "1px solid #cfe1f7",
      borderLeft: "4px solid #005baa",
      borderRadius: "16px",
      color: "#173b6c",
      boxSizing: "border-box"
    });

    var card = get("lbc_nps_intro_card");

    if (card) {
      setStyle(card.querySelector("strong"), {
        display: "block",
        fontSize: "13px",
        fontWeight: "800",
        lineHeight: "1.25",
        margin: "0 0 4px 0",
        color: "#173b6c"
      });

      setStyle(card.querySelector("span"), {
        display: "block",
        fontSize: "11px",
        fontWeight: "400",
        lineHeight: "1.4",
        color: "#5f6f89"
      });
    }
  }

  function styleQuestion() {
    var li = get(CONFIG.questionLiId);
    if (!li) return;

    setStyle(li, {
      listStyle: "none",
      margin: "0 0 18px 0",
      padding: "0",
      width: "100%",
      background: "transparent",
      border: "0",
      boxShadow: "none",
      boxSizing: "border-box"
    });

    Array.from(li.querySelectorAll("label.description, .description")).forEach(function (label) {
      setStyle(label, {
        display: "block",
        color: "#173b6c",
        fontSize: "15px",
        fontWeight: "800",
        lineHeight: "1.25",
        letterSpacing: "-0.01em",
        margin: "0 0 12px 0",
        padding: "0"
      });
    });

    Array.from(li.querySelectorAll(".required, .asterisk")).forEach(function (el) {
      setStyle(el, {
        color: "#d93939",
        fontWeight: "850"
      });
    });

    var optionsWrap = li.querySelector("div");

    if (optionsWrap) {
      setStyle(optionsWrap, {
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "8px",
        width: "100%",
        height: "auto",
        margin: "0",
        padding: "0",
        background: "transparent",
        border: "0"
      });
    }

    Array.from(li.querySelectorAll("span")).forEach(function (span) {
      var checkbox = span.querySelector("input[type='checkbox']");
      if (!checkbox) return;

      setStyle(span, {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        width: "100%",
        minHeight: "44px",
        height: "auto",
        margin: "0",
        padding: "10px 12px",
        background: "#ffffff",
        border: "1px solid #dbe7f6",
        borderRadius: "14px",
        boxShadow: "none",
        color: "#475467",
        fontSize: "12px",
        fontWeight: "500",
        lineHeight: "1.25",
        boxSizing: "border-box",
        cursor: "pointer"
      });
    });

    Array.from(li.querySelectorAll("input[type='checkbox']")).forEach(function (checkbox) {
      checkbox.style.setProperty("accent-color", "#005baa", "important");

      setStyle(checkbox, {
        width: "16px",
        height: "16px",
        minWidth: "16px",
        minHeight: "16px",
        margin: "0",
        padding: "0",
        cursor: "pointer"
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
          background: "#eef5ff",
          borderColor: "#8bbce8",
          color: "#005baa"
        });
      } else {
        setStyle(span, {
          background: "#ffffff",
          borderColor: "#dbe7f6",
          color: "#475467"
        });
      }
    });
  }

  function styleSubmit() {
    var li = get(CONFIG.buttonsLiId);
    var submit = get(CONFIG.submitId);

    if (li) {
      setStyle(li, {
        listStyle: "none",
        margin: "8px 0 0 0",
        padding: "0",
        width: "100%",
        height: "auto",
        background: "transparent",
        border: "0",
        boxShadow: "none",
        boxSizing: "border-box"
      });
    }

    if (submit) {
      submit.value = "Enviar";

      setStyle(submit, {
        display: "block",
        width: "100%",
        height: "auto",
        minHeight: "46px",
        background: "#005baa",
        backgroundColor: "#005baa",
        backgroundImage: "none",
        color: "#ffffff",
        border: "0",
        borderRadius: "14px",
        padding: "12px 16px",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
        fontSize: "14px",
        fontWeight: "850",
        lineHeight: "1.2",
        textAlign: "center",
        boxShadow: "0 10px 20px rgba(0, 91, 170, 0.20)",
        textShadow: "none",
        textTransform: "none",
        cursor: "pointer",
        boxSizing: "border-box"
      });
    }
  }

  function applyMobile() {
    if (window.innerWidth > 640) return;

    var formContainer = get(CONFIG.containerId);
    var form = get(CONFIG.formId);

    setStyle(formContainer, {
      maxWidth: "calc(100vw - 28px)",
      margin: "18px auto",
      borderRadius: "24px"
    });

    setStyle(form, {
      padding: "0 18px 22px 18px"
    });

    setStyle(get("lbc_nps_header"), {
      margin: "0 -18px 18px -18px",
      padding: "20px 18px 18px 18px"
    });

    setStyle(get("lbc_nps_logo_area"), {
      height: "56px",
      margin: "0 0 16px 0"
    });

    setStyle(get("lbc_nps_logo"), {
      width: "190px",
      maxWidth: "190px",
      maxHeight: "56px"
    });

    setStyle(get("lbc_nps_title"), {
      fontSize: "22px"
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

    console.log("LBC NPS detractor v4 aplicado correctamente.");
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

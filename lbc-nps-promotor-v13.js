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
      "min-width": "120px",
      "max-width": "180px",
      "min-height": "38px",
      "margin": "14px auto 0 auto",
      "padding": "10px 18px",
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

    var parent = el.parentElement;

    if (parent) {
      setStyle(parent, {
        "text-align": "center",
        "background": "transparent",
        "background-color": "transparent",
        "background-image": "none"
      });
    }
  });
}

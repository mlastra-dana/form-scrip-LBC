function injectAntiGrayStyles() {
  if (document.getElementById("lbc_nps_antigray_styles")) return;

  var style = document.createElement("style");
  style.id = "lbc_nps_antigray_styles";
  style.textContent = `
    #form_8567 li,
    #form_8567 li:hover,
    #form_8567 li.highlighted,
    #form_8567 li.selected,
    #form_8567 li.focused,
    #form_8567 li div,
    #form_8567 li div:hover {
      background: transparent !important;
      background-color: transparent !important;
      background-image: none !important;
    }

    #form_8567 li span {
      background-image: none !important;
    }

    #form_8567 li span:hover {
      background-color: #f8fbff !important;
    }

    #form_8567 input[type="checkbox"]:checked {
      accent-color: #005baa !important;
    }
  `;

  document.head.appendChild(style);
}

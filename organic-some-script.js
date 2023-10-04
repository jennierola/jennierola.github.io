// script.js

document.addEventListener("DOMContentLoaded", function() {
  var urlTietoKentta = document.getElementById("urlTieto");
  var idAlasveto = document.getElementById("idAlasveto");
  var sourceAlasveto = document.getElementById("sourceAlasveto");
  var mediumAlasveto = document.getElementById("mediumAlasveto");
  var contentAlasveto = document.getElementById("contentAlasveto");
  var manuaalinenTietoKentta = document.getElementById("manuaalinenTieto");
  var tuloksetElementti = document.getElementById("tulokset");
  var kopioiNappi = document.getElementById("kopioiNappi");

  urlTietoKentta.addEventListener("input", function() {
    paivitaTulokset();
    validateURL();
  });

  idAlasveto.addEventListener("change", function() {
    paivitaTulokset();
  });

  sourceAlasveto.addEventListener("change", function() {
    paivitaTulokset();
  });

  mediumAlasveto.addEventListener("change", function() {
    paivitaTulokset();
  });

  contentAlasveto.addEventListener("change", function() {
    paivitaTulokset();
  });

  manuaalinenTietoKentta.addEventListener("input", function() {
    paivitaTulokset();
  });

  kopioiNappi.addEventListener("click", function() {
    kopioiTulokset();
  });

  function paivitaTulokset() {
    var manuaalinenURL = urlTietoKentta.value;
    var valittuID = idAlasveto.value;
    var valittuSource = sourceAlasveto.value;
    var valittuMedium = mediumAlasveto.value;
    var valittuContent = contentAlasveto.value;
    var manuaalinenTieto = manuaalinenTietoKentta.value;
    
    // Check if any of the required fields are empty
    if (
      !manuaalinenURL ||
      !valittuID ||
      !valittuSource ||
      !valittuMedium ||
      !valittuContent ||
      !manuaalinenTieto 
    ) {
      tuloksetElementti.textContent = "Ole hyvä ja täytä kaikki kentät.";
      return;
    }

    var tulokset = "";
    
    if (manuaalinenURL) {
      tulokset += manuaalinenURL;
    }
    
    tulokset += "?utm_id=" + valittuID + "&utm_source=" + valittuSource;
    tulokset += "&utm_medium=" + valittuMedium + "&utm_campaign=" + encodeURIComponent(manuaalinenTieto);
    tulokset += "&utm_content=" + valittuContent;
    
    tuloksetElementti.textContent = tulokset;
  }

  function kopioiTulokset() {
    var tulokset = tuloksetElementti.textContent;
    var tempTextarea = document.createElement("textarea");
    tempTextarea.value = tulokset;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextarea);
  }

  function validateURL() {
    var url = urlTietoKentta.value;
    var isValid = /^https:\/\/.*/.test(url);

    if (!isValid) {
      urlValidationMessage.textContent = "URL:n alussa täytyy olla 'https://'";
    } else {
      urlValidationMessage.textContent = ""; // Clear validation message
    }
  }
});

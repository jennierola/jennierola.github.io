
// Tallennetaan elementtien viittaukset myöhempää käyttöä varten 
document.addEventListener("DOMContentLoaded", function() {
  var urlTietoKentta = document.getElementById("urlTieto");
  var idAlasveto = document.getElementById("idAlasveto");
  var sourceAlasveto = document.getElementById("sourceAlasveto");
  // Sort and update the options for utm_source
  var sourceOptions = Array.from(sourceAlasveto.options);
  sourceOptions.sort(function(a, b) {
    return a.text.localeCompare(b.text);
  });
  sourceAlasveto.innerHTML = '';
  sourceOptions.forEach(function(option) {
    sourceAlasveto.appendChild(option);
  });
  
  var mediumAlasveto = document.getElementById("mediumAlasveto");
  // Sort and update the options for utm_medium
  var mediumOptions = Array.from(mediumAlasveto.options);
  mediumOptions.sort(function(a, b) {
    return a.text.localeCompare(b.text);
  });
  mediumAlasveto.innerHTML = '';
  mediumOptions.forEach(function(option) {
    mediumAlasveto.appendChild(option);
  });

  var contentAlasveto = document.getElementById("contentAlasveto");
  // Sort and update the options for utm_content
  var contentOptions = Array.from(contentAlasveto.options);
  contentOptions.sort(function(a, b) {
    return a.text.localeCompare(b.text);
  });
  contentAlasveto.innerHTML = '';
  contentOptions.forEach(function(option) {
    contentAlasveto.appendChild(option);
  });

  var customInput = document.createElement("input");
  var customInputLabel = document.createElement("label"); // Create a label element
  var manuaalinenTietoKentta = document.getElementById("manuaalinenTieto");
  var manuaalinenCustomField = document.getElementById("manuaalinenCustom");
  manuaalinenCustomField.setAttribute("placeholder", "esim. automation/on-off + uutiskirjeen nimi");
  var tuloksetElementti = document.getElementById("tulokset");
  var kopioiNappi = document.getElementById("kopioiNappi");

  // Tarkista syötetyn URL:n oikeellisuus ja lisää URL kopioitavaan tulokseen
  urlTietoKentta.addEventListener("input", function() {
    paivitaTulokset();
    validateURL();
  });

  // Tallenna arvot funktioon
  function paivitaTulokset() {
    var manuaalinenURL = urlTietoKentta.value;
    var valittuID = idAlasveto.value;
    var valittuSource = sourceAlasveto.value;
    var valittuMedium = mediumAlasveto.value;
    var valittuContent = contentAlasveto.value;
    var manuaalinenCustom = manuaalinenCustomField.value;
    var manuaalinenTieto = manuaalinenTietoKentta.value;

    if (contentAlasveto.value === "custom") {
    valittuContent = customInput.value;
  }
    // Virheilmoitus, mikäli tarvittavia kenttiä ei ole täytetty
    if (
      /*!manuaalinenURL || */
      !valittuID ||
      !valittuSource ||
      !valittuMedium ||
      !valittuContent ||
      !manuaalinenTieto
    ) {
      tuloksetElementti.textContent = "Ole hyvä ja täytä kaikki kentät.";
      return;
    }
    // Tulosta URL näytölle
    var tulokset = "";
    
    if (manuaalinenURL) {
      tulokset += manuaalinenURL;
    }
    
    tulokset += "?utm_id=" + valittuID + "&utm_source=" + valittuSource;
    tulokset += "&utm_medium=" + valittuMedium + "&utm_campaign=" + encodeURIComponent(manuaalinenTieto);
    tulokset += "&utm_content=" + valittuContent;
    if (manuaalinenCustom) {
      tulokset += "&utm_custom=" + encodeURIComponent(manuaalinenCustom);
    }
    
    tuloksetElementti.textContent = tulokset;
  }
  // Kopioi URL nappi
  function kopioiTulokset() {
    var tulokset = tuloksetElementti.textContent;
    var tempTextarea = document.createElement("textarea");
    tempTextarea.value = tulokset;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextarea);
  }
  // Tarkista, että URL kirjoitettu oikein
  function validateURL() {
    var url = urlTietoKentta.value;
    var isValid = /^https:\/\/.*/.test(url);

    if (!isValid) {
      urlValidationMessage.textContent = "URL:n alussa täytyy olla 'https://'";
    } else {
      urlValidationMessage.textContent = ""; // Jos URL oikein, poista virheilmoitus
    }
  }
    // Kutsu päivitä tulokset funktiota, kun käyttäjä tekee valintoja URL builderilla
  idAlasveto.addEventListener("change", function() {
    paivitaTulokset();
  });

  sourceAlasveto.addEventListener("change", function() {
    paivitaTulokset();
  });

  mediumAlasveto.addEventListener("change", function() {
    paivitaTulokset();
  });

  customInputLabel.textContent = "Lisää oma: ";

  contentAlasveto.addEventListener("change", function() {
     if (contentAlasveto.value === "custom") {
      // If "custom" is selected, create and display the input field
      customInput.setAttribute("type", "text");
      customInput.setAttribute("id", "customInputField");
      customInput.setAttribute("placeholder", "Syötä utm_content");
      contentAlasveto.parentNode.insertBefore(customInput, contentAlasveto.nextSibling);
      contentAlasveto.parentNode.insertBefore(customInputLabel, contentAlasveto.nextSibling); // Insert the label
    } else {
      // If another option is selected, remove the input field
      var existingCustomInput = document.getElementById("customInputField");
      if (existingCustomInput) {
        existingCustomInput.remove();
      }
    }
    paivitaTulokset();
  });

   //customAlasveto.addEventListener("change", function() {
   // paivitaTulokset();
  //});

  manuaalinenTietoKentta.addEventListener("input", function() {
    paivitaTulokset();
  });

  kopioiNappi.addEventListener("click", function() {
    kopioiTulokset();
  });

});

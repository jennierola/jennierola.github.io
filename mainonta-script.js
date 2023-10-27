
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

  // var customAlasveto = document.getElementById("customAlasveto");
  // Sort and update the options for utm_custom
  // var customOptions = Array.from(customAlasveto.options);
  // customOptions.sort(function(a, b) {
  //  return a.text.localeCompare(b.text);
  // });
  // customAlasveto.innerHTML = '';
  // customOptions.forEach(function(option) {
  //  customAlasveto.appendChild(option);
  // });

  var customInput = document.createElement("input");
  var customInputLabel = document.createElement("label"); // Create a label element

  var manuaalinenTietoKentta = document.getElementById("manuaalinenTieto");
  var tuloksetElementti = document.getElementById("tulokset");
  var kopioiNappi = document.getElementById("kopioiNappi");

  // Tarkista syötetyn URL:n oikeellisuus ja lisää URL kopioitavaan tulokseen
  urlTietoKentta.addEventListener("input", function() {
    paivitaTulokset();
    validateURL();

  // Add an event listener to the "Kopioi URL tähän" input field
  urlTietoKentta.addEventListener("input", function() {
    // Extract the "name" part from the URL
    var url = urlTietoKentta.value;
    var name = extractNameFromURL(url);

    // Set the extracted "name" as the value for utm_campaign only if the second part of the URL is "program"
    if (isProgramURL(url)) {
      manuaalinenTietoKentta.value = name;
    }

    // Update the URL builder with the extracted name
    paivitaTulokset();
  });

  // Function to extract the "name" part from the URL
  function extractNameFromURL(url) {
    var urlParts = url.split('/');
    if (urlParts.length >= 2) {
      // Get the last part of the URL, which is assumed to be the "name"
      return urlParts[urlParts.length - 1];
    }
    return "";
  }

  // Function to check if the second part of the URL is "ohjelma"
  function isOhjelmaURL(url) {
    var urlParts = url.split('/');
    if (urlParts.length >= 2) {
      return urlParts[1] === "ohjelma";
    }
    return false;
  } 
  });
  
  // Tallenna arvot funktioon
  function paivitaTulokset() {
    var manuaalinenURL = urlTietoKentta.value;
    var valittuID = idAlasveto.value;
    var valittuSource = sourceAlasveto.value;
    var valittuMedium = mediumAlasveto.value;
    var valittuContent = contentAlasveto.value;
    //var valittuCustom = customAlasveto.value;
    var manuaalinenTieto = manuaalinenTietoKentta.value;

    if (contentAlasveto.value === "custom") {
    valittuContent = customInput.value;
  }
    if (valittuContent === "custom" && customInput.value) {
    // Käytä "Lisää oma" -kenttää, jos utm_content on "custom" ja kenttä ei ole tyhjä
    valittuContent = customInput.value;
  }

    // Virheilmoitus, mikäli tarvittavia kenttiä ei ole täytetty
    if (
      /*!manuaalinenURL || */
      !valittuID ||
      !valittuSource ||
      !valittuMedium ||
     // !valittuContent ||
     // !valittuCustom ||
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
   // tulokset += "&utm_custom=" + valittuCustom;
    
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

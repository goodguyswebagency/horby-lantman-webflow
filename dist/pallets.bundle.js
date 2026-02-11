// Puni, čitljiv JS kod - stavi u <div class="w-embed w-script">
(() => {
  "use strict";

  // ========================================
  // KONFIGURACIJA - MENJAJ CENE OVDE
  // ========================================
  const PELLET_CONFIG = {
    types: {
      scandinavian: {
        name: "Scandinavian 6mm",
        sackPalletPriceInclVat: 3495,  // SEK po pall sa säck-ama
        bulkPalletPriceInclVat: 3895,  // SEK po pall rasuto
        bagsPerPallet: 52,
        kgPerPallet: 832  // 16kg * 52
      },
      derome: {
        name: "Derome 6mm",
        sackPalletPriceInclVat: 3695,
        bulkPalletPriceInclVat: 4645,
        bagsPerPallet: 52,
        kgPerPallet: 832
      },
      fagerhult: {
        name: "Fagerhult 8mm",
        sackPalletPriceInclVat: 3795,
        bulkPalletPriceInclVat: 4950,
        bagsPerPallet: 52,
        kgPerPallet: 832
      }
    },
    defaultType: "scandinavian",
    fullSackPriceInclVat: 79,     // <52 säck-ova
    lowSackPriceInclVat: 74.90,   // >=52 säck-ova
    palletsForFreeShipping: 4,
    hornyPostcodesRegex: /^283|284/,  // Hörby poštanski brojevi
    shippingRadius: "3 mil",
    vatMultiplier: 1.25  // 25% moms
  };

  // ========================================
  // ELEMENTI IZ WEbfLOW DOM-a
  // ========================================
  const elements = {
    quantityInput: document.getElementById("Kvantitet"),
    priceNoVat: document.getElementById("price-no-vat"),
    vatPrice: document.getElementById("vat-price"),
    totalPrice: document.getElementById("total-price"),
    fullPriceHeading: document.getElementById("full-price"),
    lowPriceHeading: document.getElementById("low-price"),
    form: document.getElementById("trapellets-form-pelletsbestallning"),
    postnummerInput: document.getElementById("Postnummer"),
    pelletTypeSelect: document.getElementById("pellet-type")
  };

  // ========================================
  // FUNKCIJE
  // ========================================

  // Reset prikaza na 0
  function resetDisplay() {
    if (elements.priceNoVat) elements.priceNoVat.textContent = "0 SEK";
    if (elements.vatPrice) elements.vatPrice.textContent = "0 SEK";
    if (elements.totalPrice) elements.totalPrice.textContent = "0 SEK";
    if (elements.fullPriceHeading) elements.fullPriceHeading.classList.add("hidden");
    if (elements.lowPriceHeading) elements.lowPriceHeading.classList.add("hidden");
  }

  // Proveri da li je frakt gratis (po postnr + količini)
  function checkFreeShipping(postnummer, pallets) {
    const cleanPostnr = postnummer.replace(/\s/g, "");
    if (pallets >= PELLET_CONFIG.palletsForFreeShipping && PELLET_CONFIG.hornyPostcodesRegex.test(cleanPostnr)) {
      return `✅ Frakt GRATIS (unutar ${PELLET_CONFIG.shippingRadius} od Hörby)`;
    }
    return "Frakt dogovoriti separerat (varijabilno)";
  }

  // Glavna kalkulacija
  function calculatePrices() {
    const quantity = parseInt(elements.quantityInput.value) || 0;
    if (quantity === 0) {
      resetDisplay();
      return;
    }

    // Dohvati tip i delivery mode
    const pelletType = elements.pelletTypeSelect ? elements.pelletTypeSelect.value : PELLET_CONFIG.defaultType;
    const config = PELLET_CONFIG.types[pelletType];
    const deliveryType = document.querySelector('input[name="delivery-type"]:checked')?.value || "sack";
    const postnummer = elements.postnummerInput ? elements.postnummerInput.value : "";

    let totalInclVat = 0;
    let totalExVat = 0;
    let vatAmount = 0;
    let unitCount = 0;
    let unitText = "";
    let isLowPrice = false;
    let pallets = 0;

    if (deliveryType === "sack") {
      // SÄCK MODE: po vrećama, sa volume popustom
      let sacks;
      if (quantity < PELLET_CONFIG.types[pelletType].bagsPerPallet) {
        // <1 pall: full cena po säck
        sacks = quantity;
        totalInclVat = PELLET_CONFIG.fullSackPriceInclVat * sacks;
      } else {
        // >=1 pall: low cena + pallet popust
        pallets = Math.ceil(quantity / config.bagsPerPallet);
        totalInclVat = config.sackPalletPriceInclVat * pallets;
        sacks = config.bagsPerPallet * pallets;
        isLowPrice = true;
      }
      unitCount = sacks;
      unitText = "säckar";

    } else {
      // BULK MODE: rasuto po pall-ovima
      pallets = quantity;
      totalInclVat = config.bulkPalletPriceInclVat * pallets;
      unitCount = config.kgPerPallet * pallets;
      unitText = "kg (bulk)";
    }

    // Moms kalkulacija
    totalExVat = Math.round(totalInclVat / PELLET_CONFIG.vatMultiplier);
    vatAmount = totalInclVat - totalExVat;

    // Ažuriraj display
    if (elements.priceNoVat) {
      elements.priceNoVat.textContent = `${totalExVat.toLocaleString()} SEK`;
    }
    if (elements.vatPrice) {
      elements.vatPrice.textContent = `${vatAmount.toLocaleString()} SEK`;
    }
    if (elements.totalPrice) {
      const pricePerUnit = Math.round(totalInclVat / unitCount);
      const shippingNote = checkFreeShipping(postnummer, pallets);
      elements.totalPrice.textContent = `${totalInclVat.toLocaleString()} SEK (${pricePerUnit} SEK/${unitText.split(" ")[0]}, ${unitCount.toLocaleString()} ${unitText}) | ${shippingNote}`;
    }

    // Heading cene (iz slika)
    if (elements.fullPriceHeading) {
      elements.fullPriceHeading.textContent = PELLET_CONFIG.fullSackPriceInclVat;
      elements.fullPriceHeading.classList.toggle("hidden", isLowPrice);
    }
    if (elements.lowPriceHeading) {
      elements.lowPriceHeading.textContent = PELLET_CONFIG.lowSackPriceInclVat;
      elements.lowPriceHeading.classList.toggle("hidden", !isLowPrice);
    }
  }

  // ========================================
  // EVENT LISTENERI
  // ========================================
  if (elements.quantityInput) {
    elements.quantityInput.addEventListener("input", calculatePrices);
  }
  if (elements.pelletTypeSelect) {
    elements.pelletTypeSelect.addEventListener("change", calculatePrices);
  }
  // Radio buttons za delivery type
  document.querySelectorAll('input[name="delivery-type"]').forEach(radio => {
    radio.addEventListener("change", calculatePrices);
  });
  // Postnummer promena
  if (elements.postnummerInput) {
    elements.postnummerInput.addEventListener("input", calculatePrices);
  }

  // Form submit (demo/prevent default)
  if (elements.form) {
    elements.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(elements.form);
      const data = Object.fromEntries(formData);
      console.log("🛒 Pellets beställning:", data);
      console.log("💰 Pris kalkulacija spremna za email");
      alert(`Tack för din förfrågan!\nKostnadsförslag för ${data.Kvantitet} ${data["delivery-type"] === "bulk" ? "pallar bulk" : "säckar"} skickat till ${data.Mejladress}`);
    });
  }

  // ========================================
  // INIT - Pokreni sa default vrednostima
  // ========================================
  if (elements.quantityInput) {
    elements.quantityInput.value = "1";  // Default 1 pall/säck
  }
  calculatePrices();

})();

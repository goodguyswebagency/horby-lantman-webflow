// pallets.bundle.js - PUNI, Webflow-safe kod (kopiraj u GitHub, build/minify)
(function() {
  "use strict";

  // ========================================
  // Webflow safe loader - čeka DOM + Webflow
  // ========================================
  function waitForWebflow(callback, maxRetries = 50) {
    let retries = 0;
    function check() {
      retries++;
      const webflowReady = window.Webflow && window.Webflow.require && document.readyState === 'complete';
      const formExists = document.getElementById("Kvantitet") !== null;
      
      if (webflowReady && formExists) {
        console.log("✅ Pellet calculator: Webflow + form ready!");
        callback();
        return;
      }
      
      if (retries < maxRetries) {
        setTimeout(check, 200);
      } else {
        console.warn("⚠️ Pellet calculator: Timeout, form not found");
      }
    }
    check();
  }

  // ========================================
  // KONFIGURACIJA - MENJAJ CENE OVDE
  // ========================================
  const PELLET_CONFIG = {
    types: {
      scandinavian: {
        name: "Scandinavian 6mm",
        sackPalletPriceInclVat: 3495,
        bulkPalletPriceInclVat: 3895,
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
    fullSackPriceInclVat: 79,     
    lowSackPriceInclVat: 74.90,   
    palletsForFreeShipping: 4,
    hornyPostcodesRegex: /^283|284/,
    shippingRadius: "3 mil",
    vatMultiplier: 1.25
  };

  // ========================================
  // INIT FUNKCIJA (pokreće kad je sve ready)
  // ========================================
  function initPelletCalculator() {
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

    // Safety check
    if (!elements.quantityInput) {
      console.error("❌ Pellet form elements not found");
      return;
    }

    console.log("🚀 Initializing pellet calculator...");

    // ========================================
    // FUNKCIJE
    // ========================================
    function resetDisplay() {
      if (elements.priceNoVat) elements.priceNoVat.textContent = "0 SEK";
      if (elements.vatPrice) elements.vatPrice.textContent = "0 SEK";
      if (elements.totalPrice) elements.totalPrice.textContent = "0 SEK";
      if (elements.fullPriceHeading) elements.fullPriceHeading.classList.add("hidden");
      if (elements.lowPriceHeading) elements.lowPriceHeading.classList.add("hidden");
    }

    function checkFreeShipping(postnummer, pallets) {
      const cleanPostnr = postnummer.replace(/\s/g, "");
      if (pallets >= PELLET_CONFIG.palletsForFreeShipping && PELLET_CONFIG.hornyPostcodesRegex.test(cleanPostnr)) {
        return `✅ Frakt GRATIS (unutar ${PELLET_CONFIG.shippingRadius} od Hörby)`;
      }
      return "Frakt dogovoriti separerat";
    }

    function calculatePrices() {
      const quantity = parseInt(elements.quantityInput.value) || 0;
      if (quantity === 0) {
        resetDisplay();
        return;
      }

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
        let sacks;
        if (quantity < config.bagsPerPallet) {
          sacks = quantity;
          totalInclVat = PELLET_CONFIG.fullSackPriceInclVat * sacks;
        } else {
          pallets = Math.ceil(quantity / config.bagsPerPallet);
          totalInclVat = config.sackPalletPriceInclVat * pallets;
          const sacks = config.bagsPerPallet * pallets;
          unitCount = sacks;
          unitText = "säckar";
          isLowPrice = true;
        }
        unitCount = sacks || quantity;
        unitText = unitText || "säckar";

      } else {  // bulk
        pallets = quantity;
        totalInclVat = config.bulkPalletPriceInclVat * pallets;
        unitCount = config.kgPerPallet * pallets;
        unitText = "kg (bulk)";
      }

      totalExVat = Math.round(totalInclVat / PELLET_CONFIG.vatMultiplier);
      vatAmount = totalInclVat - totalExVat;

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
    // EVENTS
    // ========================================
    elements.quantityInput.addEventListener("input", calculatePrices);
    if (elements.pelletTypeSelect) {
      elements.pelletTypeSelect.addEventListener("change", calculatePrices);
    }
    document.querySelectorAll('input[name="delivery-type"]').forEach(radio => {
      radio.addEventListener("change", calculatePrices);
    });
    if (elements.postnummerInput) {
      elements.postnummerInput.addEventListener("input", calculatePrices);
    }
    if (elements.form) {
      elements.form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(elements.form);
        const data = Object.fromEntries(formData);
        console.table(data);
        alert(`Tack! Kostnadsförslag skickat till ${data.Mejladress}`);
      });
    }

    // Initial kalkulacija
    elements.quantityInput.value = "1";
    calculatePrices();
  }

  // ========================================
  // AUTO-START
  // ========================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => waitForWebflow(initPelletCalculator));
  } else {
    waitForWebflow(initPelletCalculator);
  }

})();

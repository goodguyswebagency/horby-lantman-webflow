<script>
        // Product configurations - lätt att ändra priser här
        const products = {
            'default': { // 6mm, 16kg - mest såld
                bagPriceInclVat: 75, // SEK per säck
                palletPriceInclVat: 3495,
                bagsPerPallet: 52
            },
            '6mm-10kg': {
                bagPriceInclVat: 49,
                palletPriceInclVat: 3795,
                bagsPerPallet: 90
            },
            '8mm-16kg': {
                bagPriceInclVat: 85,
                palletPriceInclVat: 3695,
                bagsPerPallet: 52
            }
        };

        const VAT_RATE = 0.25; // 25% moms

        const quantityInput = document.getElementById('Kvantitet');
        const priceNoVatEl = document.getElementById('price-no-vat');
        const vatPriceEl = document.getElementById('vat-price');
        const totalPriceEl = document.getElementById('total-price');

        // Lägg till produktval (kan utökas med select)
        // För nu, default till mest såld

        function calculatePrices(pallets, product = 'default') {
            const config = products[product];
            const palletTotalInclVat = config.palletPriceInclVat * pallets;
            const palletTotalExVat = palletTotalInclVat / (1 + VAT_RATE);
            const vatTotal = palletTotalExVat * VAT_RATE;
            const totalBags = config.bagsPerPallet * pallets;
            const perBagExVat = (config.bagPriceInclVat / (1 + VAT_RATE)).toFixed(2);

            priceNoVatEl.textContent = palletTotalExVat.toLocaleString() + ' SEK (' + perBagExVat + ' SEK/säck ex.moms)';
            vatPriceEl.textContent = vatTotal.toLocaleString() + ' SEK';
            totalPriceEl.textContent = palletTotalInclVat.toLocaleString() + ' SEK (' + config.bagPriceInclVat.toLocaleString() + ' SEK/säck incl.moms, ' + totalBags + ' säckar)';

            // Visa full/low price om behövs (från bilder?)
            document.getElementById('full-price').textContent = config.bagPriceInclVat;
            document.getElementById('low-price').textContent = (config.bagPriceInclVat * 0.9987).toFixed(1); // approx från bilder
        }

        // Initial beräkning
        calculatePrices(1);

        // Uppdatera vid ändring
        quantityInput.addEventListener('input', (e) => {
            calculatePrices(parseInt(e.target.value) || 0);
        });

        // Form submit - för nu, logga/console
        document.getElementById('pellets-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            console.log('Beställning:', Object.fromEntries(formData));
            alert('Beställning skickad! Vi kontaktar dig snart. (Demo)');
        });

        // För att lägga till produktselect (valfritt utöka)
        // const productSelect = document.createElement('select');
        // Object.keys(products).forEach(key => {
        //     const opt = document.createElement('option');
        //     opt.value = key;
        //     opt.text = key.replace('mm-', '').replace('-', ' ');
        //     productSelect.appendChild(opt);
        // });
        // quantityInput.parentNode.appendChild(productSelect);
        // productSelect.addEventListener('change', (e) => calculatePrices(parseInt(quantityInput.value), e.target.value));
    </script>

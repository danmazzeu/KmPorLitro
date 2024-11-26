$(function () {
    const $distance = $('#calc-distance');
    const $consume = $('#calc-consume');
    const $price = $('#calc-price');
    const $resultDistance = $('#result-distance');
    const $resultCost = $('#result-cost');
    const $resultCostPerKm = $('#result-costPerKm');
    const $resultWeeklyCost = $('#result-weekly-cost');
    const $resultMonthlyCost = $('#result-monthly-cost');
    const $resultAnnualCost = $('#result-annual-cost');
    const $termometer = $('#result-termometer');

    $('button:contains("Calcular")').on('click', function() {
        const distance = parseFloat($distance.val());
        const consume = parseFloat($consume.val());
        const price = parseFloat($price.val().replace('R$ ', ''));
        let isValid = true;

        // Validate input
        if (isNaN(distance)) {
            $('#calc-distance-error').text('Por favor, insira valores válidos.').show();
        }
        if (isNaN(consume)) {
            $('#calc-consume-error').text('Por favor, insira valores válidos.').show();
        }
        if (isNaN(price)) {
            $('#calc-price-error').text('Por favor, insira valores válidos.').show();
        }
        if (isNaN(distance) || isNaN(consume) || isNaN(price)) {
            isValid = false;
        }

        if (isValid) {
            // Calculations
            const totalConsume = distance / consume;
            const totalCost = totalConsume * price;
            const costPerKm = totalCost / distance;

            // Weekly, monthly, and annual costs (adjust as needed)
            const weeklyCost = totalCost / 4; // Assuming 4 weeks per month
            const monthlyCost = totalCost * 3; // Assuming 3 months per quarter
            const annualCost = totalCost * 12;

            // Display results
            $resultDistance.val(`${totalConsume.toFixed(2)} Litros`);
            $resultCost.val(`R$ ${totalCost.toFixed(2)}`);
            $resultCostPerKm.val(`R$ ${costPerKm.toFixed(2)}`);
            $resultWeeklyCost.val(`R$ ${weeklyCost.toFixed(2)}`);
            $resultMonthlyCost.val(`R$ ${monthlyCost.toFixed(2)}`);
            $resultAnnualCost.val(`R$ ${annualCost.toFixed(2)}`);

            // Termometer (adjust the ideal range as needed)
            const idealConsumption = 15; // Example ideal consumption in km/l
            const consumptionRatio = consume / idealConsumption;
            let termometerWidth = consumptionRatio * 100;
            termometerWidth = Math.min(100, Math.max(0, termometerWidth));
            $termometer.css('width', termometerWidth + '%');
            $termometer.removeClass('good bad').addClass(consumptionRatio > 1 ? 'bad' : 'good');
        }
    });

    // Clear button click event
    $('button:contains("Limpar")').on('click', function() {
        $distance.val('');
        $consume.val('');
        $price.val('');
        $resultDistance.val('');
        $resultCost.val('');
        $resultCostPerKm.val('');
        $resultWeeklyCost.val('');
        $resultMonthlyCost.val('');
        $resultAnnualCost.val('');
        $termometer.css('width', '0%').removeClass('good bad');
        $('span').hide();
    });
});
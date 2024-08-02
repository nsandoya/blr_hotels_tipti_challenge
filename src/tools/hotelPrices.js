// Calculo puntual de todos los precios de los hoteles
export const hotelPrices = (hotel, weekdays, weekend, isReward) => {
    let prices = hotel.prices;

    let regTotalWeekdaysPrices = weekdays * prices.regularPrices.weekdays;
    let regTotalWeekendPrices = weekend * prices.regularPrices.weekend;

    let rewTotalWeekdaysPrices = weekdays * prices.reward_prices.weekdays;
    let rewTotalWeekendPrices = weekend * prices.reward_prices.weekend;

    if (isReward) {
        return [rewTotalWeekdaysPrices, rewTotalWeekendPrices];
    } else {
        return [regTotalWeekdaysPrices, regTotalWeekendPrices];
    }
}
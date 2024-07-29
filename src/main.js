class Client {
    constructor({ isAfiliate, weekdaysPrices, weekendPrices }) {
        this.isAfiliate = isAfiliate;
        this.weekdaysPrices = weekdaysPrices;
        this.weekendPrices = weekendPrices;
    }
}

const hotels = [
    {
        id: 1,
        name: "Lakewood",
        stars: 3,
        prices: [
            { regularPrices: { weekdays: 110, weekend: 90 } },
            { reward_prices: { weekdays: 80, weekend: 80 } }
        ]
    },
    {
        id: 2,
        name: "Bridgewood",
        stars: 4,
        prices: [
            { regularPrices: { weekdays: 160, weekend: 60 } },
            { reward_prices: { weekdays: 110, weekend: 50 } }
        ]
    },
    {
        id: 3,
        name: "Ridgewood",
        stars: 5,
        prices: [
            { regularPrices: { weekdays: 220, weekend: 150 } },
            { reward_prices: { weekdays: 100, weekend: 40 } }
        ]
    }
];

let checkboxValue = false;

function seeCheaperHotel(hotels) {
    let seeCheaperHotelBtn = document.querySelector(".see-results");
    seeCheaperHotelBtn.addEventListener('click', () => calculatePrices(hotels, checkboxValue));
}

function isAfiliate() {
    let checkboxElement = document.querySelector(".checkbox");
    checkboxElement.addEventListener('change', () => {
        checkboxValue = checkboxElement.checked;
        console.log('El checkbox está', checkboxValue ? 'marcado' : 'no marcado');
    });
}

function scanDayByDay() {
    const firstDayInput = document.getElementById('firstDay').value;
    const lastDayInput = document.getElementById('lastDay').value;

    if (!firstDayInput || !lastDayInput) {
        alert("Por favor, elige ambas fechas.");
        return [];
    }

    const firstDay = new Date(firstDayInput);
    const lastDay = new Date(lastDayInput);

    if (firstDay > lastDay) {
        alert("La fecha de inicio debe ser anterior o igual a la fecha de fin.");
        return [];
    }

    const results = [];
    let currentDate = firstDay;

    while (currentDate <= lastDay) {
        const weekDay = currentDate.getDay();
        const isWeekend = (weekDay === 6 || weekDay === 0);

        results.push({
            date: currentDate.toISOString().split('T')[0],
            type: isWeekend ? 'weekend' : 'weekday'
        });

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return results;
}

function hotelPrices(hotel, weekdays, weekend, isReward) {
    let prices = hotel.prices;

    let regularPrices = prices[0].regularPrices;
    let rewardPrices = prices[1].reward_prices;

    let regWeekdaysPrices = regularPrices.weekdays;
    let regWeekendPrices = regularPrices.weekend;

    let rewWeekdaysPrices = rewardPrices.weekdays;
    let rewWeekendPrices = rewardPrices.weekend;

    let regTotalWeekdaysPrices = weekdays * regWeekdaysPrices;
    let regTotalWeekendPrices = weekend * regWeekendPrices;

    let rewTotalWeekdaysPrices = weekdays * rewWeekdaysPrices;
    let rewTotalWeekendPrices = weekend * rewWeekendPrices;

    if (isReward) {
        return [rewTotalWeekdaysPrices, rewTotalWeekendPrices];
    } else {
        return [regTotalWeekdaysPrices, regTotalWeekendPrices];
    }
}

function getHotelsNames(hotels) {
    return hotels.map(hotel => hotel.name);
}

function getHotels(hotels) {
    return hotels;
}

function calculatePrices(hotels, isReward) {
    let totalWeekend = 0;
    let totalWeekDays = 0;

    let hotelsNames = getHotelsNames(hotels);
    let hotelsList = getHotels(hotels);

    let hotelsTotalPrices = [];
    let clientWeek = scanDayByDay();

    if (clientWeek.length > 0) {
        clientWeek.forEach(day => {
            if (day.type === "weekend") {
                totalWeekend += 1;
            } else {
                totalWeekDays += 1;
            }
        });

        hotelsList.forEach(hotel => {
            let [clientWeekdaysPrice, clientWeekendPrice] = hotelPrices(hotel, totalWeekDays, totalWeekend, isReward);

            hotelsTotalPrices.push({
                hotel: hotel.name,
                totalPrice: clientWeekdaysPrice + clientWeekendPrice
            });
        });

        console.log("costos finales", hotelsTotalPrices);
        return hotelsTotalPrices;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    isAfiliate();
    seeCheaperHotel(hotels);
});

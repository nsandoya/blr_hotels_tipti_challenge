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

function calculateMinPrice(finalResults){
    if (!finalResults || finalResults.length === 0) {
        return 0;
    }

    let prices = []
    prices = finalResults.map(hotel => hotel.totalPrice);
    let minPrice = Math.min(...prices);
    
    return minPrice;
}

function seeCheaperHotel(hotels) {
    //let finalResults
    let seeCheaperHotelBtn = document.querySelector(".see-results");
    seeCheaperHotelBtn.addEventListener('click', () => {
        // Calcular precios de cada hotel, por cada tipo de cliente (regular y afiliado)
        let finalResults = calculatePrices(hotels, checkboxValue);
        
        // Calcular el precio mínimo
        let minPrice = calculateMinPrice(finalResults);
        let hotel = finalResults.filter(hotel => hotel.totalPrice === minPrice);
        console.log("hotel más barato", hotel)
        console.log(minPrice)
        
        // Atualizar la interfaz de usuario
        setFinalResults(hotel, minPrice);

    })
}

function isAfiliate() {
    let checkboxElement = document.querySelector(".checkbox");
    checkboxElement.addEventListener('change', () => {
        checkboxValue = checkboxElement.checked;
        console.log('El checkbox está', checkboxValue ? 'marcado' : 'no marcado');
    });
}

function setDates(firstDate, lastDate){
    const firstDateElement = document.querySelector('#check-in');
    const lastDateElement = document.querySelector('#check-out')

    
    firstDateElement.innerText = firstDate
    lastDateElement.innerText = lastDate

    console.log(firstDate, lastDate)
}

function scanDayByDay() {
    const firstDayInput = document.getElementById('firstDay').value;
    const lastDayInput = document.getElementById('lastDay').value;

    if (!firstDayInput || !lastDayInput) {
        alert("Por favor, elige ambas fechas.");
        return [];
    }

    const firstDay = new Date(firstDayInput + 'T00:00:00');
    const lastDay = new Date(lastDayInput + 'T00:00:00');

    setDates(firstDay.toDateString(), lastDay.toDateString())

    console.log("fechas a calcular", firstDay, lastDay)

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
                stars: hotel.stars,
                totalPrice: clientWeekdaysPrice + clientWeekendPrice,
                
            });
        });

        console.log("costos finales", hotelsTotalPrices);
        return hotelsTotalPrices;
    }
}

function setFinalResults(finalResults, minPrice){
    let recHotelName = document.getElementById('recomended-hotel-name');
    let recHotelStars = document.getElementById('recomended-hotel-stars').innerText;
    let recHotelPrice = document.getElementById('recomended-hotel-price');

    if(finalResults.length > 1){
        let stars = finalResults.map(hotel => hotel.stars);
        let mostRanked = Math.min(...stars);
        let firstOption = finalResults.filter((hotel) => hotel.stars == mostRanked)
        recHotelName.innerText = firstOption.hotel;
    }

    /* console.log("setFinalResults llegó primero")
    console.log(finalResults, "lo que llega") */
    
    recHotelName.innerText = finalResults[0].hotel;
    recHotelPrice.innerText = `$ ${minPrice.toFixed(2)}`
}

document.addEventListener('DOMContentLoaded', () => {
    isAfiliate();
    seeCheaperHotel(hotels);
});

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
        url: "./src/assets/img/lakewood.jpeg",
        prices: [
            { regularPrices: { weekdays: 110, weekend: 90 } },
            { reward_prices: { weekdays: 80, weekend: 80 } }
        ]
    },
    {
        id: 2,
        name: "Bridgewood",
        stars: 4,
        url: "./src/assets/img/bridgewood.jpg",
        prices: [
            { regularPrices: { weekdays: 160, weekend: 60 } },
            { reward_prices: { weekdays: 110, weekend: 50 } }
        ]
    },
    {
        id: 3,
        name: "Ridgewood",
        url: "./src/assets/img/ridgewood.jpg",
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
        let hotelsPriceDetailList = []
        // Calcular el precio mínimo
        let minPrice = calculateMinPrice(finalResults);
        let hotel = finalResults.filter(hotel => hotel.totalPrice === minPrice);
        console.log("hotel más barato", hotel)
        console.log(minPrice)

        // Ordenar hoteles por su precio total
        const ascendentList = [...finalResults].sort((a, b) => a.totalPrice - b.totalPrice);
        console.log("asc", ascendentList)
        setPriceDetails(ascendentList)
        
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
                url: hotel.url,
                prices: hotel.prices,
                totalPrice: clientWeekdaysPrice + clientWeekendPrice,
                
            });
        });

        console.log("costos finales", hotelsTotalPrices);
        return hotelsTotalPrices;
    }
}

function calculateStars(stars){
    let ranking = ""
    for (i=0; i< stars; i++){
        ranking += "★"
    }
    console.log(ranking)
    return ranking
}


function setFinalResults(finalResults, minPrice){
    let recHotelName = document.getElementById('recomended-hotel-name');
    let recHotelStars = document.getElementById('recomended-hotel-stars');
    let recHotelPrice = document.getElementById('recomended-hotel-price');

    let recHotelImage = document.querySelector(".img")

    if(finalResults.length > 1){
        let stars = finalResults.map(hotel => hotel.stars);
        let mostRanked = Math.min(...stars);
        let firstOption = finalResults.filter((hotel) => hotel.stars == mostRanked)
        recHotelName.innerText = firstOption.hotel;
    }
    
    recHotelName.innerText = finalResults[0].hotel;
    recHotelStars.textContent = calculateStars(finalResults[0].stars)
    recHotelPrice.innerText = `$ ${minPrice.toFixed(2)}`
    recHotelImage.innerHTML = `<img src="${finalResults[0].url}" alt=""></img>`

    
}

function setPriceDetails(sortedList){
    let priceDetails = document.querySelector('.other-options');
                    
    priceDetails.innerHTML = `<h3>Price Detail</h3>`
    
    for(i=0; i < sortedList.length; i++){
        
        priceDetails.innerHTML += `<div class="base-cards detail-options-card">
                        <div>
                            <h4 class="hotel-name">${sortedList[i].hotel}</h4>
                            <div class="stars">***</div>
                        </div>
                        <div class="prices-section">
                            <div>
                                <span class="price-type">Tarifa Regular</span>
                            </div>
                            <div class="other-prices">
                                <div>
                                    <span class="detail-label">Entre Semana</span>
                                    <h5 class="money"><span>$${sortedList[i].prices[0].regular_prices}</h5>
                                </div>
                                <div>
                                    <span class="detail-label">Fin de Semana</span>
                                    <h5 class="money"><span>$</span>00.00</h5>
                                </div>
                            </div>
                        </div>
                        <div class="prices-section">
                            <div >
                                <span class="price-type">Programa de Recompensas</span>
                            </div>
                            <div class="other-prices">
                                <div>
                                    <span class="detail-label">Entre Semana</span>
                                    <h5 class="money"><span>$</span>00.00</h5>
                                </div>
                                <div>
                                    <span class="detail-label">Entre Semana</span>
                                    <h5 class="money"><span>$</span>00.00</h5>
                                </div>
                            </div>
                        </div>
                    </div>`
    }
}

document.addEventListener('DOMContentLoaded', () => {
    isAfiliate();
    seeCheaperHotel(hotels);
});

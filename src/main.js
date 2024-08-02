
// DB
const hotels = [
    {
        id: 1,
        name: "Lakewood",
        stars: 3,
        url: "https://github.com/nsandoya/blr_hotels_tipti_challenge/blob/main/src/assets/img/lakewood.JPEG?raw=true",
        prices: {
            regularPrices: { weekdays: 110, weekend: 90 } ,
            reward_prices: { weekdays: 80, weekend: 80  }
        }
    },
    {
        id: 2,
        name: "Bridgewood",
        stars: 4,
        url: "https://raw.githubusercontent.com/nsandoya/blr_hotels_tipti_challenge/main/src/assets/img/bridgewood.JPG",
        prices: {
            regularPrices: { weekdays: 160, weekend: 60 },
            reward_prices: { weekdays: 110, weekend: 50 }
        }
    },
    {
        id: 3,
        name: "Ridgewood",
        url: "https://github.com/nsandoya/blr_hotels_tipti_challenge/blob/main/src/assets/img/ridgewood.JPG?raw=true",
        stars: 5,
        prices: {
            regularPrices: { weekdays: 220, weekend: 150 },
            reward_prices: { weekdays: 100, weekend: 40 }
        }
    }
];

let checkboxValue = false;


function isAfiliate() {
    let checkboxElement = document.querySelector(".checkbox");
    checkboxElement.addEventListener('change', () => {
        checkboxValue = checkboxElement.checked;
        
    });
}

function calculateStars(stars){
    let ranking = ""
    for (n=0; n< stars; n++){
        ranking += "★"
    }
    return ranking
}

function setDates(firstDate, lastDate){
    const firstDateElement = document.querySelector('#check-in');
    const lastDateElement = document.querySelector('#check-out')

    if(!lastDate){
        lastDate = firstDate
    }

    firstDateElement.innerText = firstDate
    lastDateElement.innerText = lastDate
}

// La función extrae los datos de los inputs tipo 'day' y los procesa, verificando además si los días reservados son fin de semana o entre semana (esto influye también en los precios)
function scanDayByDay() {
    const firstDayInput = document.getElementById('firstDay').value;
    const lastDayInput = document.getElementById('lastDay').value;

    try{
        if (!firstDayInput || !lastDayInput) {
            throw new TypeError("Por favor, ingresa tu fecha de entrada y/o salida");
        }
    
        const firstDay = new Date(firstDayInput + 'T00:00:00');
        const lastDay = new Date(lastDayInput + 'T00:00:00');
    
        setDates(firstDay.toDateString(), lastDay.toDateString()) 
    
        if (firstDay > lastDay) {
            throw new TypeError("La fecha de inicio debe ser anterior o igual a la fecha de fin.");
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


    } catch(err){
        alert(err.message)
        return[]
    }
}
// Calculo puntual de todos los precios de los hoteles
function hotelPrices(hotel, weekdays, weekend, isReward) {
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

// En esta función convergen algunas de las 'piezas' (funciones más pequeñas) construidas hasta ahora. Buscamos conocer los precios de todos los hoteles, según los datos ingresados por el usuario, y ordenar los hoteles en una lista, en función de ese resultado
function calculatePrices(hotels, isReward) {
    let totalWeekend = 0;
    let totalWeekDays = 0;

    let hotelsList = hotels
    let hotelsTotalPrices = [];
    let clientWeek = scanDayByDay();
    //console.log(clientWeek)

    try{
        if(clientWeek.length > 0){
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
                    clientWeek: clientWeek,
                    totalPrice: clientWeekdaysPrice + clientWeekendPrice,
                });
            });
            return hotelsTotalPrices;

        }else{
            //throw new TypeError("Parece que no has indicado tus fechas de reserva. Por favor, intenta nuevamente")
            throw new TypeError("No hay fechas para calcular costo de reserva")
        }
    }catch(err){
        console.log(err.message)
        return[]
    }
}

function calculateMinPrice(finalResults){
    if (!finalResults || finalResults.length === 0) {
        return 0;
    }

    let prices = finalResults.map(hotel => hotel.totalPrice);
    let minPrice = Math.min(...prices);
    
    return minPrice;
}

function seeCheaperHotel(hotels) {
    let resultsContainer = document.querySelector(".results")
    let seeCheaperHotelBtn = document.querySelector(".see-results");

    try{
        seeCheaperHotelBtn.addEventListener('click', () => {
            // Primero, permite la visualización de la sección de resultados
            // Calcula los precios de cada hotel, por cada tipo de cliente (regular y afiliado)
            let finalResults = calculatePrices(hotels, checkboxValue);
            let hotelsPriceDetailList = []
            // Calcula el precio mínimo
            let minPrice = calculateMinPrice(finalResults);
            // A partir del precio total más bajo, busca el hotel más barato y retorna sus datos
            let hotel = finalResults.filter(hotel => hotel.totalPrice === minPrice);
            
            
            // Ordena los hoteles por su precio total
            const ascendentList = [...finalResults].sort((a, b) => a.totalPrice - b.totalPrice);
            
            if (ascendentList){
                //resultsContainer.classList.remove('hide')
                // Atualiza la interfaz de usuario con los nuevos datos obtenidos
                setFinalResults(hotel, minPrice);
                setPriceDetails(ascendentList)
            }else{
                throw new TypeError("No existen resultados que mostrar")
            }
    
        })
        
    }catch(err){
        console.log(err.message)
    }
}

// El hotel más asequible se muestra en pantalla gracias a esta función
function setFinalResults(finalResults, minPrice){
    //console.log(finalResults, "final results")
    let resultsContainer = document.querySelector(".results")
    let recHotelName = document.getElementById('recomended-hotel-name');
    let recHotelStars = document.getElementById('recomended-hotel-stars');
    let recHotelPrice = document.getElementById('recomended-hotel-price');
    let recHotelImage = document.querySelector(".img")

    try{
        if(finalResults.length > 0){
            if(finalResults.length > 1){
                let stars = finalResults.map(hotel => hotel.stars);
                let mostRanked = Math.min(...stars);
                let firstOption = finalResults.filter((hotel) => hotel.stars == mostRanked)
                recHotelName.innerText = firstOption.hotel;
            }

            resultsContainer.classList.remove('hide')
            
            recHotelName.innerText = finalResults[0].hotel;
            recHotelStars.textContent = calculateStars(finalResults[0].stars)
            recHotelPrice.innerText = `$ ${minPrice.toFixed(2)}`
            recHotelImage.innerHTML = `<img src="${finalResults[0].url}" alt=""></img>`
        }else{
            throw new Error("No hay resultados que mostrar")
        }

    }catch(err){
        console.log(err.message)
    }


    
}
// El detalle de precios de cada hotel se muestra posteriormente, bajo la main card, gracias a esta función
function setPriceDetails(sortedList){
    let priceDetails = document.querySelector('.other-options');
                    
    priceDetails.innerHTML = `<h3>Price Detail</h3>`
    
    for(i=0; i < sortedList.length; i++){
        let prices = sortedList[i].prices
        

        let stars = sortedList[i].stars
        let starsToShow = calculateStars(stars)
        
        priceDetails.innerHTML += `<div class="base-cards detail-options-card">
                        <div>
                            <h4 class="hotel-name">${sortedList[i].hotel}</h4>
                            <div class="other-prices">
                                <div class="stars">${starsToShow}</div>
                                <div class="money-light"> $ ${sortedList[i].totalPrice.toFixed(2)}</div>
                            </div>
                        </div>
                        <div class="prices-section">
                            <div>
                                <span class="price-type">Tarifa Regular</span>
                            </div>
                            <div class="other-prices">
                                <div>
                                    <span class="detail-label">Entre Semana</span>
                                    <h5 class="money"><span>$ ${prices.regularPrices.weekdays.toFixed(2)}</h5>
                                </div>
                                <div>
                                    <span class="detail-label">Fin de Semana</span>
                                    <h5 class="money"><span>$ ${prices.regularPrices.weekend.toFixed(2)}</span></h5>
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
                                    <h5 class="money"><span>$ ${prices.reward_prices.weekdays.toFixed(2)}</span></h5>
                                </div>
                                <div>
                                    <span class="detail-label">Fin de Semana</span>
                                    <h5 class="money"><span>$ ${prices.reward_prices.weekend.toFixed(2)}</span></h5>
                                </div>
                            </div>
                        </div>
                    </div>`
    }
}

// Finalmente, todo converge aquí. Las funciones dentro contienen event listeners y event handlers, para trabajar en cuanto el usuario solicite info
document.addEventListener('DOMContentLoaded', () => {
    isAfiliate();
    seeCheaperHotel(hotels);
});

import { calculateStars } from "./hotelCardDetails.js";
// El hotel más asequible se muestra en pantalla gracias a esta función
export function setFinalResults(finalResults, minPrice){
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
export function setPriceDetails(sortedList){
    let priceDetails = document.querySelector('.other-options');
                    
    priceDetails.innerHTML = `<h3>Price Detail</h3>`
    
    for(let i=0; i < sortedList.length; i++){
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
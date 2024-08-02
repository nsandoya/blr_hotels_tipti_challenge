import {calculatePrices, calculateMinPrice} from "../tools/calculatePrices.js";
import {setFinalResults, setPriceDetails} from "./hotelCards.js"

export function seeCheaperHotel(hotels, checkboxValue) {
    //let resultsContainer = document.querySelector(".results")
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
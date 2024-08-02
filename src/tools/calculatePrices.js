import {hotelPrices} from "./hotelPrices.js";
import { scanDayByDay } from "./scanDaybyDay.js";
// En esta función convergen algunas de las 'piezas' (funciones más pequeñas) construidas hasta ahora. Buscamos conocer los precios de todos los hoteles, según los datos ingresados por el usuario, y ordenar los hoteles en una lista, en función de ese resultado
export const calculatePrices = (hotels, isReward) => {
    
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

export function calculateMinPrice(finalResults){
    try{
        if (!finalResults || finalResults.length === 0) {
            throw new TypeError("No hay fechas con las que calcular estadía")
            //return 0;
        }
    
        let prices = finalResults.map(hotel => hotel.totalPrice);
        let minPrice = Math.min(...prices);
        
        return minPrice;

    }catch(err){
        console.log(err.message)
    }
}
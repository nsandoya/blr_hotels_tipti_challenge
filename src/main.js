import {getHotels as fetchHotels} from "./services/getHotels.js";
import {isAfiliate} from "./tools/clientDetails.js";
import {seeCheaperHotel} from "./components/seeCheaperHotelBtn.js"

let checkboxValue = false;

const fetchHotelsData = async () => {
    try {
        const hotels = await fetchHotels();
        return hotels;
    } catch (error) {
        console.error("Error fetching hotels:", error);
        return [];
    }
};

// Finalmente, todo converge aquí. Las funciones dentro contienen event listeners y event handlers, para trabajar en cuanto el usuario solicite info
document.addEventListener('DOMContentLoaded', async () => {
    // Importar desde GitHub la lista online de hoteles
    const hotels_db = await fetchHotelsData(); 
    let checkboxValue = isAfiliate();
    seeCheaperHotel(hotels_db, checkboxValue);
});

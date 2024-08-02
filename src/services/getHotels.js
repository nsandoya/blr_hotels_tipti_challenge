export const getHotels = async () => {
    const url = 'https://raw.githubusercontent.com/nsandoya/blr_hotels_tipti_challenge/main/src/database/hotels.json';
    const options = {
        method: 'GET',
        headers: {
            'X-Content-Type-Options': "nosniff" 
        }
    };
    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log("Datos obtenidos", result);
        return result
    } catch (error) {
        console.error(error);
    }

} 

//export default getHotels
//export default getHotels
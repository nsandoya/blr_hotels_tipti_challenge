const getHotels = async () => {
    const url = 'https://github.com/nsandoya/blr_hotels_tipti_challenge/blob/main/src/database/hotels.json';
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
getHotels()
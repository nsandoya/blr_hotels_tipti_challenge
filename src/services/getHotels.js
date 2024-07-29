export const getHotels = async () => {
    const url = '../database/hotels.json';
    const options = {
        method: 'GET',
        headers: {
            'X-Content-Type-Options': "nosniff" 
        }
    };
    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
        return result
    } catch (error) {
        console.error(error);
    }

} 
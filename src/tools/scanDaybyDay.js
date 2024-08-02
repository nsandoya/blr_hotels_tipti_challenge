import { setDates } from "../components/hotelCardDetails.js";

export function scanDayByDay() {
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
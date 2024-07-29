export function scanDayByDay() {
    // Obtener las fechas de inicio y fin del input
    const firstDayInput = document.getElementById('firstDay').value;
    const lastDayInput = document.getElementById('lastDay').value;
    
    // Verificar si se han seleccionado ambas fechas
    if (!firstDayInput || !lastDayInput) {
        alert("Por favor, elige ambas fechas.");
        return;
    }

    // Convertir las fechas del input a objetos Date
    const firstDay = new Date(firstDayInput);
    const lastDay = new Date(lastDayInput);
    
    // Verificar que la fecha de inicio sea menor o igual a la fecha de fin
    if (firstDay > lastDay) {
        alert("La fecha de inicio debe ser anterior o igual a la fecha de fin.");
        return;
    }

    // Crear un array para almacenar los results
    const results = [];
    
    // Iterar sobre cada día en el rango
    let currentDate = firstDay;
    while (currentDate <= lastDay) {
        const weekDay = currentDate.getDay();
        const isWeekend = (weekDay === 6 || weekDay === 5);
        results.push({
            fecha: currentDate.toISOString().split('T')[0],
            tipo: isWeekend ? 'weekend' : 'weekday'
        });
        
        // Avanzar al siguiente día
        currentDate.setDate(currentDate.getDate() + 1);
    }

    console.log(results)
    return results
}

/* import getHotels from "./services/getHotels" */
/* import {hotels} from "./database/hotels" */
/* import {scanDayByDay} from "./tools/scanDaybyDay" */

/* window.addEventListener('load', async () => {
    const hotels = await getHotels();
    console.log(hotels);
}); */

/* export const prueba = async () => {
    const hotels = await getHotels();
    console.log(hotels);
} */
const hotels = [
        [
            {
                id: 1,
                name: "Lakewood",
                stars: 3,
                prices:[
                    { regular_prices: 
                        {
                            weekdays: 110,
                            weekend: 90
                        }
                    },
                    { reward_prices: 
                        {
                            weekdays: 80,
                            weekend: 80
                        } 
                    }
                ]
            },
            {
                id: 2,
                name: "Bridgewood",
                stars: 4,
                prices:[
                    { regular_prices: 
                        {
                            weekdays: 160,
                            weekend: 60
                        }
                    },
                    { reward_prices: 
                        {
                            weekdays: 110,
                            weekend: 50
                        } 
                    }
                ]
            },
            {
                id: 3,
                name: "Ridgewood",
                stars: 5,
                prices:[
                { regular_prices: 
                        {
                            weekdays: 220,
                            weekend: 150
                        }
                    },
                    { reward_prices: 
                        {
                            weekdays: 100,
                            weekend: 40
                        } 
                    }
                ]
            }
        ] 
    ]
let checkboxValue = false

function isAfiliate(){
    let checkboxElement = document.querySelector(".checkbox");
    checkboxElement.addEventListener('click', () => {
        if (checkboxElement.checked) {
            checkboxValue = true
            console.log('El checkbox está marcado', checkboxValue);
            // Aquí puedes llamar a la función que deseas ejecutar
        } else {
            checkboxValue = false;
            console.log('El checkbox no está marcado', checkboxValue);
            // Aquí puedes realizar otras acciones si es necesario
        }
    });
}

function scanDayByDay() {
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
            date: currentDate.toISOString().split('T')[0],
            type: isWeekend ? 'weekend': 'weekday'
        });
        
        // Avanzar al siguiente día
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return results
}

function calculatePrices(){
    let totalWeekends = 0
    let totalWeekDays = 0
    //console.log(hotels)
    let clientWeek = scanDayByDay()
    console.log("client week", clientWeek)

    for (i = 0; i < clientWeek.length; i++){
        clientWeek[i]["type"] == "weekend" ? totalWeekends += 1 : totalWeekDays += 1
        console.log(clientWeek[i]["type"])
    }
    console.log("cuenta de tipos de días",totalWeekDays, totalWeekends)
    
}


isAfiliate()


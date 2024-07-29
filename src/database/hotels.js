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

export {hotels}
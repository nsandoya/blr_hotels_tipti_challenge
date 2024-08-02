export function calculateStars(stars){
    let ranking = ""
    for (let n=0; n< stars; n++){
        ranking += "★"
    }
    return ranking
}

export function setDates(firstDate, lastDate){
    const firstDateElement = document.querySelector('#check-in');
    const lastDateElement = document.querySelector('#check-out')

    if(!lastDate){
        lastDate = firstDate
    }

    firstDateElement.innerText = firstDate
    lastDateElement.innerText = lastDate
}
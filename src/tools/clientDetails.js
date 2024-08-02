
export function isAfiliate() {
    //let checkboxValue = false
    let checkboxElement = document.querySelector(".checkbox");
    checkboxElement.addEventListener('change', () => {
        let checkboxValue = checkboxElement.checked;
        return checkboxValue
    });
}
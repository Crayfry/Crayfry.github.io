import { NAMES } from "./characters.js";
const inputElement = document.querySelector("#input");

inputElement.addEventListener("input", onInput);

function onInput() {
    removeAutoCompleteDropdown();
    if(inputElement.value.length === 0)
        return;
    var temp = inputElement.value.substring(0,1).toUpperCase();
    const userInput = temp + inputElement.value.substring(1).toLowerCase();
    console.log(userInput);
    const filteredNames = [];
    NAMES.forEach((value) => {
        if (value.substring(0, userInput.length) === userInput)
            filteredNames.push(value);
    })
    
    createAutoCompleteDropdown(filteredNames);
}

function createAutoCompleteDropdown(list){
    const listElement = document.createElement("ul");
    listElement.className = "autocompletelist";
    listElement.id = "autocompletelist";
    
    list.forEach((value) => {
        const listItem = document.createElement("li");
        const button = document.createElement("button");
        button.innerHTML = value;
        button.addEventListener("click", onButtonClick);
        listItem.appendChild(button);
        listElement.appendChild(listItem);
    })

    document.querySelector("#input-box").appendChild(listElement);
}

function removeAutoCompleteDropdown(){
    const listElement = document.querySelector("#autocompletelist");
    if (listElement)
        listElement.remove();
}

function onButtonClick(e){
    e.preventDefault();

    const button = e.target;
    inputElement.value = button.innerHTML;

    removeAutoCompleteDropdown();
}
import { NAMES } from "./characters.js";
import { OperatorInfo } from "./operatorDetails.js";
const answer = NAMES[Math.floor(Math.random() * NAMES.length)]
const answerInfo = getOperatorInfo(answer);
console.log(answer);

const guessButton = document.getElementById("guessbutton");
guessButton.addEventListener("click", onGuess);

function onGuess(){
    const userInput = document.getElementById("input").value;
    if(!NAMES.includes(userInput))
        return;

    const info = getOperatorInfo(userInput);
    const divElement = document.getElementById("guess-history");
    const newDiv = document.createElement("div");
    newDiv.className = "center";
    info.forEach((value, i) => {
        const newBox = document.createElement("div");
        newBox.className = "box";
        if(i === 4)
            newBox.innerHTML += "Year ";

        newBox.innerHTML += value;

        if(value === answerInfo[i]) {
            newBox.innerHTML += " ✓";
            newBox.className += " green";
        } else if(i === 1 || i === 5) {
            let listCommas = [];

            for(let j = 0; j < value.length; j++){
                if(value[j] == ",")
                    listCommas.push(j);
            }
            let lastIndex = 0;
            let close = false;
            for(let j = 0; j < listCommas.length; j++){
                if(answerInfo[i].includes(value.substring(lastIndex, listCommas[j]))){
                    newBox.innerHTML += " ~";
                    newBox.className += " yellow";
                    close = true;
                }
                lastIndex = listCommas[j] + 2;
            }
            if(answerInfo[i].includes(value.substring(lastIndex))){
                newBox.innerHTML += " ~";
                newBox.className += " yellow";
                close = true;
            }

            if(!close){
                newBox.innerHTML += " X";
                newBox.className += " red";
            }
        } else if (i === 4) {
            if(value < answerInfo[i]) {
                newBox.innerHTML += " ↑";
                newBox.className += " red";
            } else {
                    newBox.innerHTML += " ↓";
                newBox.className += " red";
            }
        } else {
            newBox.innerHTML += " X";
            newBox.className += " red";
        }
        
        newDiv.appendChild(newBox);
    })
    divElement.appendChild(newDiv);

    document.getElementById("input").value = "";

    if(userInput === answer){
        console.log("Yipe!!!");
    }
}

function getOperatorInfo(name){
    const returnArray = OperatorInfo.find((array) => {
        if(array[0] === name)
            return array;
    })
    return returnArray;
}
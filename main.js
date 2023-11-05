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
        newBox.innerHTML = value;
        if(value === answerInfo[i]){
            newBox.innerHTML += "\n✓";
        }
        else if(!(i === 3 || i === 4 || i === 5)){
            newBox.innerHTML += "\nX";
        } else if(value < answerInfo[i]){
            newBox.innerHTML += "\n↑";
        } else {
            newBox.innerHTML += "\n↓";
        }
        newDiv.appendChild(newBox);
    })
    divElement.appendChild(newDiv);

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
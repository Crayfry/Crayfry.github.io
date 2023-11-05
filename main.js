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
        if(i === 5)
            newBox.innerHTML += "Year ";
        newBox.innerHTML += value;
        if(!(info[0] === "Nokk") && i === 8)
            newBox.innerHTML += " m";
        if(!(info[0] === "Nokk") && i === 9)
            newBox.innerHTML += " kgs";
        if(value === answerInfo[i]) {
            newBox.innerHTML += " ✓";
            newBox.className += " green";
        } else if(i === 2) {
            if(value.indexOf(",") > 0 && answerInfo[i].includes(value.substring(0, value.indexOf(",")))) {
                newBox.innerHTML += " ~";
                newBox.className += " yellow";
            } else if (value.indexOf(",") > 0 && answerInfo[i].includes(value.substring(value.indexOf(",")))){
                newBox.innerHTML += " ~";
                newBox.className += " yellow";
            } else {
                newBox.innerHTML += " X";
                newBox.className += " red";
            }
        } else if (i === 5 || i === 8 || i === 9 || i == 10) {
            if(value < answerInfo[i]) {
                newBox.innerHTML += " ↑";
                newBox.className += " red";
            } else {
                if(!(info[0] === "Nokk" && (i === 8 || i === 9 || i == 10)))
                    newBox.innerHTML += " ↓";
                newBox.className += " red";
            }
        } else {
            if(!(info[0] === "Nokk" && i === 11))
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
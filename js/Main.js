"use strict";

import ScoreCard from "./ScoreCard.js";
import DiceArea from "./DiceArea.js";
class Main{
    static main(){
        const btnStartGame = document.getElementById("btnStartGame");
        let scoreCard = new ScoreCard();
        let diceArea = new DiceArea(scoreCard);
        
        for (let link of diceArea.getDiceLinks()) {
            link.setAttribute("data-enabled", "true");
        }
        document.getElementById("attemptLbl").innerHTML = "";
        btnStartGame.addEventListener("click", ()=> {
            window.location.reload();
        });
    }
}

Main.main();

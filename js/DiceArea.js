"use strict";

import Dice from "./Dice.js";

export default class DiceArea {
    constructor(newScoreCard) {
        this.attempt = 0;
        this.turn = 1;
        this.addDiceClick();
        this.diceElements = document.querySelectorAll(".dice");
        this.diceLinks = document.querySelectorAll(".diceLink");
        this.addRollDicesbtn(newScoreCard);
        this.msgTurns = document.getElementById("msgTurns");
        this.diceRolls = [];
        this.btns = document.getElementsByClassName("scoreBtn")

    }

    getDiceLinks() {
        return document.querySelectorAll(".diceLink");
    }

    resetDices() {
        for (const diceElement of this.diceElements) {
            diceElement.setAttribute("src", "img/0.png");
        }
    }

    addDiceClick() {
        for (const link of this.getDiceLinks()) {
            link.addEventListener("click", (e) => {
                //To DO: Vanaf de tweede worp vastzetten??
                if (this.attempt > 0) {
                    let bool = (link.getAttribute("data-enabled") === "true") ? "false" : "true";
                    link.setAttribute("data-enabled", bool);
                }
            });
        }
    }

    //set of 5 dice
    rollDices() {
        this.diceRolls = new Array();
        for (const diceElement of this.getDiceLinks()) {
            if (diceElement.getAttribute("data-enabled") === "true") {
                const dice = new Dice();
                diceElement.firstChild.setAttribute("src", "img/" + dice.getValue() + ".png");
                this.diceRolls.push(dice.getValue());
            } else {
                const value = diceElement.firstChild.getAttribute("src")[4];//substring 4
                this.diceRolls.push(parseInt(value));
            }
        }
        return this.diceRolls;
    }

    addRollDicesbtn(scoreCard) {
        btnRollDices.addEventListener("click", (e) => {

            if (this.attempt < 3) {
                this.diceRolls = this.rollDices();
                this.attempt++;
            } else {
                this.attempt = 1;
                this.msgTurns.innerText = "Roll dice to play, you have a total of "+(13-this.turn)+ " (3 throws / turn)";
                this.turn++;
                for (const link of this.getDiceLinks()) {
                    link.setAttribute("data-enabled", "true");
                }
                this.diceRolls = this.rollDices();
            }
            scoreCard.setScoreBtns(this.diceRolls, this.attempt);
            document.getElementById("attemptLbl").innerText = "Attemp:" + this.attempt + " / 3";
            if (this.turn === 14) {
                location.reload(true);
                document.getElementById("attemptLbl").innerText = "new GAME"
            }
        });
    }
}

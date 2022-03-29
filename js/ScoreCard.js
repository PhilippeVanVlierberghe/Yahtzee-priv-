"use strict";
/*TO DO: btnRollDices is een knop zonder dat je deze moet opzoeken via document.getElementById()*/
export default class ScoreCard {
    constructor() {
        this.diceRoll = new Array();
        this.rowTotal = document.getElementById("total");
        this.rowTotalScore = document.getElementById("totalScore");
        this.btns = document.getElementsByClassName("scoreBtn");
        this.btnOne = document.getElementById("btnOne");
        this.btnTwo = document.getElementById("btnTwo");
        this.btnThree = document.getElementById("btnThree");
        this.btnFour = document.getElementById("btnFour");
        this.btnFive = document.getElementById("btnFive");
        this.btnSix = document.getElementById("btnSix");
        this.btnThreeOfKind = document.getElementById("btnThreeOfKind");
        this.btnFourOfKind = document.getElementById("btnFourOfKind");
        this.btnFullHouse = document.getElementById("btnFullHouse");
        this.btnSmallStraight = document.getElementById("btnSmallStraight");
        this.btnLargeStraight = document.getElementById("btnLargeStraight");
        this.btnChance = document.getElementById("btnChance");
        this.btnYahtzee = document.getElementById("btnYahtzee");
        this.resetScoreValues();
        bonus.innerTex = 0;
        const btns = document.getElementsByClassName("scoreBtn")
        for (let index = 0; index < btns.length; index++) {
            btns[index].addEventListener("click", () => {
                btns[index].classList.remove("red");
                btns[index].classList.remove("green");
                btns[index].classList.add("orange");
                btnRollDices.disabled = false;
                for (let index = 0; index < btns.length; index++) {
                    btns[index].disabled = true;
                }
                let totscore = parseInt(this.rowTotalScore.innerText);
                if (index < 6) {
                    this.rowTotal.innerText = parseInt(this.rowTotal.innerText) + parseInt(btns[index].innerText);
                    if (parseInt(this.rowTotal.innerText) >= 63) {
                        bonus.innerText = 35;
                        totscore += parseInt(bonus.innerText);
                    }
                }
                totscore += parseInt(btns[index].innerText);
                this.rowTotalScore.innerText = totscore;
            });
        }

    }

    resetScoreValues() {
        const btns = document.getElementsByClassName("scoreBtn")
        for (let index = 0; index < btns.length; index++) {
            btns[index].innerHTML = 0;
            btns[index].disabled = true;
        }
    }

    disableScoreButtons(attempt) {
        if (attempt === 3) {
            for (let index = 0; index < this.btns.length; index++) {
                if (!this.btns[index].classList.contains("orange")) {
                    this.btns[index].disabled = false;
                }
            }
            btnRollDices.disabled = true;
        } else {
            for (let index = 0; index < this.btns.length; index++) {
                if (!this.btns[index].classList.contains("orange")) {
                    this.btns[index].innerText = 0;
                }
                this.btns[index].disabled = true;
            }
        }
    }

    setScoreBtns(diceRolls, attempt) {

        this.disableScoreButtons(attempt);

        if (this.isYahtzee(diceRolls)) {
            if (!this.btnYahtzee.classList.contains("orange")) {
                this.btnYahtzee.innerText = 50;
                this.btnYahtzee.classList.replace("red", "green");
            }
        }
        if (this.isLargeStraigh(diceRolls)) {
            if (!this.btnLargeStraight.classList.contains("orange")) {
                this.btnLargeStraight.innerText = 40;
                this.btnLargeStraight.classList.replace("red", "green");
            }
        }
        if (this.isSmallStraigh(diceRolls)) {
            if (!this.btnSmallStraight.classList.contains("orange")) {
                this.btnSmallStraight.innerText = 30;
                this.btnSmallStraight.classList.replace("red", "green");
            }
        }
        if (this.isFullHouse(diceRolls)) {
            if (!this.btnFullHouse.classList.contains("orange")) {
                this.btnFullHouse.innerText = 25;
                this.btnFullHouse.classList.replace("red", "green");
            }
        }
        if (this.getFourOfAkind(diceRolls) != 0) {
            if (!this.btnFourOfKind.classList.contains("orange")) {
                this.btnFourOfKind.innerText = this.getSumOfArray(diceRolls);
                this.btnFourOfKind.classList.replace("red", "green");
            }
        }
        if (this.getThreeOfAkind(diceRolls) != 0) {
            if (!this.btnThreeOfKind.classList.contains("orange")) {
                this.btnThreeOfKind.innerText = this.getSumOfArray(diceRolls);
                this.btnThreeOfKind.classList.replace("red", "green");
            }
        }
        this.setDefaultValue(diceRolls);
        if (!this.btnChance.classList.contains("orange")) {
            this.btnChance.innerText = this.getSumOfArray(diceRolls);
            this.btnChance.classList.replace("red", "green");
        }

        for (let index = 0; index < this.btns.length; index++) {
            if (parseInt(this.btns[index].innerText) === 0 && !this.btns[index].classList.contains("orange")) {
                this.btns[index].classList.replace("green", "red");
            }
        }
    }

    getDefaultValue(array) {
        let values = [];
        for (const e in this.getOccurrenceArray(array)) {
            values.push([this.getOccurrenceArray(array)[e][0], this.getOccurrenceArray(array)[e][1]]);
        }
        return values;
    }

    getThreeOfAkind(array) {
        let fourOfNumber = 0;
        this.getOccurrenceArray(array).forEach((v) => {
            if (v[1] === 3) {
                fourOfNumber = v[0];
            }
        });
        return fourOfNumber;
    }

    getFourOfAkind(array) {
        let fourOfNumber = 0;
        this.getOccurrenceArray(array).forEach((v) => {
            if (v[1] === 4) {
                fourOfNumber = v[0];
            }
        });
        return fourOfNumber;
    }

    isFullHouse(array) {
        if (this.getThreeOfAkind(array)) {
            for (let i = 0; i < array.length; i++) {
                if (array[i] === this.getThreeOfAkind(array)) {
                    array = array.filter(e => e != array[i])
                }
            }
            if (array[0] === array[1]) {
                return true;
            }
        }
        return false;
    }

    isSmallStraigh(array) {
        array = array.sort();
        array = array.filter((c, index) => {
            return array.indexOf(c) === index;
        });

        if (array.length < 4) {
            return false;
        }
        let teller = 0;
        for (let i = 0; i < array.length; i++) {
            if (isNaN(array[i + 1])) {
                return true;
            }
            if (teller < 3 && (array[i] != array[i + 1] - 1)) {
                return false;
            }
            teller++;
        }
        return true;
    }

    isLargeStraigh(array) {
        array = array.sort();
        array = array.filter((c, index) => {
            return array.indexOf(c) === index;
        });
        if (array.length != 5) {
            return false;
        }
        for (let i = 0; i < array.length; i++) {
            if (isNaN(array[i + 1])) {
                return true;
            }
            if ((array[i] != array[i + 1] - 1)) {
                return false;
            }
        }
    }

    isYahtzee(array) {
        return array.every(
            function (value, _, array) {
                return array[0] === value;
            }
        );
    }

    setDefaultValue(diceRolls) {
        this.getDefaultValue(diceRolls).forEach((v) => {
            switch (v[0]) {
                case 1:
                    if (!this.btnOne.classList.contains("orange")) {
                        this.btnOne.innerText = 1 * v[1];
                        (parseInt(this.btnOne.innerText) > 0) ? this.btnOne.classList.replace("red", "green") : this.btnOne.classList.replace("green", "red");

                    }
                    break;
                case 2:
                    if (!this.btnTwo.classList.contains("orange")) {
                        this.btnTwo.innerText = 2 * v[1];
                        (parseInt(this.btnTwo.innerText) > 0) ? this.btnTwo.classList.replace("red", "green") : this.btnTwo.classList.replace("green", "red");

                    }
                    break;
                case 3:
                    if (!this.btnThree.classList.contains("orange")) {
                        this.btnThree.innerText = 3 * v[1];
                        (parseInt(this.btnThree.innerText) > 0) ? this.btnThree.classList.replace("red", "green") : this.btnThree.classList.replace("green", "red");

                    }
                    break;
                case 4:
                    if (!this.btnFour.classList.contains("orange")) {
                        this.btnFour.innerText = 4 * v[1];
                        (parseInt(this.btnFour.innerText) > 0) ? this.btnFour.classList.replace("red", "green") : this.btnFour.classList.replace("green", "red");

                    }
                    break;
                case 5:
                    if (!this.btnFive.classList.contains("orange")) {
                        this.btnFive.innerText = 5 * v[1];
                        (parseInt(this.btnFive.innerText) > 0) ? this.btnFive.classList.replace("red", "green") : this.btnFive.classList.replace("green", "red");

                    }
                    break;
                case 6:
                    if (!this.btnSix.classList.contains("orange")) {
                        this.btnSix.innerText = 6 * v[1];
                        (parseInt(this.btnSix.innerText) > 0) ? this.btnSix.classList.replace("red", "green") : this.btnSix.classList.replace("green", "red");

                    }
                    break;
            }
        })
    }

    getSumOfArray(array) {
        let sum = array.reduce(function (a, b) {
            return a + b;
        }, 0);
        return sum;
    }

    getOccurrenceArray(array) {
        let count = 0;
        let OccurrenceArray = []
        for (let i = 1; i <= 6; i++) {
            array.forEach((nr) => {
                if (nr === i) {
                    count++;
                }
            }),
                OccurrenceArray.push([i, count]);
            count = 0;
        }
        return OccurrenceArray;
    }
}

"use strict";
export default class Dice {

    constructor(id) {
        this.element = document.getElementById(id);
        this.value = this.rollDice();
        this.isSave=false;
    }

    rollDice(){
        return Math.floor(Math.random() * 6) + 1;
    }
    
    getValue(){
        return this.value;
    }
}

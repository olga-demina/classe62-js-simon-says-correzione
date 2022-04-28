// Descrizione:
// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
// Dopo 30 secondi l'utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.


const timeForNumbers = 3000;
const numbersQuantity = 5;

// 1. Generare 5 numeri casuali non ripetuti
const randomNumbers = generateRndNumbersArray(numbersQuantity);
console.log(randomNumbers);

// 2. Visualizzare i 5 numeri nella pagina
const numbersContainer = document.getElementById("numbers-to-memorize");
numbersContainer.innerHTML = randomNumbers;

// 3. Dopo 30 secondi 
setTimeout(function() {
    // - nascondere i numeri
    numbersContainer.innerHTML = "";
    

}, timeForNumbers);

// 4. Dopo 31 secondi 
setTimeout(function() {
    // - far comparire il prompt per 5 volte
        // - per ogni prompt dobbiamo salvare il numero dell'utente nell'array
    const userNumbersArray = getUserNumbers(numbersQuantity);
    console.log(userNumbersArray);

    // - confrontare i due array
    const guessedNumbers = checkCommonItems(randomNumbers, userNumbersArray);
    console.log(guessedNumbers);

    // - mostrare quante e quali risposte sono nell'array originale 
    showResult(guessedNumbers);

}, (timeForNumbers + 1000));
   


// FUNCTIONS
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

/**
 * Description genera un array di numeri random non ripetuti di una data lunghezza
 * @param {Number} arrayLength -> lunghezza dell'array da generare
 * @returns {Array} -> array di numeri random 
 */
function generateRndNumbersArray(arrayLength) {
    const numbersArray = [];
    while(numbersArray.length < arrayLength) {
        const rndNUmber = getRndInteger(1, 100);
        if (!numbersArray.includes(rndNUmber)) {
            numbersArray.push(rndNUmber);
        }
    } 
    return numbersArray;
}

/**
 * Description la funzione che chiede all'utente un numero numbersQuantity volte e li salva nell'array
 * @param {Number} numbersQuantity -> la quantità di numeri da chiedere
 * @returns {Array}  numeri inseriti dall'utente 
 */
function getUserNumbers(numbersQuantity) {
    const userNumbersArray = [];
    for (let i = 0; i < numbersQuantity; i++) {
        const userNUmber = parseInt(prompt("Dimmi un numero che hai memorizzato"));
        userNumbersArray.push(userNUmber);
    }
   return userNumbersArray;
}

/**
 * Description verifica quali sono gli elelmenti dell'array arrayToCheck che sono presenti all'interno dell'array di orignilArray e inserisce gli elelmenti corrispondenti all'interno del array risultante
 * @param {Array} originalArray -> array base
 * @param {Array} arrayToCheck -> array da confrontare con quello base
 * @returns {Array} -> array di elemnti corrispendi tra i due array 
 */
function checkCommonItems(originalArray, arrayToCheck) {
    const resultArray = [];
    for (let i = 0; i < originalArray.length; i++) {
        //  prelevo l'elemento corrente
        const currentElement = originalArray[i];
        // se questo elmento è incluso nell'arrayToCheck lo pusho nell'array risultante
        if (arrayToCheck.includes(currentElement)) {
            resultArray.push(currentElement);
        }
    }
    return resultArray;
}

/**
 * Description: mostra il risultato del gioco con punteggio e i nueri indovinati
 * @param {any} guessedNumbersArray -> l'array di numeri indovinati
 */
function showResult(guessedNumbersArray) {
    // nell'elmento DOM preimpostato inserisco il mesasggio del punteggio e i numeri
    let message = `Hai indovinato ${guessedNumbersArray.length} numer`;

    if(guessedNumbersArray.length === 1) {
        message += "o";
    } else {
        message += "i";
    }

    message += `: ${guessedNumbersArray}`;

    document.getElementById("result").innerHTML = message;
}
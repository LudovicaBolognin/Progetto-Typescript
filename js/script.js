"use strict";
// Classe User con 0 credito e 0 chiamate come inizio
class User {
    constructor(nome, cognome) {
        this.nome = nome;
        this.cognome = cognome;
        this.caricaCredito = 0;
        this.numeroChiamate = 0;
    }
    ricarica(unaRicarica) {
        this.caricaCredito += unaRicarica;
    }
    chiamata(minutiDurata) {
        let costoChiamata = (minutiDurata + 1) * 0.2; //scatto alla risposta
        if (costoChiamata > this.caricaCredito) {
            console.log('Il tuo credito è insufficiente.');
        }
        else {
            this.caricaCredito -= costoChiamata;
            this.numeroChiamate++;
        }
    }
    numemro404() {
        return this.caricaCredito;
    }
    getNumeroChiamate() {
        return this.numeroChiamate;
    }
    azzeraChiamate() {
        this.numeroChiamate = 0;
    }
}
let FirstUser = new User('Primo', 'Utente');
let SecondUser = new User('Secondo', 'Utente');
let ThirdUser = new User('Terzo', 'Utente');
FirstUser.ricarica(20);
FirstUser.chiamata(5);
FirstUser.chiamata(7);
SecondUser.ricarica(20);
console.log(FirstUser);
console.log(SecondUser);
console.log(ThirdUser);
//FirstUser.azzeraChiamate();
//console.log(FirstUser);

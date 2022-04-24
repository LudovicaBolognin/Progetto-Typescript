"use strict";
// Form e Smartphone
let btnCrea = document.querySelector('#btnCreaUtente');
let btnEffChiamata = document.querySelector('#effettuaChiamata');
let btnTerChiamata = document.querySelector('#terminaChiamata');
let btnSalResiduo = document.querySelector('#saldoResiduo');
let btnRicarica = document.querySelector('#btnRicarica');
let spanCredito = document.querySelector('#creditoTotale');
let spanCosto = document.querySelector('#costo');
let select = document.querySelector('#ricarica');
let ric = document.querySelector('#ric');
let chiamateEff = document.querySelector('#chiamateEffettuate');
let errore = document.createElement('p');
let content = document.querySelector('.content');
content.appendChild(errore);
// Classe User con 0 credito e 0 chiamate come inizio
class Utente {
    constructor(nome, cognome) {
        this.nome = nome;
        this.cognome = cognome;
        this.caricaCredito = 0;
        this.numeroChiamate = 0;
    }
    ricarica(unaRicarica) {
        this.caricaCredito += unaRicarica;
    }
    chiamata(secondiDurata) {
        let costoChiamata = (secondiDurata + 60) * (0.2 / 60); //scatto alla risposta
        if (costoChiamata > this.caricaCredito) {
            errore.innerText = 'Il tuo credito è insufficiente.';
        }
        else {
            this.caricaCredito -= costoChiamata;
            this.numeroChiamate++;
        }
        spanCosto.innerText = costoChiamata.toFixed(2) + " €";
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
let arrayUtente = [];
// Oggetto utente di classe Utente
btnCrea === null || btnCrea === void 0 ? void 0 : btnCrea.addEventListener('click', () => {
    let nomeUtente = document.querySelector('#nome');
    let cognomeUtente = document.querySelector('#cognome');
    let utente = new Utente(String(nomeUtente.value), String(cognomeUtente.value));
    let nuovoUtente = document.querySelector('#nuovoUtente');
    nuovoUtente.innerText = "Benvenutə, " + utente.nome + " " + utente.cognome + "!";
    let prova = document.createElement('p');
    prova.innerText = "Prova ad effettuare una chiamata, " + utente.nome + ", cliccando sull'apposito bottone nel display qui sotto.";
    let header = document.querySelector('header');
    header.appendChild(prova);
    arrayUtente.push(utente);
});
// Cronometro per Chiamate
let hrs = 0;
let min = 0;
let sec = 0;
let timer;
let cronometro = document.querySelector('#tempo');
let minChiamata;
print();
function setCronometro() {
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
        if (min >= 60) {
            min = 0;
            hrs++;
        }
    }
    print();
}
function print() {
    cronometro.innerHTML = (hrs > 9 ? hrs : '0' + hrs) + ':' + (min > 9 ? min : '0' + min) + ':' + (sec > 9 ? sec : '0' + sec);
}
function start() {
    timer = setInterval(setCronometro, 1000);
}
function stop() {
    clearInterval(timer);
    //print();
    hrs = 0;
    min = 0;
    sec = 0;
}
btnEffChiamata === null || btnEffChiamata === void 0 ? void 0 : btnEffChiamata.addEventListener('click', () => {
    console.log(arrayUtente);
    minChiamata = (new Date()).getSeconds();
    start();
});
btnTerChiamata === null || btnTerChiamata === void 0 ? void 0 : btnTerChiamata.addEventListener('click', () => {
    stop();
    let minFineChiamata = (new Date()).getSeconds();
    let tempoChiamata = minFineChiamata - minChiamata;
    arrayUtente[0].chiamata(tempoChiamata);
    console.log(tempoChiamata);
    chiamateEff.innerText = String(arrayUtente[0].getNumeroChiamate());
});
btnSalResiduo === null || btnSalResiduo === void 0 ? void 0 : btnSalResiduo.addEventListener('click', () => {
    spanCredito.innerText = arrayUtente[0].numemro404().toFixed(2) + " €";
    errore.innerText = '';
});
btnRicarica === null || btnRicarica === void 0 ? void 0 : btnRicarica.addEventListener('click', () => {
    arrayUtente[0].ricarica(Number(select.value));
    ric.innerText = select.value;
});

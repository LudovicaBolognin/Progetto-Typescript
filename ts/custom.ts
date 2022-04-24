// Form e Smartphone
let btnCrea: HTMLButtonElement | null = document.querySelector('#btnCreaUtente')
let btnEffChiamata: HTMLButtonElement | null = document.querySelector('#effettuaChiamata');
let btnTerChiamata: HTMLButtonElement | null = document.querySelector('#terminaChiamata');
let btnSalResiduo: HTMLButtonElement | null = document.querySelector('#saldoResiduo');
let btnRicarica: HTMLButtonElement | null = document.querySelector('#btnRicarica');
let spanCredito = <HTMLSpanElement> document.querySelector('#creditoTotale');
let spanCosto = <HTMLSpanElement> document.querySelector('#costo');
let select = <HTMLSelectElement>document.querySelector('#ricarica');
let ric = <HTMLSpanElement> document.querySelector('#ric');
let chiamateEff = <HTMLSpanElement> document.querySelector('#chiamateEffettuate');
let errore = <HTMLParagraphElement>document.createElement('p');
let content = <HTMLDivElement>document.querySelector('.content');
content.appendChild(errore);

// Interfaccia Smartphone
interface ISmartphone {
    caricaCredito: number; // euro disponibili per chiamate
    numeroChiamate: number;
}

// Classe User con 0 credito e 0 chiamate come inizio
class Utente implements ISmartphone {
    caricaCredito!: number; 
    numeroChiamate!: number;
    nome: string;
    cognome: string;
    constructor(nome: string, cognome: string) {
        this.nome = nome;
        this.cognome = cognome;
        this.caricaCredito = 0;
        this.numeroChiamate = 0;
    }
    public ricarica(unaRicarica: number): void {
        this.caricaCredito += unaRicarica;
    }
    public chiamata(secondiDurata: number): void {
        let costoChiamata: number = (secondiDurata+60) * (0.2/60); //scatto alla risposta
        if(costoChiamata > this.caricaCredito){ 
            errore.innerText = 'Il tuo credito è insufficiente.';
        } else {
        this.caricaCredito -= costoChiamata;
        this.numeroChiamate ++;
        }
        spanCosto.innerText = costoChiamata.toFixed(2) + " €";
    }
    public numemro404(): number {
        return this.caricaCredito;
    }
    public getNumeroChiamate(): number {
        return this.numeroChiamate;
    }
    public azzeraChiamate(): void {
        this.numeroChiamate = 0;
    }
}
let arrayUtente: any = [];
// Oggetto utente di classe Utente
btnCrea?.addEventListener('click', () => {
    let nomeUtente = <HTMLInputElement> document.querySelector('#nome');
    let cognomeUtente = <HTMLInputElement> document.querySelector('#cognome');
    let utente = new Utente(String(nomeUtente.value), String(cognomeUtente.value));
    let nuovoUtente = <HTMLElement> document.querySelector('#nuovoUtente');
    nuovoUtente.innerText = "Benvenutə, " + utente.nome + " " + utente.cognome + "!"
    let prova : HTMLParagraphElement = <HTMLParagraphElement>document.createElement('p');
    prova.innerText = "Prova ad effettuare una chiamata, " + utente.nome + ", cliccando sull'apposito bottone nel display qui sotto.";
    let header = <HTMLElement> document.querySelector('header');
    header.appendChild(prova);
    arrayUtente.push(utente);
});

// Cronometro per Chiamate
let hrs: number = 0;
let min: number = 0;
let sec: number = 0;
let timer: number;
let cronometro = <HTMLSpanElement> document.querySelector('#tempo');
let minChiamata: number;
print();
function setCronometro(){
    sec++;
    if(sec >= 60) {
        sec = 0;
        min++;
        if(min >= 60) {
            min = 0;
            hrs++;
        }
    }
    print();
}
function print(): void {
    cronometro.innerHTML = (hrs > 9 ? hrs : '0'+hrs) + ':' + (min > 9 ? min : '0'+min) + ':' + (sec > 9 ? sec : '0'+sec);
}
function start(): void {
    timer = setInterval(setCronometro, 1000);
}
function stop(): void {
    clearInterval(timer);
    print();
}

btnEffChiamata?.addEventListener('click', () => {
    console.log(arrayUtente);
    minChiamata = (new Date()).getSeconds();
    start();
    
});
btnTerChiamata?.addEventListener('click', () => {
    stop();
    let minFineChiamata = (new Date()).getSeconds();
    let tempoChiamata = minFineChiamata - minChiamata;
    arrayUtente[0].chiamata(tempoChiamata);
    console.log(tempoChiamata);
    chiamateEff.innerText = String(arrayUtente[0].getNumeroChiamate());
});
btnSalResiduo?.addEventListener('click', () => {
    spanCredito.innerText = arrayUtente[0].numemro404().toFixed(2) + " €";
    errore.innerText = '';
});
btnRicarica?.addEventListener('click', () => {
    arrayUtente[0].ricarica(Number(select.value));
    ric.innerText = select.value;
});
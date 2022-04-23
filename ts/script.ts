// Interfaccia Smartphone
interface ISmartphone {
    caricaCredito: number; // euro disponibili per chiamate
    numeroChiamate: number;
}

// Classe User con 0 credito e 0 chiamate come inizio
class User implements ISmartphone {
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
    public chiamata(minutiDurata: number): void {
        let costoChiamata: number = (minutiDurata+1) * 0.2; //scatto alla risposta
        if(costoChiamata > this.caricaCredito){
            console.log('Il tuo credito è insufficiente.')
        } else {
        this.caricaCredito -= costoChiamata;
        this.numeroChiamate ++;
        }
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

let FirstUser = new User('Primo','Utente');
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
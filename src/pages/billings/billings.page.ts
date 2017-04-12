import { FiltersPage, LetterPage } from '../pages';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    templateUrl: 'billings.page.html'
})

export class BillingsPage{

    letters;

    div: any;
    sum: number;
    i: number;
    private valueReturn;

    constructor(private nav:NavController, private navParams: NavParams){
        this.initializeLetters();

        this.div = this.navParams.data;

        //filtrando as letters pelo departamento selecionado na home page
        this.divFilterLetters();    

        //fazendo a soma dos valores das cartas pelo departamento selencionado na home page
        this.valueReturn = this.totalValue();

        this.sortByClient();

    }

    initializeLetters(){
        this.letters= [
        {
            name: 'First OC Card',
            status: 'Em aberto',
            client: 'Michael',
            issued: 'Emitido',
            division: 'oc',
            value:12000
        },
        {
            name: 'Second OC card',
            status: 'Pago',
            client: 'FCamara',
            issued: 'Pendente',
            division: 'oc',
            value:3200
        },
        {
            name: 'First Innovation card',
            status: 'Liberado FCamara',
            client: 'Rafael',
            issued: 'Pendente',
            division: 'innovation',
            value:4600
        },
        {
            name: 'First Port card',
            status: 'Aguardando pagamento',
            client: 'Gustavo',
            issued: 'Emitido',
            division: 'port',
            value:5100
        },
        {
            name: 'First E-Comerce card',
            status: 'Liberado Cliente',
            client: 'FCamara',
            issued: 'Emitido',
            division: 'ecomerce',
            value:10000
        },
        {
            name: 'Second E-Comerce card',
            status: 'Pago',
            client: 'FCamara',
            issued: 'Pendente',
            division: 'ecomerce',
            value:7300
        },
        {
            name: 'Third OC card',
            status: 'Em aberto',
            client: 'Michael',
            issued: 'Emitido',
            division: 'oc',
            value:5600
        }
    ]
    }

//botão de filtrar clicado
    goToFiltersPage(){
        this.nav.push(FiltersPage);
    }

//carta selecionada na lista
    letterTapped($event, letter){
        this.nav.push(LetterPage, letter);
    }

    divFilterLetters(){
        
        if(this.div.id == 'total'){
            this.initializeLetters();
        }
        else{
            this.letters.forEach(element => {
                this.letters = this.letters.filter((letter) => {
                    return (letter.division.indexOf(this.div.id) > -1);
                })
            })
        }
        
    }

//soma do valor das cartas da divisão selecionada na homepage
    totalValue(){

        this.sum = 0;
        this.i = 0;

        this.letters.forEach(element => {
            this.sum += Number(this.letters[this.i].value);
            this.i++;

        });
        
            return this.sum;
    }

//pequisa para filtragem por nome de carta 
     getLetters(ev) {

         this.initializeLetters();
         this.divFilterLetters();
        
        let val = ev.target.value;

        if (val && val.trim() != '') {
            this.letters = this.letters.filter((letter) => {
                return (letter.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }


    }

    sortByClient(){
        this.initializeLetters();
         this.divFilterLetters();

         function compare(a,b){
             if (a < b) return -1;
             if (a > b) return 1;
            return 0;
         }

         console.log(this.letters.sort(compare));
    }

}
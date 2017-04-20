import { FiltersPage, LetterPage } from '../pages';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Component({
    templateUrl: 'billings.page.html'

})

@Injectable()
export class BillingsPage {

    public letters: any = [];
    public aux: any = [];

    div: any;

    sum: number;
    i: number;
    private valueReturn;

    constructor(private nav: NavController, private navParams: NavParams, private http: Http) {
        console.log(this.navParams.data[0]);
        this.div = this.navParams.data[0];
        

        if(this.div.id!='todas'){

            //filtrando as letters pelo departamento selecionado na home page
            this.lettersByDivision()
                .then(data => {
                    this.createCards(data);
                })
                .catch(err => err);
            //fazendo a soma dos valores das cartas pelo departamento selencionado na home page
            

        }else{

            this.initializeLetters()
                .then(data => {
                    this.createCards(data);
                })
                .catch(err => err);

            
            
        }
        
    }

    public initializeLetters = () => {
        return new Promise((resolve, reject) => {
            let headers = new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            });
            let options = new RequestOptions({ headers: headers });
            this.http
                .get('http://api-fcamara.azurewebsites.net/v1/billingLetters', options)
                .map((res: Response) => JSON.stringify(res.json().results))
                .subscribe(data => resolve(JSON.parse(data)), err => reject(err))
        })
    }

    public lettersByDivision = () => {
        return new Promise((resolve, reject) => {
            let headers = new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            });
            let options = new RequestOptions({ headers: headers });
            this.http
                .get('http://api-fcamara.azurewebsites.net/v1/billingLetters?divisionId=' + this.div.id, options)
                .map((res: Response) => JSON.stringify(res.json().results))
                .subscribe(data => resolve(JSON.parse(data)), err => reject(err))
        })
    }

    //Cria os cards
    createCards(data) {
        this.filter();
        this.letters = data;
        //this.aux = data;
        //this.checkMonth();
        this.valueReturn = this.totalValue();
        this.treatCards();
    }

    //botão de filtrar clicado
    goToFiltersPage() {
        this.nav.push(FiltersPage, this.div);
    }

    //carta selecionada na lista
    letterTapped($event, letter) {
        this.nav.push(LetterPage, letter);
    }

    //realiza os filtros
    filter() {
        if(this.navParams.data[1]){
            
        }
        if(this.navParams.data[2]){
            
        }
        if(this.navParams.data[3]){
        }
    }

    //soma do valor das cartas da divisão selecionada na homepage
    totalValue() {

        this.sum = 0;
        this.i = 0;

        this.letters.forEach(element => {
            this.sum += Number(this.letters[this.i].parcelValue);
            this.i++;

        });

        var value = this.sum/1000;
        value ? this.sum = Number(value.toFixed(1)) : this.sum = 0.0;

        return this.sum;
    }

    //Checar se é o mês atual
    checkMonth() {
        this.i = 0;

        this.aux.forEach(element => {
            var date = new Date(element.dueDate);
            var today = new Date();
            if(date.getMonth()==today.getMonth() && date.getFullYear()==today.getFullYear()){
                this.letters[this.i] = element;
                this.i++;
            }else{
            }
        })
    }

    //tratar status, valor e status de emissão dos cards
    treatCards() {
       this.letters.forEach(element => {
           var value = element.parcelValue/1000;
           value ? element.parcelValue = Number(value.toFixed(1)) : element.parcelValue = "0.0";

           if(element.emitted == true){
               element.emitted = "Emitido";
           } else {
               element.emitted = "Pendente";
           }

           switch(element.forecastStatus){
               case 1: {
                   element.forecastStatus = "Em aberto";
                   break;
               }
               case 2: {
                   element.forecastStatus = "Liberado FCamara";
                   break;
               }
               case 3: {
                   element.forecastStatus = "Liberado Cliente";
                   break;
               }
               case 4: {
                   element.forecastStatus = "Aguardando Pagamento";
                   break;
               }
               case 5: {
                   element.forecastStatus = "Pago";
                   break;
               }
               default: {
                   element.forecastStatus = "---"
               }

           }
       });
   }

    //pequisa para filtragem por nome de carta 
    getLetters(ev) {

        let val = ev.target.value;

        if(this.div.id != 'total'){
                this.lettersByDivision()
                    .then(data => {
                        this.letters = data;
                        this.treatCards();
                        if (val && val.trim() != '') {
                            this.letters = this.letters.filter((letter) => {
                                return (letter.accountName.toLowerCase().indexOf(val.toLowerCase()) > -1);
                            })
                            
                        }
                    })
                    .catch(err => err);
            }else{
                this.initializeLetters()
                .then(data => {
                    this.letters = data;  
                    this.treatCards();  
                    if (val && val.trim() != '') {
                            this.letters = this.letters.filter((letter) => {
                                return (letter.accountName.toLowerCase().indexOf(val.toLowerCase()) > -1);
                        })
                        
                    }
                })
                .catch(err => err);
            }

       


    }



}
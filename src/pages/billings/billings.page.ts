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

    div: any;
    sum: number;
    i: number;
    private valueReturn;

    constructor(private nav: NavController, private navParams: NavParams, private http: Http) {

        this.div = this.navParams.data;

        if(this.div.id!='todas'){

            //filtrando as letters pelo departamento selecionado na home page
            this.lettersByDivision()
                .then(data => {
                    this.letters = data;
                    this.valueReturn = this.totalValue();
                    this.treatCards();
                })
                .catch(err => err);
            //fazendo a soma dos valores das cartas pelo departamento selencionado na home page
            

        }else{

            this.initializeLetters()
                .then(data => {
                    this.letters = data;  
                    this.valueReturn = this.totalValue();   
                    this.treatCards();
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

    //botão de filtrar clicado
    goToFiltersPage() {
        this.nav.push(FiltersPage);
    }

    //carta selecionada na lista
    letterTapped($event, letter) {
        this.nav.push(LetterPage, letter);
    }

    //soma do valor das cartas da divisão selecionada na homepage
    totalValue() {

        this.sum = 0;
        this.i = 0;

        this.letters.forEach(element => {
            this.sum += Number(this.letters[this.i].parcelValue);
            this.i++;

        });

        return this.sum;
    }

    //tratar status, valor e status de emissão dos cards
   treatCards() {
       this.letters.forEach(element => {
           var value = element.parcelValue/1000;
           value ? element.parcelValue = Number(value.toFixed(1)) : element.parcelValue = "--- ";

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

        if (val && val.trim() != '') {
            this.letters = this.letters.filter((letter) => {
                return (letter.accountName.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }else{
            if(this.div.id != 'total'){
                this.lettersByDivision()
                    .then(data => {
                        this.letters = data;
                    })
                    .catch(err => err);
            }else{
                this.initializeLetters()
                .then(data => {
                    this.letters = data;  
                    this.valueReturn = this.totalValue();   
                })
                .catch(err => err);
            }
            
        }


    }



}
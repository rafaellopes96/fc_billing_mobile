import { BillingsPage } from '../pages';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    templateUrl: 'filters.page.html'
})

export class FiltersPage{

    status= [
        {id:'AP', name:'Aguardando pagamento'},
        {id:'EA', name:'Em aberto'},
        {id:'LC', name:'Liberado cliente'},
        {id:'LF', name:'Liberado FCamara'},
        {id:'P', name:'Pago'}
    ]

    constructor(public nav: NavController){}

    goToBillingsPage(){
        this.nav.push(BillingsPage);
    }

    filtersPage($event, status){
        console.log(status);
    }
}
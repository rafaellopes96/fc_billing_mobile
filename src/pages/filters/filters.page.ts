import { BillingsPage } from '../pages';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    templateUrl: 'filters.page.html'
})

export class FiltersPage{

    letterName: string;
    issuedOp: string;
    statusOp: string;
    filterOptions: any = [];

    status= [
        {id:'AP', name:'Aguardando pagamento'},
        {id:'EA', name:'Em aberto'},
        {id:'LC', name:'Liberado cliente'},
        {id:'LF', name:'Liberado FCamara'},
        {id:'P', name:'Pago'}
    ]

    issued= [
        'Emitida',
        'Pendente'
    ]

    constructor(public nav: NavController){
    }
        
    goToBillingsPage($event, letterName){
        this.filterOptions[0] = this.statusOp;
        this.filterOptions[1] = this.issuedOp;
        this.filterOptions[2] = letterName;

        this.nav.push(BillingsPage, this.filterOptions);
    }

    setStatus(status){
        this.statusOp = status;
    }

    setIssued(issue){
        this.issuedOp = issue;
    }

}
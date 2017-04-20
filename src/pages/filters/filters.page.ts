import { BillingsPage } from '../pages';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    templateUrl: 'filters.page.html'
})

export class FiltersPage{
    letterName: string;
    issuedOp: string;
    statusOp: string;
    filterOptions: any = [];
    divOp: any;
    placeholder: string;

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

    divs= [
        {id: "1", name: "OC"},
        {id: "2", name: "Porto"},
        {id: "3", name: "E-Comerce"},
        {id: "5", name: "Inovação"},
        {id: "todas", name: "Todas"}
    ]


    constructor(public nav: NavController, private navParams: NavParams){
        this.divOp = this.navParams.data;
        this.placeholder = this.divOp.name;
    }
        
    goToBillingsPage($event, letterName){
        this.filterOptions[0] = this.divOp;
        this.filterOptions[1] = this.statusOp;
        this.filterOptions[2] = this.issuedOp;
        this.filterOptions[3] = letterName;

        this.nav.push(BillingsPage, this.filterOptions);
    }

    setStatus(status){
        this.statusOp = status;
    }

    setIssued(issue){
        this.issuedOp = issue;
    }

    setDiv(div){
        this.divOp = div;
    }

    getDiv(div){
        return this.divOp;
    }
}
import { BillingsPage } from '../pages';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    templateUrl: 'home.page.html'
})

export class HomePage {

    divisions = [
        {
            id: "1",
            name: "OC"
        },
        {
            id: "2",
            name: "Porto"
        },
        {
            id: "3",
            name: "E-Comerce"
        },
        {
            id: "4",
            name: "Projetos Especiais"
        },
        {
            id: "5",
            name: "Inovação"
        },
        {
            id: "6",
            name: "Franca"
        },
        {
            id: "todas",
            name: "Todas"
        }

    ]

    constructor(public nav:NavController){}

    itemTapped($event, div){
        this.nav.push(BillingsPage, div);
    }


}
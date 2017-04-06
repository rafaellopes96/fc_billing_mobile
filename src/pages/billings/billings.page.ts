import { FiltersPage, LetterPage } from '../pages';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    templateUrl: 'billings.page.html'
})

export class BillingsPage{

    letters= [
        {
            name: 'Testing cards',
            status: 'ativo',
            client: 'Michael',
            emission: '19/03/2017'
        },
        {
            name: 'Testing cards for billing',
            status: 'inativo',
            client: 'FCamara',
            emission: '06/04/2017'
        }
    ]

    constructor(private nav:NavController){}

    goToFiltersPage(){
        this.nav.push(FiltersPage);
    }

    letterTapped($event, letter){
        this.nav.push(LetterPage, letter);
    }
}
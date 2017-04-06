import { FiltersPage, BillingsPage } from '../pages';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    templateUrl: 'navigation.page.html'
})

export class NavigationPage{
    constructor(private nav:NavController){}

    goToBillingsPage(){
        this.nav.push(BillingsPage);
    }

    goToFiltersPage(){
        this.nav.push(FiltersPage);
    }
}
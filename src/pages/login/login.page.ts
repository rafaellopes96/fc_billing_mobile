import { NavigationPage } from '../pages';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    templateUrl: 'login.page.html'
})

export class LoginPage{
    constructor(public nav:NavController){}

    goToNavigationPage(){
        this.nav.push(NavigationPage);
    }
}
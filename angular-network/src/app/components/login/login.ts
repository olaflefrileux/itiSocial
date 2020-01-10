import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'models';
import { AuthenticationService } from '../../services/index';
import { NzMessageService } from 'ng-zorro-antd';

/**
 * Connecte un utilisateur à la plateforme
 */
@Component({
    selector: 'login',
    templateUrl: 'login.html'
})
export class LoginComponent {
    model = new UserLogin();
    failed = false;
    constructor(
        private authService: AuthenticationService,
        private messageService: NzMessageService,
        private router: Router
    ) { }

    async login() {
        this.failed = false;
        try {

            this.authService.authenticate(this.model).then( val => {
                this.router.navigate(['/']);
            }).catch(val => {
                this.messageService.error("Login failed !");
            });
        }
        catch (e) {
            return this.failed = true;
        }
    }
}

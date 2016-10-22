import { Component, OnInit } from '@angular/core';
// TODO: delete line below if app works
import { Router } from '@angular/router';

import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    title = 'login component works!';
    user: any;

    onSubmit(email, password) {
        this.userService.login(email, password).subscribe((result) => {
            if (result) {
                this.userService.reloadUserData();
                alert('authentication successfull!');
                this.user = JSON.parse(localStorage.getItem('user'));
                this.router.navigate(['/']);
            }
        });
    }
    
    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    logout() {
        this.userService.logout();
        this.user = false;
    }

}

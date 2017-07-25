import { Component, OnInit }                    from '@angular/core';

import { environment }                          from '../../../environments/environment';
import { User }                                 from '../models/user.model';
import { UserService }                          from '../../core/user.service';

@Component({
  selector: 'app-last-user',
  templateUrl: './last-user.component.html',
  styleUrls: ['./last-user.component.css']
})
export class LastUserComponent implements OnInit {

    constructor(
      private userService: UserService
    ) { }

    errorUser: string | Array<string>;
    lastUser: User;
    spinnerUser: boolean = false;
    userImageDefault: string = environment.imageUserDefault;
    userImagesUrl: string = environment.apiImageUsers;

    getHometown(hometown: string | null) {
        return hometown ? '(' + hometown + ')' : '';
    }

    ngOnInit() {
        this.spinnerUser = true;
        this.userService.getUsers(1, 'created_at', 'desc').subscribe(
            response => {
                this.lastUser = response.users[0];
                this.spinnerUser = false;
            }, error => {
                this.errorUser = error;
                this.spinnerUser = false;
            }
        );
    }
}

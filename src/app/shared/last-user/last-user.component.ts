import { Component, OnInit }                    from '@angular/core';

import { environment }                          from '../../../environments/environment';
import { User }                                 from '../models/user.model';
import { UserService }                          from '../user.service';

@Component({
  selector: 'app-last-user',
  templateUrl: './last-user.component.html',
  styleUrls: ['./last-user.component.css']
})
export class LastUserComponent implements OnInit {

    constructor(
      private userService: UserService
    ) { }

    lastUser: User;
    errorUser: string | Array<string>;
    spinnerUser: boolean = false;
    userImagesUrl: string = environment.apiImageUsers;
    userImageDefault: string = environment.imageUserDefault;

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

    getHometown(hometown: string | null) {
        return hometown ? '(' + hometown + ')' : '';
    }
}

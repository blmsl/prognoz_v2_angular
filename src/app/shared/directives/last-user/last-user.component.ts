import { Component, OnInit }                    from '@angular/core';

import { UserService }                          from '../../user.service';
import { environment }                          from '../../../../environments/environment';

@Component({
  selector: 'app-last-user',
  templateUrl: './last-user.component.html',
  styleUrls: ['./last-user.component.css']
})
export class LastUserComponent implements OnInit {

    constructor(
      private userService: UserService
    ) { }
    
    error: string | Array<string>;
    spinner: boolean = false;
    userImagesUrl: string = environment.API_IMAGE_USERS;
    userImageDefault: string = environment.IMAGE_USER_DEFAULT;
    lastUser: any;
    
    ngOnInit() {
        this.spinner = true;
        this.userService.getLastUser().subscribe(
            response => {
                this.lastUser = response.user;
                this.spinner = false;
            }, error => {
                this.error = error;
                this.spinner = false;
            }
        );
    }

    getHometown(hometown: string | null) {
        return hometown ? '(' + hometown + ')' : '';
    }
}

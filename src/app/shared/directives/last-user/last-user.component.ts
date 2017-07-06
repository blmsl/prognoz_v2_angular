import { Component, OnInit }                    from '@angular/core';

import { environment }                          from '../../../../environments/environment';
import { UserService }                          from '../../user.service';

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
    userImagesUrl: string = environment.apiImageUsers;
    userImageDefault: string = environment.imageUserDefault;
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

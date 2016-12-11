import { Component, OnInit }                    from '@angular/core';
import { Router }                               from '@angular/router';
import { FormControl, FormGroup, Validators }   from '@angular/forms';
import { NotificationsService }                 from 'angular2-notifications';

import { Club }                                 from '../shared/club.model';
import { ManageClubService }                    from '../shared/manage-club.service';

@Component({
  selector: 'app-club-create',
  templateUrl: './club-create.component.html',
  styleUrls: ['./club-create.component.css']
})
export class ClubCreateComponent implements OnInit {

    constructor(
        private router: Router,
        private notificationService: NotificationsService,
        private manageClubService: ManageClubService
    ) { }

    clubs: Club[];
    clubCreateForm: FormGroup;
    clubImage: any;
    error: string | Array<string>;

    ngOnInit() {
        this.manageClubService.getAllNationalTeams().subscribe(
            result => this.clubs = result,
            error => this.error = error
        );

        this.clubCreateForm = new FormGroup({
            title: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
            link: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
            image: new FormControl('', [Validators.required]),
            parent_id: new FormControl(null)
        });
    }

    onSubmit() {
        if (this.clubCreateForm.value.parent_id === 'country') this.clubCreateForm.value.parent_id = null;
        this.manageClubService.create(this.clubCreateForm.value).subscribe(
            response => {
                this.router.navigate(['/manage/club']);
                this.notificationService.success('Успішно', 'Команду ' + response.title + ' створено!');
            },
            errors => {
                for (let error of errors) {
                   this.notificationService.error('Помилка', error);
                }
            }
        );
    }

    fileChange(event) {
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            let file: File = fileList[0];
            let myReader: FileReader = new FileReader();
            myReader.onload = (e) => {
                this.clubImage = myReader.result;
                this.clubCreateForm.patchValue({
                    image: this.clubImage
                });
            };
            myReader.readAsDataURL(file);
        }
    }
}

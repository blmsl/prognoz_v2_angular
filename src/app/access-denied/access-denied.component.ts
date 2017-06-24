import { Component } from '@angular/core';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css']
})
export class AccessDeniedComponent {
    error: string = 'Доступ заборонено. У вас нема прав для перегляду цієї сторінки.';
}

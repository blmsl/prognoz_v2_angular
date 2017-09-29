import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {

    @Input() data: any;
    @Input() message: string;
    @Input() modalId: string;
    @Input() spinnerButton: boolean;
    @Output() onConfirmed = new EventEmitter<any>();

    constructor() { }

    confirm() {
        this.onConfirmed.emit(this.data);
    }
}

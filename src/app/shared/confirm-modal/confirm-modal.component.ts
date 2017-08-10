import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

    @Input() data: any;
    @Input() message: string;
    @Input() modalId: string;
    @Input() spinnerButton: boolean;
    @Output() onConfirmed = new EventEmitter<any>();

    constructor() { }

    confirm() {
        this.onConfirmed.emit(this.data);
    }

    ngOnInit() {
    }

}

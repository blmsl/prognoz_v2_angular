import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

import { BroadcastService }                                                 from '../broadcast.service';
import 'tinymce';
import 'tinymce/plugins/link';
import 'tinymce/plugins/table';
import 'tinymce/themes/modern';

declare var tinymce: any;

@Component({
  selector: 'app-tiny-editor',
  templateUrl: './tiny-editor.component.html',
  styleUrls: ['./tiny-editor.component.css']
})
export class TinyEditorComponent implements AfterViewInit, OnDestroy {

    @Input() elementId: String;
    @Input() content;
    @Output() onEditorContentChange = new EventEmitter();

    editor;

    constructor (
        private broadcastService: BroadcastService
    ) {
        let eventReset = new Event('resetContent');
        broadcastService.getEvents(eventReset).subscribe(eventValue => {
            this.resetEditor();
        });

        let eventUpdate = new Event('updateContent');
        broadcastService.getEvents(eventUpdate).subscribe(eventValue => {
            this.updateContent();
        });
    }

    ngAfterViewInit() {
        tinymce.init({
            selector: '#' + this.elementId,
            plugins: ['link', 'table'],
            skin_url: '/assets/skins/lightgray',
            height: 200,
            statusbar: false,
            language_url: 'assets/languages/uk_UA.js',
          
            setup: editor => {
                this.editor = editor;
                editor.on('keyup change', () => {
                    const content = editor.getContent();
                    this.onEditorContentChange.emit(content);
                });
            }
        });
    }

    ngOnDestroy() {
        tinymce.remove(this.editor);
    }
    
    private resetEditor() {
        this.editor.setContent('<p></p>');
    }

    private updateContent() {
        this.editor.setContent(this.content ? this.content.body : '<p></p>');
    }

}

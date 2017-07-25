import { CommonModule }           from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ReactiveFormsModule }    from '@angular/forms';
import { RouterModule }           from '@angular/router';

import { AccessDeniedComponent }  from './access-denied/access-denied.component';
import { AuthService }            from './auth.service';
import { CurrentStateService }    from './current-state.service';
import { ErrorHandlerService }    from './error-handler.service';
import { FooterComponent }        from './footer/footer.component';
import { HeaderComponent }        from './header/header.component';
import { HeadersWithToken }       from './headers-with-token.service';
import { HelperService }          from './helper.service';
import { ImageService }           from './image.service';
import { PageNotFoundComponent }  from './page-not-found/page-not-found.component';
import { SharedModule }           from '../shared/shared.module';
import { throwIfAlreadyLoaded }   from './module-import-guard';
import { UserService }            from './user.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule
    ],
    exports: [
        AccessDeniedComponent,
        FooterComponent,
        HeaderComponent,
        PageNotFoundComponent,
    ],
    declarations: [
        AccessDeniedComponent,
        FooterComponent,
        HeaderComponent,
        PageNotFoundComponent
    ],
    providers: [
        AuthService,
        CurrentStateService,
        ErrorHandlerService,
        HeadersWithToken,
        HelperService,
        ImageService,
        UserService,
    ],
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}

import { NgModule } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { AppRoutingModule, routes } from './app.routes.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CalendarInterceptor } from './shared/interceptors/calendar.interceptor';
import { RouterModule } from '@angular/router';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        // AppRoutingModule,
        ToastrModule.forRoot({
            enableHtml: false,
            maxOpened: 5,
            timeOut: 6000,
            progressBar: true,
            preventDuplicates: true,
            closeButton: true,
            newestOnTop: true,
            positionClass: 'toast-bottom-right',
        }),
        SharedModule,
        CalendarInterceptor,
        AuthModule,
        AppRoutingModule,
    ],
    exports: [],
    declarations: [AppComponent],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

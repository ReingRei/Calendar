import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CalendarInterceptor } from './shared/interceptors/calendar.interceptor';

@NgModule({
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ToastrModule.forRoot({
            enableHtml: false,
            maxOpened: 5,
            timeOut: 5000,
            progressBar: true,
            preventDuplicates: true,
            closeButton: true,
            newestOnTop: true,
            positionClass: 'toast-bottom-center',
        }),
        SharedModule,
        CalendarInterceptor,
    ],
    exports: [],
    declarations: [AppComponent],
    providers: [],
})
export class AppModule { }

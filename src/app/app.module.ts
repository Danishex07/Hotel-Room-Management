import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RoomListComponent } from './room-list/room-list.component';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS,HttpClientModule} from "@angular/common/http";
import {ApiInterceptor} from "./providers/http.interceptor";
import {MatPaginatorModule} from "@angular/material/paginator";
import { BookingModalComponent } from './modelComponent/booking-modal/booking-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NotifierModule, NotifierOptions} from "angular-notifier";

// Custom notifier configuration options
const customNotifierOptions: NotifierOptions = {
    position: {
        horizontal: {
            position: 'right',
            distance: 20
        },
        vertical: {
            position: 'bottom',
            distance: 20,
            gap: 15
        }
    },
    theme: 'material',
    behaviour: {
        autoHide: 5000,
        onClick: 'hide',
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4
    },
    animations: {
        enabled: true,
        show: {
            preset: 'slide',
            speed: 300,
            easing: 'ease'
        },
        hide: {
            preset: 'fade',
            speed: 300,
            easing: 'ease',
            offset: 50
        },
        shift: {
            speed: 300,
            easing: 'ease'
        },
        overlap: 150
    }
};

@NgModule({
  declarations: [
    AppComponent,
    RoomListComponent,
    BookingModalComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        MatPaginatorModule,
        MatDialogModule,
        BrowserAnimationsModule,
        NotifierModule.withConfig(customNotifierOptions), NotifierModule // Configure NotifierModule with custom options
    ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }], // Provide the HTTP interceptor
  bootstrap: [AppComponent]
})
export class AppModule {  }

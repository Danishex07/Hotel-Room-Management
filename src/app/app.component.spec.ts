import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomService } from './services/room.service';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { NotifierService, NotifierModule } from 'angular-notifier';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatDialogModule, NotifierModule],
            declarations: [
                AppComponent,
                RoomListComponent,
            ],
            providers: [
                RoomService,
                MatDialog,
                NotifierService
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { RoomListComponent } from './room-list.component';
import { RoomService } from '../services/room.service';
import { NotifierService, NotifierModule } from 'angular-notifier';

describe('RoomListComponent', () => {
    let component: RoomListComponent;
    let fixture: ComponentFixture<RoomListComponent>;
    let roomService: RoomService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                FormsModule,
                MatPaginatorModule,
                MatDialogModule,
                NotifierModule
            ],
            declarations: [RoomListComponent],
            providers: [
                RoomService,
                MatDialog,
                NotifierService
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RoomListComponent);
        component = fixture.componentInstance;
        roomService = TestBed.inject(RoomService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should check availability of rooms', () => {
        spyOn(component, 'checkAvailability');
        const button = fixture.debugElement.nativeElement.querySelector('button');
        button.click();
        fixture.whenStable().then(() => {
            expect(component.checkAvailability).toHaveBeenCalled();
        });
    });

});

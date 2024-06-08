import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingModalComponent } from './booking-modal.component';
import { BookingService } from '../../services/booking.service';
import { NotifierService, NotifierModule } from 'angular-notifier';

describe('BookingModalComponent', () => {
    let component: BookingModalComponent;
    let fixture: ComponentFixture<BookingModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormsModule, HttpClientTestingModule, NotifierModule],
            declarations: [BookingModalComponent],
            providers: [
                BookingService,
                NotifierService, // Provide NotifierService
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: {} }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BookingModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should submit the booking form', () => {
        spyOn(component, 'submitBookingForm');
        const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
        button.click();
        fixture.whenStable().then(() => {
            expect(component.submitBookingForm).toHaveBeenCalled();
        });
    });


});

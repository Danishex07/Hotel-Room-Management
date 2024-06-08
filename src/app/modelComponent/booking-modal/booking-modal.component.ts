import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { BookingService } from "../../services/booking.service";
import {NotifierService} from "angular-notifier";

@Component({
    selector: 'app-booking-modal',
    templateUrl: './booking-modal.component.html',
    styleUrls: ['./booking-modal.component.scss']
})
export class BookingModalComponent implements OnInit {
    customer_name: string = '';
    mobile: string = '';
    email: string = '';
    address: string = '';
    check_in_date: string = '';
    check_out_date: string = '';
    room_id: string = '';

    constructor(private bookingService: BookingService, public dialogRef: MatDialogRef<BookingModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private notifierService: NotifierService) {
        // Assign received data to component properties
        this.check_in_date = data.checkInDate;
        this.check_out_date = data.checkOutDate;
        this.room_id = data.roomNumber;
    }

    ngOnInit(): void {
    }

    submitBookingForm(bookingForm: NgForm): void {
        if (bookingForm.valid) {
            // Submit the booking form if valid
            this.bookingService.createBooking(bookingForm.value).subscribe(response => {
                this.notifierService.notify('success', 'Booking created successfully');
                this.closeModal();
            }, (error: any) => {
                this.notifierService.notify('error', 'Error creating booking');
            });
        } else {
            this.notifierService.notify('error', 'Form is invalid');
        }
    }

    closeModal(): void {
        // Close the booking model
        this.dialogRef.close();
    }
}

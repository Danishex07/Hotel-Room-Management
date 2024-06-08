import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room.model';
import * as moment from 'moment';
import {MatDialog} from "@angular/material/dialog";
import {BookingModalComponent} from "../modelComponent/booking-modal/booking-modal.component";
import {NotifierService} from "angular-notifier";

@Component({
    selector: 'app-room-list',
    templateUrl: './room-list.component.html',
    styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
    pagedRooms: Room[] = [];
    pageSize = 5;
    currentPage = 0;
    check_in_date: string = '';
    check_out_date: string = '';
    availableRooms: Room[] = [];
    isAvailable: boolean = false;
    startBooking: boolean = false

    constructor(private roomService: RoomService, public dialog: MatDialog, private notifierService: NotifierService) {
    }

    ngOnInit(): void {
        this.loadRooms();
    }

    loadRooms() {
        this.roomService.getRooms().subscribe((data: Room[]) => {
            // Load rooms data and initialize availableRooms
            this.availableRooms = data;
            this.isAvailable = data.length > 0;
            this.pageChanged({pageIndex: this.currentPage});
        });
    }

    pageChanged(event: any) {
        // Update the paginated rooms list based on the current page
        const startIndex = event.pageIndex * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.pagedRooms = this.availableRooms.slice(startIndex, endIndex);
        this.currentPage = event.pageIndex;
    }

    checkAvailability() {
        if (this.check_in_date && this.check_out_date) {
            const from_date = moment(this.check_in_date).format('YYYY-MM-DD HH:mm:ss');
            const to_date = moment(this.check_out_date).format('YYYY-MM-DD HH:mm:ss');
            const from_date_obj: any = moment(this.check_in_date);
            const to_date_obj: any = moment(this.check_out_date);
            const days = to_date_obj.diff(from_date_obj, 'days') + 1;

            if (days <= 0) {
                this.notifierService.notify('warning', 'Check-in date should be before check-out date');
                return;
            }

            this.roomService.getAvailableRooms(from_date, to_date).subscribe((rooms: Room[]) => {
                this.availableRooms = rooms;
                this.isAvailable = rooms.length > 0;
                this.startBooking = rooms.length > 0
                this.pageChanged({pageIndex: 0}); // Reset to first page of available rooms
                this.notifierService.notify('success', 'Available Rooms for Selected Dates')
            }, (error: any) => {
                this.notifierService.notify('error', 'Error checking availability.');
            });
        } else {
            this.notifierService.notify('error', 'Please enter both check-in and check-out dates');
        }
    }

    openBookingModal(roomNumber: string): void {
        // Open the booking modal dialog
        const dialogRef = this.dialog.open(BookingModalComponent, {
            width: '65vw',
            data: {roomNumber: roomNumber, checkInDate: this.check_in_date, checkOutDate: this.check_out_date}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.checkAvailability(); // Refresh availability after closing the modal
        });
    }

}

import { TestBed } from '@angular/core/testing';
import { BookingService } from './booking.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Booking } from '../models/booking.model';

describe('BookingService', () => {
    let service: BookingService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [BookingService]
        });
        service = TestBed.inject(BookingService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });

    it('should call createBooking with correct parameters', () => {
        const bookingData: Booking = {
            customer_name: 'John Doe',
            mobile: '+1234567890',
            email: 'john.doe@example.com',
            address: '123 Street',
            check_in_date: '2023-01-01',
            check_out_date: '2023-01-05',
            room_id: 101
        };
        service.createBooking(bookingData).subscribe();
        const req = httpMock.expectOne('http://manage-hotel.local/api/book/room');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(bookingData);
        httpMock.verify();
    });
});

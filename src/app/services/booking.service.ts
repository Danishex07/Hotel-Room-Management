import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Booking} from '../models/booking.model';
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class BookingService {

    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    createBooking(booking: Booking): Observable<any> {
        return this.http.post(`${this.baseUrl}/book/room`, booking);
    }

    checkAvailability(roomId: number, checkInDate: string, checkOutDate: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/rooms/${roomId}/availability`, {
            params: {
                check_in_date: checkInDate, check_out_date: checkOutDate
            }
        });
    }
}

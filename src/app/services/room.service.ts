// src/app/room.service.ts

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Room} from '../models/room.model';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    getRooms(): Observable<Room[]> {
        return this.http.get<Room[]>(`${this.apiUrl}/all/rooms`);
    }

    getAvailableRooms(check_in_date: string, check_out_date: string): Observable<Room[]> {
        return this.http.get<Room[]>(`${this.apiUrl}/available-rooms`, {
            params: {
                check_in_date, check_out_date
            }
        });
    }
}

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RoomService } from './room.service';
import { Room } from '../models/room.model';
import { RoomType } from '../models/room-type.enum';

describe('RoomService', () => {
    let service: RoomService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [RoomService]
        });
        service = TestBed.inject(RoomService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch available rooms', () => {
        const dummyRooms: Room[] = [
            { id: 1, room_number: '101', room_type: RoomType.Single, price: 100 },
            { id: 2, room_number: '102', room_type: RoomType.Double, price: 150 }
        ];

        const check_in_date = '2024-06-01';
        const check_out_date = '2024-06-10';

        service.getAvailableRooms(check_in_date, check_out_date).subscribe(rooms => {
            expect(rooms.length).toBe(2);
            expect(rooms).toEqual(dummyRooms);
        });

        const req = httpMock.expectOne(`${service['apiUrl']}/available-rooms?check_in_date=${check_in_date}&check_out_date=${check_out_date}`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyRooms);
    });

    afterEach(() => {
        httpMock.verify();
    });
});

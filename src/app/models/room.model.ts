import { RoomType } from './room-type.enum';

export class Room {
    id: number = 0;
    room_number: string = '';
    room_type: RoomType = RoomType.Single; // Default room type is Single
    price: number = 0; // Default price is 0
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class HotelRoom extends Model
{

    protected $table = 'hotel_rooms';


    protected $fillable = ['room_number', 'is_available'];

    public function bookings()
    {
        return $this->hasMany('App\Booking', 'room_id',  'room_number');
    }

}

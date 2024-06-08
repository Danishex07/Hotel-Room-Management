<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{


    protected $table = 'bookings';
    protected $fillable = ['customer_name', 'room_id', 'check_in_date', 'check_out_date', 'address'];

    public function room()
    {
        return $this->belongsTo('App\HotelRoom','room_id', 'room_number');
    }


//    protected $dates = [
//        'updated_at',
//        'created_at'
//    ];
}

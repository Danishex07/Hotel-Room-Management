<?php

use Illuminate\Database\Seeder;
use App\HotelRoom;
use App\Booking;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->clear();
        $this->call(HotelRoomSeeder::class);
        $this->call(BookingSeeder::class);
    }

    public function clear(){
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        Booking::truncate();
        HotelRoom::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1');
    }
}

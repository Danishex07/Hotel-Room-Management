<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Faker\Factory as Faker;
class HotelRoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        $roomTypes = ['Single', 'Double', 'Suite']; // Define room types

        $rooms = [];
        for ($i = 1; $i <= 100; $i++) {
            $rooms[] = [
                'room_number' => (string)($i + 100),
                'room_type' => $roomTypes[array_rand($roomTypes)], // Randomly select room type
                'price' => rand(2000, 10000) / 100, // Assuming a price range between 20.00 and 100.00
                'created_at' => Carbon::now()->subDays(rand(1, 30)),
                'updated_at' => Carbon::now(),
            ];
        }


        // Insert all rooms into the database at once
        DB::table('hotel_rooms')->insert($rooms);
    }
}

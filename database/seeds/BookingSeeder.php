<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Faker\Factory as Faker;

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        // Get all hotel room IDs
        $roomIds = DB::table('hotel_rooms')->pluck('room_number')->toArray();

        // Generate fake bookings
        for ($i = 0; $i < 25; $i++) {
            $roomIdIndex = array_rand($roomIds); // Get the index of a random room ID
            $roomId = $roomIds[$roomIdIndex]; // Get the room ID using the index
            unset($roomIds[$roomIdIndex]); // Remove the allocated room ID from the array
            $startDate = Carbon::now()->addDays(rand(1, 30))->startOfDay(); // Random start date within next 30 days
            $endDate = Carbon::parse($startDate)->addDays(rand(1, 7))->startOfDay(); // End date is within 1-7 days from start date

            DB::table('bookings')->insert([
                'room_id' => $roomId,
                'check_in_date' => $startDate,
                'check_out_date' => $endDate,
                'customer_name' => $faker->name,
                'email' => $faker->email,
                'mobile' => $faker->phoneNumber,
                'address' => $faker->address,
                'created_at' => Carbon::now()->subDays(rand(1, 30)),
                'updated_at' => Carbon::now(),

            ]);
        }
    }

}

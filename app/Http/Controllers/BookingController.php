<?php

namespace App\Http\Controllers;


use App\Booking;
use App\HotelRoom;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function createBooking(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'customer_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'mobile' => 'required|string|max:17',
            'address' => 'required|string',
            'room_id' => 'required|exists:hotel_rooms,room_number',
            'check_in_date' => 'required|date|after_or_equal:today',
            'check_out_date' => 'required|date|after:check_in_date',
        ]);

        // Create a new booking instance
        $booking = new Booking();
        $booking->customer_name = $request->input('customer_name');
        $booking->email = $request->input('email');
        $booking->mobile = $request->input('mobile');
        $booking->address = $request->input('address');
        $booking->room_id = $request->input('room_id');
        $booking->check_in_date = $request->input('check_in_date');
        $booking->check_out_date = $request->input('check_out_date');

        // Save the booking to the database
        $booking->save();

        // Return a success response with the booking details
        return response()->json(['message' => 'Booking created successfully', 'booking' => $booking], 201);

    }
}

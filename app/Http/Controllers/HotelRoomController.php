<?php

namespace App\Http\Controllers;


use App\Booking;
use App\HotelRoom;
use Carbon\Carbon;
use Illuminate\Http\Request;

class HotelRoomController extends Controller
{
    // Fetch all hotel rooms
    public function getRooms()
    {
        $data =  HotelRoom::all();
        return response($data);
    }

    // Fetch available rooms based on check-in and check-out dates
    public function getAvailableRooms(Request $request)
    {
        $check_in = Carbon::parse($request->check_in_date);
        $check_out = Carbon::parse($request->check_out_date);

        // Find rooms that do not have bookings overlapping with the requested dates
        $availableRooms = HotelRoom::whereDoesntHave('bookings', function($query) use ($check_in, $check_out) {
            $query->where(function($q) use ($check_in, $check_out) {
                $q->where(function($q) use ($check_in, $check_out) {
                    $q->where('check_in_date', '<=', $check_in)
                        ->where('check_out_date', '>=', $check_in);
                })->orWhere(function($q) use ($check_in, $check_out) {
                    $q->where('check_in_date', '<=', $check_out)
                        ->where('check_out_date', '>=', $check_out);
                })->orWhere(function($q) use ($check_in, $check_out) {
                    $q->where('check_in_date', '>=', $check_in)
                        ->where('check_out_date', '<=', $check_out);
                });
            });
        })->get();

        return response()->json($availableRooms);
    }

}

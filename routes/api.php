<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// routes/api.php
use App\Http\Controllers\HotelRoomController;
use App\Http\Controllers\BookingController;

Route::get('available-rooms', 'HotelRoomController@getAvailableRooms');
Route::get('all/rooms', 'HotelRoomController@getRooms');
Route::post('/book/room', 'BookingController@createBooking');



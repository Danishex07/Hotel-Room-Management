# Hotel Booking App

A web application for managing hotel room bookings. This application allows users to view available rooms, check room availability for specific dates, and make bookings.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- View a list of available hotel rooms.
- Check room availability for specific dates.
- Book a room through a modal dialog.
- Notifications for booking status and errors.

## Technologies

- Angular
- Angular Material
- Angular Notifier
- Moment.js
- TypeScript

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/hotel-booking-app.git
    cd hotel-booking-app
    ```

2. **Install dependencies:**

   Make sure you have [Node.js](https://nodejs.org/) installed.

    ```bash
    npm install
    ```

3. **Run the application:**

    ```bash
    ng serve
    ```

   Open your browser and navigate to `http://localhost:4200`.

## Usage

1. **Viewing Rooms:**

   On the homepage, you will see a list of available rooms.

2. **Checking Availability:**

   Enter the check-in and check-out dates and click the "Check Availability" button. The application will display the rooms available for the specified dates.

3. **Booking a Room:**

   Click the "Book" button next to a room to open the booking modal. Fill in the required details and submit the form to book the room.

## Testing

To run the tests, use the following command:

```bash
ng test

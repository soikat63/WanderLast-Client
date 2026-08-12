import BookingDelateAlert from "@/components/BookingDelateAlert";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import React from "react";

const MyBookings = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const {token} = await auth.api.getToken({
      headers: await headers(),
    });
  

  // console.log(session);

  const user = session?.user;
  //   console.log(user);

  const res = await fetch(`http://localhost:5000/booking/${user?.id}` , {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

  const bookings = await res.json();
//   console.log(bookings);

  return (
    <div>
      {bookings.map((booking) => (
        <div key={booking._id}>
          <Image
            src={booking.imageUrl}
            alt={booking.destinationId}
            height={300}
            width={300}
          />

          <div>
            <h1>{booking.destinationName}</h1>
            <p>
              {" "}
              {new Date(booking.departureDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <p>${booking.price}</p>

           <BookingDelateAlert bookingId={booking._id}/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;

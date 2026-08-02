"use client";
import { authClient } from "@/lib/auth-client";
import { Button, Card, DateField, Label } from "@heroui/react";
import { useState } from "react";
import { toast } from "react-toastify";

const BookingCard = ({ destination }) => {
  const { price, _id, destinationName, imageUrl, country } = destination;
  const { data: session } = authClient.useSession();
  const user = session?.user;
  //console.log(user);

  const [departureDate, setDepartureDate] = useState(null);
  //   console.log(new Date(departureDate));

  const handleBooking = async () => {
    const bookingData = {
      userId: user?.id,
      userImage: user?.image,
      userName: user?.name,
      userEmail: user?.email,
      destinationId: _id,
      destinationName,
      price,
      imageUrl,
      country,
      departureDate: new Date(departureDate),
    };
    // console.log(bookingData);

    const res = await fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    const data = await res.json();

    toast.success("Your booked succesfully");
    // console.log(data);
  };

  return (
    <div>
      <Card className="rounded-none border p-5">
        <p className="text-sm text-muted">Starting From</p>
        <h2 className="text-4xl font-semibold text-cyan-300">${price}</h2>
        <p className="text-sm text-muted">Per person</p>

        <DateField
          onChange={setDepartureDate}
          className="w-[256px]"
          name="date"
        >
          <Label>Departure date</Label>
          <DateField.Group>
            <DateField.Input>
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
          </DateField.Group>
        </DateField>

        <Button
          onClick={handleBooking}
          className="w-full rounded-none bg-cyan-300 text-black"
        >
          {" "}
          Book Now
        </Button>
      </Card>
    </div>
  );
};

export default BookingCard;


//53-7 2.56

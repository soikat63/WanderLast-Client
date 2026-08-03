"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Card, DateField, Label } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { today, getLocalTimeZone } from "@internationalized/date";

const BookingCard = ({ destination }) => {
  const router = useRouter();

  const { price, _id, destinationName, imageUrl, country } = destination;
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [departureDate, setDepartureDate] = useState(null);
  const [isInvalid, setIsInvalid] = useState(false);

  // Manual check: date past hole true return korbe
  const isPastDate = useMemo(() => {
    if (!departureDate) return false;
    const todayDate = today(getLocalTimeZone());
    return departureDate.compare(todayDate) < 0;
  }, [departureDate]);

  const isButtonDisabled = !departureDate || isInvalid || isPastDate;

  const handleBooking = async () => {
    if (!departureDate || isInvalid || isPastDate) {
      toast.error("Please select a valid departure date (today or later).");
      return;
    }

    try {
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
        departureDate: departureDate.toDate(getLocalTimeZone()),
      };

      const res = await fetch("http://localhost:5000/booking", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Booking failed!");
      }

      toast.success("Booked Successfully!");

      setTimeout(() => {
        router.push("/destinations");
      }, 1500);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Card className="rounded-none border p-5">
      <p className="text-sm text-muted">Starting From</p>

      <h2 className="text-4xl font-semibold text-cyan-300">${price}</h2>

      <p className="text-sm text-muted">Per person</p>

      <DateField
        label="Departure date"
        value={departureDate}
        onChange={setDepartureDate}
        minValue={today(getLocalTimeZone())}
        isRequired
        validationBehavior="native"
        onValidationChange={setIsInvalid}
        className="w-full"
      >
        <Label>Departure date</Label>

        <DateField.Group>
          <DateField.Input>
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
        </DateField.Group>
      </DateField>

      {isPastDate && (
        <p className="text-xs text-red-500 mt-1">
          Departure date today othoba future-er howa lagbe.
        </p>
      )}

      <Button
        className="mt-4 w-full rounded-none bg-cyan-300 text-black disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleBooking}
        isDisabled={isButtonDisabled}
      >
        Book Now
      </Button>
    </Card>
  );
};

export default BookingCard;

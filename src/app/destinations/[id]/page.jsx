import BookingCard from "@/components/BookingCard";
import DelateAlert from "@/components/DelateAlert";
import Editmodal from "@/components/Editmodal";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";

const DestinationDetailPage = async ({ params }) => {
  const { id } = await params;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch destination");
  }

  const destination = await res.json();

  const { destinationName, country, duration, imageUrl, description } =
    destination;

  return (
    <div className="mx-auto max-w-7xl">
      {/* Actions */}
      <div className="my-6 flex items-center justify-end gap-3">
        <Editmodal destination={destination} />
        <DelateAlert destination={destination} />
      </div>

      {/* Destination Image */}
      <Image
        src={imageUrl}
        alt={destinationName}
        width={800}
        height={500}
        className="h-auto w-full object-cover"
      />

      {/* Destination Information */}
      <div className="mt-12 flex items-start justify-between gap-8">
        <div className="space-y-3 p-4">
          {/* Country */}
          <div className="flex items-center gap-2 text-gray-500">
            <span>{country}</span>
          </div>

          {/* Destination Name */}
          <h2 className="text-xl font-bold">{destinationName}</h2>

          {/* Duration */}
          <div className="flex items-center gap-2 text-gray-500">
            <span>{duration}</span>
          </div>

          {/* Description */}
          <div>
            <h3 className="mt-1 text-2xl font-semibold">Overview</h3>

            <p>{description}</p>
          </div>
        </div>

        {/* Booking */}
        <BookingCard destination={destination} />
      </div>
    </div>
  );
};

export default DestinationDetailPage;

import Editmodal from "@/components/Editmodal";
import { Button } from "@heroui/react";
import Image from "next/image";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { FaRegCalendar } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";

const DestinationDetailPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/destination/${id}`);
  const destination = await res.json();
  const {
    _id,
    destinationName,
    country,
    price,
    duration,
    departureDate,
    imageUrl,
    description,
  } = destination;
  // console.log(destination);

  //   console.log(id);

  return (
    <div className="max-w-7xl mx-auto">
        <Editmodal destination={destination} />

        
      <Image alt={destinationName} src={imageUrl} height={500} width={800} className="w-full object-cover" />

      <div className="space-y-3 p-4">
        <div className="flex items-center gap-2 text-gray-500">
          <LuMapPin className="text-lg" />
          <span>{country}</span>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{destinationName}</h2>
          <span className="text-lg font-semibold text-blue-600">${price}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <FaRegCalendar />
          <span>{duration}</span>
        </div>

        <div>

        <h3 className=" mt-1 font-semibold text-2xl">Overview</h3>
        <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailPage;

import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FaRegCalendar } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { LuMapPin } from "react-icons/lu";

const DestinationCard = ({ destination }) => {
  const {_id, imageUrl, price, destinationName, duration, country } = destination;

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <Image
        src={imageUrl}
        alt={destinationName}
        width={500}
        height={300}
        className="h-60 w-full object-cover"
      />

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
      </div>

      <Link href={`/destinations/${_id}`}>
      
      <Button variant="ghost" className='mt-1 text-cyan-300'>Book Now <FiExternalLink/> </Button>
      </Link>

    </div>
  );
};

export default DestinationCard;

import DestinationCard from "@/components/DestinationCard";

const DestinationPage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/destination`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch destinations");
  }

  const destinations = await res.json();

  return (
    <div className="px-4">
      <h1>All Destinations</h1>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination._id}
            destination={destination}
          />
        ))}
      </div>
    </div>
  );
};

export default DestinationPage;
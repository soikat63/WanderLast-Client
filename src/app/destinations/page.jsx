import DestinationCard from "@/components/DestinationCard";

const DestinationPage = async () => {
  const res = await fetch("http://localhost:5000/destination");
  const destinations = await res.json();

  console.log(destinations);

  return (
    <div className=" px-4">
      <h1>All destination</h1>
      <div className="grid grid-cols-4 gap-2">
        {destinations.map((destination) => (
          <DestinationCard key={destination._id} destination={destination} />
        ))}
      </div>
    </div>
  );
};

export default DestinationPage;

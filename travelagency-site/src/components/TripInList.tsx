import { Trip } from "../models/models";

export default function TripInList({ trip }: { trip: Trip }) {
  return (
    <div>
      <img
        width="200px"
        src="https://images.pexels.com/photos/62389/pexels-photo-62389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      <div>{trip.title}</div>
    </div>
  );
}

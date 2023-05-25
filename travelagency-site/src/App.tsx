import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import "./App.css";
import TripInList from "./components/TripInList";
import { Trip } from "./models/models";

const GET_TRIPS = gql`
  query trips {
    trips {
      title
      text
    }
  }
`;

const SUBSCRIBE_TRIPS = gql`
  subscription OnTripCreated {
    tripCreated {
      title
      text
    }
  }
`;

const CRERATE_TRIP = gql`
  mutation CreateTrip($input: NewTrip!) {
    createTrip(input: $input) {
      id
      title
      text
      isPublished
    }
  }
`;

function App() {
  const { subscribeToMore, ...result } = useQuery(GET_TRIPS);
  // const { data: update } = useSubscription(SUBSCRIBE_TRIPS, {});
  const [createTrip] = useMutation(CRERATE_TRIP);

  useEffect(
    () =>
      subscribeToMore({
        document: SUBSCRIBE_TRIPS,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          return Object.assign({}, prev, {
            trips: [...prev.trips, subscriptionData.data.tripCreated],
          });
        },
      }),
    [subscribeToMore]
  );

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          createTrip({
            variables: {
              input: { title: form.get("title"), text: form.get("text") },
            },
          });
        }}
      >
        <input name="title" />
        <input name="text" />
        <button type="submit">Create new</button>
      </form>
      {result &&
        result.data &&
        result.data.trips.map((trip: Trip, index: number) => (
          <TripInList key={index} trip={trip} />
        ))}
    </>
  );
}

export default App;

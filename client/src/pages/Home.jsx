import { useEffect, useState } from "react";
import WorkoutDetail from "../Components/WorkoutsDetails";
import axios from "axios";

const Home = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/workouts");

        // Check if response.data contains an array
        if (Array.isArray(response.data)) {
          setWorkouts(response.data);
        }
        // Check if response.data has a 'data' property that is an array
        else if (response.data && Array.isArray(response.data.data)) {
          setWorkouts(response.data.data);
        }
        // Handle unexpected formats
        else {
          setError("Invalid response format: " + JSON.stringify(response.data));
        }
      } catch (error) {
        console.error("Fetch error: ", error);
        setError(error.message);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          Home
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {error ? (
            <div className="col-span-3 text-center text-red-500">
              <p>Error loading workouts: {error}</p>
            </div>
          ) : workouts.length > 0 ? (
            workouts.map((workout) => (
              <div
                key={workout._id}
                className="bg-white rounded-lg shadow-lg p-4"
              >
                <WorkoutDetail workout={workout} />
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500">
              <p>No workouts found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

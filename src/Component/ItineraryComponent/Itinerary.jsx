
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './itinerary.css'
import TodoList from '../todoComponent/TodoList';
import { Link } from "react-router-dom";



const Itinerary = () => {
  const { place } = useParams();


  // State to store the data fetched for the place
  const [placeData, setPlaceData] = useState(null);

  // Fetch the data for the place when the component mounts
  useEffect(() => {
    // Function to fetch the data for the place based on the URL parameter
    const fetchPlaceData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/showPlace?place=${place}`);
        if (response.ok) {
          const { data } = await response.json();
          // Find the place data that matches the specified 'place' parameter
          const foundPlaceData = data.find((item) => item.place === place);
          if (foundPlaceData) {
            setPlaceData(foundPlaceData);
          } else {
            console.error('Place data not found for:', place);
          }
        } else {
          console.error('Error fetching place data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching place data:', error);
      }
    };
  
    fetchPlaceData();
  }, [place]);
  
  
  if (!placeData) {
    return <div>Loading...</div>;
  }


  
  // Extract the necessary data from the placeData object
  const { user, fromDate, toDate } = placeData;
  


  // Convert the fromDate and toDate to Date objects
  const fromDateObj = new Date(fromDate);
  const toDateObj = new Date(toDate);

  console.log(fromDate);
  console.log(toDate);

  // Calculate the total number of days between fromDate and toDate
  const totalDays = Math.floor((toDateObj - fromDateObj) / (24 * 60 * 60 * 1000)) + 1;
  console.log(totalDays);

  // Create an array representing each day from 1 to days
  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);


  return (
    <div className="itinerary-container">
      {/* Add the "Back to Homepage" button */}
      <Link to="/homepage">
        <button>Back to Homepage</button>
      </Link>
      <h1 className='itinerary-heading'>Your <em>{place}</em> itinerary</h1>
      {daysArray.map((day) => (
        <div key={day}>
          <h2 className='itinerary-day'>Day {day}</h2>
          {/* Pass the userID, place, and day data as props to TodoList component */}
          <TodoList userID={user} place={place} day={day} />
        </div>
      ))}
    </div>
  );
};

//Might use proptypes later

export default Itinerary;


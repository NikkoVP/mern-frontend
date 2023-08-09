import style from "./home.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye } from 'react-icons/fa';
import { FaBeer } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { format } from 'date-fns';

function HomePage() {
  const [place, setPlace] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [placeData, setPlaceData] = useState([]);
  const [isAvailable, setIsAvailable] = useState(false);

  // FORMAT DATE
  const formatDate = (dateString) => {
    const inputDate = new Date(dateString);
    return `${inputDate.getFullYear()}-${(inputDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${inputDate.getDate().toString().padStart(2, "0")}`;
  };


  const user = localStorage.getItem('UserID');
  let displayPlace = [];
  displayPlace = placeData.filter((obj) => {
    if (obj.user === user) {
      return obj;
    }
  })

  const [displayName, setDisplayName] = useState([]);
  const name = displayName.filter((showname) => {

    if (showname._id === user) {
      return showname;
    }
  });


  const fetchData = async () => {

    const response = await fetch(`http://127.0.0.1:3000/users`)
    const { data } = await response.json();
    setDisplayName(data)
  };

  const fetchDataPlace = async () => {

    const response = await fetch(`http://127.0.0.1:3000/showPlace`)
    const { data } = await response.json();
    setPlaceData(data);

  };




  useEffect(() => {
    fetchData();
    fetchDataPlace();
  }, []);


  // CHECK IF THE PLACE ALREADY EXISTS IN THE DB
  const checkPlace = placeData.filter((data) => {
    if (data.place === place) {
      return data;
    }
  });


  // SUBMIT BUTTON
  function handleSubmitPlace(e) {
    let hasError = false;

    e.preventDefault();

    if (place.length === 0 || place.length === "") {
      alert("Please enter a place");
      hasError = true;
    }
    if (toDate === 0 || toDate === "") {
      alert("please select the end date");
      hasError = true;
    }



    if (!hasError) {
      const inputPlaceData = {
        user,
        place,
        fromDate,
        toDate
      }
      if (checkPlace.length === 0) {

        fetch('http://127.0.0.1:3000/addPlace', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputPlaceData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            setIsAvailable(data)
          })
          .catch((error) => {
            console.error(error);
          });
      } else { alert("Place Already Exist!") }
    }

    if (isAvailable) {
      alert("Dates are not available");
    } else {
      alert("New Place Added")
    }

    window.location.reload(true);
  };


  // HANDLE DELETE
  const handleDelete = (id) => () => {
    fetch(`http://127.0.0.1:3000/deletePlace/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });

    window.location.reload(true);
  };



  //for LIST OF itineraries
  const mapList = displayPlace.map((item) => (
    <div key={item._id} id={style.yourPlace}>
      <div>
        {/* Display the data properties here */}
        <h1><a href="/">{item.place}</a></h1>
        <h2>From : {formatDate(item.fromDate)}</h2>
        <h2>To : {formatDate(item.toDate)}</h2>
        {/* Add other properties as needed */}

        <div>

          <button id={style.deleteButton} onClick={handleDelete(item._id)}><FaBeer /></button>
          <Link to={{
            pathname: `/todos/${item.place}`,
            state: {
              user: item.user,
              place: item.place,
              fromDate: item.fromDate,
              toDate: item.toDate,
            },
          }}><button id={style.seeTodoButton}><FaEye /></button></Link>
        </div>
      </div>
    </div>
  ));


  return (
    <div>
      <header id={style.header}>Hello, {name.map((data) => data.username)} <a href="/" style={{ fontSize: "20px", color: " #0c0c0c", border: "solid 2px", borderRadius: "20px", backgroundColor:"#79C853", padding: "8px" }}>Logout</a></header>
      <div id={style.container}>
        {/* ADD your itinerary */}
        <div id={style.addPlace}>

          <div id={style.form}>
            <form onSubmit={handleSubmitPlace}>
              <div>
                <h3 style={{ color: "#0c0c0c" }}>Add Place and Date</h3>
                <input
                  type="text"
                  placeholder="Add Place"
                  onChange={(e) => setPlace(e.target.value)}
                />
                <br />
                <br />
                <label style={{ color: "#0c0c0c", fontSize: "18px" }} >From :</label>
                <br />
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
                <br />
                <br />
                <label style={{ color: "#0c0c0c", fontSize: "18px" }}>To:</label>
                <br />
                <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                <br />
                <br />
                <button type="submit" id={style.buttonSubmit}>Submit</button>

              </div>
            </form>
          </div>
        </div>
        <div id="h1List" ><h1 >List of Schedules</h1></div>
      </div>
      <br />


      <div id={style.flexMap}>{mapList}</div>

    </div>

  );
}

export default HomePage;

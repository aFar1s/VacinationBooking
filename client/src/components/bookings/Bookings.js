import React, { useEffect, useState, useContext } from 'react'
import { Link } from "react-router-dom";
import GlobalCenterID from "../../Helpers/globalCenterID"
import axios from "axios"
import TimePicker from 'react-time-picker';

const Bookings = (history) => {
 const { globalCenterID, setGlobalCenterID } = useContext(GlobalCenterID)
 const [center, setCenter] = useState([])
 const [date1, setDate1] = useState(Date)
 const [date2, setDate2] = useState(Date)
 const [time, setTime] = useState("")
 const [error, setError] = useState("");


 const bookingHandler = async (event) => {
    event.preventDefault();

    console.log(globalCenterID)
    console.log(date1)
    console.log(date2)
    console.log(time)

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (time > "17:00" || time < "09:00" ) {
        setTime("09:00");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Please Select Slot Within Operating Hours");
    }

    try {
    axios.post("http://localhost:4001/api/bookings/createBooking", {
      center: globalCenterID,
      firstJab: date1,
      secondJab: date2,
      timeSlot: time
    })

    } catch (error) { console.log(error) }
    }

 

 const date1Plus30 = new Date(date1);
 date1Plus30.setDate(date1Plus30.getDate() + 30);
 const dateString2 = date1Plus30.toISOString().split("T")[0];
 console.log(dateString2)


 console.log(date1)

 useEffect(() => {
    axios.get(`http://localhost:4001/api/vaccineCenters/read/${globalCenterID}`)
    .then((res) => {
        setCenter(res.data)
        console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })
    }, [globalCenterID])

    return (
        <div>
            <h1>You Have Selected: </h1>
            <div className="center-info">
            {center.map((centerData) =>{
            return (
              <div className="centerContainer">
               <div className="center">
                <h3>Location: {centerData.location}</h3>
                <h3>Postal Code: {centerData.postalCode}</h3>
                <h3>Vaccine Available: {centerData.vaccine}</h3>
               </div>
               {/* <button onClick={() => {updateFriend(friend._id)}}>Select Center</button> */}
              </div>
            )
          })}
            </div>
            <h2>Please Select Booking Details: </h2>
            <div className="booking-form">
            <form onSubmit={bookingHandler} className="register-screen__form">
        <h4 className="register-screen__title">Select Slots</h4>
        {/* {error && <span className="error-message">{error}</span>} */}
        <div className="form-group">
        <label htmlFor="1st-booking-date">1st Vaccination Date: </label>
          <input
            type="date"
            required
            id="date1"
            placeholder="1st Shot"
            value={date1}
            onChange={(event) => setDate1(event.target.value)}
          />
          </div>
        <h4>Minimum 30 days between vaccinations</h4>
        <div className="form-group">
        <label htmlFor="2nd-booking-date">2nd Vaccination Date: </label>
          <input
            type="date"
            required
            id="date2"
            placeholder="2nd Shot"
            
            min={dateString2}
            onChange={(event) => setDate2(event.target.value)}
          />
        </div>
        <h4>Center Operating Hours Are Daily from 9am-5pm</h4>
        <div className="form-group">
        <label htmlFor="2nd-booking-date">Time Slot: </label>
        <TimePicker 
            format="HH:00"
            maxDetail="hour"
            maxTime="17:00:00"
            minTime="09:00:00"
            hourPlaceholder="09"
          /> 
        </div>
        <br></br>

        <button type="submit" className="btn btn-primary">
            Submit Booking Infomation
        </button>
          <Link to="/reciept">See Booking</Link>
      </form>
            </div>
        </div>
    )
}

export default Bookings


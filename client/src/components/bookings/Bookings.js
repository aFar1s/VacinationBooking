import React, { useEffect, useState, useContext } from 'react'
import GlobalCenterID from "../../Helpers/globalCenterID"
import axios from "axios"

const Bookings = () => {
 const { globalCenterID, setGlobalCenterID } = useContext(GlobalCenterID)
 const [center, setCenter] = useState([])

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
                
            </div>
        </div>
    )
}

export default Bookings

import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import GlobalCenterID from "../../Helpers/globalCenterID"

const Reciept = () => {
    const [booking, setBooking] = useState([])
    const { globalCenterID, setGlobalCenterID } = useContext(GlobalCenterID)
    const [center, setCenter] = useState([])


    useEffect(() => {
        axios.get(`http://localhost:4001/api/bookings/read/${globalCenterID}`)
        .then((res) => {
            setBooking(res.data)
            console.log(res.data)
        }).catch((err) => {
          console.log(err)
        })
        }, [globalCenterID])

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
        {center.map((centerData) =>{
            return (
              <div className="centerContainer">
               <div className="center">
                <h3>Location: {centerData.location}</h3>
                <h3>Postal Code: {centerData.postalCode}</h3>
                <h3>Vaccine Available: {centerData.vaccine}</h3>
               </div>
              </div>
            )
          })}
        {booking.map((reciept) =>{
            return (
              <div className="centerContainer">
               <div className="center">
                <h3>First Jab Date: {reciept.firstJab}</h3>
                <h3>Second Jab Date: {reciept.secondJab}</h3>
                <h3>Time Slot: {reciept.timeSlot}</h3>
               </div>
              </div>
            )
          })}

        </div>
    )
}

export default Reciept

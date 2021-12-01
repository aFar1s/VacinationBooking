import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import GlobalCenterID from "../../Helpers/globalCenterID"



const Main = () => {
const { globalCenterID, setGlobalCenterID } = useContext(GlobalCenterID)

const [listCenter, setListCenter] = useState([])
const [centerID, setCenterID] = useState("")


    useEffect(() => {
        axios.get("http://localhost:4001/api/vaccineCenters/read")
        .then((res) => {
            setListCenter(res.data)
            console.log(res.data)
        }).catch((err) => {
          console.log(err)
        })
        }, [])
    
   console.log(listCenter)
    
    return (
        <div>
            <h1 className="header-title">Please Select a Center</h1>
          <div className="listOfCenters">
          {listCenter.map((center) =>{
            return (
              <div className="centerContainer">
               <div className="center">
                <h3>Location: {center.location}</h3>
                <h3>Postal Code: {center.postalCode}</h3>
                <h3>Vaccine Available: {center.vaccine}</h3>
               </div>
               {/* <button onClick={() => {updateFriend(friend._id)}}>Select Center</button> */}
               <Link to="/booking" onClick={() => setGlobalCenterID(center._id)}>Select Center</Link>
              </div>
            )
          })}
          </div>
              
        </div>
    )
}

export default Main

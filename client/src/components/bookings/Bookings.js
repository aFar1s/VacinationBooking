import React, { useEffect, useState, useContext } from 'react'
import GlobalCenterID from "../../Helpers/globalCenterID"

const Bookings = () => {
 const { globalCenterID, setGlobalCenterID } = useContext(GlobalCenterID)

    return (
        <div>
            <h1>{globalCenterID}</h1>
        </div>
    )
}

export default Bookings

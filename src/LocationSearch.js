import { useState } from "react";
import API_KEY from "./API_KEY";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

function LocationSearch({onCityFound}){
    
    const [zipCode,setZipCode] = useState('')

    function getLocation(zipCode) {
        fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${zipCode}`)
        .then(res=>res.json())
        //Hardcoded country
        .then(res=> res.find(l=>l.Country.ID==="IN"))
        .then(res=>onCityFound({
            name: res.SupplementalAdminAreas[0].LocalizedName,
            key: res.Key,
            state: res.AdministrativeArea.LocalizedName
        }),
        setZipCode(''))
    }

    return(
        <>
            <div className='d-grid col-4 mt-4 gap-3'>
                <input value={zipCode} className="form-control" placeholder="Enter Your ZIP code" onChange={e=>setZipCode(e.target.value)}/>
                <button className="btn btn-primary" onClick={()=>getLocation(zipCode)}>Search</button>
            </div>
        </>
    )
}

export default LocationSearch;

import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const apikey = "f6ccc73de72adb0aa8cd9881e235c14c"

  const [city,setCity] = useState({})
  const [name,setName] = useState("Bangkok")

    useEffect(()=>{
      const fetchData = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apikey}`
        try {
          const response = await fetch(url)
          const result = await response.json()
          console.log(result)
          setCity(result)
        } catch (error) {
          console.log("Error featching city weather",error)
        }
      }
      fetchData()
    },[name])

     const temp = (city?.main?.temp-273.15).toFixed(2)
     const temp_min = (city?.main?.temp_min-273.15).toFixed(2)
     const temp_max = (city?.main?.temp_max-273.15).toFixed(2)

  return (
    <div className="App">
      <div className='input-form'>
        <input type="text" onChange={(e)=>setName(e.target.value)} placeholder="ป้อนข้อมูลประเทศ / เมืองที่ต้องการทราบสภาพอากาศ" />
      </div>
      <section>
          <div className='location'>
            <h1 className='city'>{city.name? city.name : "" }</h1>
            <p className='state'>{city?.sys?.country? city?.sys?.country  : ""}</p>
          </div>
          <div className='card'>
            <div className='weather'>
              <h1>{temp === "NaN" ? "" : temp} °C</h1>
              <small>สูงสุด : {temp_max === "NaN" ?  "" : temp_max} °C , ต่ำสุด : {temp_min === "NaN" ?  "" : temp_min} °C</small>
            </div>
            <div className='info'>
              <div className='status'>{city?.weather?.[0]?.main}</div>
              <div className='humidity'>ความชื่น = {city?.main?.humidity} %</div>
              <div className='wind'>ความเร็วลม = {city?.wind?.speed}</div>
            </div>
          </div>
      </section>
    </div>
  )
}

export default App

import React, {useState} from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import SimpleImageSlider from "react-simple-image-slider";

const  App = () => {

  const [date, setDate] = useState(new Date())
  const [images, setImages] = useState(null)
  const [birthday, setBirthday] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    const year = date.getFullYear()
    const month = date.getMonth() > 8  ? date.getMonth() + 1  : `0${date.getMonth() + 1}`
    const day = date.getDate() > 8  ? date.getDate() + 1  : `0${date.getDate() + 1}`
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()

    setLoading(true)
    for (let i = year; i <= currentYear; i++) {
      const data = await fetch(`https://epic.gsfc.nasa.gov/api/natural/date/${i}-${month}-${day}`)
      const rawImages = await  data.json()
      if (rawImages.length>0){
        const newImages = rawImages.map(img => { return {url: `https://epic.gsfc.nasa.gov/archive/natural/${i}/${month}/${day}/png/${img.image}.png`}})
        setImages(newImages)
        setBirthday(i)
        setLoading(false)
        break
      }
    }
  }

  return (
    <div className="App">
      <h2>When is your birthday?</h2>
      <Calendar onChange={setDate}  value={date} />
      <button onClick={handleClick}>Search the last photo of my birthday by NASA</button>
      {loading && <h4> buscando datos</h4>}
      {birthday && <h4> These are images from your birthday at {birthday}</h4>}
        { images && <><SimpleImageSlider
        width={896}
        height={504}
        images={images}
        showBullets={true}
        showNavs={true}
      /></>
      }
    </div>
  );
}

export default App;

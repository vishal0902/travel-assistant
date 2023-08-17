import axios from "axios";



export default async function getPlacesData(ne, sw, type) {
  try {
    
    const url = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`
    console.log(url)

    const {
      data: { data },
    } = await axios.get(
      url,
      {
        params: {
          bl_latitude: sw.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
          tr_latitude: ne.lat,
          currency: "INR",
          open_now: "false",
          lunit: "km",
          lang: "en_US",
        },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );
    console.log(data)
    return data;
  } catch (error) {
    console.error(error);
  }
}

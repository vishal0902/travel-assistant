import React from "react";
import axios from "axios";

export default async function getPlacesData(ne, sw) {
  try {
    
    const {
      data: { data },
    } = await axios.get(
      "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary",
      {
        params: {
          bl_latitude: ne.hi,
          bl_longitude: ne.lo,
          tr_longitude: sw.lo,
          tr_latitude: sw.hi,
          currency: "INR",
          open_now: "false",
          lunit: "km",
          lang: "en_US",
        },
        headers: {
          "X-RapidAPI-Key":
            "6e17b8d517mshfb6b3f0dd900f0fp1e4dcbjsn2fef5a887b1a",
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

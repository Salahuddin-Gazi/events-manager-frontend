import Image from "next/image";
import { useState, useEffect } from "react";
// import ReactMapGl, { Marker } from "react-map-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import Geocode from "react-geocode";

export default function EventMap({ attributes }) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(null);

  // Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

  // useEffect(() => {
  //   // Get latitude & longitude from address.
  //   Geocode.fromAddress(attributes.Address).then(
  //     (response) => {
  //       const { lat, lng } = response.results[0].geometry.location;
  //       setLat(lat);
  //       setLng(lng);
  //       setLoading(false);
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }, []);

  if (loading) return false;
  console.log(lat, lng);

  return <div>Map</div>;
}

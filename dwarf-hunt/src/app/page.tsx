"use client";
import { Button, Box } from "@mui/material";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useMemo, useState, useEffect } from "react";

import NavBar from "../../components/NavBar";

export default function Home() {
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting current position:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []); // empty array means it only runs once, adding currentLocation would make it run every time currentLocation changes

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const center = useMemo(() => ({ lat: 51.112207, lng: 17.039258 }), []);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
      }}
    >
      {!isLoaded ? (
        <h1>Loading . . .</h1>
      ) : (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "auto",
            flex: 1,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            gap: 5,
          }}
        >
          <NavBar />
          <Box
            sx={{
              width: "1000px",
              height: "800px",
              backgroundColor: "red",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <GoogleMap
              mapContainerStyle={{
                width: "1000px",
                height: "800px",
              }}
              center={center}
              zoom={14}
            >
              {/* add random dwarf hook later*/}
              <Marker position={center} />
              <Marker
                position={currentLocation}
                icon={"http://maps.google.com/mapfiles/ms/icons/purple-dot.png"}
              />
            </GoogleMap>
          </Box>
        </Box>
      )}
    </Box>
  );
}

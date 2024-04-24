"use client";
import { Box } from "@mui/material";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { checkSesh } from "../app/actions/index";

import { supabase } from "../../config/supabase";

import NavBar from "../../components/NavBar";
import DwarfCardComponent from "../../components/DwarfCardComponent";
import { updateAchievements } from "../../functions/updateAchievements";

let myFlag = true;

export default function Home() {
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  let loadAchievs = true;

  if (myFlag) {
    myFlag = false;
    updateAchievements();
  }

  useEffect(() => {
    const fetchDwarvesData = async () => {
      const data = await fetchDwarves();
      if (data) {
        setDwarves(data);
      }
    };
    fetchDwarvesData();

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

  const [dwarves, setDwarves] = useState<any[]>([]);
  const fetchDwarves = async () => {
    try {
      const { data, error } = await supabase
        .from("dwarves")
        .select("name, description");
      if (error) {
        throw error;
      }
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching dwarves:", error);
      return null;
    }
  };

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
            gap: 1,
          }}
        >
          <NavBar />
          <Box
            sx={{
              width: "full",
              height: "400px",
              display: "flex",
              justifyContent: "between",
            }}
          >
            <GoogleMap
              mapContainerStyle={{
                width: "600px",
                height: "400px",
              }}
              center={center}
              zoom={14}
            >
              <Marker
                position={currentLocation}
                icon={"http://maps.google.com/mapfiles/ms/icons/purple-dot.png"}
              />
            </GoogleMap>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {dwarves.map((dwarf, index) => (
              <div key={index}>
                <Link href={`/discussion/${encodeURIComponent(dwarf.name)}`}>
                  <DwarfCardComponent
                    name={dwarf.name}
                    description={dwarf.description}
                  />
                </Link>
              </div>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

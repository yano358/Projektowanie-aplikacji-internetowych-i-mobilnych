import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import { GoogleMap, Circle, useLoadScript } from "@react-google-maps/api";

import { Box, Typography } from "@mui/material";

import NavBar from "../../components/NavBar";
import {
  CommentComponent,
  CommentReply,
} from "../../components/CommentComponent";

export default function Discussion() {
  const router = useRouter();
  const { name } = router.query;

  const [dwarfData, setDwarfData] = useState<any | null>(null);

  const [comments, setComments] = useState<any[]>([]);
  const [replies, setReplies] = useState<any[]>([]);

  const fetchDwarf = async (name: string) => {
    try {
      const { data, error, status } = await supabase
        .from("dwarves")
        .select("name, description, id, latitude, longitude")
        .eq("name", name);
      if (error) {
        throw error;
      }
      if (status === 404) {
        throw new Error("Dwarf not found");
      }
      return data;
    } catch (error) {
      console.error("Error fetching dwarves:", error);
      return null;
    }
  };

  const fetchComments = async () => {
    if (name) {
      try {
        const { data, error } = await supabase
          .from("comments")
          .select("dwarf_id, content, accounts(user_id , username), parent_id")
          .eq("dwarf_id", dwarfData?.id);
        if (error) {
          console.error("Error fetching comments:", error);
          return;
        }
        const replies = data.filter(
          (comment: any) => comment.parent_id !== null
        );
        const comments = data.filter(
          (comment: any) => comment.parent_id === null
        );
        return { comments, replies };
        // return data;
      } catch (error) {
        console.error("Error fetching comments:", error);
        return null;
      }
    }
  };

  useEffect(() => {
    const fetchDwarfData = async () => {
      if (name) {
        const data = await fetchDwarf(name as string);
        if (data) {
          setDwarfData(data[0]);
        }
      }
    };
    const fetchCommentsData = async () => {
      const data = await fetchComments();
      if (data) {
        setComments(data.comments);
        setReplies(data.replies);
      }
    };
    fetchDwarfData();
    fetchCommentsData();
  }, [name, dwarfData?.id]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          flex: 1,
          width: "100%",
        }}
      >
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: "bold",
            marginTop: 2,
          }}
        >
          {name}
        </Typography>
        {dwarfData ? (
          <div>
            {!isLoaded ? (
              <h1>Loading . . .</h1>
            ) : (
              <Box
                sx={{
                  width: "full",
                  height: "400px",
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "15px",
                }}
              >
                <GoogleMap
                  mapContainerStyle={{
                    width: "600px",
                    height: "400px",
                  }}
                  center={
                    dwarfData.latitude && dwarfData.longitude
                      ? {
                          lat: dwarfData.latitude,
                          lng: dwarfData.longitude,
                        }
                      : { lat: 51.112207, lng: 17.039258 }
                  }
                  zoom={14}
                >
                  <Circle
                    center={
                      dwarfData.latitude && dwarfData.longitude
                        ? {
                            lat: dwarfData.latitude,
                            lng: dwarfData.longitude,
                          }
                        : { lat: 51.112207, lng: 17.039258 }
                    }
                    radius={100}
                    options={{
                      strokeWeight: 2,
                      fillColor: "#FA80ED",
                      fillOpacity: 0.35,
                    }}
                  />
                </GoogleMap>
              </Box>
            )}
            <Typography
              sx={{
                fontSize: 18,
                marginTop: 2,
              }}
            >
              {dwarfData.description}
            </Typography>
            {/* <div>ID: {dwarfData.id}</div> */}
          </div>
        ) : (
          <div>Loading...</div>
        )}
        {!dwarfData && name ? <div>404 - Dwarf not found</div> : null}
        <Box sx={{ maxHeight: "250px", overflow: "auto" }}>
          {comments.map((comment) => {
            return (
              <CommentComponent
                key={comment.id}
                author={comment.accounts.username}
                comment={comment.content}
              >
                {/* {replies.map((reply, index) => {
                  return (
                    <CommentReply
                      key={index}
                      author={reply.accounts.username}
                      comment={reply.content}
                      cutIn={1}
                      // index <= 3 ? index + 1 : 4}
                    />
                  );
                })} */}
              </CommentComponent>
            );
          })}
        </Box>
      </Box>
    </>
  );
}

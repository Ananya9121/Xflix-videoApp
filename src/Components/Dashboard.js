import { Card, CardMedia, Typography } from "@mui/material";
import React from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";

export const dateDiff = (date) => {
  let videoDate = new Date(date);
  let today = new Date();
  let finalDate = [];

  let diff = new Date(today - videoDate);
  let monthscale = 1000 * 60 * 60 * 24 * 30;
  let months = diff / monthscale;
  if (months > 12) {
    let year = Math.floor(months / 12);
    if (Math.floor(months % 12) > 0) {
      finalDate[0] = year;
      finalDate[1] = Math.floor(months % 12);
    } else finalDate[0] = year;
  } else finalDate[1] = Math.floor(months);

  return finalDate;
};




const Dashboard = (videocard) => {




  let dd=dateDiff(videocard.videocard.releaseDate);

  // const handleVideopage=()=>{
  //   <Videopage video={videocard}/>
  // };

  return (
    <Link className="link video-tile-link" to={`/video/${videocard.videocard._id}`} >
    <Card className="video-tile" style={{ boxShadow: "none", borderRadius: "0px", border: "none" }}>
      <CardMedia
        component="img"
        alt={videocard.videocard.title}
        image={videocard.videocard.previewImage}
      />
      <div className="cardDetail">
        <Typography component="p" fontSize="12px" fontWeight="700">
          {videocard.videocard.title}


          
        </Typography>
        <Typography
          component="p"
          color="#D1D5DA"
          fontSize="12px"
          fontWeight="400"
          >
          {dd[0]} years {dd[1]} months ago
        </Typography>
      </div>
    </Card>
          </Link>
  );
};

export default Dashboard;

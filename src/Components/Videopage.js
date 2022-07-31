import React, { useEffect, useState } from "react";
import Header from "./Header";
import "./Videopage.css";
import axios from "axios";
import { config } from "../App";
import { ThumbUp, ThumbDown } from "@mui/icons-material";
import { Grid, Button } from "@mui/material";
import { SentimentDissatisfied } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import Dashboard, { dateDiff } from "./Dashboard";

const Videopage = () => {
  const params = useParams();
  const [newvideos, setNewvideos] = useState({});
  const [allvideos, setAllvideos] = useState({});
  const [votesChange, setVotesChange] = useState({
    upVote: false,
    downVote: false,
  });
  const fetchAPI = async (params) => {
    try {
      let response = await axios.get(`${config.endpoint}/videos/${params}`);
      let data = response.data;
      setNewvideos(data);
      return data;
    } catch (e) {
      alert(e.message);
    }
  };

  const allVideo = async () => {
    try {
      let response = await axios.get(`${config.endpoint}/videos`);
      setAllvideos(response.data.videos);
      return response.data;
    } catch (e) {
      alert(e.message);
    }
  };

  const performPatchCall = async (Url, data = {}) => {
    try {
      if (data) {
        await axios.patch(Url, data);
        // console.log(response)
      } else {
        await axios.patch(Url);
      }
      return true;
    } catch (e) {
      if (e.response && e.response.data.message) {
        alert("Error:", e.response.data.message);
      }
    }
  };

  const handleVotes = async (id, vote) => {
    const Url = `${config.endpoint}/videos/${id}/votes`;
    const data = {
      vote: vote,
      change: "increase",
    };
    let response = await performPatchCall(Url, data);
    if (response) {
      setVotesChange({ ...votesChange, [vote]: true });
      fetchAPI(id);
    }
  };

  const increaseViewCount = async (id) => {
    const URL = `${config.endpoint}/videos/${id}/views`;
    await performPatchCall(URL);
  };
  useEffect(() => {
    if (newvideos._id) {
      increaseViewCount(newvideos._id);
    }
  }, [newvideos]);

  useEffect(() => {
    allVideo();
    fetchAPI(params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  let dd = dateDiff(newvideos.releaseDate);

  if (Object.keys(newvideos).length) {
    return (
      <>
        <Header hasVideopage />
        <div className="container">
        <div className="frame iframe-parent">
          <iframe
            title="video"
            src={`https://${newvideos.videoLink}`}
            allow="autoplay; encripted-media"
            allowFullScreen
            frameBorder="0"
            ></iframe>
        </div>

          <div className="writeup">
            <div className="video-title" style={{ fontWeight: "700" }}>{newvideos.title}</div>
            <div className="writeup_details">
              <div className="writeup_details">
                <p>{newvideos.contentRating}</p>
                <div className="circle"></div>
                <p>
                  {dd[0]} years {dd[1]} months ago
                </p>
              </div>
              <div className="writeup_details">
                <Button
                  startIcon={<ThumbUp />}
                  style={{
                    backgroundColor: "#504f4f",
                    color: "white",
                    borderRadius: "2rem",
                    marginRight: "1rem",
                  }}
                  onClick={(e) => {
                    handleVotes(newvideos._id, "upvote");
                  }}
                >
                  {newvideos.votes.upVotes}
                </Button>
                <Button
                  startIcon={<ThumbDown />}
                  style={{
                    backgroundColor: "#504f4f",
                    color: "white",
                    borderRadius: "2rem",
                  }}
                  onClick={(e) => {
                    handleVotes(newvideos._id, "downvote");
                  }}
                >
                  {newvideos.votes.downVotes}
                </Button>
              </div>
            </div>
          </div>
          <hr style={{ color: "white", width: "100%", fontWeight: "500" }} />
          <div style={{ paddingBottom: "2rem" }}></div>

          <Grid
            className="grid"
            container
            spacing={3}
            paddingX="7rem"
            marginY="1rem"
          >
            {allvideos.length ? (
              allvideos.map((video) => (
                <Grid item xs={12} sm={6} md={3} key={video._id}>
                  <Dashboard videocard={video} />
                </Grid>
              ))
            ) : (
              <Box className="loading">
                <SentimentDissatisfied color="action" />
                <h4 style={{ color: "grey" }}>No Videos Found</h4>
              </Box>
            )}
            ;
          </Grid>
        </div>
      </>
    );
  } else return null;
};

export default Videopage;

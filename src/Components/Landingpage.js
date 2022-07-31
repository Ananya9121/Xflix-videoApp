import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import Header from "./Header";
import SearchIcon from "@mui/icons-material/Search";
import { SentimentDissatisfied } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Stack } from "@mui/material";

import "./Landingpage.css";
import { config } from "../App";
import { ImportExport } from "@mui/icons-material";
import { Button } from "@mui/material";

function Landingpage() {
  const genrelist = [
    { label: "All Genre", value: "All" },
    { label: "Education", value: "Education" },
    { label: "Sports", value: "Sports" },
    { label: "Comedy", value: "Comedy" },
    { label: "Lifestyle", value: "Lifestyle" },
  ];

  const contentRatingList = [
    { label: "Any age group", value: "All" },
    { label: "7+", value: "7+" },
    { label: "12+", value: "12+" },
    { label: "16+", value: "16+" },
    { label: "18+", value: "18+" },
  ];

  // const sortlist = [
  //   { label: "Release Date", value: "releaseDate" },
  //   { label: "View Count", value: "viewCount" },
  // ];
  const sort = {
    sortBy: "releaseDate",
  };

  const [option, setOption] = useState(sort);
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [selectgenre, setSelectgenre] = useState([]);
  const [selectcontentRating, setselectcontentRating] = useState([]);

  const diffUrl = () => {
    let url = `${config.endpoint}/videos?`;

    if (selectgenre.length) {
      url[url.length - 1] === "?"
        ? (url += `selectgenre=${selectgenre}`)
        : (url += `&selectgenre=${selectgenre}`);
    }

    if (selectcontentRating.length) {
      url[url.length - 1] === "?"
        ? (url += `contentRating=${encodeURIComponent(selectcontentRating)}`)
        : (url += `&contentRating=${encodeURIComponent(selectcontentRating)}`);
    }

    if (sort.length) {
      if (sort.includes("releaseDate")) {
        url[url.length - 1] === "?"
          ? (url += `sortBy=${sort}`)
          : (url += `&sortBy=${sort}`);
      }

      if (sort.includes("viewCount")) {
        url[url.length - 1] === "?"
          ? (url += `sortBy=${sort}`)
          : (url += `&sortBy=${sort}`);
      }
    }

    if (search.length) {
      url[url.length - 1] === "?"
        ? (url += `title=${search}`)
        : (url += `&title=${search}`);
    }

    console.log(url);
    return url;
  };

  const fetchAPI = async (url) => {
    try {
      let response = await axios.get(url);
      // console.log(response.data.videos);
      setVideos(response.data.videos);

      return response.data.videos;
    } catch (e) {
      alert(e.message);
    }
  };

  const performSearch = async (text) => {
    try {
      let url = diffUrl();
      console.log(url);
      fetchAPI(url);
    } catch (e) {
      alert(e.message);
    }
  };

  const handleGenre = (value) => {
    let finalArr = [];
    if (value === "All") {
      setSelectgenre(["All"]);
    } else {
      let withoutAll = selectgenre.filter(function (item) {
        return item !== "All";
      });
      if (withoutAll.includes(value)) {
        let arr = withoutAll.filter(function (item) {
          return item !== value;
        });
        finalArr = [...arr];
      } else {
        finalArr = [...withoutAll, value];
      }
      setSelectgenre(finalArr);
    }
  };

  const handleContentrating = (value) => {
    let finalArr = [];
    if (value === "All") {
      setselectcontentRating(["All"]);
    } else {
      let withoutAll = selectcontentRating.filter(function (item) {
        return item !== "All";
      });
      if (withoutAll.includes(value)) {
        let arr = withoutAll.filter(function (item) {
          return item !== value;
        });
        finalArr = [...arr];
      } else {
        finalArr = [...withoutAll, value];
      }
      setselectcontentRating(finalArr);
    }
  };

  const handleSort = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setOption({ ...option, [name]: value });

  } 

  function Genrepanel() {
    return (
      <>
        <div className="outercontainer">
          <div className="innercontainer">
            <div className="row1">
              <div className="genre">
                {genrelist.map((genre, index) => (
                  <div
                    key={index}
                    className="pillbutton genre-btn"
                    style={{
                      backgroundColor: selectgenre.includes(genre.value)
                        ? "white"
                        : "#222222",
                      color: selectgenre.includes(genre.value)
                        ? "#222222"
                        : "white",
                    }}
                    onClick={(e) => handleGenre(genre.value)}
                  >
                    {genre.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="row2">
              {contentRatingList.map((age) => (
                <button
                  key={age.label}
                  className="pillbutton content-rating-btn"
                  style={{
                    backgroundColor: selectcontentRating.includes(age.value)
                      ? "white"
                      : "#222222",
                    color: selectcontentRating.includes(age.value)
                      ? "#222222"
                      : "white",
                  }}
                  onClick={(e) => handleContentrating(age.value)}
                >
                  {age.label}
                </button>
              ))}
            </div>
          </div>
          <div className="space"></div>
          <Box className="sort-by active-toolbar-button">
            <Stack direction="row" spacing={1}>
            <ImportExport />
              {/* <span>Sort By:</span> */}
              {/* <SortBy/> */}
              <select
                className="sort-select"
                name="sortBy"
                value={option.sortBy}
                onChange={handleSort}
              >
                <option
                  className="select-option"
                  id="release-date-option"
                  value="releaseDate"
                >
                  Release Date
                </option>
                <option
                  className="select-option"
                  id="view-count-option"
                  value="viewCount"
                >
                  View Count
                </option>
              </select>
            </Stack>
          </Box>
        </div>
      </>
    );
  }

  useEffect(() => {
    let finalUrl = diffUrl();

    fetchAPI(finalUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectgenre, selectcontentRating, sort]);

  useEffect(() => {
    let url = `${config.endpoint}/videos`;
    fetchAPI(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header genrelist={genrelist} contentRatingList={contentRatingList}>
        <input
          id="search-input"
          className="search"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="searchicon" onClick={(e) => performSearch(search)}>
          <SearchIcon />
        </div>
      </Header>
      <Genrepanel />

      <Grid
        className="grid"
        container
        spacing={3}
        paddingX="7rem"
        marginY="1rem"
      >
        {videos.length ? (
          videos.map((video) => (
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
    </>
  );
}

export default Landingpage;

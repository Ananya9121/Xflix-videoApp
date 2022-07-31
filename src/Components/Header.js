import React, { useState } from "react";
import "./Header.css";
import { Button,Box } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Dialog from "@mui/material/Dialog";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { Close } from "@material-ui/icons";
import VideoModal from "./Videomodal";

const Header = ({ children, hasVideopage, genrelist,contentRatingList}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (hasVideopage) {
    return (
      <div className="Header">
        <img src="/images/Logo.png" alt="XFlix Logo"></img>
      </div>
    );
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
      >
        <Grid container className="dialog">
         
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            
          >
            <h3 className="form-header">Upload Video</h3>

            <IconButton
              aria-label="close"
              className={"close-button"}
              onClick={handleClose}
            >
              <Close/>
            </IconButton>
          </Box>
          <Grid item xs={12}>
            <VideoModal
              onClose={handleClose}
              genres={genrelist}
              contentRatings={contentRatingList}
            />
          </Grid>
        </Grid>
      </Dialog>

      <div className="Header">
        <img src="/images/Logo.png" alt="XFlix Logo"></img>
        <div className="searchbar">
          {children}
          
        </div>
        <Button className="largeupload" id="upload-btn" startIcon={<FileUploadIcon />} style={{
                    backgroundColor: "blue",
                    color: "white",
                    borderRadius: "0.1rem",
                  }} onClick={handleOpen}>Upload</Button>

<Button className="smallupload" id="upload-btn" startIcon={<FileUploadIcon />} style={{
                    backgroundColor: "blue",
                    color: "white",
                    borderRadius: "0.1rem",
                  }} onClick={handleOpen}></Button>
      </div>
    </>
  );
};

export default Header;

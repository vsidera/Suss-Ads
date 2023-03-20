import React from "react";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Backdrop } from "@mui/material";
import { Box, CardContent, TextField } from '@mui/material';

const CreateAppModal = ({
  createAppModal,
  closeCreateAppModal,
}) => {

  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-40%, -20%)",
    width: 500,
    height: 450,
    bgcolor: "#ffff",
    outline: "none",
    border: "none",
    // boxShadow: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  };

  return (
    <>
      <Modal
  open={createAppModal}
  sx={{ border: "none", boxShadow: "none" }}
  onClose={closeCreateAppModal}
>
  <div>
    <Box sx={style}>
      <CardContent style={{ width: "60%" }}>
        <div className="text-center content-center">
          <p className="text-xl">CREATE ORGANISATION</p>

          <br />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="my-2">
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                className="w-full"
                type="number"
              />
            </div>

            <div className="my-2">
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                className="w-full"
                type="password"
              />
            </div>

            <div className="my-2">
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                className="w-full"
              />
            </div>

            <button
              className="bg-[#9B9DEE] text-white font-normal py-1.5 px-5 rounded text-[14px] w-full"
              style={{ marginTop: "2rem", alignSelf: "center" }}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </CardContent>
    </Box>
  </div>
</Modal>

    </>
  );
};

export default CreateAppModal;

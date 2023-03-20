import React from "react";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, CardContent, TextField, TextareaAutosize } from "@mui/material";

const SendSmsModal = ({ smsModal, closeSendModal }) => {

  const [message, setMessage] = useState("");
  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-40%, -20%)",
    width: 600,
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

  const handleTextareaChange = (event) => {
    setMessage(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Mobile No:", event.target.elements.mobileNo.value);
    console.log("Message:", message);
    closeSendModal();
  };

  return (
    <>
      <Modal
        open={smsModal}
        sx={{ border: "none", boxShadow: "none" }}
        onClose={closeSendModal}
      >
        <div>
          <Box sx={style}>
            <CardContent style={{ width: "60%" }}>
              <div className="text-center content-center">
                <p className="text-xl">SEND SMS</p>

                <br />

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div className="my-2">
                    <TextField
                      id="mobileNo"
                      label="Mobile No"
                      variant="outlined"
                      type="number"
                      fullWidth
                    />
                  </div>
                  <div className="my-2">
                    <TextareaAutosize
                      aria-label="empty textarea"
                      placeholder="Type your message here"
                      value={message}
                      onChange={handleTextareaChange}
                      minRows={3}
                      style={{
                        width: "100%",
                        padding: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                  <button
                    className="bg-[#9B9DEE] text-white font-normal py-1.5 px-5 rounded text-[14px] w-full"
                    style={{ marginTop: "2rem", alignSelf: "center" }}
                    onClick={handleFormSubmit}
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

export default SendSmsModal;
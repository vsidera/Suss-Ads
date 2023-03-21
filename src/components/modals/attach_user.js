import React from "react";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, CardContent, TextField, TextareaAutosize } from "@mui/material";
import AsyncSelect from "react-select/async";

const AttachUserModal = ({
  attachUserModal,
  closeAttachUserModal,
}) => {
  const loadOptions = (inputValue, callback) => {
    // Make an API call or perform some async operation to fetch the options
    const options = [
      { value: "email1@example.com", label: "email1@example.com" },
      { value: "email2@example.com", label: "email2@example.com" },
      { value: "vik@example.com", label: "vik@example.com" },
    ];

    // Call the callback function with the loaded options
    setTimeout(() => {
      callback(options);
    }, 1000);
  };

  const [selectedValue, setSelectedValue] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  const handleSelectedChange = (newValue) => {
    setSelectedValue(newValue);
  };

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

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "100%",
    }),
  };
  

  return (
    <>
      <Modal
        open={attachUserModal}
        sx={{ border: "none", boxShadow: "none" }}
        onClose={closeAttachUserModal}
      >
        <div>
          <Box sx={style}>
            <CardContent style={{ width: "60%" }}>
              <div className="text-center content-center w-full">
                <p className="text-xl content-center items center">ATTACH USER</p>

                <br />

                <div className="w-full">
                  <AsyncSelect
                    value={selectedValue}
                    inputValue={inputValue}
                    onInputChange={handleInputChange}
                    onChange={handleSelectedChange}
                    loadOptions={loadOptions}
                    isClearable={true}
                    styles={customStyles}
                    className="w-full"
                  />

                  <button
                    className="bg-[#9B9DEE] text-white font-normal py-1.5 px-5 rounded text-[14px] w-full"
                    style={{ marginTop: "2rem", alignSelf: "center" }}
                    // onClick={handleFormSubmit}
                  >
                    ATTACH USER
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

export default AttachUserModal;

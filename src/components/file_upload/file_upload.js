import React, { useState } from "react";
import { Input, Button } from "@material-ui/core";
import { contactsUpload } from "../../actions/contacts/contactsAction";
import SnackbarAlert from "../utils/snackbar";

const FileUpload = ({ closeUpload,app_id }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState("");
  const [eventMessage, setEventMessage] = useState("");
  const [eventTitle, setEventTitle] = useState("");

  const handleChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event) => {
      setSelectedFile(event.target.result);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const res = contactsUpload({selectedFile,app_id}).then((res) => {
      if (res.status === 201) {
        setEventType("success");
        setEventMessage("Contacts Successfully Uploaded");
        setEventTitle("CONTACTS UPLOAD");
        setIsSnackBarAlertOpen(true);
      } else {
        setEventType("fail");
        setEventMessage("Contact NOT Uploaded");
        setEventTitle("CONTACTS UPLOAD");
        setIsSnackBarAlertOpen(true);
      }
    });

    return res;
  };

  return (
    <>
      <SnackbarAlert
        open={isSnackBarAlertOpen}
        type={eventType}
        message={eventMessage}
        handleClose={() => setIsSnackBarAlertOpen(false)}
        title={eventTitle}
      />
      <div className="flex justify-center items-center mt-2">
        <form
          className="bg-gray-100 p-6 rounded-lg shadow-xl w-full mx-auto"
        >
          <div className="cursor-pointer" onClick={closeUpload}>
            X
          </div>
          <div className="mb-4 font-bold text-lg text-center">
            Pick a CSV file:
          </div>
          <div className="flex items-center justify-center mb-3">
            <Input
              id="file-upload"
              type="file"
              onChange={handleChange}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="px-4 py-2 bg-white border rounded-lg cursor-pointer"
            >
              {selectedFile ? selectedFile.name : "Choose file"}
            </label>
          </div>
          <button
            className="bg-[#9B9DEE] text-white font-normal py-1.5 px-5 rounded text-[14px] w-full"
            style={{ marginTop: "2rem", alignSelf: "center" }}
            onClick={handleSubmit}
          >
            UPLOAD
          </button>
        </form>
      </div>
    </>
  );
};
export default FileUpload;

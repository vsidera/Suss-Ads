import React, { useState } from "react";
import { Input, Button } from "@material-ui/core";

const FileUpload=({closeUpload})=> {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Implement logic for file upload here
    console.log("Selected file:", selectedFile);
  };

  return (
    <div className="flex justify-center items-center mt-2">
  <form onSubmit={handleFormSubmit} className="bg-gray-100 p-6 rounded-lg shadow-xl w-full mx-auto">
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
        onChange={handleFileUpload}
        className="hidden"
      />
      <label htmlFor="file-upload" className="px-4 py-2 bg-white border rounded-lg cursor-pointer">
        {selectedFile ? selectedFile.name : "Choose file"}
      </label>
    </div>
    <div className="text-center">
      <Button type="submit" variant="contained" color="primary">
        Upload
      </Button>
    </div>
  </form>
</div>

  );
}
export default FileUpload

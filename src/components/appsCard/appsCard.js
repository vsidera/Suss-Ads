import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
    width: "calc(66.67% - 20px)", // 2/3 of the horizontal space minus the margin
    margin: "10px",
  },
  element: {
    marginBottom: "10px",
  },
});

function AppsCard({ name, email, createdat }) {
  const classes = useStyles();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-2 w-2/4 h-24 flex flex-col justify-center items-center">
      <h2 className="text-xl">{name}</h2>
      <p className="text-gray-600">{email}</p>
      {/* <p className="text-gray-600">{createdat}</p> */}
    </div>
  );
}

export default AppsCard;

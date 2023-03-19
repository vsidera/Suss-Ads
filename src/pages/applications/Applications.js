import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Table from "../../components/table/table";
import "./styles.css"

import { appsAction } from "../../actions/applications/appsActions";
import AppsCard from "../../components/appsCard/appsCard";

const Applications = () => {
  const [apps, setApps] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getApps = () => {
    appsAction()
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED");
        } else {
          setApps(res.data);
          setIsLoaded(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getApps();
  }, []);

  const contacts = [
    {
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "(123) 456-7890",
      id: 1
    },
    {
      name: "Jane Smith",
      email: "janesmith@example.com",
      phone: "(234) 567-8901",
      id: 3
    },
    {
      name: "Bob Johnson",
      email: "bobjohnson@example.com",
      phone: "(345) 678-9012",
      id: 2
    },
  ];

  return (
    // <Sidebar>
    <>
      <h1 className="text-2xl text-primary mb-6 flex justify-center">Applications</h1>
      <h4 className="text-md text-primary flex justify-center mb-6">
        A list of Applications for the user
      </h4>
      <div className="flex justify-center h-screen bg-gray-100 shadow-lg shadow-top rounded-lg mb-4 m-16">
        <div
          className="flex flex-col justify-start items-center mt-6"
          style={{ width: "90vw" }}
        >
          {contacts.map((contact, index) => (
            <Link to={`/apps/${contact.id}`} key={index} className="bg-white rounded-lg shadow-md p-4 m-2 w-2/4 h-24 flex flex-col justify-center items-center">
            <AppsCard key={index} {...contact} />
            </Link>
          ))}
        </div>
      </div>
      </>
      
    // </Sidebar>
  );
};

export default Applications;

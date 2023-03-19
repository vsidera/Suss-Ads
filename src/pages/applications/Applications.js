import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  return (
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
          {apps.map((app, index) => (
            <Link to={`/apps/${app.code}`} key={index} className="bg-white rounded-lg shadow-md p-4 m-2 w-2/4 h-24 flex flex-col justify-center items-center">
            <AppsCard key={index} {...app} />
            </Link>
          ))}
        </div>
      </div>
      </>

  );
};

export default Applications;

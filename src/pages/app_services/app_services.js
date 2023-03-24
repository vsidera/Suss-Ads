import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Table from "../../components/table/table";
import { appservicesAction } from "../../actions/appservices/appservicesAction";
import {useParams} from 'react-router-dom';

const getMuiTheme = () =>
  createTheme(
 
  );

const AppServices = () => {
  const params = useParams();

  const app_id = params.id

  const [appservices, setAppservices] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getAppServices = () => {

    appservicesAction(app_id)
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED");
        } else {
          setAppservices(res.data);
          setIsLoaded(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAppServices();
  }, []);

  const columns = [
    {
      name: "appname",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "telco",
      label: "Telco",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "sendername",
      label: "Sender",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "appemail",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const options = {
    filter: false,
    filterType: "textField",
    responsive: "standard",
    print: false,
    tableId: "03009226196169874",
    fixedHeader: true,
    fontFamily: "Ubuntu",
    viewColumns: false,
    selectableRows: "none",
    fixedSelectColumn: true,
    tableBodyHeight: "auto",
    enableNestedDataAccess: ".",
    count: 30,
    elevation: 0,
    rowsPerPageOptions: [10, 20, 50],
    downloadOptions: {
      separator: ",",
      filename: "Customers Summary.csv",
      filterOptions: {
        useDisplayedColumnsOnly: false, // it was true
        useDisplayedRowsOnly: false, // it was true
      },
    },
    downloadFile: true,
    onDownload: (buildHead, buildBody, columns, data) => {
      let val = `${buildHead(columns)}${buildBody(data)}`
        .replace(/[^\x00-\x7F]/g, "")
        .toString()
        .trim();
      return val;
    },

    textLabels: {
      body: {
        noMatch: isLoaded ? (
          "Sorry, no matching records exist in Suss"
        ) : (
          <div>......</div>
        ),
        toolTip: "Sort",
      },
      pagination: {
        next: "Next Page",
        previous: "Previous Page",
        rowsPerPage: "Rows per page:",
        displayRows: "of",
      },
      toolbar: {
        search: "Search A/C Number,Name or Payplans",
        downloadCsv: "Download Loans Excel List",
        print: "Print customers",
        viewColumns: "View Columns",
        filterTable: "Filter Table",
      },
      setFilterChipProps: () => {
        return {
          color: "primary",
          variant: "outlined",
          className: "testClass123",
        };
      },
      viewColumns: {
        title: "Show Columns",
        titleAria: "Show/Hide Table Columns",
      },
      selectedRows: {
        text: "record(s) selected",
        delete: "Delete",
        deleteAria: "Delete Selected Records",
      },
    },
  };

  return (
    <Sidebar>
      <h1 className="text-2xl text-primary mb-6">App Services</h1>
      <h4 className="text-md text-primary">A list of Application Services</h4>

      
      <div className="mt-4">
        <ThemeProvider theme={getMuiTheme()}>
          <Table columns={columns} options={options} data={appservices} />
        </ThemeProvider>
      </div>
    </Sidebar>
  );
};

export default AppServices;

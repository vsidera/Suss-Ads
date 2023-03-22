import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Table from "../../components/table/table";
import { contactsAction } from "../../actions/contacts/contactsAction";
import AddIcon from "@mui/icons-material/Add";
import UploadIcon from '@mui/icons-material/Upload';
import CreateModal from "../../components/modals/create_contact";
import FileUpload from "../../components/file_upload/file_upload";
import {useParams} from 'react-router-dom';

const getMuiTheme = () =>
  createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            backgroundColor: "#FFFFFF",
            fontFamily: "Ubuntu",
            fontWeight: "inherit",
          },
          footer: {
            border: 0,
          },
        },
      },
      //@ts-ignoreimport {useParams} from 'react-router-dom';
      MUIDataTableBodyCell: {
        styleOverrides: {
          root: {
            textAlign: "center",
            alignItems: "center",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            // fontFamily: 'Ubuntu',
            color: "#ffffff",
            justifyContent: "start",
            // fontWeight: 'bold',
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          regular: {
            ["@media (min-width:600px)"]: {
              // eslint-disable-line no-useless-computed-key
              paddingLeft: "0px",
              paddingRight: "0px",
              // minHeight:'3px',
              marginBottom: "2px",
              marginTop: "0px",
            },
          },
        },
      },

      //@ts-ignore
      MUIDataTableSelectCell: {
        styleOverrides: {
          headerCell: {
            backgroundColor: "#5f6062",
            color: "wh",
          },
        },
      },

      MUIDataTable: {
        styleOverrides: {
          responsiveBase: {
            position: "relative",
            height: "auto",
            borderRadius: "18px",
            border: "1px solid #f2f2f2",
            boxShadow: "0 0 6px 4px #efefef",
          },
        },
      },
      MUIDataTablePagination: {
        styleOverrides: {
          navContainer: {
            border: 0,
            boxShadow: "0 ",
          },
        },
      },
      MuiCardHeader: {
        styleOverrides: {
          title: {
            fontFamily: "Ubuntu",
            display: "flex",
          },
          avatar: {
            paddingLeft: 26,
            fontFamily: "Ubuntu",
          },
        },
      },
    },
  });

const Contacts = () => {
  const params = useParams();

  const app_id = params.id

  const [contacts, setContacts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [upload, setUpload] = useState(false);

  const getContacts = () => {
    console.log("THIS GETS HERE!!!!!!!!");

    contactsAction(app_id)
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED");
        } else {
          setContacts(res.data);
         
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeCreateModal = (e) => {
    e.preventDefault();
    setCreateModal(false)
  }

  const closeUpload = (e) => {
    e.preventDefault();
    setUpload(false)
  }


  useEffect(() => {
    getContacts();
    setIsLoaded(true)

  }, [createModal]);

  console.log("CONTACTS ARE......", contacts)

  const columns = [
    {
      name: "id",
      label: "First Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "source",
      label: "Last Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "mobile_no",
      label: "Mobile No",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "status_code",
      label: "Status",
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
    selectableRowsHeader: true,
    selectableRows: "multiple",
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
      <CreateModal createModal={createModal} closeCreateModal={closeCreateModal} app_id={app_id}/>
      <h1 className="text-2xl text-primary mb-6">Contacts</h1>
      <h4 className="text-md text-primary">A list of contacts for the client</h4>
      <div className="flex justify-end">
        <button
          type="button"
          className="text-white w-36 bg-[#5F6062] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-2 mt-4 flex items-center mr-2"
          onClick={() =>setCreateModal(true)}
        >
          <AddIcon />
          <p className="ml-4">Add Contact</p>
        </button>
        <button
          type="button"
          className="text-white w-42 bg-[#5F6062] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-2 mt-4 flex items-center"
          onClick={() =>setUpload(true)}
        >
          <UploadIcon />
          <p className="ml-4">Upload Contact</p>
        </button>
      </div>
      {upload ? <div>
      <FileUpload closeUpload={closeUpload}/>
      </div> : <div></div>}
      
      <div className="mt-4">
        <ThemeProvider theme={getMuiTheme()}>
          <Table columns={columns} options={options} data={contacts} />
        </ThemeProvider>
      </div>
    </Sidebar>
  );
};

export default Contacts;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from "../../components/table/table"
import { appsAction } from "../../actions/applications/appsActions";
import AdminSidebar from "../../components/adminSidebar/adminSidebar";
import CreateAppModal from "../../components/modals/create_app";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddLinkIcon from '@mui/icons-material/AddLink';
import AttachServiceModal from "../../components/modals/attach_service";
import AttachUserModal from "../../components/modals/attach_user";
import {useParams} from 'react-router-dom';

const getMuiTheme = () =>
  createTheme(
  
  );

const AllApps = () => {

  const params = useParams();

  const app_id = params.id

  const [apps, setApps] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [createAppModal, setCreateAppModal] = useState(false);
  const [attachServiceModal, setAttachServiceModal] = useState(false);
  const [attachUserModal, setAttachUserModal] = useState(false);

  const closeCreateAppModal = (e) => {
    e.preventDefault();
    setCreateAppModal(false)
  }

  const closeAttachServiceModal = (e) => {
    e.preventDefault();
    setAttachServiceModal(false)
  }

  const closeAttachUserModal = (e) => {
    e.preventDefault();
    setAttachUserModal(false)
  }

  const handleClick = () => {
    setAttachServiceModal(true)
  }

  const handleClick1 = () => {
    setAttachUserModal(true)
  }


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
  }, [createAppModal]);

  const columns = [
    {
     name: "name",
     label: "Name",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "email",
     label: "Email",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "status_code",
     label: "Status",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "country_code",
     label: "Country",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
      name: "",
      label: "Attach",
      options: {
       filter: true,
       sort: false,
       customBodyRender: (tableMeta, dataIndex, rowIndex) => {
        return (
          <button onClick={handleClick}>
          <AddLinkIcon />
          </button>
        );
      }
      }
     },
     {
      name: "",
      label: "Attach",
      options: {
       filter: true,
       sort: false,
       customBodyRender: (tableMeta, dataIndex, rowIndex) => {
        return (
          <button onClick={handleClick1}>
          <PersonAddIcon />
          </button>
        );
      }
      }
     },
   ];

  const options = {
    filter: false,
    filterType: 'textField',
    responsive: 'standard',
    print: false,
    tableId: "03009226196169874",
    fixedHeader: true,
    fontFamily: 'Ubuntu',
    viewColumns: false,
    selectableRows: "none",
    fixedSelectColumn: true,
    tableBodyHeight: 'auto',
    enableNestedDataAccess: '.',
    elevation: 0,
    count: 30,
    rowsPerPageOptions: [10, 20, 50],
    downloadOptions: {
      separator: ',',
      filename: 'Customers Summary.csv',
      filterOptions: {
        useDisplayedColumnsOnly: false, // it was true
        useDisplayedRowsOnly: false, // it was true
      },
    },
    downloadFile: true,
    onDownload: (buildHead, buildBody, columns, data) => {
      let val = `${buildHead(columns)}${buildBody(data)}`.replace(/[^\x00-\x7F]/g, "").toString().trim();
      return val;
    },
   
    textLabels: {
      body: {
        noMatch: isLoaded ? "Sorry, no matching records exist in Suss"
          : <div >
            ......
          </div>,
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
          color: 'primary',
          variant: 'outlined',
          className: 'testClass123',
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
    }
  }

  return (
    <AdminSidebar>
    <CreateAppModal createAppModal={createAppModal} closeCreateAppModal={closeCreateAppModal}/>
    <AttachServiceModal attachServiceModal={attachServiceModal} closeAttachServiceModal={closeAttachServiceModal} app_id={app_id}/>
    <AttachUserModal attachUserModal={attachUserModal} closeAttachUserModal={closeAttachUserModal} app_id={app_id}/>
    <h1 className="text-2xl text-primary mb-6">All Organisations</h1>
    <h4 className="text-md text-primary">A list of all the Organisations </h4>
    <div className="flex justify-end">
        <button
          type="button"
          className="text-white w-36 bg-[#5F6062] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-2 mt-4 flex items-center mr-2"
          onClick={() =>setCreateAppModal(true)}
        >
          <AddBusinessIcon />
          <p className="ml-4">Create Org.</p>
        </button>
      </div>

    <div className="mt-4">
      <ThemeProvider theme={getMuiTheme()}>

        <Table columns={columns} options={options} data={apps} />
      </ThemeProvider>
    </div>
    </AdminSidebar>
  );
};

export default AllApps;

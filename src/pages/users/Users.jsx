import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from "../../components/table/table"
import AdminSidebar from "../../components/adminSidebar/adminSidebar";
import RegisterUserModal from "../../components/modals/register_user";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const getMuiTheme = () =>
  createTheme(
    );

const Users = () => {
  // const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  const closeRegisterModal = (e) => {
    e.preventDefault();
    setRegisterModal(false)
  }

  const users = [
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "id": 1,
      "phone": "+1-555-555-5555",
      "company": "Example Inc."
    },
    {
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "id": 2,
      "phone": "+1-555-555-5556",
      "company": "Example Corp."
    },
    {
      "name": "Bob Johnson",
      "email": "bob.johnson@example.com",
      "id": 3,
      "phone": "+1-555-555-5557",
      "company": "Example Ltd."
    },
    {
      "name": "Samantha Lee",
      "email": "samantha.lee@example.com",
      "id": 4,
      "phone": "+1-555-555-5558",
      "company": "Example Co."
    },
    {
      "name": "Michael Chen",
      "email": "michael.chen@example.com",
      "id": 5,
      "phone": "+1-555-555-5559",
      "company": "Example Group"
    }
  ]
  

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
     name: "phone",
     label: "Phone",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "company",
     label: "Company",
     options: {
      filter: true,
      sort: false,
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
    <RegisterUserModal registerModal={registerModal} closeRegisterModal={closeRegisterModal}/>
    <h1 className="text-2xl text-primary mb-6">All Users</h1>
    <h4 className="text-md text-primary">A list of all the users </h4>
    <div className="flex justify-end">
        <button
          type="button"
          className="text-white w-36 bg-[#5F6062] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-2 mt-4 flex items-center mr-2"
          onClick={() =>setRegisterModal(true)}
        >
          <PersonAddAlt1Icon />
          <p className="ml-4">Register User</p>
        </button>
      </div>
    <div className="mt-4">
      <ThemeProvider theme={getMuiTheme()}>

        <Table columns={columns} options={options} data={users} />
      </ThemeProvider>
    </div>
    </AdminSidebar>
  );
};

export default Users;

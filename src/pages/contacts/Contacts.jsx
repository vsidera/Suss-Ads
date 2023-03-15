import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from "../../components/table/table"
import { contactsAction } from "../../actions/contacts/contactsAction";

const getMuiTheme = () =>
    createTheme({
      components: {
        MuiTableCell: {
          styleOverrides: {
            root: {
              backgroundColor: '#FFFFFF',
              fontFamily: 'Ubuntu',
              fontWeight: 'inherit'
            },
            footer: {
              border: 0
            }
          }
        },
        //@ts-ignore
        MUIDataTableBodyCell: {
          styleOverrides: {
            root: {
              textAlign: 'center',
              alignItems: 'center',
            }
          }
        },
        MuiButton: {
          styleOverrides: {
            root: {
              // fontFamily: 'Ubuntu',
              color: '#ffffff',
              justifyContent: 'start',
              // fontWeight: 'bold',
            },
          },
        },
        MuiToolbar: {
          styleOverrides: {
            regular: {
              ['@media (min-width:600px)']: { // eslint-disable-line no-useless-computed-key
                paddingLeft: '0px',
                paddingRight: '0px',
                // minHeight:'3px',
                marginBottom: '2px',
                marginTop: '0px',
              }

            }
          }
        },
 
        //@ts-ignore
        MUIDataTableSelectCell: {
          styleOverrides: {
            headerCell: {
              backgroundColor: '#5f6062',
              color: 'wh',
            },
          },
        },

        MUIDataTable: {
          styleOverrides: {
            responsiveBase: {
              position: 'relative',
              height: 'auto',
              borderRadius: '18px',
              border: '1px solid #f2f2f2',
              boxShadow: '0 0 6px 4px #efefef'
            },
          },
        },
        MUIDataTablePagination: {
          styleOverrides: {
            navContainer: {
              border: 0,
              boxShadow: '0 '
            },
          },
        },
        MuiCardHeader: {
          styleOverrides: {
            title: {
              fontFamily: 'Ubuntu',
              display: 'flex'
            },
            avatar: {
              paddingLeft: 26,
              fontFamily: 'Ubuntu',
            }
          },
        }

      }
    });

const Contacts = () => {

  const [contacts, setContacts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)

  const getContacts = () => {

    console.log("THIS GETS HERE!!!!!!!!")

    contactsAction()
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED")
        } else {
          setContacts(res.data)
          setIsLoaded(true)
        }
      })
      .catch((err) => {
        console.log(err)
      });
  };

  useEffect(() => {

    getContacts();
  }, []);

  const columns = [
    {
     name: "id",
     label: "Name",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "source",
     label: "Company",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "direction",
     label: "City",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "status_desc",
     label: "State",
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
    search: false,
    print: false,
    searchPlaceholder: 'Search By Name,Account Number & PayPlans',
    tableId: "03009226196169874",
    fixedHeader: true,
    fontFamily: 'Ubuntu',
    viewColumns: false,
    selectableRows: "none",
    fixedSelectColumn: true,
    tableBodyHeight: 'auto',
    enableNestedDataAccess: '.',
    elevation: 0,
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

    searchOpen: true,
    searchText: " ",
   
    textLabels: {
      body: {
        noMatch: isLoaded ? "Sorry, no matching records exist in ecoa Nexus"
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
      <Sidebar>
      <h1 className="text-2xl text-primary mb-6">Contacts</h1>
      <div>
        <ThemeProvider theme={getMuiTheme()}>

          <Table columns={columns} options={options} data={contacts} />
        </ThemeProvider>
      </div>
      </Sidebar>
    )
  }
  
  export default Contacts
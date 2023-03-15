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

  const getContacts = (e) => {
    e.preventDefault();
    console.log("THIS GETS HERE!!!!!!!!")

    contactsAction()
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED")
        } else {
          setContacts(res.data)
        }
      })
      .catch((err) => {
        console.log(err)
      });
  };

  useEffect(() => {

    getContacts();
  }, []);

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
    count: customerCount,
    elevation: 0,
    page: page,
    serverSide: true,
    rowsPerPageOptions: [10, 20, 50],
    onTableChange: (action, tableState) => {
      console.log("ACTION IS !!!!", action);
      if (action === "changePage") {

        setIsLoaded(false);
        setPage(tableState.page);

      } else if (action === "changeRowsPerPage") {
        console.log("action not handled.", tableState);
        setIsLoaded(false);
        setLimit(tableState.rowsPerPage);
      }
      else {
        console.log("action not handled.");
      }
    },
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
    customSearchRender: (searchText, handleSearch, hideSearch, options) => {
      return (
        // @ts-ignore
        <SearchComponent
          setSearch={setSearch}
          getData={getClientsSearch}
          setKey={setKey}
        />
      );
    },
   
    customToolbarSelect: (selectedRows, data) =>
      <SelectedRowsToolbar
        selectedRows={selectedRows}
        data={data}
        columns={columns}
        datatableTitle="Selected Customers"
      />,
    textLabels: {
      body: {
        noMatch: isLoaded ? "Sorry, no matching records exist in ecoa Nexus"
          : <div >
            <Backdrop
              sx={{ position: 'relative', height: 450, backgroundColor: '#E8E9EC', }}
              open={true} >
              <FadeLoader
                style={{ marginLeft: 45, position: "relative", top: 3 }}
              />
            </Backdrop>
          </div>,
        toolTip: "Sort",
        columnHeaderTooltip: (column) => column`Sort for ${column.label}`
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
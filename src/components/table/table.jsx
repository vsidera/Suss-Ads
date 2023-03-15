import React from 'react'
import Paper from "@mui/material/Paper";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DownloadIcon from '../TableComponents/Export';
import SearchComponent from '../search';
import { useState } from "react";

const   Datatable = ({columns, options, filteredResults}) => {

  const components = {
    icons: {
      DownloadIcon,
    }
  };

  return (

        <div>
        <MUIDataTable 
          columns={columns}
          data={filteredResults}
          options={options}
          components={components}
        />

        </div>
  )
      
}

export default Datatable

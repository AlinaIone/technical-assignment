import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePagination } from "../hooks/usePagination";
import { storeActions } from "../store/store";
import { Button, Grid, IconButton, } from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

const activePageStyle = {
    color: '#52f2c8',
    fontWeight: "bold"    
}
const pageStyle={
  color: "#e6e6fa",
    display: 'inline',
    cursor: 'pointer',
    fontSize: '1.1rem',
}
const paginationRoot={
    padding: "2rem",
    marginBottom:'1rem',
    flexWrap: "nowrap" ,
}
const iconButtons={
   color: '#e6e6fa',
   fontSize: '1.1rem',
}

// PAGINATION PARAMETERS 
// totalPages - the max number of pages accepted by the API is 500
const Pagination = ({maxNrOfPagesVisible = 5, siblingCount = 2, totalPages = 500, onPageChange}) => {
  const paginationState = useSelector((state) => state.pagination);
  const { activePage } = paginationState;
  const dispatch = useDispatch();

  const paginationRange = usePagination(activePage, siblingCount, maxNrOfPagesVisible, totalPages);

  const handlePage = (newPageState) => {
    dispatch(storeActions.pagination.setActivePage(newPageState));
    onPageChange(newPageState)
  };

  const handleFirstPageButtonClick = () => {
    dispatch(storeActions.pagination.setActivePage(1));
    onPageChange()
  };

  const handleLastPageButtonClick = () => {
    dispatch(storeActions.pagination.setActivePage(totalPages));
    onPageChange(totalPages)
  };

  const handleBackButtonClick = (newPageState) => {
    dispatch(storeActions.pagination.setActivePage(activePage-1));
    onPageChange(newPageState)
  };
  
  const handleNextButtonClick = (newPageState) => {
    dispatch(storeActions.pagination.setActivePage(activePage+1));
    onPageChange(newPageState)
  };

  return (
      <Grid item container xs={12} justifyContent="center" direction="row" alignItems="center" style={paginationRoot}  >
        <IconButton onClick={handleFirstPageButtonClick} disabled={activePage === 1} aria-label="first-page"  sx={iconButtons}>
          <FirstPageIcon />
        </IconButton>

        <IconButton  onClick={() => handleBackButtonClick(activePage-1)} disabled={activePage === 1} aria-label="prev-page"  sx={iconButtons}>
          <KeyboardArrowLeftIcon />
        </IconButton>

        {paginationRange.map((pageNumber, index) => {
          return pageNumber === "..." ? (
            <Grid item key={index + "a"} style={pageStyle}>
              {pageNumber}
            </Grid>
          ) : (
              <Button key={pageNumber} style={activePage === pageNumber  ? { ...pageStyle, ...activePageStyle } : pageStyle}
              disabled={activePage === pageNumber}
              onClick={() => handlePage(pageNumber)}>
                 {pageNumber}
              </Button>
          );
        })}
        <IconButton
          onClick={() => handleNextButtonClick(activePage+1)}
          disabled={activePage >= totalPages}
          aria-label="next-page"
          sx={iconButtons}
        >
          <KeyboardArrowRightIcon />
        </IconButton>

        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={activePage >= totalPages}
          aria-label="last-page"
          sx={iconButtons}
        >
          <LastPageIcon />
        </IconButton>
      </Grid>
  );
};

export default Pagination;

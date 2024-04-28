import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePagination } from "../hooks/usePagination";
import { storeActions } from "../store/store";
import { Grid, IconButton, } from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

const activePageStyle = {
    color: 'green',
    fontWeight: "bold"
}
const pageStyle={
    color: 'gray',
    display: 'inline',
    padding:'0.75rem',
    cursor: 'pointer'
}
const paginationRoot={
    backgroundColor: "lightGreen",
    padding: "1rem",
    boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)"
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
    <Grid
      item
      container
      justifyContent="center"
      alignItems="center"
      style={paginationRoot}
    >
      <Grid
        item
        container
        md={8}
        justifyContent="center"
        direction="row"
        alignItems="center"
        style={{ flexWrap: "nowrap" }}
      >
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={activePage === 1}
          aria-label="first-page"
        >
          <FirstPageIcon />
        </IconButton>

        <IconButton
          onClick={() => handleBackButtonClick(activePage)}
          disabled={activePage === 1}
          aria-label="prev-page"
        >
          <KeyboardArrowLeftIcon />
        </IconButton>

        {paginationRange.map((pageNumber, index) => {
          return pageNumber === "..." ? (
            <Grid item key={index + "a"} style={pageStyle}>
              {pageNumber}
            </Grid>
          ) : (
            <Grid
              item
              key={pageNumber}
              style={
                activePage === pageNumber
                  ? { ...pageStyle, ...activePageStyle }
                  : pageStyle
              }
              onClick={() => handlePage(pageNumber)}
            >
              {pageNumber}
            </Grid>
          );
        })}
        <IconButton
          onClick={() => handleNextButtonClick(activePage)}
          disabled={activePage >= totalPages}
          aria-label="next-page"
        >
          <KeyboardArrowRightIcon />
        </IconButton>

        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={activePage >= totalPages}
          aria-label="last-page"
        >
          <LastPageIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Pagination;

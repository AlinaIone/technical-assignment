import { Stack } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const MainNavigation = () => {
  return (
    <header>
      <nav>
        {/* <ul> */}
        <Stack direction="row" spacing={2}>
          <li>
         <NavLink to="/">Home</NavLink>
        
          </li>
          <li>
            <NavLink to="/favorites">Favorites</NavLink>
          </li>
        {/* </ul> */}
        </Stack>
      </nav>
    </header>
  );
};

export default MainNavigation;

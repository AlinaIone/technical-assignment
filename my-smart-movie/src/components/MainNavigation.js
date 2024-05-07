import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemText,
  Button,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";
import SearchBar from "./SearchBar";

const buttonStyle = {
  display: { xs: "none", md: "inline" },
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    right: "0%",
    transform: "translateX(0%)",
    bottom: 0,
    height: 2,
    width: 0,
    backgroundColor: "#93c5c9",
    borderRadius: 4,
    transition: "width 0.3s ease, left 0.9s ease",
  },
  "&:hover::after": {
    width: "100%",
    left: 0,
  },
  "&:hover": {
    backgroundColor: "transparent",
    color: "#93c5c9",
  },
};

const MainNavigation = () => {
  const navigate = useNavigate();
  const [isSecondMenuVisible, setIsSecondMenuVisible] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsSecondMenuVisible(open);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsSecondMenuVisible(false);
    };
    window.addEventListener("resize", handleResize);

    return () => window.addEventListener("resize", handleResize);
  }, []);


  return (
    <>
      <AppBar position="sticky" style={{ backgroundColor: '#736560' /*"#5c5c5e"*/ }}>
        <Toolbar
          sx={{
            margin: { xs: "0 0.75rem 0 0.75rem", md: "0 8rem 0 8rem" },
            justifyContent: "center",
            alignItems: "center",
            padding:0
          }}
        >
          <Grid container item md={4} justifyContent={"start"}>
            <Typography variant="h6" component="div">
              My Smart Movie
            </Typography>
          </Grid>

          <Grid container item md={4} justifyContent={"center"}>
            <SearchBar />
          </Grid>

          <Grid container item md={4} justifyContent={"end"} gap={2} wrap="nowrap">
            <Button
              size="large"
              color="inherit"
              onClick={() => navigate("/movies")}
              sx={buttonStyle}
            >
              Home
            </Button>
            <Button
              size="large"
              color="inherit"
              onClick={() => navigate("favorites")}
              sx={buttonStyle}
            >
              Favorites
            </Button>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: { xs: "inline", md: "none" } }}
              onClick={() => setIsSecondMenuVisible(!isSecondMenuVisible)}
            >
              <MenuIcon />
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={isSecondMenuVisible}
        onClose={toggleDrawer(false)}
        sx={{ position: "relative", display: { xs: "inline", md: "none" } }}
      >
        <List
          sx={{
            minWidth: "12rem",
            paddingTop: "4rem",
            backgroundColor: "#5c8c9c",
            height: "100%",
            color: "white",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              color: "white",
              "&:hover": {
                backgroundColor: "#516077",
              },
            }}
            onClick={toggleDrawer(false)}
            aria-label="clear"
          >
            <ClearIcon />
          </IconButton>
          <ListItemButton
            sx={{ "&:hover": { backgroundColor: "#516077" } }}
            component={NavLink}
            to="/movies"
            onClick={toggleDrawer(false)}
          >
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton
            sx={{ "&:hover": { backgroundColor: "#516077" } }}
            component={NavLink}
            to="favorites"
            onClick={toggleDrawer(false)}
          >
            <ListItemText primary="Favorites" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export default MainNavigation;

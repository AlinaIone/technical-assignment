import React from "react";

const rootStyle = {
  width: "100%",
  backgroundColor: "#736560",
  color: "#fff",
  padding: "15px",
  textAlign: "center",
  marginTop: '1rem'
};

const Footer = () => {
  return (
    <footer style={rootStyle}>
      <p style={{ margin: "5px" }}>&copy; 2024 My Smart Movie</p>
      <p style={{ margin: "5px" }}>Designed and Developed by Alina Barbu</p>
    </footer>
  );
};

export default Footer;

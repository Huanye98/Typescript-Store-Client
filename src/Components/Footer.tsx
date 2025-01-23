import { Box,Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#dedad5",
        width: "100%",
        padding:2,
        bottom: 0,
        position:"relative",
        height:"200px",
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        textAlign:"center"
      }}
    >

      <Typography variant="body1">
        © {new Date().getFullYear()} My Website. All rights reserved.
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 1 }}>
        <Typography  color="inherit" >
          Privacy Policy
        </Typography>
        <Typography  color="inherit" >
          Terms of Service
        </Typography>
        <Typography  color="inherit" >
          Contact Us
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;

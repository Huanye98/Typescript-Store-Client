import { Box, Typography } from "@mui/material"
import Nav from "../../Components/Nav"
import Footer from "../../Components/Footer"


function Error500 () {
  return (<Box>
    <Nav/>
    <Typography variant="h2">
      Sorry error 500, something went wrong in our side. Please try again later.
    </Typography>
    <Footer/>
  </Box>
  )
}

export default Error500 
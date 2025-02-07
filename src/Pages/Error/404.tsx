import { Box, Typography } from "@mui/material"
import Nav from "../../Components/Nav"
import Footer from "../../Components/Footer"

function Error404() {
  return (
    <Box>
      <Nav/>
      <Typography variant="h2">Error 404 :(</Typography>
      <Typography variant="h2">Sorry the page you are trying to access doesnt exist</Typography>
      <Footer/>
    </Box>
  )
}

export default Error404
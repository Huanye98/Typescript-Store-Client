import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#dedad5",
        width: "100%",
        mt:5,
        padding: 2,
        gap: 2,
        bottom: 0,
        position: "relative",
        display: "flex",
        flexDirection:  "column",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#dedad5",
          width: "100%",
          padding: 2,
          gap: 6,
          bottom: 0,
          position: "relative",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h4">Subscribe to our newsletter</Typography>
          <Typography variant="body2">Sign up below to join, where you'll get a front-row seat to collection drops, first dibs on shiny new stuff, absurd collaborations, and random party invites. Buckle up!</Typography>
          <Box sx={{display:"flex", gap:1}}>
          <TextField />
          <Button variant="contained" sx={{height:"60px"}}> <SendIcon/> </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <Box>
            <Typography variant="h5">INFO</Typography>
            <Typography variant="body2">Faq</Typography>
            <Typography variant="body2">Shipping</Typography>
            <Typography variant="body2">Returns</Typography>
            <Typography variant="body2">Payments</Typography>
          </Box>
          <Box>
            <Typography variant="h5">POLICIES</Typography>
            <Typography variant="body2">Privacy policy</Typography>
            <Typography variant="body2">Cookie policy</Typography>
          </Box>
          <Box>
            <Typography variant="h5">SOCIAL</Typography>
            <Typography variant="body2">Twitter</Typography>
            <Typography variant="body2">Instagram</Typography>
            <Typography variant="body2">Bluesky</Typography>
            <Typography variant="body2">TikTok</Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        © {new Date().getFullYear()} Copyright © 2025 Canvas&Chaos.  All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;

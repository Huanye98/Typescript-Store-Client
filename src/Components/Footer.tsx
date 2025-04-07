import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import service from "../service/service.config";
function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const subscribeToNewsletter = async ()=>{
    setError("");
    setSuccess("");
    if (!email.trim()|| !emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return;
    }
    try {
      await service.post("/users/newsletter/subscribe",{email:email})
      setSuccess("Successfully subscribed!");
      setEmail("");
    } catch (error) {
      console.error(error)
      setError("Subscription failed. Please try again.");
      console.error("Newsletter subscription error:", error);
    }
  }


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
        <Box sx={{display:"flex", flexDirection:"column", gap:2}}>
          <Typography variant="h4">Subscribe to our newsletter</Typography>
          <Typography variant="body2">"Don’t miss out—join our squad for fresh drops, cool perks, and all the good vibes straight to your inbox!"</Typography>
          <Box sx={{display:"flex", gap:1}}>
          <TextField
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              variant="outlined"
              error={!!error}
              helperText={error}
              aria-label="Email input"
              sx={{ flex: 1 }}
            />
          <Button variant="contained" sx={{height:"60px"}} onClick={subscribeToNewsletter} aria-label="Subscribe"> <SendIcon/> </Button>
          </Box>
          {success && (
            <Typography variant="body2" color="success.main">
              {success}
            </Typography>
          )}
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
      © {new Date().getFullYear()} Canvas&Chaos. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;

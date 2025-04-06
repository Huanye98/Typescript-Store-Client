import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import service from "../../service/service.config";
import {
  Box,
  Button,
  Typography,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      if (!token) {
        setStatus("error");
        return;
      }
      try {
        await service.get(`/users/verify-email`, { params: { token } });
        setStatus("success");
      } catch (err: unknown) {
        setStatus("error");
      }
    };

    verifyEmail();
  }, [searchParams]);
  const resendEmail = async (email: string) => {
    try {
      await service.post("/users/send-verification-email", { email });
      setOpen(true);
      setSeverity("success");
      setMessage("Verification email sent successfully!");
    } catch (error) {
      setMessage("Failed to resend verification email");
      setSeverity("error");
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setMessage("");
  };

  return (
    <Box sx={{ textAlign: "center", marginTop: 30 }}>
      {status === "verifying" && <p>Verifying your email...</p>}
      {status === "success" && (
        <Box className="success">
          <Typography variant="h2">Email Verified! </Typography>
          <Typography>You can now access your account.</Typography>
          <Link to="/login">
            <Typography>Go to Login</Typography>
          </Link>
        </Box>
      )}

      {status === "error" && (
        <>
          <Box>
            <Typography variant="h2" color="error">
              Verification Failed{" "}
            </Typography>
            <Typography color="error">
              Invalid or expired verification link
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                marginTop: "1rem",
              }}
            >
              <Typography>Need a new verification email? </Typography>
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{
                  width: "300px",
                  margin: "0 auto",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: "#eb851e",
                    },
                  },
                }}
              />
              <Button
                color="info"
                variant="outlined"
                sx={{ width: "300px", margin: "0 auto" }}
                onClick={() => resendEmail(email)}
              >
                Resend
              </Button>
            </Box>
          </Box>

          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert severity={severity}>{message}</Alert>
          </Snackbar>
        </>
      )}
    </Box>
  );
}

export default VerifyEmail;

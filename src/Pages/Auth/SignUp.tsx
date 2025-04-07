import { useState } from "react";
import Nav from "../../Components/Nav";
import service from "../../service/service.config";
import {
  TextField,
  Button,
  Box,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
interface UserData {
  email: String;
  password: String;
  repeatPassword: string;
}

const SignUp = () => {
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const validateForm = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

    // Validate password
    if (!passwordRegex.test(formData.password)) {
      setErrorMessage(
        "Password must contain at least 8 characters, including uppercase, lowercase, a number, and a special character."
      );
      setOpenErrorSnackbar(true);
      return false;
    }

    // Check if passwords match
    if (formData.password !== formData.repeatPassword) {
      setErrorMessage("Passwords do not match.");
      setOpenErrorSnackbar(true);
      return false;
    }

    return true;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const register = async (userData: UserData) => {
    if (!validateForm()) {
      return;
    }
    try {
      await service.post("/users/create", userData);
      await service.post("/users/send-verification-email", {email: userData.email});
      setSuccessMessage(
        "Registration successful! Please check your email for verification.")
      setOpenSuccessSnackbar(true);
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        setErrorMessage("There was an error with the email you provided.");
        setOpenErrorSnackbar(true);
      } else {
        setErrorMessage(
          "An error occurred while registering. Please try again."
        );
        setOpenErrorSnackbar(true);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleCloseSnackbar = () => {
    setOpenErrorSnackbar(false);
    setOpenSuccessSnackbar(false);
    setErrorMessage("");
    setSuccessMessage("");
  };
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    register(formData);
  }
  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black',
      },
    },
    '& .MuiInputLabel-root': {
      '&.Mui-focused': {
        color: "#eb851e",
      },
    },
  };
  return (
    <>
      <Nav />
      <Container >
        <form onSubmit={handleSubmit}>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            sx={{
              mt: "30px",
              width: "50%",
              justifySelf: "center",
              margin: "200px 0",
              
            }}
          >
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              variant="outlined"
              fullWidth
              sx={inputStyles}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              variant="outlined"
              fullWidth
              sx={inputStyles}
            />
            <TextField
              label="Repeat password"
              type="password"
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
              required
              variant="outlined"
              fullWidth
              sx={inputStyles}
            />
            
            <Button type="submit" variant="contained"  sx={{ "&:hover": { backgroundColor: "secondary.main" } }} fullWidth>
              {loading ? "Signing up ..." : "Sign Up"}
            </Button>
          </Box>
        </form>
        <Snackbar
          open={openErrorSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity={"error"}>
            {errorMessage}
          </Alert>
        </Snackbar>
        <Snackbar
          open={openSuccessSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity={"success"}>
            {successMessage}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default SignUp;

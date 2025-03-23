import { useState } from "react";
import Nav from "../../Components/Nav";
import service from "../../service/service.config";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const validateForm = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Validate password
    if (!passwordRegex.test(formData.password)) {
      setErrorMessage(
        "Password must contain at least 8 characters, including uppercase, lowercase, a number, and a special character."
      );
      setOpenSnackbar(true);
      return false;
    }

    // Check if passwords match
    if (formData.password !== formData.repeatPassword) {
      setErrorMessage("Passwords do not match.");
      setOpenSnackbar(true);
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
    console.log(formData);
    try {
      await service.post("/users/create", userData);
      navigate("/login", { state: { fromSignup: true } });
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.status === 409) {
        setErrorMessage("Email is already in use");
        setOpenSnackbar(true);
      } else {
        setErrorMessage(
          "An error occurred while registering. Please try again."
        );
        setOpenSnackbar(true);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    register(formData);
  }
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
            />
            <TextField
              label="repeatPassword"
              type="password"
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
              required
              variant="outlined"
              fullWidth
            />
            <Button type="submit" variant="contained"  sx={{ "&:hover": { backgroundColor: "secondary.main" } }} fullWidth>
              {loading ? "Signing up ..." : "Sign Up"}
            </Button>
          </Box>
        </form>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity={"error"}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default SignUp;

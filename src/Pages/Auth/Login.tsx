import { useContext, useState } from "react";
import Nav from "../../Components/Nav";
import service from "../../service/service.config";
import { AuthContext } from "../../context/auth.contex";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Box, Button,Alert,TextField } from "@mui/material";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const { authenticateUser, isAdmin, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const fromSignup = location.state?.fromSignup;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const validateLogin = async (credentials: FormData) => {
    try {
      const response = await service.post("/users/login", credentials);
      console.log(response);
      localStorage.setItem("token", response.data.token);
      await authenticateUser();
      console.log(isLoggedIn, isAdmin);
      console.log("log in successful");
      navigate("/store");
    } catch (error) {
      console.log("was not able to log in", error);
    }
  };
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    validateLogin(formData);
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
      <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center" , justifyContent: "center", mt: 25}}>
        <Box>
          {fromSignup && (
            <Alert severity="success">
              Registration successful! You can now log in.
            </Alert>
          )}
        </Box>
        <Box
          component={"form"}
          onSubmit={handleSubmit}
          sx={{
            width:"350px",
            backgroundColor: "primary.main",
            display: "flex",
            flexDirection: "column",
            justifySelf: "center",
            gap: 3,
            padding: 3,
            margin: 4,
            boxShadow:
              "hsla(220, 20%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>

            <TextField
            label="Email:"
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={inputStyles}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>

            <TextField
            label="Password:"
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              sx={inputStyles}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{ "&:hover": { backgroundColor: "secondary.main" } }}
          >
            Log in
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Login;

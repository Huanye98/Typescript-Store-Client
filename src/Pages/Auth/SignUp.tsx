import { useState } from "react";
import Nav from "../../Components/Nav";
import service from "../../service/service.config";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Container } from "@mui/material";
import utils
 from "../../utils";
interface UserData {
  email: String;
  password: String;
  repeatPassword: string
}

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const {doPasswordsMatch} = utils

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const register = async (userData: UserData) => {
    if (
      !doPasswordsMatch(formData.password, formData.repeatPassword)
    ) {
      setError("passwords do not match");
      return;
    }
    console.log(formData)
    try {
      const userData = {email:formData.email,password:formData.password}
      console.log(userData)
      await service.post("/users/create", userData);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    register(formData);
  }
  return (
    <>
      <Nav />
      {error && <p>{error}</p>}
      <Container>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          sx={{
            mt: "30px",
            width: "30%",
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Sign Up
          </Button>
        </Box>
      </form>
    </Container>
    </>
  );
};

export default SignUp;

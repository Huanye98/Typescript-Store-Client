import Nav from "../../Components/Nav";
import { AuthContext } from "../../context/auth.contex";
import { useContext, useEffect, useState } from "react";
import service from "../../service/service.config";
import { Box, TextField, Button, Alert, Snackbar, CircularProgress } from "@mui/material";


interface form {
  password: string;
  repeatPassword: string;
  address: string;
  email: string;
}
interface UserData {
  user_email: string;
  address: string;
}
function Profile() {
  const { loggedUserId } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [userData, setUserData] = useState<UserData|null>(null);
  const [formData, setFormData] = useState<form>({
    email: "",
    password: "",
    repeatPassword: "",
    address: "",
  });

  useEffect(() => {
    fetchUserData();
  }, [loggedUserId]);

  const fetchUserData = async () => {
    try {
      const response = await service.get(`/users/${loggedUserId}`);
      setUserData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("was not able to get user data", error);
    }
  };
  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
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
  const changeData = async (field: keyof form) => {
    if (field === "password" && !validatePassword()) {
      return;
    }
    const payload = { [field]: formData[field] };

    try {
      await service.patch(`/users/modify/${loggedUserId}`, payload);
      if (field === "password") {
        setSuccessMessage("Password updated successfully");
        setOpenSnackbar(true);
      } else if (field === "address") {
        setSuccessMessage("Address updated successfully");
        setOpenSnackbar(true);
      } else if (field === "email") {
        setSuccessMessage("Email updated successfully");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Was not able to updata user information", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  if (!userData) {
    return (
        <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
        <h2>Loading</h2>
        <CircularProgress color="secondary" />
        </Box>)
  }

  return (
    <>
      <Nav />
      <Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={errorMessage ? "error" : "success"}
          >
            {errorMessage || successMessage}
          </Alert>
        </Snackbar>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 3,
          margin: 2,
          gap: 4,
        }}
      >
        <Box>
          <label htmlFor="email">Email:</label>
          <TextField
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            id="email"
            name="email"
            defaultValue={userData.user_email}
            fullWidth // Ensures the width of the input spans the entire container
            sx={{ marginBottom: 2 }} // Optional: Adds margin for spacing
          />
          <Button variant="contained" onClick={() => changeData("email")}>
            Change email
          </Button>
        </Box>

        <Box>
          <label htmlFor="address">Address:</label>
          {userData.address && <p>{userData.address}</p>}
          <TextField
            type="text"
            value={formData.address}
            onChange={handleInputChange}
            id="address"
            name="address"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" onClick={() => changeData("address")}>
            Change address
          </Button>
        </Box>

        <Box>
          <label htmlFor="password">Password:</label>
          <TextField
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            id="password"
            name="password"
            fullWidth
            sx={{ marginBottom: 2 }}
          />

          <label htmlFor="repeatPassword">Repeat password:</label>
          <TextField
            type="password"
            value={formData.repeatPassword}
            onChange={handleInputChange}
            id="repeatPassword"
            name="repeatPassword"
            fullWidth
            sx={{ marginBottom: 2 }}
          />

          <Button variant="contained" onClick={() => changeData("password")}>
            Change password
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Profile;

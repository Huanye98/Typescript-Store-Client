import Nav from "../../Components/Nav";
import { AuthContext } from "../../context/auth.contex";
import { useContext, useEffect, useState } from "react";
import service from "../../service/service.config";
import { Password } from "@mui/icons-material";
import utils from "../../utils";
import { Box,TextField,Button} from "@mui/material";

interface form {
  password: string;
  repeatPassword: string;
  address: string;
  email: string;
}

function Profile() {
  const { loggedUserId } = useContext(AuthContext);
  const { doPasswordsMatch } = utils;
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState<string | null>(null);
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
  const changeData = async (field: string) => {
    if (
      field === "password" &&
      !doPasswordsMatch(formData.password, formData.repeatPassword)
    ) {
      setError("passwords do not match");
      return;
    }

    const payload = { [field]: formData[field] };

    try {
      await service.patch(`/users/modify/${loggedUserId}`, payload);
      setError(null);
      console.log("User information updated successfully");
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

  if (!userData) {
    return <p>Loading user data...</p>;
  }

  return (
    <>
    <Nav />
  
    {error && <p>{error}</p>}
    <Box sx={{ display: "flex", flexDirection: "column", padding: 3, margin: 2, gap:4 }}>
      <Box>
        <label htmlFor="email">Email:</label>
        <TextField
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          id="email"
          name="email"
          defaultValue={userData.user_email}
          fullWidth  // Ensures the width of the input spans the entire container
          sx={{ marginBottom: 2 }}  // Optional: Adds margin for spacing
        />
        <Button variant="contained" onClick={() => changeData("email")}>Change email</Button>
      </Box>
  
      <Box>
      <label htmlFor="address">Address:</label>
        {userData.address && <p>{userData.user_address}</p>}
        <TextField
          type="text"
          value={formData.address}
          onChange={handleInputChange}
          id="address"
          name="address"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" onClick={() => changeData("address")}>Change address</Button>
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
      
      <Button variant="contained" onClick={() => changeData("password")}>Change password</Button>
      </Box>
    </Box>
  </>
  );
}

export default Profile;

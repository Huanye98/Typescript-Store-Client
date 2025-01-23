import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, Typography, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthWrapper } from "./context/auth.contex.tsx";
const theme = createTheme({
  palette: {
    primary: {
      main: "#f9f9f9",
    },
    secondary: {
      main: "#ffdeb0",
    },
    background: {
      default: "#f9f4ed",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    body1: {
      fontSize: "1.2rem",
      color: "#eb851e",
    },
    body2: {
      fontSize: "1rem",
      color: "#45321e",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          "&:visited": {
            color: "secondary.main",
          },
          textDecoration: {
            color: "none",
          },
        },
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontFamily: "'Arial', sans-serif",
        fontSize: "0.5rem",
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthWrapper>
  </ThemeProvider>
);

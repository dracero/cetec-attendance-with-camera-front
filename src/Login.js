import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import './App.css'

const Login = () => {
  return(
    <Box m={0} pt={0} className="center">
      <Button href="http://localhost:8080/auth/google" variant="outlined">Login</Button>
    </Box>
  )
};

export default Login;
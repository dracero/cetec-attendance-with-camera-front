import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import './App.css'

const Login = () => {
  return(
    <Box m={0} pt={0} className="center">
      <Button href={process.env.REACT_APP_URL + "/auth/google"} variant="outlined">Login</Button>
    </Box>
  )
};

export default Login;
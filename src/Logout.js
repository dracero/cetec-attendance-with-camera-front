import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import './App.css';

const Logout = () => {
  return(
    <Box m={0} pt={0} className="right">
      <Button href={process.env.REACT_APP_URL + "/logout"} variant="outlined" >Logout</Button>
    </Box>
  )
};

export default Logout;
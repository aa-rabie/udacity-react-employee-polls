import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersAsync } from "../users/usersSlice";
import { setAuthUser, selectAuthUser } from "../authUser/authUserSlice";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const [selectedUser, setSeletedUser] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [alertDisplayed, setAlertDisplayed] = useState(false);
  let location = useLocation();
  let navigate = useNavigate();
  const doesAnyHistoryEntryExist = location.key !== "default";

  var currentlyLoggedInUser = useSelector(selectAuthUser);

  const handleChange = (event) => {
    setSeletedUser(users[event.target.value].id);
    setAlertDisplayed(
      event.target.value === "" || !users || !users[event.target.value]
    );
  };

  useEffect(() => {
    if (!loaded) {
      dispatch(fetchAllUsersAsync());

      setLoaded(true);
    }
  }, [loaded, dispatch]);

  var users = useSelector((state) => state.users.data);
  const usersIds = Object.keys(users);

  const handleSubmit = (event) => {
    event.preventDefault();
    setAlertDisplayed(selectedUser === "");
    if (selectedUser === "") return;

    //TODO: REMOVE LOG
    console.log({
      authUser: users[selectedUser],
      location: location,
      doesAnyHistoryEntryExist,
    });

    dispatch(setAuthUser(users[selectedUser]));

    setTimeout(() => {
      if (doesAnyHistoryEntryExist) {
        // go back to previous page
        navigate(-1);
      } else {
        navigate("/home");
      }
    }, 100);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {currentlyLoggedInUser === null ? "Sign in" : "Switch User"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel id="users-select-label">Login As</InputLabel>
            <Select
              labelId="users-select-label"
              id="users-select"
              name="users-select"
              value={selectedUser}
              label="Login As"
              onChange={handleChange}
              required
            >
              {usersIds.map((id) => {
                const user = users[id];
                return (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {currentlyLoggedInUser === null ? "Sign in" : "Switch User"}
          </Button>
          {alertDisplayed && (
            <Alert severity="error">Please select a user!</Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
}

import { useState } from "react";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersAsync } from "../users/usersSlice";
import { setAuthUser } from "../authUser/authUserSlice";

// TODO remove createTheme() , this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();
  const [selectedUser, setSeletedUser] = useState("");
  const [alertDisplayed, setAlertDisplayed] = useState(false);
  const handleChange = (event) => {
    setSeletedUser(users[event.target.value].id);
    setAlertDisplayed(
      event.target.value === "" || !users || !users[event.target.value]
    );
  };

  var status = useSelector((state) => state.users.status);
  if (status !== "loaded") {
    dispatch(fetchAllUsersAsync());
  }

  var users = useSelector((state) => state.users.data);
  const usersIds = Object.keys(users);

  const handleSubmit = (event) => {
    event.preventDefault();
    setAlertDisplayed(selectedUser === "");
    if (selectedUser === "") return;

    console.log({
      authUser: users[selectedUser],
    });

    dispatch(setAuthUser(users[selectedUser]));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
              Sign In
            </Button>
            {alertDisplayed && (
              <Alert severity="error">Please select a user!</Alert>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

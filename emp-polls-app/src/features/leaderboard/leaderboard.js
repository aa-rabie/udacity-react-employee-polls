import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersAsync } from "../users/usersSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Stack } from "@mui/material";

const Leaderboard = (props) => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  var status = useSelector((state) => state.users.status);

  var users = useSelector((state) => state.users.data);
  const usersIds = Object.keys(users);

  useEffect(() => {
    if (!loaded) {
      dispatch(fetchAllUsersAsync());
      setLoaded(true);
    }
  }, [loaded, dispatch]);

  function prepareData() {
    let data = [];
    usersIds.forEach((id) => {
      let user = users[id];
      data.push({
        user,
        answered: Object.keys(user.answers).length,
        created: user.questions.length,
      });
    });
    return data;
  }

  function sortDescending(a, b) {
    let sumA = a.answered + a.created;
    let sumB = b.answered + b.created;
    if (sumA < sumB) {
      return 1;
    }
    if (sumA > sumB) {
      return -1;
    }
    // a must be equal to b
    return 0;
  }

  let data = prepareData().sort(sortDescending);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="leaderboard table">
        <TableHead>
          <TableRow>
            <TableCell>Users</TableCell>
            <TableCell align="right">Answered</TableCell>
            <TableCell align="right">Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.user.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Stack direction={"row"}>
                  <Avatar src={row.user.avatarURL} /> {row.user.name} (
                  {row.user.id})
                </Stack>
              </TableCell>
              <TableCell align="right">{row.answered}</TableCell>
              <TableCell align="right">{row.created}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Leaderboard;

import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthUser } from "../authUser/authUserSlice";
import { saveQuestionAnswerAsync } from "../questions/questionsSlice";
import { Avatar } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const NotAnsweredQuestion = ({ questionId }) => {
  const dispatch = useDispatch();
  const [answered, setAnswered] = useState(false);
  var questions = useSelector((state) => state.questions.data);
  const question = questions[questionId];
  const authedUser = useSelector(selectAuthUser);
  var users = useSelector((state) => state.users.data);

  function prepareReplies() {
    var data = [];
    question["optionOne"].votes.forEach((userId) => {
      let user = users[userId];
      data.push({ one: user, two: null });
    });
    question["optionTwo"].votes.forEach((userId) => {
      let user = users[userId];
      data.push({ one: null, two: user });
    });
  }

  const selectOptionOne = (e) => {
    e.preventDefault();
    dispatch(
      saveQuestionAnswerAsync({
        authedUser,
        qid: questionId,
        answer: "optionOne",
      })
    );
    setTimeout(() => setAnswered(true), 250);
  };

  const selectOptionTwo = (e) => {
    e.preventDefault();
    dispatch(
      saveQuestionAnswerAsync({
        authedUser,
        qid: questionId,
        answer: "optionTwo",
      })
    );
    setTimeout(() => setAnswered(true), 250);
  };

  function ItemOne({ row }) {
    if (row.one !== null)
      return (
        <Stack direction={"row"}>
          <Avatar src={row.one.avatarURL} /> {row.one.name} ({row.one.id})
        </Stack>
      );
  }

  function ItemTwo({ row }) {
    if (row.two !== null)
      return (
        <Stack direction={"row"}>
          <Avatar src={row.two.avatarURL} /> {row.two.name} ({row.two.id})
        </Stack>
      );
  }

  function Replies() {
    if (!answered) return <div />;

    var data = prepareReplies();
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="leaderboard table">
          <TableHead>
            <TableRow>
              <TableCell>Users selected first option</TableCell>
              <TableCell>Users selected second option</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={(row.one || row.two).id}>
                <TableCell component="th" scope="row">
                  <ItemOne row={row} />
                </TableCell>
                <TableCell>
                  <ItemTwo row={row} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid xs={6}>
        <Stack>
          <TextField
            id="optionOne"
            label="First Option"
            variant="outlined"
            value={question["optionOne"]["text"]}
            disabled={true}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={answered}
            onClick={selectOptionOne}
          >
            Choose
          </Button>
        </Stack>
      </Grid>
      <Grid xs={6}>
        <Stack>
          <TextField
            id="optionTwo"
            label="Second Option"
            variant="outlined"
            value={question["optionTwo"]["text"]}
            disabled={true}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={answered}
            onClick={selectOptionTwo}
          >
            Choose
          </Button>
        </Stack>
      </Grid>
      <Grid xs={12}>{answered && <Replies />}</Grid>
    </Grid>
  );
};

export default NotAnsweredQuestion;

import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { useSelector } from "react-redux";
import { selectAuthUser } from "../authUser/authUserSlice";

import { Avatar } from "@mui/material";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";

const AnsweredQuestion = ({ questionId }) => {
  var questions = useSelector((state) => state.questions.data);
  const question = questions[questionId];
  const authedUser = useSelector(selectAuthUser);
  var users = useSelector((state) => state.users.data);
  var author = users[question.author];

  let selectedOptionTxt = "You selected ";
  let selectedOption = 0;
  const oneVotes = question["optionOne"].votes.length;
  const twoVotes = question["optionTwo"].votes.length;
  const totalVotes = oneVotes + twoVotes;
  const onePercentage = (100 * (oneVotes / totalVotes)).toFixed(2);
  const twoPercentage = (100 * (twoVotes / totalVotes)).toFixed(2);

  if (question["optionOne"].votes.indexOf(authedUser.id) > -1) {
    selectedOptionTxt = `${selectedOptionTxt} first option`;
    selectedOption = 1;
  } else if (question["optionTwo"].votes.indexOf(authedUser.id) > -1) {
    selectedOptionTxt = `${selectedOptionTxt} second option`;
    selectedOption = 2;
  }

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Stack>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">Poll By {author.name}</Typography>

            <Avatar src={author.avatarURL} sx={{ width: 64, height: 64 }} />
          </Box>
          <Typography variant="h4">Would You Rather</Typography>
        </Stack>
      </Grid>
      <Grid xs={6}>
        <Stack>
          <TextField
            id="optionOne"
            label="First Option"
            variant="outlined"
            value={question["optionOne"]["text"]}
            disabled={true}
            InputProps={
              selectedOption === 1
                ? {
                    startAdornment: (
                      <InputAdornment position="start">✔</InputAdornment>
                    ),
                  }
                : {}
            }
          />
          <Typography variant="h6">
            {oneVotes} person(s) selected this option
          </Typography>
          <Typography variant="h6">
            {onePercentage} % of total {totalVotes} votes selected this option
          </Typography>
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
            InputProps={
              selectedOption === 2
                ? {
                    startAdornment: (
                      <InputAdornment position="start">✔</InputAdornment>
                    ),
                  }
                : {}
            }
          />
          <Typography variant="h6">
            {twoVotes} person(s) selected this option
          </Typography>
          <Typography variant="h6">
            {twoPercentage} % of total {totalVotes} votes selected this option
          </Typography>
        </Stack>
      </Grid>
      <Grid xs={12}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">{selectedOptionTxt}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AnsweredQuestion;

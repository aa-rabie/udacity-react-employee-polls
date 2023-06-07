import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuestionsAsync } from "../questions/questionsSlice";
import { selectAuthUser } from "../authUser/authUserSlice";
import QuestionList from "../questions/QuestionList";
import { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";

const Home = (props) => {
  const dispatch = useDispatch();
  var currentlyLoggedInUser = useSelector(selectAuthUser);
  const [questionsLoaded, setQuestionsLoaded] = useState(false);
  const [displayNewQuestions, setDisplayNewQuestions] = useState(true);

  useEffect(() => {
    if (!questionsLoaded) {
      dispatch(fetchAllQuestionsAsync());
      setQuestionsLoaded(true);
    }
  }, [questionsLoaded, dispatch]);

  var questions = useSelector((state) => state.questions.data);
  const questionsIds = Object.keys(questions);

  function sortDescending(a, b) {
    let timestampA = a.timestamp;
    let timestampB = b.timestamp;
    if (timestampA < timestampB) {
      return 1;
    }
    if (timestampA > timestampB) {
      return -1;
    }
    // a must be equal to b
    return 0;
  }

  function filterQuestions() {
    let done = [],
      newQuestions = [];
    questionsIds.forEach((id) => {
      let q = questions[id];
      var isAnswered =
        q["optionOne"].votes.indexOf(currentlyLoggedInUser.id) > -1 ||
        q["optionTwo"].votes.indexOf(currentlyLoggedInUser.id) > -1;
      if (isAnswered) {
        done.push(q);
      } else {
        newQuestions.push(q);
      }
    });
    return {
      done: done.sort(sortDescending),
      newQuestions: newQuestions.sort(sortDescending),
    };
  }

  var qGroups = filterQuestions();

  const DoneQ = () => {
    return (
      !displayNewQuestions && (
        <QuestionList
          title="Answered Polls"
          questions={qGroups.done}
        ></QuestionList>
      )
    );
  };

  const NewQ = () => {
    return (
      displayNewQuestions && (
        <QuestionList
          title="Unanswered Polls"
          questions={qGroups.newQuestions}
        ></QuestionList>
      )
    );
  };

  const handleChange = (event) => {
    event.preventDefault();
    setDisplayNewQuestions(!displayNewQuestions);
  };

  return (
    <Stack spacing={2}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button variant="contained" onClick={handleChange}>
          {displayNewQuestions
            ? "Display Answered Polls"
            : "Display Unanswered Polls"}
        </Button>
      </Box>
      <NewQ />
      <DoneQ />
    </Stack>
  );
};

export default Home;

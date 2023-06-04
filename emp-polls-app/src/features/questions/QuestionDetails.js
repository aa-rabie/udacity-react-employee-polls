import { useParams, Navigate } from "react-router-dom";

import { selectAuthUser } from "../authUser/authUserSlice";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import { fetchAllQuestionsAsync } from "../questions/questionsSlice";
import NotAnsweredQuestion from "./NotAnsweredQuestion";

const primary = purple[500]; // #f44336
const QuestionDetails = () => {
  const dispatch = useDispatch();
  const authedUser = useSelector(selectAuthUser);
  const isAllowed = authedUser !== null;

  let { qid } = useParams();

  var status = useSelector((state) => state.questions.status);
  if (status !== "loaded") {
    dispatch(fetchAllQuestionsAsync());
  }

  var questions = useSelector((state) => state.questions.data);

  const questionNotFound = !questions.hasOwnProperty(qid);

  const q = questionNotFound ? null : questions[qid];

  var isAnswered =
    isAllowed === false || questionNotFound
      ? false
      : q["optionOne"].votes.indexOf(authedUser.id) > -1 ||
        q["optionTwo"].votes.indexOf(authedUser.id) > -1;

  //TODO: REMOVE
  console.log(
    `isAllowed : ${isAllowed}, qid: ${qid} , questionNotFound : ${questionNotFound} , isAnswered : ${isAnswered}`
  );

  function Login() {
    return (
      !isAllowed && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: primary,
          }}
        >
          <Typography variant="h1" style={{ color: "white" }}>
            Please Login First
          </Typography>
        </Box>
      )
    );
  }

  function Details() {
    if (!isAllowed) {
      return <Login />;
    } else if (questionNotFound) {
      return <Navigate to={"/404"} />;
    } else {
      if (isAnswered) {
        return <div>ANSWERED : {qid}</div>;
      } else {
        return <NotAnsweredQuestion questionId={qid} />;
      }
    }
  }

  return (
    <>
      <Details />
    </>
  );
};

export default QuestionDetails;

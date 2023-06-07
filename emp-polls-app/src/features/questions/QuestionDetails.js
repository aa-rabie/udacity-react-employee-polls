import { useState, useEffect } from "react";
import { useParams, Navigate, useLocation } from "react-router-dom";

import { selectAuthUser } from "../authUser/authUserSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllQuestionsAsync } from "../questions/questionsSlice";
import NotAnsweredQuestion from "./NotAnsweredQuestion";
import AnsweredQuestion from "./AnsweredQuestion";
import Login from "../login/Login";

const QuestionDetails = () => {
  const [questionsLoaded, setQuestionsLoaded] = useState(false);
  const dispatch = useDispatch();
  const authedUser = useSelector(selectAuthUser);
  const isAllowed = authedUser !== null;
  const location = useLocation();

  let { qid } = useParams();

  useEffect(() => {
    if (!questionsLoaded) {
      dispatch(fetchAllQuestionsAsync());

      setQuestionsLoaded(true);
    }
  }, [questionsLoaded, dispatch]);

  let questions = useSelector((state) => state.questions.data);

  const questionNotFound = !questions.hasOwnProperty(qid);

  const q = questionNotFound ? null : questions[qid];

  var isAnswered =
    isAllowed === false || questionNotFound
      ? false
      : q["optionOne"].votes.indexOf(authedUser.id) > -1 ||
        q["optionTwo"].votes.indexOf(authedUser.id) > -1;

  function Details() {
    if (!isAllowed) {
      return <Login redirectTo={location.pathname} />;
    } else if (questionNotFound) {
      return (
        <Navigate to={"/404"} state={{ previousPath: location.pathname }} />
      );
    } else {
      if (isAnswered) {
        return <AnsweredQuestion questionId={qid} />;
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

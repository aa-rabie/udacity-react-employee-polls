import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuestionsAsync } from "../questions/questionsSlice";
import { selectAuthUser } from "../authUser/authUserSlice";
import QuestionList from "../questions/QuestionList";
import { useEffect, useState } from "react";

const Home = (props) => {
  const dispatch = useDispatch();
  var currentlyLoggedInUser = useSelector(selectAuthUser);
  const [questionsLoaded, setQuestionsLoaded] = useState(false);

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

  return (
    <>
      <QuestionList
        title="New Questions"
        questions={qGroups.newQuestions}
      ></QuestionList>
      <QuestionList title="Done" questions={qGroups.done}></QuestionList>
    </>
  );
};

export default Home;

import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuestionsAsync } from "../questions/questionsSlice";
import { selectAuthUser } from "../authUser/authUserSlice";
import QuestionList from "../questions/QuestionList";

const Home = (props) => {
  const dispatch = useDispatch();
  var currentlyLoggedInUser = useSelector(selectAuthUser);

  var status = useSelector((state) => state.questions.status);
  if (status !== "loaded") {
    dispatch(fetchAllQuestionsAsync());
  }

  var questions = useSelector((state) => state.questions.data);
  const questionsIds = Object.keys(questions);

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
    return { done, newQuestions };
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

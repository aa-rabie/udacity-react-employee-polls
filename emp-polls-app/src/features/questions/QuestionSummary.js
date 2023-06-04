import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const QuestionSummary = ({ question }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/questions/${question.id}`);
  };

  function formatDate() {
    let date = new Date(question.timestamp);
    return `${date.getDate()}\\${date.getMonth() + 1}\\${date.getFullYear()}`;
  }

  function formatTime() {
    let date = new Date(question.timestamp);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h5">{question.author}</Typography>
      <Typography component="h6">{formatDate()}</Typography>
      <Typography component="h6">{formatTime()}</Typography>
      <Button onClick={handleClick} variant="contained" sx={{ mt: 3, mb: 2 }}>
        show
      </Button>
    </Box>
  );
};

export default QuestionSummary;

import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Container,
  Box,
} from "@mui/material";

const NewQuestion = ({ authedUser, submitFn }) => {
  const { handleSubmit, register, formState } = useForm({
    defaultValues: {
      optionOne: "",
      optionTwo: "",
    },
  });

  let errors = formState.errors;

  //TODO: remove onSubmit & use submitFn
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          component="h3"
          sx={{
            marginBottom: 2,
          }}
        >
          Would You Rather Create Your Own Poll
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2} width={400}>
            <TextField
              label="First Option"
              type="text"
              {...register("optionOne", {
                required: "First Option is required",
              })}
              error={!!errors.optionOne}
              helperText={errors.optionOne?.message}
            />
            <TextField
              label="Second Option"
              type="text"
              {...register("optionTwo", {
                required: "Second Option is required",
              })}
              error={!!errors.optionTwo}
              helperText={errors.optionTwo?.message}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!formState.isValid}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default NewQuestion;

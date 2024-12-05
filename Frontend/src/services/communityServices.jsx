import api from "./Api";

// ask question
const AddNewQuestion = async (data) => await api.post("/", data);

// get all question list\
const GetQuestionList = async () => await api.get("/");

// get answer by question id
const GetQuestionAnswers = async () => await api.get("/");
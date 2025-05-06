import Question from "./Question";

export default interface File {
    id: string;
    filename: string;
    transcription: {
      text: string;
    } | null;
    questions: Question[];
  }
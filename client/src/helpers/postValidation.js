import * as Yup from "yup";

export const postSchema = Yup.object().shape({
  title: Yup.string().min(3).max(60).required(),
  post: Yup.string().min(10).max(300).required(),
});

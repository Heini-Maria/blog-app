import * as Yup from "yup";

export const commentSchema = Yup.object().shape({
  comment: Yup.string().min(3).max(45).required(),
});

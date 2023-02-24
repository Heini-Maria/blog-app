import * as Yup from "yup";

export const userSchema = Yup.object().shape({
  username: Yup.string().min(3).max(15).required(),
  password: Yup.string().min(4).max(20).required(),
});

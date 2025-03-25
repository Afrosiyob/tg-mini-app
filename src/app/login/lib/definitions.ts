import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().min(5).required(),
});

export type FormState =
  | {
      errors?: {
        username?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

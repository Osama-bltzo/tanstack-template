import * as v from "valibot";

import i18n from "~/i18n/client";
import { emailSchema, passwordSchema, usernameSchema } from "./common";

export const loginSchema = v.object({
  email: emailSchema,
  password: passwordSchema,
});
export type LoginSchemaOutput = v.InferOutput<typeof loginSchema>;
export type LoginSchemaInput = v.InferInput<typeof loginSchema>;

export const forgotPasswordSchema = v.object({
  email: emailSchema,
});

export const registerSchema = v.pipe(
  v.object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: v.string(),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["confirmPassword"]],
      (input) => input.password === input.confirmPassword,
      i18n.t("auth.register.error.passwordsDoNotMatch"),
    ),
    ["confirmPassword"],
  ),
);

export type RegisterSchemaOutput = v.InferOutput<typeof registerSchema>;

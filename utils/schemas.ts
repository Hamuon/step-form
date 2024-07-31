import z from "zod";

export const OtpSchema = z.object({
  code: z.string().min(5, {
    message: "Please enter the code",
  }),
});

export const MobileSchema = z.object({
  mobile: z
    .string()
    .min(1, { message: "Phone number is required." })
    .max(11, { message: "Phone number can't be more than 11 character." })
    .regex(/^09[0-9][0-9]-?[0-9]{3}-?[0-9]{4}$/, {
      message: "Invalid phone number.",
    }),
});

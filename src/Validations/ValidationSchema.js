import * as yup from "yup"

export const validationSchema = yup.object().shape({
    first_name: yup
        .string()
        .min(2, "Too short!")
        .max(50, "Too long!")
        .required("Required *"),
    last_name: yup
    .string()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Required *"),
    email: yup
        .string()
        .email("Invalid email")
        .required("Required"),
    password: yup
        .string()
        .min(4, "Too short!")
        .max(20, "Too long!")
        .required("Required *")
})
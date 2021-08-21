import * as yup from "yup"

export const userValidationSchema = yup.object().shape({
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

export const taskValidationSchema = yup.object().shape({
    title: yup
        .string()
        .min(2, "Too short!")
        .required("Required *"),
    description: yup
        .string()
        .min(2, "Too short!")
        .max(500, "Too long!")
        .required("Required *"),
})
import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup.string().trim().required('name is required!').min(3, 'name must be 3 characters long!'),
    email: yup.string().email('Must be a valid email address!').required('Email is required!'),
    password: yup.string().trim().required('password is required!').min(9, 'password must be atleast 9 characters long'),
    termsOfService: yup.boolean(),
})

export default formSchema;
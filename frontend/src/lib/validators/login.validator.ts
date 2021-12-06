import * as yup from 'yup';

export const schema = yup.object().shape({
    login: yup.string().required('Login is required'),
    password: yup.string().required('Password is required'),
});
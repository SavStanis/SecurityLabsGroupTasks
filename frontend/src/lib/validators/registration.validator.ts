import * as yup from 'yup';

export enum PasswordErrorCodes {
    Min = 'Must contain at least 8 characters',
    Max = 'Must contain at most 20 characters',
    Digit = 'Must contain at least one digit',
    Upper = 'Must contain at least one uppercase letter',
    Lower = 'Must contain at least one lowercase letter',
    Symbol = 'Must contain at least one special character (i.e.!,#,$)',
}

export const schema = yup.object().shape({
    login: yup.string().required('Login is required')
        .min(4, 'Must contain at least 4 characters')
        .max(30, 'Must contain at most 30 characters'),
    address: yup.string().required('Address is required')
        .max(255, 'Must contain at most 255 characters'),
    phone: yup.string().required('Phone number is required'),
    password: yup.string().required('Password is required')
        .min(8, PasswordErrorCodes.Min)
        .max(20, PasswordErrorCodes.Max)
        .matches(/\d/g, PasswordErrorCodes.Digit)
        .matches(/(.*[A-Z].*)/g, PasswordErrorCodes.Upper)
        .matches(/(.*[a-z].*)/g, PasswordErrorCodes.Lower)
        .matches(/(.*\W.*)/g, PasswordErrorCodes.Symbol),
    confirmPassword: yup.string().required('Please confirm your password')
        .oneOf([yup.ref('password'), null], 'Passwords do not match')
});
import * as yup from 'yup'

const schema = yup 
.object({
    name:yup
    .string()
    .min(4, 'минимум 4 символа')
    .required(),
    email:yup
    .string()
    .email('не коректно введен емаил')
    .required('поле обязательно'),
    phone:yup
    .number()
    .typeError('обязательно должно быть числом')
    .min(7, 'поле обязательно')
    .required('поле обязательно'),
    password:yup
    .string()
    .min(4 ,'минимум 4 символа')
    .required('поле обязательно')
})
export default schema
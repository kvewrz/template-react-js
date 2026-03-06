import * as yup from 'yup'

const schema = yup
.object({
    email:yup 
    .string()
    .email('емаил не коректный')
    .required('поле обязательно'),
    password:yup 
    .string()
    .min(4, 'минимум 4')
    .required('поле обязательно')
})

export default schema
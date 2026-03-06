import * as yup from 'yup'

const schema = yup
.object({
    title:yup
    .string()
    .min(4, 'минимум 4 символа')
    .required('поле обязательно'),
    description:yup
    .string()
    .min(4,'минимум 4 символа')
    .required('поле обязательно'),
    price:yup
    .number()
    .min(1, 'минимум 1 $')
    .typeError('обязятально цифры')
    .required('поле обязательно'),
    categoryId:yup 
    .number()
    .typeError('только число')
    .required('поле обязательно'),
    imageUrl:yup
    .string()
    .required('поле обязательно')
})
export default schema
import * as yup from 'yup'

const schema = yup 
.object({
  name:yup
  .string()
  .min(4, 'минимум 4')
  .required('поле обязательно')
})

export default schema
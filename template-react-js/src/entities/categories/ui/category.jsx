import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { fetchOneCategory } from "../../../features/categories/models/categories-thunks"
import Loader from "../../../widgets/loader/loader"


function Category() {
  const {id} = useParams()
  const navigate = useNavigate()
  const { items , loading , error} = useSelector((state) => state.categories)
  const dispatch = useDispatch()
 const category = useMemo(()=> {
  return items.find(el => el.id === Number(id))
 } , [items , id])
  useEffect(() => {
   if(!category){
    dispatch(fetchOneCategory(id))
   }
  }, [id , category , dispatch])
  if(loading){
    return <Loader />
  }
  if(!category){
     return (
      <h1>категории нет </h1>
     )
  }
  return (
    <div>
      {error && <span>{error}</span>}
      {category && (
        <div>
          <h1>{category.name}</h1>
          <button onClick={() => navigate('/categories')}>назад</button>
          </div>
      )}
    </div>
  )
}

export default Category

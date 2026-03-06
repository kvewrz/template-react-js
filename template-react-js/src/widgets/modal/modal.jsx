import { memo } from "react"


const Modal = memo (({open , onClose , children , title}) => {
    if(!open){
        return <></>
    }
  return (
    <div className="overlay" onClick={(e) => e.stopPropagation()}>
      <div className="modal">
        <div className="modal__header">
            <h3>
                {title}
            </h3>
            <span onClick={onClose}>X</span>
        </div>
        <div className="model__body">
            {children}
        </div>
      </div>
    </div>
  )
}) 
Modal.displayName = 'Modal'
export default Modal

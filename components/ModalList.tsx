import { inject, observer } from "mobx-react"
const ModalList = function ({store}:any){
    return (
        <>{store.email}</>
    )
}
export default inject(({store})=>({store}))(observer(ModalList))
import {FC, useEffect} from "react";

interface Props {
    subTotalPrice: number
}

const OrderOperator: FC<Props> = (props) => {
    useEffect(()=>{
        console.log(props.subTotalPrice)
    })

    return (
        <div>
            orderOperator
        </div>
    )
}
export default OrderOperator;
import React from "react";
import OrderItem from "~/components/elements/orderItem";
import TotalPrice from "~/components/elements/totalPrice";
import { selectOrderSubTotalPrice} from "~/store/slices/Domain/order.slice";
import { useSelector} from "react-redux";


const OrderConfirm: React.FC = () => {
    //注文内容の小計を取得
    const orderSubTotalPrice = useSelector(selectOrderSubTotalPrice);

    return (
        <>
            <div>
                <OrderItem/>
            </div>
            <div>
                <TotalPrice subTotalPrice={orderSubTotalPrice}/>
            </div>
        </>
    )
}
export default OrderConfirm;
import React, {useEffect} from "react";
import {asyncFetchOrderItems, selectOrderItems} from "~/store/slices/Domain/order.slice";
import {useDispatch, useSelector} from "react-redux";
import OrderForm from "~/components/orderConfirm/orderForm";
import OrderItems from "~/components/elements/orderItem";
import {fetchLoginUser, selectLoginUser} from "~/store/slices/App/auth.slice";


const OrderConfirm: React.FC = () => {

    const dispatch = useDispatch();

    let orderItems = useSelector(selectOrderItems);
    let loginUser = useSelector(selectLoginUser);

    useEffect(() => {
        dispatch(fetchLoginUser());
        dispatch(asyncFetchOrderItems());
    }, [dispatch])

    return (
        <>
            <div>
                <OrderItems />
            </div>
            <div>
                <br/>
                <OrderForm user={loginUser}/>
            </div>
        </>
    )
}
export default OrderConfirm;
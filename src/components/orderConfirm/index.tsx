import React, {useEffect} from "react";
import {asyncFetchOrderItems, selectOrderItems} from "~/store/slices/Domain/order.slice";
import {useDispatch, useSelector} from "react-redux";
import OrderForm from "~/components/orderConfirm/orderForm";
import OrderItems from "~/components/elements/orderItemCards/orderItemCards";
import {fetchLoginUser, selectLoginUser} from "~/store/slices/App/auth.slice";


const OrderConfirm: React.FC = () => {

    const dispatch = useDispatch();
    //storeのstateにあるorderItemの取得
    let orderItems = useSelector(selectOrderItems);
    //storeのstateにあるloginUserの取得
    let loginUser = useSelector(selectLoginUser);


    useEffect( () => {
        dispatch(asyncFetchOrderItems());
    }, [dispatch])

    useEffect( () => {
        if(loginUser === null){
            dispatch(fetchLoginUser());
        }
    }, [dispatch,loginUser])

    return (
        <>
            <div>
                <OrderItems orderItems={orderItems}/>
            </div>
            <div>
                <br/>
                <OrderForm user={loginUser}/>
            </div>
        </>
    )
}
export default OrderConfirm;
import {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "~/store";

import CartItem from "./CartItem"
import OrderOperator from "./OrderOperator"

import {fetchOrderItems, selectOrderItems, selectOrderSubTotalPrice} from "~/store/slices/Domain/order.slice"
import {List} from "@material-ui/core";


const CartList: FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const orderItems = useSelector(selectOrderItems)
    const orderSubTotalPrice = useSelector(selectOrderSubTotalPrice)

    useEffect(() => {
        dispatch(fetchOrderItems())
    }, [dispatch])

    useEffect(() => {
        console.log(orderItems)
    })


    return (
        <div>
            cartList
            <List>
                {orderItems &&
                orderItems!.map(orderItem => {
                    return <CartItem orderItem={orderItem} key={orderItem.id}/>;
                })}
            </List>
            <OrderOperator subTotalPrice={orderSubTotalPrice}/>
        </div>
    )
}
export default CartList;
import {FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "~/store";

import CartItem from "./CartItem"
import OrderOperator from "./OrderOperator"
import {Order, OrderItem} from "~/types/interfaces";

import {
    asyncDeleteOrderItem,
    asyncFetchOrderItems,
    asyncUpdateOrderItem,
    selectOrder,
    selectOrderSubTotalPrice
} from "~/store/slices/Domain/order.slice"
import {Grid, List, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles({
    orderOperator: {
        position: 'sticky',
        top: "30%"
    }
});


const CartList: FC = () => {

    const dispatch: AppDispatch = useDispatch()
    const classes = useStyles();

    let iniOrder = useSelector(selectOrder)
    let orderSubTotalPrice = useSelector(selectOrderSubTotalPrice)

    const [orderItems, setOrderItems] = useState<OrderItem[] | undefined>()
    const [order, setOrder] = useState<Order | undefined>({})
    const [actionKey, setActionKey] = useState<string>()

    // 初期表示
    useEffect(() => {
        dispatch(asyncFetchOrderItems())
    }, [dispatch])

    // iniOrder
    useEffect(() => {
        if (Object.keys(iniOrder).length) {
            setOrder(iniOrder)
            setOrderItems(iniOrder.orderItems)
        }
    }, [iniOrder])

    // order更新時
    useEffect(() => {
        if (actionKey === 'UPDATE') {
            dispatch(asyncUpdateOrderItem(order!))
            dispatch(asyncFetchOrderItems())
            setActionKey('')
        }
    }, [order, dispatch])

    /**
     * 注文商品の内容を更新する関数
     * @Params orderItem: OrderItem, index?: number
     * @return
     */
    const updateOrderItems = async ({orderItem, index}: { orderItem: OrderItem, index?: number }) => {

        let newOrderItems: OrderItem[] = []

        orderItems?.map((o, i) => {
            if (i === index) {
                newOrderItems.push(orderItem)
            } else {
                newOrderItems.push(o)
            }
        })
        await setActionKey("UPDATE")
        await setOrder({...order, orderItems: newOrderItems})
    }

    /**
     * 注文商品を削除する関数
     * @Params orderItemId: number
     * @return
     */
    const deleteOrderItem = async (orderItemId: number) => {
        await dispatch(asyncDeleteOrderItem(orderItemId))
    }


    return (
        <div>
            <Typography variant="h3" gutterBottom>
                カート内容
            </Typography>
            <Grid container>
                <Grid item xs={8}>
                    <List>
                        {orderItems &&
                        orderItems!.map((orderItem, index) => (
                            <CartItem
                                orderItem={orderItem}
                                index={index}
                                key={orderItem.id}
                                updateOrderItems={({orderItem, index}) => updateOrderItems({orderItem, index})}
                                deleteOrderItem={(orderItemId: number) => deleteOrderItem(orderItemId)}
                            />
                        ))}
                    </List>
                </Grid>
                <Grid item xs={4}>
                    <div className={classes.orderOperator}>
                        <OrderOperator
                            subTotalPrice={orderSubTotalPrice}
                            orderItems={orderItems}
                            deleteOrderItem={(orderItemId: number) => deleteOrderItem(orderItemId)}
                        />
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
export default CartList;
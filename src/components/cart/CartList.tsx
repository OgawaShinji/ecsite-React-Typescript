import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "~/store";

import CartItem from "./CartItem"
import OrderOperator from "./OrderOperator"
import {OrderItem} from "~/types/interfaces";

import {
    asyncDeleteOrderItem,
    asyncFetchOrderItems,
    asyncUpdateOrderItem,
    orderItem,
    OrderItemsToPost,
    selectOrder,
    selectOrderSubTotalPrice
} from "~/store/slices/Domain/order.slice"
import {Grid, List, makeStyles, Typography} from "@material-ui/core";
import {setError} from "~/store/slices/App/error.slice";

const useStyles = makeStyles({
    root: {
        backgroundColor: '#f5f5f5',
        minHeight: 500,
        "padding-top": 50,
        "padding-bottom": 50,
    },
    title: {
        textAlign: 'center',
        backgroundColor: '#a9a9a9',
        color: '#ffffff',
    },
    cartList: {
        backgroundColor: '#dcdcdc'
    },
    emptyCartList: {
        backgroundColor: '#dcdcdc',
        textAlign: 'center',
        // alignItems: 'center',
    },
    emptyOrderItems: {
        paddingTop: 60,
    },
    orderOperator: {
        position: 'sticky',
        top: "30%",
    }
});


const CartList: React.FC = () => {

    const dispatch: AppDispatch = useDispatch()
    const classes = useStyles();

    let iniOrder = useSelector(selectOrder)
    let orderSubTotalPrice = useSelector(selectOrderSubTotalPrice)

    const [orderItems, setOrderItems] = useState<OrderItem[] | undefined>()

    // 初期表示
    useEffect(() => {
        dispatch(asyncFetchOrderItems()).catch((e) => {
            dispatch(setError({isError: true, code: e.message}))
        })
    }, [dispatch])

    // iniOrder
    useEffect(() => {
        setOrderItems(iniOrder.orderItems)
    }, [iniOrder])


    /**
     * 注文商品の内容を更新する関数
     * @Params orderItem: OrderItem, index?: number
     * @return
     */
    const updateOrderItems = async ({orderItem}: { orderItem: OrderItem }) => {

        // サーバーに送るデータをorderItemsToPostに詰め替える処理
        let updatedOrderToppings: { topping: number }[] = []
        if (orderItem.orderToppings!) orderItem.orderToppings.map((t) => updatedOrderToppings.push({topping: t.topping.id}))
        const updatedOrderItem: orderItem = {
            id: orderItem.id,
            item: orderItem.item.id,
            orderToppings: updatedOrderToppings,
            quantity: orderItem.quantity,
            size: orderItem.size === 'M' ? 'M' : 'L'
        }
        let updatedOrderItems: Array<orderItem> = [updatedOrderItem]
        const orderItemsToPost: OrderItemsToPost = {
            orderItems: updatedOrderItems,
            status: 0,
            newTotalPrice: orderSubTotalPrice
        }

        await dispatch(asyncUpdateOrderItem(orderItemsToPost)).catch((e) => {
            dispatch(setError({isError: true, code: e.message}))
        })
        await dispatch(asyncFetchOrderItems()).catch((e) => {
            dispatch(setError({isError: true, code: e.message}))
        })
    }

    /**
     * 注文商品を削除する関数
     * @Params orderItemId: number
     * @return
     */
    const deleteOrderItem = async (orderItemId: number) => {
        await dispatch(asyncDeleteOrderItem(orderItemId)).catch((e) => {
            dispatch(setError({isError: true, code: e.message}))
        })
        dispatch(asyncFetchOrderItems()).catch((e) => {
            dispatch(setError({isError: true, code: e.message}))
        })
    }

    // カートに商品があるかどうかでレイアウトを切り替えるため
    let styleCartList
    if (orderItems && orderItems?.length > 0) {
        styleCartList = classes.cartList
    } else {
        styleCartList = classes.emptyCartList
    }


    return (
        <div className={classes.root}>
            <Grid container style={{paddingLeft: 20}}>
                <Grid item xs={8} className={styleCartList}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        className={classes.title}
                    >
                        ショッピングカート
                    </Typography>
                    {orderItems && orderItems?.length > 0 ? (<List>
                        {orderItems &&
                        orderItems!.map((orderItem) => (
                            <CartItem
                                orderItem={orderItem}
                                key={orderItem.id}
                                updateOrderItems={({orderItem}) => updateOrderItems({orderItem})}
                                deleteOrderItem={(orderItemId: number) => deleteOrderItem(orderItemId)}
                            />
                        ))}
                    </List>) : (
                        <div className={classes.emptyOrderItems}>
                            <Typography variant="h6" gutterBottom>
                                カートに商品がありません
                            </Typography>
                        </div>
                    )}
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
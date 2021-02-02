import React, {useState} from "react";

import CartItem from "./CartItem"
import OrderOperator from "./OrderOperator"
// import {OrderItem} from "~/types/interfaces";
import {Grid, LinearProgress, List, makeStyles, Typography} from "@material-ui/core";
import {
    FetchOrderItemsQuery, FetchOrderItemsQueryResult,
    FetchOrderItemsQueryVariables,
    OrderItem,
    useFetchOrderItemsQuery
} from "~/gql/generated/order.graphql";

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

    // const dispatch: AppDispatch = useDispatch()
    const classes = useStyles();

    // let iniOrder = useSelector(selectOrder)
    // let orderSubTotalPrice = useSelector(selectOrderSubTotalPrice)

    // const [orderItems, setOrderItems] = useState<FetchOrderItemsQuery>()
    const [isLoading, setIsLoading] = useState(false); // loading

    const { data } = useFetchOrderItemsQuery()
    // 初期表示
    // useEffect(() => {
    //     setIsLoading(true);
    //     const loading = async () => {
    //         setTimeout(() => {
    //             setIsLoading(false);
    //         }, 500)
    //     }
    //     loading().then(() => {
    //         dispatch(asyncFetchOrderItems()).catch((e) => {
    //             dispatch(setError({isError: true, code: e.message}))
    //         })
    //     })
    // }, [dispatch])

    // iniOrder
    // useEffect(() => {
    //     setOrderItems(iniOrder.orderItems)
    // }, [iniOrder])


    /**
     * 注文商品の内容を更新する関数
     * @Params orderItem: OrderItem, index?: number
     * @return
     */
    const updateOrderItems = async ({orderItem}: { orderItem: OrderItem|null }) => {

        // サーバーに送るデータをorderItemsToPostに詰め替える処理
        // let updatedOrderToppings: { topping: number }[] = []
        // if (orderItem.orderToppings!) orderItem.orderToppings.map((t) => updatedOrderToppings.push({topping: t.topping.id}))
        // const updatedOrderItem: orderItem = {
        //     id: orderItem.id,
        //     item: orderItem.item.id,
        //     orderToppings: updatedOrderToppings,
        //     quantity: orderItem.quantity,
        //     size: orderItem.size === 'M' ? 'M' : 'L'
        // }
        // let updatedOrderItems: Array<orderItem> = [updatedOrderItem]
        // const orderItemsToPost: OrderItemsToPost = {
        //     orderItems: updatedOrderItems,
        //     status: 0,
        //     newTotalPrice: orderSubTotalPrice
        // }
        //
        // await dispatch(asyncUpdateOrderItem(orderItemsToPost)).catch((e) => {
        //     dispatch(setError({isError: true, code: e.message}))
        // })
        // await dispatch(asyncFetchOrderItems()).catch((e) => {
        //     dispatch(setError({isError: true, code: e.message}))
        // })
    }

    /**
     * 注文商品を削除する関数
     * @Params orderItemId: number
     * @return
     */
    const deleteOrderItem = async (orderItemId: string) => {
        // await dispatch(asyncDeleteOrderItem(orderItemId)).catch((e) => {
        //     dispatch(setError({isError: true, code: e.message}))
        // })
        // dispatch(asyncFetchOrderItems()).catch((e) => {
        //     dispatch(setError({isError: true, code: e.message}))
        // })
    }

    // カートに商品があるかどうかでレイアウトを切り替えるため
    let styleCartList
    if (data?.cart?.orderItems! && data?.cart?.orderItems?.length > 0) {
        styleCartList = classes.cartList
    } else {
        styleCartList = classes.emptyCartList
    }


    return (
        <div>
            {isLoading ? (
                <LinearProgress style={{width: "60%", marginTop: "20%", marginLeft: "20%"}}/>
            ) : (
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
                            {data?.cart?.orderItems! && data?.cart?.orderItems?.length > 0 ? (<List>
                                {data?.cart?.orderItems &&
                                data?.cart?.orderItems.map(orderItem => (
                                    <CartItem
                                        orderItem={orderItem}
                                        key={orderItem!.id}
                                        updateOrderItems={({orderItem}) => updateOrderItems({orderItem})}
                                        deleteOrderItem={(orderItemId: string) => deleteOrderItem(orderItemId)}
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
                                    subTotalPrice={0}
                                    orderItems={data?.cart?.orderItems}
                                    deleteOrderItem={(orderItemId: string) => deleteOrderItem(orderItemId)}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            )}
        </div>
    )
}
export default CartList;
import React, {useEffect, useState} from "react";

import CartItem from "./CartItem"
import OrderOperator from "./OrderOperator"
import {Grid, LinearProgress, List, makeStyles, Typography} from "@material-ui/core";
import {filter} from "graphql-anywhere";
import {
    DeleteOrderItemId,
    OrderItem,
    OrderItemFragFragment,
    OrderItemFragFragmentDoc,
    OrderItemInput,
    TotalPrice,
    UpOrderItem,
    useDeleteOrderItemMutation,
    useFetchOrderItemsQuery,
    useUpdateOrderItemMutation
} from "~/generated/graphql";

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

    const classes = useStyles();

    const [orderItems, setOrderItems] = useState<OrderItemFragFragment[] | undefined>()
    const [orderTotalPrice, setOrderTotalPrice] = useState<number | null>()
    const [isLoading, setIsLoading] = useState(false); // loading

    const {data: fetchOrderItemData} = useFetchOrderItemsQuery()
    const [updateOrderItemMutation, {data: updateOrderItemData}] = useUpdateOrderItemMutation()
    const [deleteOrderItemMutation, {data: deleteOrderItemData}] = useDeleteOrderItemMutation()

    // 初期表示
    useEffect(() => {
        setIsLoading(true);
            const loading = async () => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500)
            }
            loading().then(() => {
                // データ取得の際ネスト構造になっているgraphQLでは、各プロパティごとにデータ型を定義したフラグメントを作成し、セットする際にfilterを通す必要がある
                if (fetchOrderItemData?.cart?.orderItems) {
                    const orderItemFlag=filter(OrderItemFragFragmentDoc, fetchOrderItemData.cart.orderItems)
                    setOrderItems(orderItemFlag)
                    setOrderTotalPrice(fetchOrderItemData?.cart?.totalPrice)
                }
            })
    }, [fetchOrderItemData])


    /**
     * 注文商品の内容を更新する関数
     * @Params orderItem: OrderItem, index?: number
     * @return
     */
    const updateOrderItems = async ({orderItem}: { orderItem: OrderItem }) => {

        // サーバーに送るデータをorderItemsToPostに詰め替える処理
        let updatedOrderToppings: { topping: number }[] = []
        if (orderItem.orderToppings!) orderItem.orderToppings.map((t) => updatedOrderToppings.push({topping: t!.topping!.id!}))

        // updateOrderItemMutationを定義
        // 引数のデータ型はinput type
        const updatedOrderItem: UpOrderItem = {
            id: orderItem.id!,
            item: orderItem.item?.id!,
            orderToppings: updatedOrderToppings,
            quantity: orderItem.quantity!,
            size: orderItem.size === 'M' ? 'M' : 'L'
        }
        const updatedOrderItems: OrderItemInput = {
            orderItems: [updatedOrderItem]
        }
        const totalPrice: TotalPrice = {
            totalPrice: orderTotalPrice
        }

        // 更新mutation呼び出し
        await updateOrderItemMutation({
            variables: {
                orderItemInput: updatedOrderItems,
                totalPrice: totalPrice
            }
        }).then(() => {
            // resolverで値が変わるように変更しておけば実際の値も更新されるかも？
            console.log('update')
            console.log(updateOrderItemData)
        })
    }

    /**
     * 注文商品を削除する関数
     * @Params orderItemId: number
     * @return
     */
    const deleteOrderItem = async (orderItemId: number) => {
        const deleteOrderItemId: DeleteOrderItemId = {
            orderItemId: orderItemId
        }
        await deleteOrderItemMutation({variables: {deleteOrderItemId: deleteOrderItemId}}).then(() => {
            console.log('delete')
            console.log(deleteOrderItemData)
        })
    }

    // カートに商品があるかどうかでレイアウトを切り替えるため
    let styleCartList
    if (orderItems! && orderItems?.length > 0) {
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
                            {orderItems! && orderItems?.length > 0 ? (<List>
                                {orderItems &&
                                orderItems.map((orderItem: any) => (
                                    <CartItem
                                        orderItem={orderItem}
                                        key={orderItem!.id}
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
                                    orderItems={orderItems}
                                    subTotalPrice={orderTotalPrice}
                                    deleteOrderItem={(orderItemId: number) => deleteOrderItem(orderItemId)}
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
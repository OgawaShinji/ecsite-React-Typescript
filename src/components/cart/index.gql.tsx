import React from "react";

import CartItem from "./CartItem.gql"
import OrderOperator from "./OrderOperator.gql"
import {Grid, LinearProgress, List, makeStyles, Typography} from "@material-ui/core";
import {
    OrderItemInput,
    OrderItemType,
    OrderToppingInput,
    useDeleteCartMutation,
    useFetchOrderItemsQuery,
    useUpdateCartMutation
} from "~/generated/graphql";
import ErrorPage from "~/components/error";

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


const Index: React.FC = () => {

    const classes = useStyles();

    const {
        data: displayFetchOrderItems,
        loading: isLoadingFetchOrderItems,
        error: isErrorFetchOrderItems,
        refetch  // タイポの直し方わからず
    } = useFetchOrderItemsQuery()

    const [updateCart,
        {
            loading: isLoadingUpdateCart,
            error: isErrorUpdateCart
        }
    ] = useUpdateCartMutation()

    const [deleteCart,
        {
            loading: isLoadingDeleteCart,
            error: isErrorDeleteCart
        }
    ] = useDeleteCartMutation()


    // orderOperatorにpropsで渡すorderItemsIdのList
    const displayOrderItemIdList: Array<string> = []
    displayFetchOrderItems?.cart?.orderItems?.edges?.forEach(o => displayOrderItemIdList.push(o?.node?.id!))


    /**
     * 注文商品の内容を更新する関数
     * @Params orderItem: OrderItem, index?: number
     * @return
     */
    const updateOrderItems = async ({orderItem}: { orderItem: OrderItemType }) => {
        console.log(orderItem)
        // updateCartの引数,orderItemInputの作成
        let updateOrderToppingIdList: Array<OrderToppingInput> = []
        orderItem.orderToppings?.edges?.forEach(ot => {
            updateOrderToppingIdList.push({topping: ot!.node!.id!})
        })
        const orderItemInput: OrderItemInput = {
            id: orderItem.id,
            item: orderItem.item?.id!,
            orderToppings: updateOrderToppingIdList,
            size: orderItem.size === 'M' ? 'M' : 'L',
            quantity: orderItem.quantity!
        }

        console.log(orderItemInput)

        await updateCart(
            {
                variables: {
                    orderItems: [orderItemInput],
                    totalPrice: displayFetchOrderItems?.cart?.totalPrice!
                }
            }).then(() => refetch({}))
    }

    /**
     * 注文商品を削除する関数
     * @Params orderItemId: number
     * @return
     */
    const deleteOrderItem = async (orderItemId: string) => {
        console.log(orderItemId)
        await deleteCart(
            {
                variables: {
                    orderItemId: orderItemId.toLocaleString()
                }
            }).then(() => refetch({}))
    }


    // カートに商品があるかどうかでレイアウトを切り替えるため
    let styleCartList
    if (displayFetchOrderItems && displayFetchOrderItems?.cart?.orderItems?.edges!.length! > 0) {
        styleCartList = classes.cartList
    } else {
        styleCartList = classes.emptyCartList
    }

    // errorハンドリング
    if (isErrorFetchOrderItems || isErrorUpdateCart || isErrorDeleteCart) return <ErrorPage/>;

    return (isLoadingFetchOrderItems  ?
            <LinearProgress style={{width: "60%", marginTop: "20%", marginLeft: "20%"}}/>
            : <div>
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
                            {displayFetchOrderItems?.cart?.orderItems && displayFetchOrderItems.cart.orderItems.edges?.length! > 0 ? (
                                <List>
                                    {displayFetchOrderItems?.cart?.orderItems &&
                                    displayFetchOrderItems.cart.orderItems.edges!.map((orderItem, index) => (
                                        <CartItem
                                            orderItem={orderItem!.node!}
                                            key={orderItem!.node!.id}
                                            index={index}
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
                                    subTotalPrice={displayFetchOrderItems?.cart?.totalPrice!}
                                    orderItemIdList={displayOrderItemIdList!}
                                    deleteOrderItem={(orderItemId: string) => deleteOrderItem(orderItemId)}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
    )
}
export default Index
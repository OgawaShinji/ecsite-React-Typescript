import {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "~/store";

import CartItem from "./CartItem"
import OrderOperator from "./OrderOperator"

import {
    fetchOrderItems,
    selectOrderItems,
    selectOrderSubTotalPrice,
    setUpdateOrderItem
} from "~/store/slices/Domain/order.slice"
import {Grid, List, makeStyles, Typography} from "@material-ui/core";
import {OrderItem} from "~/types/interfaces";

const useStyles = makeStyles({
    orderOperator: {
        position: 'sticky',
        top: "30%"
    }
});


const CartList: FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const classes = useStyles();
    // const [orderItems, setOrderItemss] = useState<OrderItem[]>()
    let orderItems = useSelector(selectOrderItems)
    let orderSubTotalPrice = useSelector(selectOrderSubTotalPrice)

    useEffect(() => {
        dispatch(fetchOrderItems())
    }, [dispatch])


    // 引数は変更されたorderItemとインデックス番号、spliceで置き換えが一番いいか
    // 引数のインデックス番号は必須、変更のorderItemに関しては削除の際必要ないので、?にしておく
    // 都度APIを叩いてサーバー側に変更を知らせる
    const setOrderItems = async ({orderItem, index}: { orderItem?: OrderItem, index: number }) => {
        // if (orderItem) {
        //     orderItems!.splice(index, 1, orderItem)
        // } else {
        //     orderItems!.splice(index, 1)
        // }
        await dispatch(setUpdateOrderItem({orderItem, index}))
        // dispatch(setOrderItemsAndSubTotalPrice(orderItems))

    }
    // TODO: toppingのdialogをorderItemコンポーネントで行うので、親で設定しておいて、子に渡す

    // TODO: カートを空にするメソッド、上と同じにするかは再考(orderOperatorに直接書いてもいいかも)

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
                                setOrderItems={({orderItem, index}) => setOrderItems({orderItem, index})}
                            />
                        ))}
                    </List>
                </Grid>
                <Grid item xs={4}>
                    <div className={classes.orderOperator}>
                        <OrderOperator
                            subTotalPrice={orderSubTotalPrice}
                        />
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
export default CartList;
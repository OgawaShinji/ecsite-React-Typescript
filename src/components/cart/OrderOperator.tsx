import {FC} from "react";
import {Button, Card, CardActionArea, CardActions, CardContent, makeStyles} from "@material-ui/core";
import {OrderItem} from "~/types/interfaces";

interface Props {
    subTotalPrice: number
    orderItems: Array<OrderItem> | undefined
    deleteOrderItem: (orderItemId: number) => void
}


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    btn: {
        margin: 'auto'
    }
});


const OrderOperator: FC<Props> = (props) => {

    const classes = useStyles();

    /**
     * OrderItemEntryのダイアログを非表示にする関数
     * @Params orderItems: OrderItem[]
     */
    const allDeleteOrderItems = (orderItems: OrderItem[]) => {
        orderItems.map((orderItem => {
            props.deleteOrderItem(orderItem.id!)
        }))
    }


    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                    合計金額：2000
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" className={classes.btn}>
                    注文する
                </Button>
            </CardActions>
            <CardActions className={classes.btn}>
                {/*TODO: カートが空なら押せないようにしておく*/}
                <Button
                    size="small"
                    color="primary"
                    className={classes.btn}
                    onClick={() => allDeleteOrderItems(props.orderItems!)}
                >
                    カートを空にする
                </Button>
                <Button size="small" color="primary" className={classes.btn}>
                    買い物を続ける
                </Button>
            </CardActions>
        </Card>
    )
}
export default OrderOperator;
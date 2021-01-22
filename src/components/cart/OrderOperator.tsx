import React, {FC} from "react";
import {Button, Card, CardActionArea, CardActions, CardContent, makeStyles} from "@material-ui/core";
import {OrderItem} from "~/types/interfaces";
import TotalPrice from "~/components/elements/totalPrice/totalPrice"
import {RouteComponentProps, withRouter} from 'react-router-dom';

interface Props {
    subTotalPrice: number
    orderItems: Array<OrderItem> | undefined
    deleteOrderItem: (orderItemId: number) => void
}


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: 'auto'
    },
    media: {
        height: 140,
    },
    btn: {
        margin: 'auto'
    },
    orderBtn: {
        margin: 'auto',
        color: 'white',
        backgroundColor: '#3cb371',
        '&:hover': {
            backgroundColor: '#2e8b57',
        },
        width: 200
    }
});


const OrderOperator: FC<Props & RouteComponentProps> = (props) => {

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
                    <TotalPrice subTotalPrice={props.subTotalPrice}/>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    variant="outlined"
                    className={classes.orderBtn}
                    onClick={() => props.history.push({pathname: `/orderConfirm`})}
                    disabled={props.orderItems?.length===0}
                >
                    注文する
                </Button>
            </CardActions>
            <CardActions className={classes.btn}>
                {/*TODO: カートが空なら押せないようにしておく*/}
                <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.btn}
                    onClick={() => allDeleteOrderItems(props.orderItems!)}
                    disabled={props.orderItems?.length===0}
                >
                    カートを空にする
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.btn}
                    onClick={() => props.history.push({pathname: `/itemList`})}
                >
                    買い物を続ける
                </Button>
            </CardActions>
        </Card>
    )
}
export default withRouter(OrderOperator);
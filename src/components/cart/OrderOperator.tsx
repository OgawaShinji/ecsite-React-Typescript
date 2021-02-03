import React from "react";
import {Button, Card, CardActions, CardContent, makeStyles} from "@material-ui/core";
import TotalPrice from "~/components/elements/totalPrice/totalPrice"
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {OrderItemFragFragment} from "~/generated/graphql";

interface Props {
    subTotalPrice: number | null | undefined
    orderItems: OrderItemFragFragment[] | undefined
    deleteOrderItem: (orderItemId: number) => void
}

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: 'auto'
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

const OrderOperator: React.FC<Props & RouteComponentProps> = (props) => {

    const classes = useStyles();

    /**
     * OrderItemEntryのダイアログを非表示にする関数
     * @Params orderItems: OrderItem[]
     */
    const allDeleteOrderItems = (orderItems: OrderItemFragFragment[]) => {
        orderItems.forEach((orderItem => {
            props.deleteOrderItem(Number(orderItem.id!))
        }))
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <TotalPrice subTotalPrice={props.subTotalPrice}/>
            </CardContent>
            <CardActions>
                <Button
                    variant="outlined"
                    className={classes.orderBtn}
                    onClick={() => props.history.push({pathname: `/orderConfirm`})}
                    disabled={props.orderItems && props.orderItems.length === 0}
                >
                    注文確認画面へ進む
                </Button>
            </CardActions>
            <CardActions className={classes.btn}>
                <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.btn}
                    onClick={() => allDeleteOrderItems(props.orderItems!)}
                    disabled={props.orderItems && props.orderItems.length === 0}
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


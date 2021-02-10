import React from "react";
import {Button, Card, CardActions, CardContent, makeStyles} from "@material-ui/core";
import TotalPrice from "~/components/elements/totalPrice/totalPrice"
import {useHistory} from 'react-router-dom';

interface Props {
    subTotalPrice: number|null
    orderItemIdList: Array<string>
    deleteOrderItem: (orderItemId: string) => void
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


const OrderOperator: React.FC<Props> = (props) => {

    const classes = useStyles();
    const history = useHistory();

    /**
     * OrderItemEntryのダイアログを非表示にする関数
     * @Params orderItems: OrderItem[]
     */
    const allDeleteOrderItems = (orderItemIdList: Array<string>) => {
        orderItemIdList.forEach((orderItemId => {
            props.deleteOrderItem(orderItemId)
        }))
    }


    return (
        <Card className={classes.root}>
            <CardContent>
                <TotalPrice subTotalPrice={props.subTotalPrice!}/>
            </CardContent>
            <CardActions>
                <Button
                    variant="outlined"
                    className={classes.orderBtn}
                    onClick={() => history.push( `/orderConfirm`)}
                    disabled={props.orderItemIdList && props.orderItemIdList.length === 0}
                >
                    注文確認画面へ進む
                </Button>
            </CardActions>
            <CardActions className={classes.btn}>
                <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.btn}
                    onClick={() => allDeleteOrderItems(props.orderItemIdList)}
                    disabled={props.orderItemIdList && props.orderItemIdList.length === 0}
                >
                    カートを空にする
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.btn}
                    onClick={() => history.push(`/itemList`)}
                >
                    買い物を続ける
                </Button>
            </CardActions>
        </Card>
    )
}
export default OrderOperator;
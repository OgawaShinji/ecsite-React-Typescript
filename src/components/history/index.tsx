import React, {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import {
    fetchOrderHistory,
    fetchOrderHistoryTotalCount,
    selectOrderHistory,
    selectOrderHistoryTotalCount
} from "~/store/slices/Domain/history.slice";
import OrderInfo from "~/components/history/OrderInfo";
import {makeStyles, Grid, List, ListItem, Divider, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    title: {
        margin: theme.spacing(2),
        fontWeight: 'bold',
        borderBottom: 'dashed 2px #6594e0'
    }
}))

const OrderConfirm: React.FC = () => {

    const dispatch = useDispatch();
    const classes = useStyles();

    const orders = useSelector(selectOrderHistory);
    const ordersTotalCount = useSelector(selectOrderHistoryTotalCount);

    useEffect(() => {
        dispatch(fetchOrderHistory({displayCount: 5, pageNum: 1}));
        dispatch(fetchOrderHistoryTotalCount());
    }, [dispatch])

    // orderInfoコンポーネント一覧のJSXを作成
    const orderInfoList = orders.map((order, index) => {
        const listItem = (
            <ListItem button onClick={() => {
                console.log('click!')
            }}>
                <OrderInfo order={order}/>
            </ListItem>
        );

        //  最後のListItem以外には<Divider/>を表示する
        if (index !== orders.length - 1) {
            return (
                <div key={index}>
                    {listItem}
                    <Divider/>
                </div>
            )
        } else {
            return (
                <div key={index}>
                    {listItem}
                </div>
            )
        }
    });

    return (
        <>
            <Typography variant={"h4"} className={classes.title}>
                注文履歴
            </Typography>
            {orders.length === 0 && '注文履歴がありません。'}
            <Grid container justify={"center"} alignItems={"center"}>
                <Grid item xs={10}>
                    <List>
                        {orderInfoList}
                    </List>
                </Grid>
            </Grid>
            {ordersTotalCount}
        </>
    )
}
export default OrderConfirm;
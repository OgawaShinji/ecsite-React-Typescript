import React, {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {
    fetchOrderHistory,
    fetchOrderHistoryTotalCount,
    selectOrderHistory,
    selectOrderHistoryTotalCount
} from "~/store/slices/Domain/history.slice";
import {OrderItem} from "~/types/interfaces";

import OrderInfo from "~/components/history/OrderInfo";
import OrderHistoryDialog from "~/components/history/OrderHistoryDialog";
import {makeStyles, Grid, List, ListItem, Divider, Typography} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    title: {
        margin: theme.spacing(2),
        fontWeight: 'bold',
        borderBottom: 'dashed 2px #FFA500'
    },
    pagination: {
        margin: theme.spacing(3)
    }
}));

const OrderConfirm: React.FC = () => {

    const dispatch = useDispatch();
    const classes = useStyles();

    // storeからstateを取得
    const orders = useSelector(selectOrderHistory);
    const ordersTotalCount = useSelector(selectOrderHistoryTotalCount);

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [isDisplay, setDisplay] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [orderItems, setOrderItems] = useState<Array<OrderItem>>([]);

    useEffect(() => {
        dispatch(fetchOrderHistory({displayCount: 5, pageNum: page}));
        dispatch(fetchOrderHistoryTotalCount());
    }, [page, dispatch]);

    useEffect(() => {
        if (ordersTotalCount === 0) {
            // 注文履歴が存在しない場合
            setDisplay(true);
        } else {
            // 注文履歴が存在する場合
            if (ordersTotalCount) {
                let totalPageCount;

                // 総ページ数をセット
                if (ordersTotalCount % 5 === 0) {
                    totalPageCount = ordersTotalCount / 5;
                } else {
                    totalPageCount = Math.floor(ordersTotalCount / 5) + 1;
                }
                setCount(totalPageCount);
            }
        }
    }, [ordersTotalCount]);

    // orderInfoコンポーネント一覧のJSXを作成
    const orderInfoList = orders.map((order, index) => {
        const listItem = (
            <ListItem button onClick={() => {
                setIsOpen(true);
                if (order.orderItems) {
                    setOrderItems(order.orderItems);
                }
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
            {/*Title*/}
            <Grid container justify={"center"} alignItems={"center"}>
                <Grid item>
                    <Typography variant={"h4"} className={classes.title}>
                        &nbsp;&nbsp;注文履歴&nbsp;&nbsp;
                    </Typography>
                </Grid>
            </Grid>

            {/*注文履歴一覧*/}
            <Grid container justify={"center"} alignItems={"center"}>
                <Grid item xs={10}>
                    <List>
                        {orderInfoList}
                    </List>
                    {isDisplay && '注文履歴がありません。'}
                </Grid>
            </Grid>

            {/*Pagination*/}
            {ordersTotalCount && (
                <Grid container justify={"center"} alignItems={"center"}>
                    <Pagination count={count} page={page} onChange={(e, val) => {
                        setPage(val)
                    }} className={classes.pagination} size={"large"}/>
                </Grid>
            )}
            <OrderHistoryDialog handleClose={() => {
                setIsOpen(false)
            }} isOpen={isOpen} orderItems={orderItems}/>
        </>
    )
}
export default OrderConfirm;
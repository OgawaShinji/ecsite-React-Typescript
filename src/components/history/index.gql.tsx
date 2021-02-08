import React, {useEffect, useState} from "react";

import OrderInfoGQL from "~/components/history/OrderInfo.gql";
import OrderHistoryDialogGQL from "~/components/history/OrderHistoryDialog.gql";

import {Divider, Grid, LinearProgress, List, ListItem, makeStyles, Typography} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";

import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "~/store";
import {
    fetchOrderHistoryTotalCount,
    selectOrderHistoryTotalCount
} from "~/store/slices/Domain/history.slice";
import {setError} from '~/store/slices/App/error.slice';

import {
    OrderItemType,
    OrderItemTypeEdge,
    useFetchOrderHistoryQuery
} from "~/generated/graphql";


const useStyles = makeStyles((theme) => ({
    title: {
        margin: theme.spacing(2),
        fontWeight: 'bold',
        borderBottom: 'dashed 2px #FFA500'
    },
    pagination: {
        margin: theme.spacing(3)
    },
    text: {
        fontSize: 20
    }
}));

const HistoryGQL: React.FC = () => {

    const dispatch: AppDispatch = useDispatch();
    const classes = useStyles();

    // storeからstateを取得
    const ordersTotalCount = useSelector(selectOrderHistoryTotalCount);

    // コンポ―ネント上で管理するstate
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [orderItems, setOrderItems] = useState<Array<OrderItemType>>([]);
    const [offset, setOffset] = useState(0);

    const {data: orderHistoryData, loading: isLoadOrderHistoryData} = useFetchOrderHistoryQuery({
        variables: {
            limit: 5,
            offset: offset
        }
    });

    useEffect(() => {
        dispatch(fetchOrderHistoryTotalCount())
            .catch((e) => {
                dispatch(setError({isError: true, code: e.message}));
            });
    }, [dispatch]);

    useEffect(() => {
        setOffset((page - 1) * 5);
    }, [page])

    useEffect(() => {
        //setIsLoading(true);
        if (ordersTotalCount) {
            // 注文履歴が存在する場合
            let totalPageCount;

            // 総ページ数をセット
            if (ordersTotalCount % 5 === 0) {
                totalPageCount = ordersTotalCount / 5;
            } else {
                totalPageCount = Math.floor(ordersTotalCount / 5) + 1;
            }
            setCount(totalPageCount);
        }
    }, [ordersTotalCount]);


    // 注文情報一覧のJSXを作成
    const orderInfoList = orderHistoryData?.orderHistory?.edges.map((order, index) => {
        const listItem = (
            <ListItem button onClick={() => {
                setIsOpen(true);
                if (order!.node!.orderItems!.edges) {
                    let orderItems: Array<OrderItemType> = order!.node!.orderItems.edges.map((orderItem: OrderItemTypeEdge | null) => orderItem!.node!)
                    setOrderItems(orderItems);
                }
            }}>
                <OrderInfoGQL order={order!.node!}/>
            </ListItem>
        );

        //  最後のListItem以外には<Divider/>を表示する
        if (orderHistoryData.orderHistory && index !== orderHistoryData.orderHistory.edges!.length - 1) {
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

            {isLoadOrderHistoryData ? (
                // Loading
                <Grid container justify={"center"} alignItems={"center"}>
                    <Grid item xs={7}>
                        <LinearProgress style={{margin: '10%'}}/>
                    </Grid>
                </Grid>
            ) : (
                // 注文履歴一覧
                <Grid container justify={"center"} alignItems={"center"}>
                    <Grid item xs={10}>
                        <List>
                            {orderInfoList}
                        </List>
                    </Grid>
                </Grid>
            )}

            {/*注文履歴が存在しない場合*/}
            {!isLoadOrderHistoryData && ordersTotalCount !== null && ordersTotalCount === 0 && (
                <Grid container justify={"center"} alignItems={"center"}>
                    <Grid item>
                        <Typography className={classes.text}>
                            注文履歴がありません。
                        </Typography>
                    </Grid>
                </Grid>
            )}

            {/*Pagination*/}
            {ordersTotalCount !== null && ordersTotalCount !== 0 && (
                <Grid container justify={"center"} alignItems={"center"}>
                    <Pagination count={count} page={page} onChange={(e, val) => {
                        setPage(val);
                    }} className={classes.pagination} size={"large"}/>
                </Grid>
            )}

            {/*Dialog*/}
            <OrderHistoryDialogGQL handleClose={() => {
                setIsOpen(false)
            }} isOpen={isOpen} orderItems={orderItems}/>
        </>
    );
};

export default HistoryGQL;
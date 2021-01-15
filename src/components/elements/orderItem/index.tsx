import React, {FC, useEffect} from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    makeStyles, Table, TableBody, TableCell,
    TableHead, TableRow,
    Typography,
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrderItems, selectOrderItems} from "~/store/slices/Domain/order.slice";

const useStyles = makeStyles((theme) =>({
    root: {
        display: 'flex',
        width:1000,
        height:200
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
        width:800
    },
    cover: {
        width: 151,
    },
}));

const OrderItem: FC = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const orderItems = useSelector(selectOrderItems);

    useEffect(() => {
        dispatch(fetchOrderItems());
    }, [dispatch])

    return (
        <>
            <Grid container alignItems="center" justify="center" >
            {orderItems && orderItems.map((orderItem) => (
                <div key={orderItem.id}>
                    <Card className={classes.root}>
                        {/*画像表示*/}
                        <CardMedia
                            component="img"
                            className={classes.cover}
                            image="/logo512.png"
                            title="Live from space album cover"
                        />
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <Typography component="h6" variant="h6" align="left">
                                    {orderItem.item.name}
                                </Typography>
                                {/*Tableで設計書を再現*/}
                                <Table size="small" >
                                    <TableHead>
                                        <TableRow>
                                            {/*注文内容のサイズによって表示を変える*/}
                                            {orderItem.size === 'M'? ( <TableCell>価格:　{orderItem.item.priceM} 円</TableCell>):(null)}
                                            {orderItem.size === 'L'? ( <TableCell>価格:　{orderItem.item.priceL} 円</TableCell>):(null)}
                                            <TableCell align="center">トッピング:</TableCell>
                                            <TableCell align="center">数量:　{orderItem.quantity}個</TableCell>
                                            <TableCell align="center">小計:　{orderItem.subTotalPrice}円</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow >
                                            <TableCell align="left" >サイズ:　{orderItem.size}</TableCell>
                                            <TableCell align="left">
                                                <ul>
                                                    {orderItem.orderToppings && orderItem.orderToppings.map((topping) => (
                                                        <li>{topping.topping.name}</li>
                                                    ))}
                                                </ul>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </div>
                    </Card>
                </div>
            ))}
            </Grid>
        </>
    )
}
export default OrderItem;
import React from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    makeStyles, Table, TableBody, TableCell,
    TableHead, TableRow,
    Typography,
} from "@material-ui/core";
import {OrderItem} from "~/types/interfaces";

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
        width: 175,
        height: 175
    },
}));

type Props = {
    orderItems:OrderItem[] | undefined
}

const OrderItems: React.FC<Props> = (props) => {
    const classes = useStyles();

    return (
        <>
            <Grid container alignItems="center" justify="center" >
            {props.orderItems && props.orderItems.map((orderItem) => (
                <div key={orderItem.id}>
                    <Card className={classes.root}>
                        {/*画像表示*/}
                        <CardMedia
                            component="img"
                            className={classes.cover}
                            image="/logo512.png"
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
                                                    {orderItem.orderToppings && orderItem.orderToppings.map((topping,index) => (
                                                        <li key={index}>{topping.topping.name}</li>
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
export default OrderItems;
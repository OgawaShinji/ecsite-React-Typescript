import React from "react";
import {
    Avatar,
    Paper,
    Grid,
    makeStyles,
    Typography,
} from "@material-ui/core";
import {OrderItem} from "~/types/interfaces";

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: '100%',
        height: 'auto',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        padding: theme.spacing(1),
        marginLeft: theme.spacing(3)
    },
    control: {
        padding: theme.spacing(1)
    },
    subTotalPrice: {
        borderBottom: 'dashed 2px grey'
    }
}));

type Props = {
    orderItem: OrderItem
}

const OrderItems: React.FC<Props> = (props) => {
    const classes = useStyles();

    return (
        <Paper variant={"outlined"} elevation={0}>
            <Grid container justify={"center"} alignItems={"center"} className={classes.control}>
                <Grid item xs={2}>
                    {/*画像表示*/}
                    <Avatar variant={"rounded"} alt={'pizza'}
                            src={props.orderItem.item.imagePath}
                            className={classes.avatar}/>
                </Grid>
                <Grid item xs={8}>
                    <Grid container justify={"flex-start"} alignItems={"stretch"} direction={"column"}>
                        <Grid item xs={12}>
                            <Grid container justify={"flex-start"} alignItems={"flex-start"}>
                                <Grid item>
                                    <Typography className={classes.title}>
                                        {props.orderItem.item.name}
                                    </Typography>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justify={"space-around"} direction={"row"}>
                                <Grid item>
                                    <Grid container justify={"space-between"} alignItems={"stretch"}
                                          direction={"column"}>
                                        <Grid item>
                                            {/*注文内容のサイズによって表示を変える*/}
                                            価格:
                                            {props.orderItem.size === 'M' ? props.orderItem.item.priceM.toLocaleString() : null}
                                            {props.orderItem.size === 'L' ? props.orderItem.item.priceL.toLocaleString() : null}
                                            円
                                        </Grid>
                                        <Grid item>&nbsp;</Grid>
                                        <Grid item>
                                            サイズ: {props.orderItem.size}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item style={{wordBreak: 'break-all'}}>
                                    トッピング:
                                    <ul>
                                        {props.orderItem.orderToppings && props.orderItem.orderToppings.map((orderTopping, index) => (
                                            <li key={index}
                                                style={{wordBreak: 'break-all'}}>{orderTopping.topping.name}</li>
                                        ))}

                                        {/*トッピングが無い場合*/}
                                        {props.orderItem.orderToppings && props.orderItem.orderToppings.length === 0 && 'なし'}
                                    </ul>
                                </Grid>
                                <Grid item>
                                    数量: {props.orderItem.quantity}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2} className={classes.control}>
                    <Typography className={classes.subTotalPrice}>
                        小計: {props.orderItem.subTotalPrice && props.orderItem.subTotalPrice.toLocaleString()}円
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}
export default OrderItems;
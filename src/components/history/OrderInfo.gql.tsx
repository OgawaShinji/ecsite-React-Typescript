import React from "react";
import {makeStyles, Grid, Typography, Chip, Avatar} from "@material-ui/core";

import {OrderHistoryType} from "~/generated/graphql";


type Props = {
    order: OrderHistoryType;
};

const useStyles = makeStyles(({
    title: {
        fontWeight: 'bold',
        fontSize: 15
    },
    avatar: {
        width: '100%',
        height: 'auto'
    },
    text: {
        textAlign: 'left'
    }
}));

const OrderInfoGQL: React.FC<Props> = props => {

    const classes = useStyles();

    // 郵便番号
    const zipcode = props.order.destinationZipcode;

    // 注文日（Stringに変換）
    const orderDate: string = String(props.order.orderDate);

    // 注文商品数
    const orderItemCount = props.order.orderItems?.edges.length;

    // 注文商品一枚目の画像URL
    const imagePath1: string = props.order.orderItems!.edges[0]!.node!.item!.imagePath!;

    /**
     * [status]
     * 1: 未入金
     * 2: 入金済
     * 3: 発送済
     * 4: 配送完了
     */
    const status = props.order.status;

    // statusに対応する<Chip/>の作成
    let chip;
    if (status === 1) {
        chip = <Chip style={{color: '#FF6633', fontWeight: 'bold'}} color={'default'} label={'未入金'}/>;
    } else if (status === 2) {
        chip = <Chip style={{color: '#66CCCC', fontWeight: 'bold'}} color={'default'} label={'入金済'}/>;
    } else if (status === 3) {
        chip = <Chip color={'secondary'} label={'発送済'}/>;
    } else {
        chip = <Chip color={"primary"} label={'配送完了'}/>;
    }

    return (
        <Grid container justify={"center"} alignItems={"center"} direction={"row"}>
            <Grid item xs={2}>
                <Avatar variant={"rounded"} alt={'pizza'}
                        src={imagePath1}
                        className={classes.avatar}/>
            </Grid>
            <Grid item xs={1}>
                <Grid container justify={"center"} alignItems={"center"}>
                    <Typography style={{color: 'grey'}}>
                        {orderItemCount && orderItemCount > 1 && '他' + (orderItemCount - 1) + '件'}
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={8}>
                <Grid container alignItems={"stretch"} justify={"center"}>
                    <Grid item xs={2}>
                        <Grid container justify={"flex-start"} alignItems={"flex-start"} direction={"column"}>
                            <Grid item>
                                <Typography className={classes.title}>
                                    注文日
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    {new Date(orderDate).toLocaleDateString()}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container justify={"flex-start"} alignItems={"flex-start"} direction={"column"}>
                            <Grid item>
                                <Typography className={classes.title}>
                                    合計金額
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    {props.order.totalPrice && props.order.totalPrice.toLocaleString()}円
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container justify={"flex-start"} alignItems={"flex-start"} direction={"column"}>
                            <Grid item>
                                <Typography className={classes.title}>
                                    お届け先
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography className={classes.text}>
                                    〒 {zipcode && zipcode.slice(0, 3)}-{zipcode && zipcode.slice(3, 7)}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography className={classes.text}>
                                    {props.order.destinationAddress}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    {props.order.destinationName} 様
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={1}>
                <Grid container justify={"center"} alignItems={"center"}>
                    {chip}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default OrderInfoGQL;
import React from "react";
import {makeStyles, Grid, Typography, Chip, Avatar} from "@material-ui/core";

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

const OrderInfo: React.FC = () => {

    const classes = useStyles();

    return (
        <Grid container justify={"center"} alignItems={"center"} direction={"row"}>
            <Grid item xs={2}>
                <Avatar variant={"rounded"} alt={'pizza'}
                        src={'/1.jpg'}
                        className={classes.avatar}/>
            </Grid>
            <Grid item xs={1}>
                <Grid container justify={"flex-start"} alignItems={"flex-start"}>
                    <Typography>
                        他2件
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
                                    2020年1月20日
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
                                    3,500円
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
                                    〒111-1111
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography className={classes.text}>
                                    東京都世田谷区pizzaマンション 900
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    山田太郎 様
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={1}>
                <Grid container justify={"center"} alignItems={"center"}>
                    <Chip color={"primary"} label={'配送中'}/>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default OrderInfo;
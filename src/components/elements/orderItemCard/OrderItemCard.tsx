import React from "react";
import {RouteComponentProps, withRouter} from 'react-router-dom';

import {Avatar, Paper, Grid, makeStyles, Typography, Box, Divider, Button} from "@material-ui/core";
import {OrderItemType} from "~/generated/graphql";

type Props = {
    orderItem: OrderItemType
};

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
    }
}));

const OrderItems: React.FC<Props & RouteComponentProps> = props => {

    const classes = useStyles();

    const toItemDetail = () => {
        if(props.orderItem?.item){
            props.history.push({pathname: `/itemDetail/${ props.orderItem.item.id}`});
        }

    };

    return (
        <Paper variant={"outlined"} elevation={0}>
            <Grid container spacing={2} className={classes.control}>
                <Grid item xs={3} container justify={"center"} alignItems={"center"}>
                    <Button onClick={toItemDetail}>
                        <Avatar variant={"rounded"} alt={'pizza'}
                                src={ props.orderItem?.item?.imagePath ? props.orderItem.item.imagePath : ""}
                                className={classes.avatar}/>
                    </Button>
                </Grid>
                <Grid item xs={6} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item container>
                            <Grid item xs={1}/>
                            <Grid item xs={11}>
                                <Button onClick={toItemDetail}>
                                    <Typography gutterBottom variant="h6">
                                        <Box fontWeight="fontWeightBold">
                                            {props.orderItem?.item && props.orderItem.item.name}
                                        </Box>
                                    </Typography>
                                </Button>
                                <Divider/>
                            </Grid>
                        </Grid>
                        <Grid item container>
                            <Grid item xs={1}/>
                            <Grid item xs={5}>
                                <Typography gutterBottom>
                                    {/*>注文内容のサイズによって表示を変える*/}
                                    価格
                                    : { props.orderItem?.size && props.orderItem.item?.priceM && props.orderItem.size === 'M' ? props.orderItem.item.priceM.toLocaleString() : null}
                                    { props.orderItem?.size && props.orderItem.item?.priceL && props.orderItem.size === 'L' ? props.orderItem.item.priceL.toLocaleString() : null}
                                    円
                                </Typography>
                                <Typography gutterBottom>
                                    サイズ : {props.orderItem && props.orderItem.size}
                                </Typography>
                                <Typography variant="subtitle1">
                                    数量 : {props.orderItem && props.orderItem.quantity + '個'}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <ul style={{listStyleType: 'circle'}}>
                                    {props.orderItem?.orderToppings && props.orderItem.orderToppings.edges?.map(( orderTopping, index) => (
                                        <li key={index && index}>{ orderTopping && orderTopping.node!.topping?.name }</li>
                                    ))}
                                </ul>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3} container alignItems="center">
                    <Grid item xs={2}/>
                    <Grid item xs={10}>
                        <Grid container direction={"column"}>
                            <Grid item>
                                小計 :
                            </Grid>
                            <Grid item>
                                <Typography variant='h5'>
                                    <Box fontWeight="fontWeightBold">
                                        {props.orderItem && props.orderItem.subTotalPrice!.toLocaleString() + '円'}
                                    </Box>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default withRouter(OrderItems);
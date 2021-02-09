import React from "react";

import OrderItemCard from '~/components/elements/orderItemCard/OrderItemCard';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Grid, makeStyles
} from '@material-ui/core';
import {Cancel} from "@material-ui/icons";


import {useFetchOrderItemsQuery} from "~/generated/graphql";
import {OrderItem} from "~/types/interfaces";

type Props = {
    handleClose: () => void;
    isOpen: boolean;
    orderItems: Array<OrderItem>;
};

const useStyles = makeStyles((theme) => ({
    control: {
        padding: theme.spacing(1)
    }
}));


const OrderHistoryDialog: React.FC<Props> = props => {

    const classes = useStyles();

    const {data} = useFetchOrderItemsQuery()

    // 注文商品一覧JSXの作成
    const orderItemCardList =  data?.cart?.orderItems && data.cart.orderItems.edges!.map((orderItem) => (
        <div key={orderItem!.node?.id && orderItem!.node!.id} className={classes.control}>
            <OrderItemCard orderItem={ orderItem!.node!}/>
        </div>
    ));

    return (
        <div>
            <Dialog open={props.isOpen} onClose={props.handleClose} fullWidth={true} maxWidth={"md"}>
                <Grid container justify={"center"} alignItems={"center"} direction={"column"}>
                    <Grid item>
                        <DialogTitle>&lt; 注文内容 &gt;</DialogTitle>
                    </Grid>
                </Grid>
                <DialogContent>
                    <Grid container justify={"center"} alignItems={"center"}>
                        <Grid item xs={11}>
                            {orderItemCardList}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid container justify={"center"} alignItems={"center"}>
                        <Grid item>
                            <IconButton onClick={props.handleClose}>
                                <Cancel fontSize={"large"} color={"error"}/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default OrderHistoryDialog;
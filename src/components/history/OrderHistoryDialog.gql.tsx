import React from "react";

import OrderItemCardGQL from "~/components/elements/orderItemCard/OrderItemCard.gql";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Grid, makeStyles, Typography
} from '@material-ui/core';
import {Cancel} from "@material-ui/icons";

import {OrderItemType} from "~/generated/graphql";


type Props = {
    handleClose: () => void;
    isOpen: boolean;
    orderItems: Array<OrderItemType>;
};

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#777777'
    },
    control: {
        padding: theme.spacing(1)
    }
}));

const OrderHistoryDialogGQL: React.FC<Props> = props => {

    const classes = useStyles();

    // 注文商品一覧JSXの作成
    const orderItemCardList = props.orderItems.map((orderItem: OrderItemType) => (
        <div key={orderItem.id} className={classes.control}>
            <OrderItemCardGQL orderItem={orderItem}/>
        </div>
    ));

    return (
        <div>
            <Dialog open={props.isOpen} onClose={props.handleClose} fullWidth={true} maxWidth={"md"}>
                <Grid container justify={"center"} alignItems={"center"} direction={"column"}>
                    <Grid item>
                        <DialogTitle>
                            <Typography className={classes.title}>
                                &lt; 注文内容 &gt;
                            </Typography>
                        </DialogTitle>
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

export default OrderHistoryDialogGQL;
import React, {useEffect} from "react";
import {asyncFetchOrderItems, selectOrderItems} from "~/store/slices/Domain/order.slice";
import {useDispatch, useSelector} from "react-redux";
import OrderForm from "~/components/orderConfirm/orderForm";
import OrderItemCard from "~/components/elements/orderItemCard/OrderItemCard";
import {selectLoginUser} from "~/store/slices/App/auth.slice";

import {Grid, makeStyles} from "@material-ui/core";
import {setError} from "~/store/slices/App/error.slice";
import {AppDispatch} from "~/store";
import {RouteComponentProps, withRouter} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    control: {
        margin: theme.spacing(2)
    },
    pad: {
        padding: theme.spacing(2)
    }
}))

const OrderConfirm: React.FC<RouteComponentProps> = (props) => {

    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();

    //storeのstateにあるorderItemの取得
    let orderItems = useSelector(selectOrderItems);
    //storeのstateにあるloginUserの取得
    let loginUser = useSelector(selectLoginUser);

    useEffect(() => {
        dispatch(asyncFetchOrderItems()).catch((e) => {
            dispatch(setError({isError: true, code: e.message}))
        })
    }, [dispatch])

    useEffect(() => {
        if (orderItems && orderItems.length === 0) {
            props.history.push({pathname: '/'})
        }
    }, [orderItems, props.history])

    return (
        <>
            <Grid container justify={"center"} alignItems={"center"}>
                <Grid item xs={9}>
                    {orderItems && orderItems.map((orderItem) => (
                        <div key={orderItem.id} className={classes.control}>
                            <OrderItemCard orderItem={orderItem}/>
                        </div>
                    ))}
                </Grid>
            </Grid>

            <div className={classes.pad}>
                <OrderForm user={loginUser}/>
            </div>
        </>
    )
}
export default withRouter(OrderConfirm);
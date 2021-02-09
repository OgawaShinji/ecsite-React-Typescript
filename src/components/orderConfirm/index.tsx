import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import OrderForm from "~/components/orderConfirm/orderForm";
import OrderItemCard from "~/components/elements/orderItemCard/OrderItemCard";
import {selectLoginUser} from "~/store/slices/App/auth.slice";

import {Grid, LinearProgress, makeStyles} from "@material-ui/core";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {useFetchOrderItemsQuery} from "~/generated/graphql";
import ErrorPage from "~/components/error";


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

    //storeのstateにあるloginUserの取得
    let loginUser = useSelector(selectLoginUser);

    const {data: fetchOrderItemData ,loading: fetchOrderItemLoading ,error: fetchOrderItemError } = useFetchOrderItemsQuery( )
    console.log(fetchOrderItemData);

    useEffect(() => {
        if (fetchOrderItemData?.cart?.orderItems && fetchOrderItemData.cart.orderItems.edges!.length === 0) {
            props.history.push({pathname: '/'})
        }
    }, [fetchOrderItemData, props.history])

    if (fetchOrderItemError) return <ErrorPage/>;

    return ( fetchOrderItemLoading ? (<LinearProgress style={{width: "60%", marginTop: "20%", marginLeft: "20%"}}/>) : (
        <div>
            <Grid container justify={"center"} alignItems={"center"}>
                <Grid item xs={9}>
                    { fetchOrderItemData?.cart?.orderItems && fetchOrderItemData.cart.orderItems.edges!.map((orderItem ) => (
                        <div key={orderItem!.node?.id && orderItem!.node!.id} className={classes.control}>
                            <OrderItemCard orderItem={orderItem!.node!}/>
                        </div>
                    ))}
                </Grid>
            </Grid>
            <div className={classes.pad}>
                <OrderForm user={loginUser} totalPrice={fetchOrderItemData?.cart?.totalPrice!} />
            </div>
        </div>
    ))
}
export default withRouter(OrderConfirm);
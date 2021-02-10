import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {selectLoginUser} from "~/store/slices/App/auth.slice";

import {Grid, LinearProgress, makeStyles} from "@material-ui/core";
import {RouteComponentProps, withRouter} from "react-router-dom";
import OrderFormGQL from "~/components/orderConfirm/OrderForm.gql";
import {useFetchOrderItemsQuery, useFetchUserQuery} from "~/generated/graphql";
import OrderItemCardGQL from "~/components/elements/orderItemCard/OrderItemCard.gql";
import ErrorPage from "~/components/error";


const useStyles = makeStyles((theme) => ({
    control: {
        margin: theme.spacing(2)
    },
    pad: {
        padding: theme.spacing(2)
    }
}))

const OrderConfirmGQL: React.FC<RouteComponentProps> = (props) => {

    const classes = useStyles();

    //GraphQLでログイン中のユーザー情報を取得する
    const { data: fetchLoginUserData, loading: fetchLoginUserLoading, error: fetchLoginUserError } = useFetchUserQuery();
    //GraphQlでカートの中身を取得する
    const { data: fetchOrderItemData, loading: fetchOrderItemLoading, error: fetchOrderItemError } = useFetchOrderItemsQuery();

    //エラーハンドリング
    if(fetchOrderItemError){
        const code = fetchOrderItemError.graphQLErrors[0].extensions?.code;
        return <ErrorPage code={code}/>
    }
    if(fetchLoginUserError){
        const code = fetchLoginUserError.graphQLErrors[0].extensions?.code;
        return <ErrorPage code={code}/>
    }

    return ( fetchOrderItemLoading || fetchLoginUserLoading ? (<LinearProgress style={{width: "60%", marginTop: "20%", marginLeft: "20%"}}/>) : (
        <div>
            <Grid container justify={"center"} alignItems={"center"}>
                <Grid item xs={9}>
                    { fetchOrderItemData!.cart!.orderItems!.edges.map((orderItem ) => (
                        <div key={ orderItem!.node!.id} className={classes.control}>
                            <OrderItemCardGQL orderItem={ orderItem!.node! }/>
                        </div>
                    ))}
                </Grid>
            </Grid>
            <div className={classes.pad}>
                <OrderFormGQL user={fetchLoginUserData!}  orderSubTotalPrice={fetchOrderItemData?.cart?.totalPrice!}/>
            </div>
        </div>
    ))
}
export default withRouter(OrderConfirmGQL);
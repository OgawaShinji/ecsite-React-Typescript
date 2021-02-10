import React from "react";
import {
    Avatar,
    CardContent,
    Grid, LinearProgress,
    Typography
} from "@material-ui/core";
import {useHistory, useParams} from "react-router-dom"
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {Path} from "~/router/routes";
import OrderItemFormGQL from "~/components/itemDetail/OrderItemForm.gql";
import {useFetchItemQuery, useAddCartMutation, useFetchToppingsQuery} from "~/generated/graphql";
import ErrorPage from "~/components/error";
import {itemEntryStateGQL} from "~/components/elements/orderItemEntry/OrderItemEntry.gql";

const ItemDetailGQL: React.FC = () => {
    let {itemId}: any = useParams()

    const {
        data: displayItem,
        loading: isLoadItem,
        error: fetchItemError
    } = useFetchItemQuery({variables: {id: itemId}});
    const {error: fetchToppingError} = useFetchToppingsQuery();

    const [addCart, {loading: isLoadAddCart, error: addCartError}] = useAddCartMutation();

    const history = useHistory();

    /**
     * 注文確定された際にAPIに投げるために必要なデータを形成しstoreの処理を呼び出す
     */
    const handleOrderClick = async (moveTo: string, selectedState: itemEntryStateGQL) => {
        if (displayItem === null) throw new Error()
        let newOrderToppings: { topping: string }[] = []
        if (selectedState.toppings.length !== 0) selectedState.toppings.map((t) => newOrderToppings.push({topping: t!.id!}))

        await addCart({
            variables: {
                orderItem: {
                    id: "orderItem id",
                    item: displayItem!.item!.id!,
                    orderToppings: newOrderToppings,
                    size: selectedState.size,
                    quantity: selectedState.quantity
                },
            }
        }).then(async () => {
            if (moveTo === 'cart') await history.push(Path.cart)
            if (moveTo === 'confirm') await history.push(Path.orderConfirm)
        }).catch((e) => {
            //catch処理書かないとErrorPageコンポーネントを返せない
            console.log(e)
        });
    }

    const classes = entryIndexStyle();

    ///// ErrorHandling
    if (fetchItemError || fetchToppingError || addCartError) {
        let code: string = '';
        if (fetchItemError) {
            code = fetchItemError.graphQLErrors[0].extensions?.code;
        } else if (addCartError) {
            code = addCartError.graphQLErrors[0].extensions?.code;
        } else if (fetchToppingError) {
            code = fetchToppingError.graphQLErrors[0].extensions?.code;
        }
        return <ErrorPage code={code}/>;
    }
    //Pathに存在しないIDを渡された場合BADREQUESTでは無くnullが返ってくる仕様なので404とみなす
    if (!(displayItem?.item?.name) && !(isLoadAddCart || isLoadItem)) return <ErrorPage code={'NOT_FOUND'}/>;

    if (isLoadItem || isLoadAddCart) return <LinearProgress
        style={{width: "60%", marginTop: "20%", marginLeft: "20%"}}/>;

    return (isLoadItem || isLoadAddCart ?
            <LinearProgress style={{width: "60%", marginTop: "20%", marginLeft: "20%"}}/>
            : <div className={classes.align_child}>
                <div style={{display: "flex"}}>
                    <Grid container justify={"center"} alignContent={"center"}>

                        {/*商品画像*/}
                        <Grid item xs={12}>
                            <CardContent className={classes.align_child}>
                                <Avatar src={`${displayItem!.item!.imagePath}`} style={{width: "50%", height: "auto"}}
                                        variant={"rounded"} alt={'🍕'}/>
                            </CardContent>

                            {/*商品名*/}
                            <CardContent className={classes.align_child}>
                                <Typography variant={"h4"} component={"u"}>{displayItem!.item!.name}</Typography>
                            </CardContent>
                        </Grid>

                        {/*説明文*/}
                        <Grid item xs={12} className={classes.description_content}>
                            <CardContent style={{width: "70%", textAlign: "center"}}>
                                <Typography variant={"body1"} color={"textSecondary"} component={"p"}>
                                    {displayItem!.item!.description}
                                    <br/>＊写真はイメージです＊
                                </Typography>
                                <br/>
                                <Typography variant={"h6"} color={"textPrimary"} component={"p"}>
                                    {`Mサイズ：` + displayItem!.item!.priceM!.toLocaleString() + `円　🍕　Lサイズ：` + displayItem!.item!.priceL!.toLocaleString() + `円`}
                                </Typography>
                            </CardContent>
                        </Grid>
                    </Grid>

                    {/*注文入力部分*/}
                    <OrderItemFormGQL item={displayItem!.item!} handleOrderClick={(m, s) => handleOrderClick(m, s)}/>

                </div>
            </div>
    )
};
export default ItemDetailGQL;
const entryIndexStyle = makeStyles(() => createStyles({
    outline_card: {
        margin: "3%",
        height: "auto",
        width: "80%",
    },
    align_child: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    description_content: {
        display: "flex",
        justifyContent: "center",
    },

}));
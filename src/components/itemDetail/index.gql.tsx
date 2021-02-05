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
import OrderItemForm from "~/components/itemDetail/OrderItemForm";
import {itemEntryState} from "~/components/elements/orderItemEntry/OrderItemEntry";
import {useAddCartMutation, useFetchItemQuery} from "~/generated/graphql";
import ErrorPage from "~/components/error";

const ItemDetailGQL: React.FC = () => {
    let {itemId}: any = useParams()
    itemId = Number(itemId)

    const {
        data: displayItem,
        loading: isLoadItem,
        error: isErrorFetchItem
    } = useFetchItemQuery({variables: {id: itemId}});

    const [addCart, {loading: isLoadAddCart, error: isErrorAddCart}] = useAddCartMutation();

    const history = useHistory();

    /**
     * 注文確定された際にAPIに投げるために必要なデータを形成しstoreの処理を呼び出す
     */
    const handleOrderClick = async (moveTo: string, selectedState: itemEntryState) => {
        if (displayItem === null) throw new Error()
        let newOrderToppings: { topping: number }[] = []
        if (selectedState.toppings.length !== 0) selectedState.toppings.map((t) => newOrderToppings.push({topping: t!.id!}))

        await addCart({
            variables: {
                orderItem: {
                    item: displayItem?.item?.id!,
                    orderToppings: newOrderToppings,
                    size: selectedState.size,
                    quantity: selectedState.quantity
                },
                totalPrice: selectedState.totalPrice!
            }
        }).then(async () => {
            if (moveTo === 'cart') await history.push(Path.cart)
            if (moveTo === 'confirm') await history.push(Path.orderConfirm)
        }).catch(() => {
            //catch処理書かないとErrorPageコンポーネントを返せない
        });

    }

    const classes = entryIndexStyle();

    if (isErrorFetchItem || isErrorAddCart) return <ErrorPage/>;

    return (isLoadItem || isLoadAddCart ?
            <LinearProgress style={{width: "60%", marginTop: "20%", marginLeft: "20%"}}/>
            : <div className={classes.align_child}>
                <div style={{display: "flex"}}>
                    <Grid container justify={"center"} alignContent={"center"}>

                        {/*商品画像*/}
                        <Grid item xs={12}>
                            <CardContent className={classes.align_child}>
                                <Avatar src={`${displayItem?.item!.imagePath}`} style={{width: "50%", height: "auto"}}
                                        variant={"rounded"} alt={'🍕'}/>
                            </CardContent>

                            {/*商品名*/}
                            <CardContent className={classes.align_child}>
                                <Typography variant={"h4"} component={"u"}>{displayItem?.item!.name}</Typography>
                            </CardContent>
                        </Grid>

                        {/*説明文*/}
                        <Grid item xs={12} className={classes.description_content}>
                            <CardContent style={{width: "70%", textAlign: "center"}}>
                                <Typography variant={"body1"} color={"textSecondary"} component={"p"}>
                                    {displayItem?.item!.description}
                                    <br/>＊写真はイメージです＊
                                </Typography>
                                <br/>
                                <Typography variant={"h6"} color={"textPrimary"} component={"p"}>
                                    {`Mサイズ：` + displayItem?.item!.priceM + `円　🍕　Lサイズ：` + displayItem?.item!.priceL + `円`}
                                </Typography>
                            </CardContent>
                        </Grid>
                    </Grid>

                    {/*注文入力部分*/}
                    <OrderItemForm item={displayItem?.item!} handleOrderClick={(m, s) => handleOrderClick(m, s)}/>

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
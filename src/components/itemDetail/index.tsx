import React, {useEffect, useState} from "react";
import {
    Avatar,
    Card,
    CardContent,
    Grid, LinearProgress,
    Typography
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {fetchItemDetail, selectItemDetail, setItemDetail} from "~/store/slices/Domain/item.slice";
import {AppDispatch} from "~/store";
import {useHistory, useParams} from "react-router-dom"
import {Item, Topping} from "~/types/interfaces";
import {fetchToppings, selectToppings} from "~/store/slices/Domain/topping.slice";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {asyncPostOrderItem, OrderItemToPost} from "~/store/slices/Domain/order.slice";
import {Path} from "~/router/routes";
import {setError} from "~/store/slices/App/error.slice"
import {OrderItemForm} from "~/components/itemDetail/OrderItemForm";
import {itemEntryState} from "~/components/elements/orderItemEntry/OrderItemEntry";

const ItemDetail: React.FC = () => {
    const item: Item | null = useSelector(selectItemDetail)
    const toppings: Topping[] = useSelector(selectToppings)
    const dispatch: AppDispatch = useDispatch()
    const history = useHistory();
    const [displayItem, setDisplayItem] = useState<Item | null>(item);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    let {itemId}: any = useParams()
    itemId = Number(itemId)

    useEffect(() => {
        //ページ遷移して来たときにトッピングがstoreに入っているかをチェック
        if (toppings.length === 0) dispatch(fetchToppings()).then()
            .catch((e) => dispatch(setError({isError: true, code: e.message})))
    }, [toppings.length, dispatch])

    useEffect(() => {
        //unmount時の処理
        return () => {
            dispatch(setItemDetail(null))
        }
    }, [dispatch])

    useEffect(() => {
        //ページ遷移して来たときにURLのitemIdがNumberに直せるか
        if (typeof itemId !== "number") console.log('this is error: itemId is only number')//throw new Error()

        //itemList以外から遷移してくると詳細情報がstoreに入っていないのでDBに取りに行く
        if (item === null) {
            dispatch(fetchItemDetail(itemId))
                .then(async (i) => {
                    console.log(i)
                    if (i.payload.item) {
                        await setDisplayItem(i.payload.item)
                        await setIsLoading(false)
                    }
                })
                .catch((e) => dispatch(setError({isError: true, code: e.message})))
        } else {
            setIsLoading(false)
        }
    }, [dispatch, item, itemId])


    /**
     * 注文確定された際にAPIに投げるために必要なデータを形成しstoreの処理を呼び出す
     */
    const handleOrderClick = async (moveTo: string, selectedState: itemEntryState) => {
        if (item === null) throw new Error()
        let newOrderToppings: { topping: number }[] = []
        if (selectedState.toppings.length !== 0) selectedState.toppings.map((t) => newOrderToppings.push({topping: t.id}))

        const newOrder: OrderItemToPost = {
            newItem: {
                item: item.id,
                orderToppings: newOrderToppings,
                quantity: selectedState.quantity,
                size: selectedState.size === 'M' ? 'M' : 'L'
            },
            status: 0,
            newTotalPrice: selectedState.totalPrice!
        }
        await dispatch(asyncPostOrderItem(newOrder)).then(async (i) => {
            //await dispatch(setIsLoading(true))
            await setIsLoading(true)
            if (i.payload === '200' && moveTo === 'cart') {
                await history.push(Path.cart)
            }
            if (i.payload === '200' && moveTo === 'confirm') {
                await history.push(Path.orderConfirm)
            }
        }).catch((e) => {
            dispatch(setError({isError: true, code: e.message}))
        })
    }

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

    const classes = entryIndexStyle();

    return (isLoading ?
            <LinearProgress style={{width: "60%", marginTop: "20%", marginLeft: "20%"}}/>
            : <div className={classes.align_child}>
                <Card style={{display: "flex"}}>
                    <Grid container justify={"center"} alignContent={"center"}>

                        {/*商品画像*/}
                        <Grid item xs={12}>
                            <CardContent className={classes.align_child}>{displayItem?.imagePath
                                ? (<Avatar src={`${displayItem?.imagePath}`} style={{width: "50%", height: "auto"}}
                                           variant={"rounded"}/>)
                                : (<Avatar src={""} style={{width: "50%", height: "auto"}} variant={"rounded"}/>)}
                            </CardContent>
                            <CardContent className={classes.align_child}>
                                <Typography variant={"h4"} component={"u"}>{displayItem?.name}</Typography>
                            </CardContent>
                        </Grid>

                        {/*説明文*/}
                        <Grid item xs={12} className={classes.description_content}>
                            <CardContent style={{width: "70%", textAlign: "center"}}>
                                <Typography variant={"body1"} color={"textSecondary"} component={"p"}>
                                    {displayItem?.description}
                                    <br/>＊写真はイメージです＊
                                </Typography>
                            </CardContent>
                        </Grid>
                    </Grid>

                    {/*注文入力部分*/}
                    <OrderItemForm item={displayItem} handleOrderClick={(m, s) => handleOrderClick(m, s)}/>

                </Card>
            </div>
    )
};
export default ItemDetail;

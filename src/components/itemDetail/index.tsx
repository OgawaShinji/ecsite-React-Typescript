import React, {useEffect, useState} from "react";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid, LinearProgress,
    Typography
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {fetchItemDetail, selectItemDetail} from "~/store/slices/Domain/item.slice";
import {AppDispatch} from "~/store";
import {useHistory, useParams} from "react-router-dom"
import OrderItemEntry, {itemEntryState} from "~/components/elements/orderItemEntry/OrderItemEntry";
import {Item, Topping} from "~/types/interfaces";
import {fetchToppings, selectToppings} from "~/store/slices/Domain/topping.slice";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {asyncPostOrderItem, OrderItemToPost} from "~/store/slices/Domain/order.slice";
import {Path} from "~/router/routes";
import {setError} from "~/store/slices/App/error.slice"
import {THEME_COLOR_2} from "~/assets/color";
import {selectIsLoading, setIsLoading} from "~/store/slices/App/displayUI.slice";

const ItemDetail: React.FC = () => {
    const item = useSelector(selectItemDetail)
    const toppings: Topping[] = useSelector(selectToppings)
    const dispatch: AppDispatch = useDispatch()
    const history = useHistory();
    const [detail, setDetail] = useState<Item | null>(item);

    const isLoading = useSelector(selectIsLoading);

    let {itemId}: any = useParams()
    itemId = Number(itemId)

    useEffect(() => {
        const firstEffect = async () => {
            if (typeof itemId !== "number") console.log('this is error: itemId is only number')//throw new Error()

            if (item === null) {
                await dispatch(fetchItemDetail(itemId))
                    .then((i) => {
                        if (i.payload.item) setDetail(i.payload.item)
                    })
                    .catch((e) => dispatch(setError({isError: true, code: e.message})))
            }
            if (toppings.length === 0) await dispatch(fetchToppings()).then()
                .catch((e) => dispatch(setError({isError: true, code: e.message})))
            if (detail !== null) await setTotalPrice(detail?.priceM)
        }
        firstEffect().then(() => dispatch(setIsLoading(false))
        )
    }, [dispatch, itemId, item, toppings, detail])

    const [size, setSize] = useState<string>('M');
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedToppings, setSelectToppings] = useState<Topping[]>([])
    const [totalPrice, setTotalPrice] = useState<number>(0)

    const selectedState: itemEntryState = {
        size: size,
        quantity: quantity,
        toppings: selectedToppings
    }

    /**
     * サイズが変更された際にサイズと合計金額のStateを変更
     * @param inputSize:変更後のサイズ
     */
    const handleSizeChange = (inputSize: string) => {
        setSize(inputSize);
        //Stateのsizeが変更される前に以下処理が走るためStateのサイズではなく、inputSizeを用いて合計金額を変更するので以下をメソッドとして吐き出していない
        let newTotalPrice = 0;
        if (selectedToppings.length !== 0) selectedToppings.map((t) => newTotalPrice += inputSize === 'M' ? t.priceM! : t.priceL!)
        newTotalPrice += (inputSize === 'M' ? detail!.priceM : detail!.priceL)
        setTotalPrice(newTotalPrice * quantity);
    }

    /**
     * 数量が変更された際に数量と合計金額のStateを変更
     * @param inputQuantity:変更後の数量
     */
    const handleQuantityChange = (inputQuantity: number) => {
        setQuantity(inputQuantity);
        //同上
        let newTotalPrice = 0;
        if (selectedToppings.length !== 0) selectedToppings.map((t) => newTotalPrice += size === 'M' ? t.priceM! : t.priceL!)
        newTotalPrice += (size === 'M' ? detail!.priceM : detail!.priceL)
        setTotalPrice(newTotalPrice * inputQuantity);
    }
    /**
     * トッピングが変更された際にトッピングと合計金額のStateを変更
     * @param newToppings:変更後の選択済みのトッピング配列
     */
    const handleToppingChange = (newToppings: Topping[]) => {
        setSelectToppings(newToppings);
        //同上
        let newTotalPrice = 0;
        if (toppings.length !== 0) newToppings.map((t) => newTotalPrice += size === 'M' ? t.priceM! : t.priceL!)
        newTotalPrice += (size === 'M' ? detail!.priceM : detail!.priceL)
        setTotalPrice(newTotalPrice * quantity);
    }
    /**
     * 注文確定された際にAPIに投げるために必要なデータを形成しstoreの処理を呼び出す
     */
    const handleOrderClick = async (moveTo: string) => {
        if (detail === null) throw new Error()
        let newOrderToppings: { topping: number }[] = []
        if (selectedToppings.length !== 0) selectedToppings.map((t) => newOrderToppings.push({topping: t.id}))

        const newOrder: OrderItemToPost = {
            newItem: {
                item: detail.id,
                orderToppings: newOrderToppings,
                quantity: quantity,
                size: size === 'M' ? 'M' : 'L'
            },
            status: 0,
            newTotalPrice: totalPrice
        }
        await dispatch(asyncPostOrderItem(newOrder)).then(async (i) => {
            await dispatch(setIsLoading(true))
            if (i.payload === '200' && moveTo === 'cart') {
                await dispatch(setIsLoading(true))
                await history.push(Path.cart)
            }
            if (i.payload === '200' && moveTo === 'confirm') {
                await dispatch(setIsLoading(true))
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
        order_button: {
            fontWeight: "bold",
            backgroundColor: THEME_COLOR_2,
            margin: "5%",
            padding: "7%",
            '&:hover': {
                background: "#FFBEDA"
            }
        },
        button_font: {
            color: "white",
            fontWeight: "bold"
        },
        total_price: {
            fontWeight: "bold",
            margin: "3%",
        }
    }));

    const classes = entryIndexStyle();

    return (isLoading ?
            <LinearProgress style={{width: "60%", marginTop: "20%", marginLeft: "20%"}}/>
            : <div className={classes.align_child}>
                <Card style={{display: "flex"}}>
                    <Grid container justify={"center"} alignContent={"center"}>

                        {/*商品画像*/}
                        <Grid item xs={12}>
                            <CardContent className={classes.align_child}>{detail?.imagePath
                                ? (<Avatar src={`${detail?.imagePath}`} style={{width: "50%", height: "auto"}}
                                           variant={"rounded"}/>)
                                : (<Avatar src={""} style={{width: "50%", height: "auto"}} variant={"rounded"}/>)}
                            </CardContent>
                            <CardContent className={classes.align_child}>
                                <Typography variant={"h4"} component={"u"}>{detail?.name}</Typography>
                            </CardContent>
                        </Grid>

                        {/*説明文*/}
                        <Grid item xs={12} className={classes.description_content}>
                            <CardContent style={{width: "70%", textAlign: "center"}}>
                                <Typography variant={"body1"} color={"textSecondary"} component={"p"}>
                                    {detail?.description}
                                    <br/>＊写真はイメージです＊
                                </Typography>
                            </CardContent>
                        </Grid>
                    </Grid>

                    {/*注文入力部分*/}
                    <Grid container justify={"center"} alignItems={"center"}>

                        <Grid item xs={12}>
                            <CardContent style={{height: "auto", width: "90%"}}>
                                <OrderItemEntry
                                    selectedState={selectedState}
                                    parentComponent={"itemDetail"}
                                    onSizeChange={(s) => handleSizeChange(s)}
                                    onQuantityChange={(q) => handleQuantityChange(q)}
                                    onToppingChange={(t) => handleToppingChange(t)}/>
                                <CardContent className={classes.align_child}>
                                    <Typography variant={"h3"}
                                                className={classes.total_price}>合計金額
                                        {` : `}{totalPrice ? totalPrice.toLocaleString() : totalPrice} 円(税抜)</Typography>
                                </CardContent>
                            </CardContent>
                        </Grid>

                        {/*注文確定ボタン*/}
                        <Grid item xs={12}>
                            <CardActions>
                                <Grid item xs={6} className={classes.align_child}>
                                    <Button variant={"contained"} className={classes.order_button} onClick={() => {
                                        handleOrderClick('cart').then()
                                    }}>
                                        <Typography className={classes.button_font}>
                                            商品をカートに入れる
                                        </Typography>
                                    </Button>
                                </Grid>
                                <Grid item xs={6} className={classes.align_child}>
                                    <Button variant={"contained"} className={classes.order_button} onClick={() => {
                                        handleOrderClick('confirm').then()
                                    }}>
                                        <Typography className={classes.button_font}>
                                            すぐに注文確認画面へ進む
                                        </Typography>
                                    </Button>
                                </Grid>
                            </CardActions>
                        </Grid>
                    </Grid>

                </Card>
            </div>
    )
};
export default ItemDetail;

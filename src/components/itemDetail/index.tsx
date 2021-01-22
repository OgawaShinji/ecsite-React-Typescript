import React, {useEffect, useState} from "react";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {fetchItemDetail, selectItemDetail} from "~/store/slices/Domain/item.slice";
import {AppDispatch} from "~/store";
import {useHistory, useParams} from "react-router-dom"
import OrderItemEntry, {itemEntryState} from "~/components/elements/orderItemEntry/OrderItemEntry";
import {Topping} from "~/types/interfaces";
import {fetchToppings, selectToppings} from "~/store/slices/Domain/topping.slice";
import img from "~/assets/img/img.png"
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {asyncPostOrderItem, OrderItemToPost} from "~/store/slices/Domain/order.slice";
import {Path} from "~/router/routes";
import {setError} from "~/store/slices/App/error.slice"

const ItemDetail: React.FC = () => {
    const item = useSelector(selectItemDetail)
    const toppings: Topping[] = useSelector(selectToppings)
    const dispatch: AppDispatch = useDispatch()
    const history = useHistory();

    let {itemId}: any = useParams()
    itemId = Number(itemId)
    useEffect(() => {
        if (typeof itemId !== "number") console.log('itemId is only number')//throw new Error()
        if (item === null) dispatch(fetchItemDetail(itemId))
            .then((i) => {
                setTotalPrice(i.payload?.priceM)
            }).catch((e) => dispatch(setError({isError: true, code: e.message})))
        if (toppings.length === 0) dispatch(fetchToppings())
        if (item !== null) setTotalPrice(item?.priceM)
    }, [dispatch, itemId, item, toppings])

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
        if (item !== null) newTotalPrice += (inputSize === 'M' ? item.priceM : item.priceL)
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
        if (item !== null) newTotalPrice += (size === 'M' ? item.priceM : item.priceL)
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
        if (item !== null) newTotalPrice += (size === 'M' ? item.priceM : item.priceL)
        setTotalPrice(newTotalPrice * quantity);
    }
    /**
     * 注文確定された際にAPIに投げるために必要なデータを形成しstoreの処理を呼び出す
     */
    const handleOrderClick = async () => {
        if (item === null) throw new Error()
        let newOrderToppings: { topping: number }[] = []
        if (selectedToppings.length !== 0) selectedToppings.map((t) => newOrderToppings.push({topping: t.id}))

        const newOrder: OrderItemToPost = {
            newItem: {
                item: item.id,
                orderToppings: newOrderToppings,
                quantity: quantity,
                size: size === 'M' ? 'M' : 'L'
            },
            status: 0,
            newTotalPrice: totalPrice
        }
        await dispatch(asyncPostOrderItem(newOrder)).then((i) => {
            if (i.payload === '200') history.push(Path.cart)
        }).catch((e) => {
            dispatch(setError({isError: true, code: e.message}))
        })
    }

    const entryIndexStyle = makeStyles((theme: Theme) => createStyles({
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
            backgroundColor: "#f8bbd0",
            margin: "5%",
            padding: "3%",
        },
        total_price: {
            fontWeight: "bold",
            margin: "3%",
        }
    }));

    const classes = entryIndexStyle();

    return (<div className={classes.align_child}>
            <Card className={classes.outline_card}>
                <Grid container justify={"center"} spacing={1} alignItems={"center"}>

                    {/*商品画像*/}
                    <Grid item xs={12}>
                        <CardContent className={classes.align_child}>{item?.imagePath
                            ? (<Avatar src={`${item?.imagePath}`} style={{width: "50%", height: "auto"}}
                                       variant={"rounded"}/>)
                            : (<Avatar src={img} style={{width: "50%", height: "auto"}} variant={"rounded"}/>)}
                        </CardContent>
                        <CardContent className={classes.align_child}>
                            <Typography variant={"h4"} component={"u"}>{item?.name}</Typography>
                        </CardContent>
                    </Grid>

                    {/*説明文*/}
                    <Grid item xs={12} className={classes.description_content}>
                        <CardContent style={{width: "70%", textAlign: "center"}}>
                            <Typography variant={"body1"} color={"textSecondary"} component={"p"}>
                                {item?.description}
                                <br/>＊写真はイメージです＊
                            </Typography>
                        </CardContent>
                    </Grid>

                    {/*注文入力部分*/}
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
                                            className={classes.total_price}>合計金額: {totalPrice.toLocaleString()}￥(税込)</Typography>
                            </CardContent>
                        </CardContent>

                        {/*注文確定ボタン*/}
                        <CardActions>
                            <Grid item xs={6} className={classes.align_child}>
                                <Button variant={"contained"} className={classes.order_button} onClick={() => {
                                    handleOrderClick()
                                }}>
                                    商品をカートに入れる
                                </Button>
                            </Grid>
                            <Grid item xs={6} className={classes.align_child}>
                                <Button variant={"contained"} className={classes.order_button} onClick={() => {
                                    handleOrderClick()
                                }}>
                                    すぐに注文確認画面へ進む
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

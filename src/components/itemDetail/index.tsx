import React, {useEffect, useState} from "react";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Typography
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {fetchItemDetail, selectItemDetail} from "~/store/slices/Domain/item.slice";
import {AppDispatch} from "~/store";
import {useHistory, useParams} from "react-router-dom"
import OrderItemEntry, {itemEntryState} from "~/components/elements/orderItemEntry/orderItemEntry";
import {Order, OrderItem, OrderTopping, Topping} from "~/types/interfaces";
import {fetchToppings, selectToppings} from "~/store/slices/Domain/topping.slice";
import img from "~/assets/img/img.png"
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {asyncPostOrderItem, OrderItemToPost} from "~/store/slices/Domain/order.slice";
import {Path} from "~/router/routes";

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

    const handleSizeChange = (inputSize: string) => {
        setSize(inputSize);

        let newTotalPrice = 0;
        if (selectedToppings.length !== 0) selectedToppings.map((t) => newTotalPrice += inputSize === 'M' ? t.priceM! : t.priceL!)
        if (item !== null) newTotalPrice += (inputSize === 'M' ? item.priceM : item.priceL)
        setTotalPrice(newTotalPrice * quantity);
    }
    const handleQuantityChange = (inputQuantity: number) => {
        setQuantity(inputQuantity);

        let newTotalPrice = 0;
        if (selectedToppings.length !== 0) selectedToppings.map((t) => newTotalPrice += size === 'M' ? t.priceM! : t.priceL!)
        if (item !== null) newTotalPrice += (size === 'M' ? item.priceM : item.priceL)
        setTotalPrice(newTotalPrice * inputQuantity);
    }
    const handleToppingChange = (newToppings: Topping[]) => {
        setSelectToppings(newToppings);

        let newTotalPrice = 0;
        if (toppings.length !== 0) newToppings.map((t) => newTotalPrice += size === 'M' ? t.priceM! : t.priceL!)
        if (item !== null) newTotalPrice += (size === 'M' ? item.priceM : item.priceL)
        setTotalPrice(newTotalPrice * quantity);
    }
    const handleOrderClick = async () => {
        if (item === null) throw new Error()
        let newOrderToppings: number[] = []
        if (toppings.length !== 0) toppings.map((t) => newOrderToppings.push(t.id))

        const newOrder: OrderItemToPost = {
            newItem: {
                item: item.id,
                orderToppings: [],
                quantity: quantity,
                size: size === 'M' ? 'M' : 'L'
            },
            status: 0,
            newTotalPrice: totalPrice
        }
        const dispatchStatus = await dispatch(asyncPostOrderItem(newOrder)).then(() => {
            return 200
        })
        return dispatchStatus === 200 ? 200 : 400
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

                    <Grid item xs={12}>
                        <CardContent className={classes.align_child}>{item?.imagePath
                            ? (<Avatar src={`${item?.imagePath}`} style={{width: "50%", height: "auto"}}
                                       variant={"rounded"}/>)
                            : (<Avatar src={img} style={{width: "50%", height: "auto"}} variant={"rounded"}/>)}
                        </CardContent>
                        <Typography variant={"h4"} component={"u"}>{item?.name}</Typography>
                    </Grid>


                    <Grid item xs={12} className={classes.description_content}>
                        <CardContent style={{width: "70%"}}>
                            <Typography variant={"body1"} color={"textSecondary"} component={"p"}>
                                {item?.description}
                                <br/>＊写真はイメージです＊
                            </Typography>
                        </CardContent>
                    </Grid>

                    <Grid item xs={12}>
                        <CardContent style={{height: "auto", width: "90%"}}>
                            <OrderItemEntry
                                selectedState={selectedState}
                                parentComponent={"itemDetail"}
                                onSizeChange={(s) => handleSizeChange(s)}
                                onQuantityChange={(q) => handleQuantityChange(q)}
                                onToppingChange={(t) => handleToppingChange(t)}/>
                            <Typography variant={"h3"}
                                        className={classes.total_price}>合計金額：{totalPrice}￥（税込）</Typography>
                        </CardContent>

                        <CardActions>
                            <Grid item xs={6}><Button variant={"contained"}
                                                      className={classes.order_button}
                                                      onClick={() => {
                                                          handleOrderClick().then((i) => i === 200 ? history.push(`${Path.cart}`) : {})
                                                      }}>商品をカートに入れる</Button></Grid>
                            <Grid item xs={6}><Button variant={"contained"} className={classes.order_button}
                                                      onClick={() => {
                                                          handleOrderClick().then((i) => i === 200 ? history.push(`${Path.orderConfirm}`) : {})
                                                      }}>すぐに注文確認画面へ進む</Button></Grid>
                        </CardActions>
                    </Grid>

                </Grid>
            </Card>
        </div>
    )
};
export default ItemDetail;

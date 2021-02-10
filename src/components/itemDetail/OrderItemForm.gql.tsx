import {Button, CardActions, CardContent, createStyles, Grid, Typography} from "@material-ui/core";
import React, {useState} from "react";
import OrderItemEntryGQL, {itemEntryStateGQL} from "~/components/elements/orderItemEntry/OrderItemEntry.gql";
import ItemPrice from "~/components/itemDetail/ItemPrice";
import {makeStyles} from "@material-ui/core/styles";
import {THEME_COLOR_2} from "~/assets/color";
import {ItemType as Item, ToppingType as Topping} from "~/generated/graphql";

type propsType = {
    item: Item,
    handleOrderClick: (moveTo: string, selectedState: itemEntryStateGQL) => void,
}
const OrderItemFormGQL: React.FC<propsType> = (props) => {

    const classes = style();

    const item = props.item;
    const [size, setSize] = useState<string>('M');
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedToppings, setSelectToppings] = useState<Topping[]>([])
    const [totalPrice, setTotalPrice] = useState<number>(item?.priceM ? Number(item.priceM) : 0)

    //OrderItemEntryにpropsで渡すためのデータ整形
    const selectedState: itemEntryStateGQL = {
        size: size,
        quantity: quantity,
        toppings: selectedToppings,
    }

    /**
     * 注文変更があった際に値段計算を行うメソッド
     * @param selectedSize
     * @param selectedQuantity
     * @param newToppings
     */
    const calcPrice = (selectedSize: string | null, selectedQuantity: number | null, newToppings: Topping[] | null) => {
        let newTotalPrice = 0;
        if ((newToppings ? newToppings : selectedToppings).length !== 0) (newToppings ? newToppings : selectedToppings).map(
            (t) => newTotalPrice += (selectedSize ? selectedSize : size) === 'M' ? t.priceM! : t.priceL!
        )
        newTotalPrice += ((selectedSize ? selectedSize : size) === 'M' ? Number(item!.priceM!) : Number(item!.priceL!))
        setTotalPrice(newTotalPrice * (selectedQuantity ? selectedQuantity : quantity));
    }
    /**
     * サイズが変更された際にサイズと合計金額のStateを変更
     * @param inputSize:変更後のサイズ
     *
     * 数量が変更された際に数量と合計金額のStateを変更
     * @param inputQuantity:変更後の数量
     *
     * トッピングが変更された際にトッピングと合計金額のStateを変更
     * @param newToppings:変更後の選択済みのトッピング配列
     *
     * 変更がない部分はnullを渡す
     */
    const handleChange = (inputSize: string | null, inputQuantity: number | null, newToppings: Topping[] | null) => {
        if (inputSize) setSize(inputSize)
        if (inputQuantity) setQuantity(inputQuantity)
        if (newToppings) setSelectToppings(newToppings)
        calcPrice(inputSize, inputQuantity, newToppings)
    }
    const handleOrderClick = (moveTo: string) => {
        props.handleOrderClick(moveTo, selectedState)
    }

    return (
        <Grid container justify={"center"} alignItems={"center"}>

            <Grid item xs={12}>
                <CardContent style={{height: "auto", width: "90%"}}>
                    <OrderItemEntryGQL
                        selectedState={selectedState}
                        parentComponent={"itemDetail"}
                        onSizeChange={(s) => handleChange(s, null, null)}
                        onQuantityChange={(q) => handleChange(null, q, null)}
                        onToppingChange={(t) => handleChange(null, null, t)}/>
                    <CardContent className={classes.align_child}>
                        <ItemPrice price={totalPrice}/>
                    </CardContent>
                </CardContent>
            </Grid>

            {/*注文確定ボタン*/}
            <Grid item xs={12}>
                <CardActions>
                    <Grid item xs={6} className={classes.align_child}>
                        <Button variant={"contained"} className={classes.order_button} onClick={() => {
                            handleOrderClick('cart')
                        }}>
                            <Typography className={classes.button_font}>
                                商品をカートに入れる
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={6} className={classes.align_child}>
                        <Button variant={"contained"} className={classes.order_button} onClick={() => {
                            handleOrderClick('confirm')
                        }}>
                            <Typography className={classes.button_font}>
                                すぐに注文確認画面へ進む
                            </Typography>
                        </Button>
                    </Grid>
                </CardActions>
            </Grid>

        </Grid>
    )
}
const style = makeStyles(() => createStyles({
    align_child: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
}))
export default OrderItemFormGQL;
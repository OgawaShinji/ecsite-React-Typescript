import {Button, CardActions, CardContent, createStyles, Grid, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import OrderItemEntry, {itemEntryState} from "~/components/elements/orderItemEntry/OrderItemEntry";
import ItemPrice from "~/components/itemDetail/ItemPrice";
import {makeStyles} from "@material-ui/core/styles";
import {Item} from "~/types/interfaces";
import {THEME_COLOR_2} from "~/assets/color";

type propsType = {
    item: Item | null,
    handleOrderClick: (moveTo: string, selectedState: itemEntryState) => void,
}
const OrderItemForm: React.FC<propsType> = (props) => {

    const classes = style();

    const item = props.item;
    const [selectedState, setSelectedState] = useState<itemEntryState>({size: 'M', quantity: 1, toppings: []})
    const [totalPrice, setTotalPrice] = useState<number>(item?.priceM ? item.priceM : 0)

    //selectedStateが変わる度に合計金額を変更する
    useEffect(() => {
        let newTotalPrice = selectedState.size === 'M' ? Number(item!.priceM) : Number(item!.priceL);
        //toppingが選択されている場合、それぞれの選択されているsizeでの値段の総和を求める
        if (selectedState.toppings.length !== 0) selectedState.toppings.forEach(
            (t) => newTotalPrice += selectedState.size === 'M' ? t.priceM! : t.priceL!)
        setTotalPrice(newTotalPrice * selectedState.quantity)
    }, [item, selectedState])

    /**
     * onChangeイベント発火時それぞれのStateを変更する
     * @param event{name:発火したタグのname属性, value:値}
     */
    const onChangeEvent = (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
        const name = event.target.name as 'size' | 'quantity'
        const value = event.target.value
        setSelectedState({...selectedState, [name]: value})
    }

    return (
        <Grid container justify={"center"} alignItems={"center"}>

            <Grid item xs={12}>
                <CardContent style={{height: "auto", width: "90%"}}>
                    <OrderItemEntry
                        selectedState={selectedState}
                        parentComponent={"itemDetail"}
                        onChangeEvent={(e) => onChangeEvent(e)}
                        onToppingChange={(t) => setSelectedState({...selectedState, toppings: t})}/>
                    < CardContent className={classes.align_child}>
                        <ItemPrice price={totalPrice}/>
                    </CardContent>
                </CardContent>
            </Grid>

            {/*注文確定ボタン*/}
            <Grid item xs={12}>
                <CardActions>
                    <Grid item xs={6} className={classes.align_child}>
                        <Button variant={"contained"} className={classes.order_button} onClick={() => {
                            props.handleOrderClick('cart', selectedState)
                        }}>
                            <Typography className={classes.button_font}>
                                商品をカートに入れる
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={6} className={classes.align_child}>
                        <Button variant={"contained"} className={classes.order_button} onClick={() => {
                            props.handleOrderClick('confirm', selectedState)
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
export default OrderItemForm;
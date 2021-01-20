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
import {useParams} from "react-router-dom"
import OrderItemEntry, {itemEntryState} from "~/components/elements/orderItemEntry/orderItemEntry";
import {Topping} from "~/types/interfaces";
import {fetchToppings, selectToppings} from "~/store/slices/Domain/topping.slice";
import img from "~/assets/img/img.png"
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const ItemDetail: React.FC = () => {
    const item = useSelector(selectItemDetail)
    const toppings: Topping[] = useSelector(selectToppings)
    const dispatch: AppDispatch = useDispatch()
    let {itemId}: any = useParams()
    itemId = Number(itemId)
    useEffect(() => {
        if (typeof itemId !== "number") console.log('itemId is only number')//throw new Error()
        if (item === null) dispatch(fetchItemDetail(itemId))
        if (toppings.length === 0) dispatch(fetchToppings())
    }, [dispatch, itemId, item, toppings])

    const [size, setSize] = useState<string>('M');
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedToppings, setSelectToppings] = useState<Topping[]>([])
    const selectedState: itemEntryState = {
        size: size,
        quantity: quantity,
        toppings: selectedToppings
    }
    const handleSizeChange = (inputSize: string) => {
        setSize(inputSize);
    }
    const handleQuantityChange = (inputQuantity: number) => {
        setQuantity(inputQuantity);
    }
    const handleToppingChange = (toppings: Topping[]) => {
        setSelectToppings(toppings)
    }
    const handleAddCartClick = (event: HTMLButtonElement) => {
        //add cart and move to items
    }
    const handleMoveConfirmClick = (event: HTMLButtonElement) => {
        //add cart and move to orderConfirm
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
            backgroundColor: "#f06292",
            margin: "5%",
            padding: "3%",
        }
    }));

    const classes = entryIndexStyle();
    return (<div className={classes.align_child}>
            <Card className={classes.outline_card}>
                <Grid container justify={"center"} spacing={1} alignItems={"center"}>

                    <Grid item xs={12}>
                        <CardContent className={classes.align_child}>{item?.imagePath
                            ? (<CardMedia image={`${item?.imagePath}`} title={"image"}/>)
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
                                onSizeChange={handleSizeChange}
                                onQuantityChange={handleQuantityChange}
                                onToppingChange={(t) => handleToppingChange(t)}/>
                        </CardContent>

                        <CardActions>
                            <Grid item xs={6}><Button variant={"contained"}
                                                      className={classes.order_button}>商品をカートに入れる</Button></Grid>
                            <Grid item xs={6}><Button variant={"contained"}
                                                      className={classes.order_button}>すぐに注文確認画面へ進む</Button></Grid>
                        </CardActions>
                    </Grid>

                </Grid>
            </Card>
        </div>
    )
};
export default ItemDetail;

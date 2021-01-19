import React, {useEffect, useState} from "react";
import {Button, Card, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {fetchItemDetail, selectItemDetail} from "~/store/slices/Domain/item.slice";
import {AppDispatch} from "~/store";
import {useParams} from "react-router-dom"
import OrderItemEntry, {itemEntryState} from "~/components/elements/orderItemEntry/orderItemEntry";
import {Topping} from "~/types/interfaces";
import {fetchToppings, selectToppings} from "~/store/slices/Domain/topping.slice";

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

    return (
        <>
            <Card>
                <Grid container justify={"center"}>
                    <Grid item xs={6}>{item?.imagePath
                        ? (<CardMedia image={`${item?.imagePath}`} title={"image"}/>)
                        : (<div>not image</div>)}
                    </Grid>
                    <Grid item xs={6}><CardContent><Typography variant={"body2"} color={"textSecondary"}
                                                               component={"p"}>{item?.description}</Typography>
                    </CardContent></Grid>
                    <Grid item xs={12}><CardContent><OrderItemEntry selectedState={selectedState}
                                                                    parentComponent={"itemDetail"}
                                                                    onSizeChange={handleSizeChange}
                                                                    onQuantityChange={handleQuantityChange}
                                                                    onToppingChange={(t) => handleToppingChange(t)}/></CardContent></Grid>
                    <Grid item xs={6}><Button>into cart</Button></Grid>
                    <Grid item xs={6}><Button>order</Button></Grid>
                </Grid>

            </Card>
        </>
    )
};
export default ItemDetail;
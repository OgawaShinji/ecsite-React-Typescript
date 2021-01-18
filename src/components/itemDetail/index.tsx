import React, {useEffect, useState} from "react";
import {Button, Card, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {fetchItemDetail, selectItemDetail} from "~/store/slices/Domain/item.slice";
import {AppDispatch} from "~/store";
import {useParams} from "react-router-dom"
import OrderItemEntry, {itemEntryState} from "~/components/elements/orderItemEntry";
import {Topping} from "~/types/interfaces";

const ItemDetail: React.FC = () => {
    const item = useSelector(selectItemDetail)
    const dispatch: AppDispatch = useDispatch()
    let {itemId}: any = useParams()
    itemId = Number(itemId)
    useEffect(() => {
        if (typeof itemId !== "number") console.log('itemId is only number')//throw new Error()
        if (item === null) dispatch(fetchItemDetail(itemId))
    }, [dispatch, itemId, item])
    const [size, setSize] = useState<string>('M');
    const [quantity, setQuantity] = useState<number>(1);
    const [selectToppings, setSelectToppings] = useState<Topping[]>([])
    const selectedState: itemEntryState = {
        size: size,
        quantity: quantity,
        toppings: selectToppings
    }
    const handleSizeChange = (inputSize: string) => {
        setSize(inputSize);
    }
    const handleQuantityChange = (inputQuantity: number) => {
        setQuantity(inputQuantity);
    }

    return (
        <>
            <Card>
                <Grid container>
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
                                                                    onQuantityChange={handleQuantityChange}/></CardContent></Grid>
                    <Grid item xs={6}><Button>into cart</Button></Grid>
                    <Grid item xs={6}><Button>order</Button></Grid>
                </Grid>

            </Card>
        </>
    )
}
export default ItemDetail;
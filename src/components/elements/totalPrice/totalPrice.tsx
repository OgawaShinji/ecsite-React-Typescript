import React, {useEffect, useState} from "react";
import {Divider, Typography} from "@material-ui/core";

interface Props {
    subTotalPrice: number
}

const TotalPrice: React.FC<Props> = props => {

    const [subTotalPrice, setSubTotalPrice] = useState(0)
    const [consumptionTax, setConsumptionTax] = useState(0);
    const [billedAmount, setBilledAmount] = useState(0);

    const tax = props.subTotalPrice * 0.1;
    const totalPrice = props.subTotalPrice + tax;

    useEffect(  () => {
        setSubTotalPrice(props.subTotalPrice);
        setConsumptionTax(consumptionTax => tax);
        setBilledAmount(billedAmount => totalPrice);
    }, [props.subTotalPrice,tax,totalPrice])

    return (
        <>
            <Typography variant={"subtitle2"} align={"center"} >小計: {subTotalPrice.toLocaleString()} 円</Typography>
            <br/>
            <Typography variant={"subtitle2"} align={"center"}>消費税: {consumptionTax.toLocaleString()} 円</Typography>
            <br/>
            <Divider/>
            <br/>
            <Typography variant={"subtitle1"} align={"center"}>合計金額: {billedAmount.toLocaleString()} 円</Typography>
        </>
    )
}
export default TotalPrice
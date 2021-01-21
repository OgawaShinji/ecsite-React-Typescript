import React, {useEffect, useState} from "react";
import {Divider} from "@material-ui/core";

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
            <p>注文商品の小計: {subTotalPrice.toLocaleString()} 円</p>
            <p>消費税: {consumptionTax.toLocaleString()} 円</p>
            <Divider/>
            <p>合計金額: {billedAmount.toLocaleString()} 円</p>
        </>
    )
}

export default TotalPrice
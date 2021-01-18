import React, {FC, useEffect, useState} from "react";
import {Divider} from "@material-ui/core";

interface Props{
    subTotalPrice: number
}

const TotalPrice: React.FC<Props> = props => {

    const [consumptionTax, setConsumptionTax] = useState(0);
    const [billedAmount, setBilledAmount] = useState(0);

    /**
     * 受け取った注文内容の小計から消費税を計算するメソッド
     */
    const calcConsumptionTax = () => {
        const tax =  props.subTotalPrice * 0.1;
       setConsumptionTax(consumptionTax + tax );
    }
　　
    /**
     * 受け取った注文内容の小計とその消費税を合算するメソッド
     */
    const calcBilledAmount = () => {
        const tax =  props.subTotalPrice * 0.1;
        const totalPrice = props.subTotalPrice + tax;
        setBilledAmount( billedAmount + totalPrice);
    }

    useEffect(() => {
        calcConsumptionTax();
        calcBilledAmount();
    },[props.subTotalPrice])

    return (
        <>
            <p>注文商品の小計:　{props.subTotalPrice} 円</p>
            <p>消費税:　{consumptionTax} 円</p>
            <Divider/>
            <p>合計金額:　{billedAmount} 円</p>
        </>
    )
}

export default TotalPrice
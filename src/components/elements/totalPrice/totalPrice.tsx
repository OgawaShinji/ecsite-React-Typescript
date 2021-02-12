import React, {useEffect, useState} from "react";
import {Box, Divider, makeStyles, Typography} from "@material-ui/core";

interface Props {
    subTotalPrice: number | null | undefined
}

const useStyles = makeStyles((theme) => ({
    control: {
        margin: theme.spacing(2),
        color: "black"
    },
    pad: {
        padding: theme.spacing(2)
    },
}))

const TotalPrice: React.FC<Props> = props => {

    const classes = useStyles();

    const [subTotalPrice, setSubTotalPrice] = useState(0)
    const [consumptionTax, setConsumptionTax] = useState(0);
    const [billedAmount, setBilledAmount] = useState(0);


    useEffect(() => {
        if (props.subTotalPrice) {
            const tax = props.subTotalPrice! * 0.1;
            const totalPrice = props.subTotalPrice! + tax;
            setSubTotalPrice(props.subTotalPrice!);
            setConsumptionTax(() => tax);
            setBilledAmount(() => totalPrice);
        } else {
            setSubTotalPrice(0);
            setConsumptionTax(0);
            setBilledAmount(0);
        }
    }, [props.subTotalPrice])

    return (
        <>
            <Typography variant={"subtitle2"} align={"center"}
                        className={classes.control}>小計: {subTotalPrice.toLocaleString()} 円</Typography>
            <Typography variant={"subtitle2"} align={"center"}
                        className={classes.control}>消費税: {consumptionTax.toLocaleString()} 円</Typography>
            <Divider variant={"middle"}/>
            <Typography variant={"subtitle1"} align={"center"}
                        className={classes.control}>
                <Box fontWeight="fontWeightBold">
                    合計金額: {billedAmount.toLocaleString()} 円
                </Box>
            </Typography>
        </>
    )
}
export default TotalPrice
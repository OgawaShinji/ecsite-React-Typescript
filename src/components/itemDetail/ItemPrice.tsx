import {Typography} from "@material-ui/core";
import React from "react";

type propsType = {
    price: number
}
export const ItemPrice: React.FC<propsType> = (props) => {
    return (
        <Typography variant={"h3"}
                    style={{
                        fontWeight: "bold",
                        margin: "3%",
                    }}>合計金額
            {` : `}{props.price.toLocaleString()} 円(税抜)</Typography>
    )
}
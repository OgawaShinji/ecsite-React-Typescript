import React from "react";
import {
    FormControl,
    FormControlLabel, FormLabel,
    Grid, InputLabel, MenuItem, Radio,
    RadioGroup, Select
} from "@material-ui/core";
import {Topping} from "~/types/interfaces";

export type itemEntryState = {
    size: string;
    quantity: number;
    toppings: Topping[]
}
export type entryProps = {
    selectedState: itemEntryState;
    parentComponent: string;
    onSizeChange?: (size: string) => void;
    onQuantityChange?: (quantity: number) => void;
}
const OrderItemEntry: React.FC<entryProps> = (props) => {

    const quantityList = [{value: 1, text: '1'}, {value: 2, text: '2'}, {value: 3, text: '3'},
        {value: 4, text: '4'}, {value: 5, text: '5'}]
    const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (typeof props.onSizeChange !== "undefined") props.onSizeChange(event.target.value)
    }
    const handleQuantityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        if (typeof props.onQuantityChange !== "undefined") props.onQuantityChange(event.target.value as number)
    }
    return (
        <>
            <Grid container>
                <Grid item xs={6}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Size</FormLabel>
                        <RadioGroup row aria-label="size" name="size" value={props.selectedState.size}
                                    onChange={handleSizeChange}>
                            <FormControlLabel value="M" control={<Radio color={"primary"}/>} label="M : "/>
                            <FormControlLabel value="L" control={<Radio color={"primary"}/>} label="L : "/>
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl>
                        <InputLabel id="quantity-label">Quantity</InputLabel>
                        <Select
                            labelId="quantity-label"
                            id="quantity-select"
                            value={props.selectedState.quantity}
                            onChange={handleQuantityChange}
                        >
                            {quantityList.map((i) => {
                                return <MenuItem value={i.value} key={"quantity-select" + i.text}>{i.text}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </>
    )
}
export default OrderItemEntry;
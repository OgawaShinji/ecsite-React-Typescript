import React, {useRef, useState} from "react";
import {
    Button,
    Card,
    DialogContent,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Modal,
    Radio,
    RadioGroup,
    Select
} from "@material-ui/core";
import {OrderItem, Topping} from "~/types/interfaces";
import {WrappedSelectTopping} from "~/components/elements/orderItemEntry/selectTopping";

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
    onToppingChange?: (toppings: Topping[]) => void;
    onClickCloseOrderItemEntity?: () => void;
};
const OrderItemEntry: React.FC<entryProps> = (props) => {


    const [modalIsOpen, setIsOpen] = useState<boolean>(false)
    const [selectedToppings, setSelectedToppings] = useState<Topping[]>(props.selectedState.toppings)

    const quantityList = [{value: 1, text: '1'}, {value: 2, text: '2'}, {value: 3, text: '3'},
        {value: 4, text: '4'}, {value: 5, text: '5'}]

    const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (typeof props.onSizeChange !== "undefined") props.onSizeChange(event.target.value)
    }

    const handleQuantityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        if (typeof props.onQuantityChange !== "undefined") props.onQuantityChange(event.target.value as number)
    }

    const handleToppingChange = (toppings: Topping[]) => {
        if (typeof props.onToppingChange !== "undefined") props.onToppingChange(toppings);
        setSelectedToppings(toppings)
    }


    //SelectToppingコンポーネントをModal表示する際にこのコンポーネントのref属性を渡す必要があるのでここで変数宣言
    const selectToppingRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <Grid container justify={"center"}>
                <Grid item xs={6}>
                    <Card>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Size</FormLabel>
                            <RadioGroup row aria-label="size" name="size" value={props.selectedState.size}
                                        onChange={handleSizeChange}>
                                <FormControlLabel value="M" control={<Radio color={"primary"}/>}
                                                  labelPlacement={"start"}
                                                  label="M : "/>
                                <FormControlLabel value="L" control={<Radio color={"primary"}/>}
                                                  labelPlacement={"start"}
                                                  label="L : "/>
                            </RadioGroup>
                        </FormControl>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card>
                        <FormControl>
                            <InputLabel id="quantity-label">Quantity</InputLabel>
                            <Select
                                labelId="quantity-label"
                                id="quantity-select"
                                value={props.selectedState.quantity}
                                onChange={handleQuantityChange}
                                variant={"standard"}
                            >
                                {quantityList.map((i) => {
                                    return <MenuItem value={i.value}
                                                     key={"quantity-select" + i.text}>{i.text}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Button onClick={() => setIsOpen(true)} color={"primary"} variant={"outlined"}>
                        Select Toppings
                    </Button>
                </Grid>
                <Grid item xs={3}>{selectedToppings.map((t) => <Card key={t.name}> {t.name}</Card>)}</Grid>
                {/*{props.parentComponent === "CartItem" && (*/}
                {/*    <Grid item xs={6}>*/}
                {/*        <Button onClick={() => props.onClickCloseOrderItemEntity!()}>キャンセル</Button>*/}
                {/*        <Button onClick={() => setIsOpen(true)}>保存</Button>*/}
                {/*    </Grid>*/}
                {/*)}*/}
                <Modal open={modalIsOpen} onClose={() => setIsOpen(false)}>
                    <DialogContent>
                        <WrappedSelectTopping selectedSize={props.selectedState.size}
                                              onClickClose={() => setIsOpen(false)}
                                              customRef={selectToppingRef} propTopping={selectedToppings}
                                              onToppingChange={(t) => handleToppingChange(t)}/>
                    </DialogContent>
                </Modal>
            </Grid>
        </>
    )
}
export default OrderItemEntry;
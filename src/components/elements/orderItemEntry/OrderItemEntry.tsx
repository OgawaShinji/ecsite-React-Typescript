import React, {useRef, useState} from "react";
import {
    Button,
    Card,
    CardHeader,
    DialogContent,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Modal,
    Paper,
    Radio,
    RadioGroup,
    Select,
    Typography
} from "@material-ui/core";
import {Topping} from "~/types/interfaces";
import {WrappedSelectTopping} from "~/components/elements/orderItemEntry/SelectTopping";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

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

    let classes: any
    if (props.parentComponent === 'CartItem') {
        classes = orderItemEntryStyleInCart();
    } else if (props.parentComponent === 'itemDetail') {
        classes = orderItemEntryStyle();
    }


    return (
        <Grid justify={"center"} container className={classes.modal}>
            <CardHeader title={"注文はこちらから！"} className={classes.entry_title}/>
            <Card className={classes.entry_form}>
                {/*注文入力フォーム左側(サイズと数量)*/}
                <Grid container justify={"space-around"} style={{display: "flex"}} className={classes.entry_left}>

                    {/*サイズ入力フォーム*/}
                    <Grid item xs={12} className={classes.entry_parts_grid}>
                        <Paper className={classes.entry_parts_paper}>
                            <FormControl margin={"normal"}>
                                <FormLabel>サイズ</FormLabel>
                                <RadioGroup row aria-label="サイズ" name="size" value={props.selectedState.size}
                                            onChange={handleSizeChange}>
                                    <FormControlLabel value="M" control={<Radio color={"primary"}/>}
                                                      labelPlacement={"start"}
                                                      label="M : "/>
                                    <FormControlLabel value="L" control={<Radio color={"primary"}/>}
                                                      labelPlacement={"start"}
                                                      label="L : "/>
                                </RadioGroup>
                            </FormControl>
                        </Paper>
                    </Grid>

                    {/*数量入力フォーム*/}
                    <Grid item xs={12} className={classes.entry_parts_grid}>
                        <Paper className={classes.entry_parts_paper}>
                            <FormControl margin={"normal"}>
                                <InputLabel style={{fontSize: "120%"}}>数量</InputLabel>
                                <Select
                                    labelId="quantity-label"
                                    id="quantity-select"
                                    value={props.selectedState.quantity}
                                    onChange={handleQuantityChange}
                                    variant={"standard"}
                                    style={{height: "60%"}}
                                >
                                    {quantityList.map((i) => {
                                        return <MenuItem value={i.value}
                                                         key={"quantity-select" + i.text}>{i.text}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Paper>
                    </Grid>
                </Grid>

                {/*トッピング入力フォーム*/}
                <Grid container justify={"center"}>
                    <Grid item xs={12} style={{}}>
                        <Paper style={{margin: "3%"}} className={classes.entry_right}>

                            {/*SelectToppingモーダル表示ボタン*/}
                            <Button onClick={() => setIsOpen(true)}
                                    variant={"contained"}
                                    className={classes.modal_open_button}>
                                <Typography>トッピング選択はこちら</Typography>
                            </Button>

                            {/*選択済みトッピング表示部分*/}
                            {selectedToppings.map((t) =>
                                <Grid item xs={12} className={classes.selected_topping_grid} key={t.name}>
                                    <Card key={t.name} className={classes.selected_topping_card}>
                                        <Typography variant={"body1"} color={"primary"}
                                                    component={"p"}>{t.name}
                                        </Typography>
                                    </Card>
                                </Grid>)}
                        </Paper>
                    </Grid>
                    <Modal
                        open={modalIsOpen}
                        onClose={() => setIsOpen(false)}>
                        <DialogContent className={classes.dialog}>
                            <WrappedSelectTopping selectedSize={props.selectedState.size}
                                                  onClickClose={() => setIsOpen(false)}
                                                  customRef={selectToppingRef} propTopping={selectedToppings}
                                                  onToppingChange={(t) => handleToppingChange(t)}/>
                        </DialogContent>
                    </Modal>
                </Grid>
            </Card>
        </Grid>
    )
};
export default OrderItemEntry;

const orderItemEntryStyleInCart = makeStyles((theme: Theme) => createStyles({

    modal: {},
    entry_title: {
        width: "100%",
        backgroundColor: "#ffa500"
    },
    //大外の枠
    entry_form: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    //左部分の枠
    entry_left: {
        width: "80%",
        height: "90%",
        margin: "1%",
        border: "1%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: ""
    },
    //左部分各入力フォームの枠
    entry_parts_grid: {
        margin: "3%",
        height: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "1%",
        alignContent: "flex-start",
    },
    //左部分各入力フォームの背景色指定用
    entry_parts_paper: {
        width: "65%",
        height: "80%",
        // backgroundColor: "#ffcdd2"
    },
    //モーダル表示ボタン
    modal_open_button: {
        fontWeight: "bold",
        backgroundColor: "#ffcdd2",
        margin: "5%",
        padding: "3%"
    },
    //選択済みトッピングカードの外枠
    selected_topping_grid: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    //選択済みトッピング表示カード
    selected_topping_card: {
        width: "60%",
        margin: "3%",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffe0b2",//#ffb74d
    },

    dialog: {
        width: '95%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: "translate(-50%, -50%)"
    },
    entry_right: {}
}));

const orderItemEntryStyle = makeStyles((theme: Theme) => createStyles({
    modal: {},
    entry_title: {
        width: "92%",
        backgroundColor: "#ffa500"
    },
    //大外の枠
    entry_form: {
        width: "95%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: ""
    },
    //左部分の枠
    entry_left: {
        width: "80%",
        height: "90%",
        margin: "1%",
        border: "1%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: ""
    },
    //左部分各入力フォームの枠
    entry_parts_grid: {
        margin: "3%",
        height: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "1%",
        alignContent: "flex-start",
    },
    //左部分各入力フォームの背景色指定用
    entry_parts_paper: {
        width: "90%",
        height: "80%",
        backgroundColor: "#ffcdd2",
        display: "flex",
        justifyContent: "center",
    },
    //モーダル表示ボタン
    modal_open_button: {
        fontWeight: "bold",
        backgroundColor: "#ffcdd2",
        margin: "5%",
        padding: "3%"
    },
    //選択済みトッピングカードの外枠
    selected_topping_grid: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    //選択済みトッピング表示カード
    selected_topping_card: {
        width: "60%",
        margin: "3%",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffe0b2",//#ffb74d

    },

    dialog: {
        width: '95%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: "translate(-50%, -50%)"
    },
    entry_right: {
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
    }
}));
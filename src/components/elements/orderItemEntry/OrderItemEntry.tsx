import React, {useRef, useState} from "react";
import {
    Button,
    Card,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    MenuItem,
    Modal,
    Radio,
    RadioGroup,
    Select,
    Typography
} from "@material-ui/core";
import {Topping} from "~/types/interfaces";
import {WrappedSelectTopping} from "~/components/elements/orderItemEntry/SelectTopping";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {THEME_COLOR_1, THEME_COLOR_2} from "~/assets/color";

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
            <Grid item xs={12} className={classes.title_grid}>
                <Typography className={classes.title_words}>
                    {props.parentComponent === 'CartItem' ? '注文変更フォーム' : '注文入力フォーム'}
                </Typography>
            </Grid>
            <Card className={classes.form_card}>
                <Grid item container>

                    {/* サイズ・数量を変更できるフォーム */}
                    <Grid item xs={6} container className={classes.left_grid}>
                        <Grid item xs={12}>
                            <Grid container justify={"center"} className={classes.form_grid}>
                                <FormControl className={classes.size_form}>
                                    サイズ
                                    <Divider/>
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
                            </Grid>
                        </Grid>

                        {/*数量選択*/}
                        <Grid item xs={12}>
                            <Grid container justify={"center"} className={classes.form_grid}>
                                <FormControl className={classes.quantity_form}>
                                    数量
                                    <Divider/>
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
                            </Grid>
                        </Grid>
                    </Grid>

                    {/*トッピング入力フォーム*/}
                    <Grid item xs={6} container justify={"center"} style={{alignContent: "center"}}>
                        <Grid item xs={12} className={classes.selected_topping_grid}>

                            {/*SelectToppingモーダル表示ボタン*/}
                            <Button onClick={() => setIsOpen(true)}
                                    variant={"contained"}
                                    color={"primary"}
                                    className={classes.modal_open_button}>
                                <Typography>トッピング選択はこちら</Typography>
                            </Button>
                        </Grid>
                        {/*選択済みトッピング表示部分*/}
                        {selectedToppings.map((t) =>
                            <Grid item xs={12} className={classes.selected_topping_grid} key={t.name}>
                                <Card key={t.name} className={classes.selected_topping_card}>
                                    <Typography variant={"body1"} style={{color: "white"}}
                                                component={"p"}>{t.name}
                                    </Typography>
                                </Card>
                            </Grid>)}
                    </Grid>
                </Grid>
                {props.parentComponent === 'CartItem' && (
                    <div>
                        <Grid item xs={12} className={classes.left_form_attention}>
                            ※注文の変更は自動で更新されます
                        </Grid>
                        <Divider/>
                        <Grid item container className={classes.entry_close_btn} justify="center" alignItems="center">
                            <Button
                                onClick={props.onClickCloseOrderItemEntity}
                                variant={"contained"}
                                color={"primary"}
                            >
                                <Typography>close</Typography>
                            </Button>
                        </Grid>
                    </div>

                )}

                {/* トッピング選択モーダル */}
                <Modal
                    open={modalIsOpen}
                    onClose={() => setIsOpen(false)}>
                    <div className={classes.dialog}>
                        <WrappedSelectTopping selectedSize={props.selectedState.size}
                                              onClickClose={() => setIsOpen(false)}
                                              customRef={selectToppingRef} propTopping={selectedToppings}
                                              onToppingChange={(t) => handleToppingChange(t)}/>
                    </div>
                </Modal>

            </Card>
        </Grid>
    )
};
export default OrderItemEntry;

const orderItemEntryStyleInCart = makeStyles(() => createStyles({

    form_card: {
        width: "100%"
    },
    //タイトル部分のGrid
    title_grid: {
        backgroundColor: THEME_COLOR_2,
        paddingLeft: "3%"
    },
    //タイトルの文字
    title_words: {
        color: "white",
        fontSize: "200%"
    },
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
    left_grid: {
        height: "auto",
        paddingTop: "10%",
        paddingBottom: "10%"
    },
    left_form_attention: {
        textAlign: "center",
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
    // エントリーモーダルを閉じるボタン
    entry_close_btn: {
        height: 60
    },
    //モーダル表示ボタン
    modal_open_button: {
        fontWeight: "bold",
        margin: "5%",
        padding: "3%",
        width: "70%",
        height: "80%"
    },
    //選択済みトッピングカードの外枠
    selected_topping_grid: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "1%"
    },
    //選択済みトッピング表示カード
    selected_topping_card: {
        width: "60%",
        margin: "3%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: THEME_COLOR_1,
    },
    size_form: {
        marginBottom: 20,
        textAlign: "center",
        width: '60%'
    },
    quantity_form: {
        textAlign: "center",
        width: '60%'
    },
    dialog: {
        width: '80%',
        position: 'absolute',
        top: '50%',
        left: '48%',
        transform: "translate(-50%, -50%)"
    },
    entry_right: {}
}));

const orderItemEntryStyle = makeStyles(() => createStyles({
    modal: {},
    //タイトル部分のGrid
    title_grid: {backgroundColor: THEME_COLOR_2, paddingLeft: "3%"},
    //タイトルの文字
    title_words: {color: "white", fontSize: "200%"},
    //タイトル下全体のCard
    form_card: {width: "100%", display: "flex"},
    //Card内左部分全体のGrid
    left_grid: {height: "auto", paddingTop: "10%", paddingBottom: "10%"},
    //サイズと数量の入力部分のGrid
    form_grid: {display: "flex", marginTop: "5%"},
    //サイズ入力
    size_form: {marginTop: "auto"},
    //数量入力
    quantity_form: {marginTop: "5%", width: "30%"},
    //選択済みトッピング表示カード
    //モーダル表示ボタン
    modal_open_button: {
        fontWeight: "bold",
        margin: "5%",
        padding: "3%",
        width: "70%",
        height: "80%"
    },
    //選択済みトッピングカードのGrid
    selected_topping_grid: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "1%"
    },
    //選択済みトッピングカード
    selected_topping_card: {
        width: "60%",
        margin: "3%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: THEME_COLOR_1,

    },
    dialog: {
        height: "100%",
        width: '100%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: "translate(-50%, -50%)"
    },
}));
import React, {useState} from "react";
import {Button, ButtonBase, Card, Grid, Typography} from "@material-ui/core";
import {useSelector} from "react-redux";
import {selectToppings} from "~/store/slices/Domain/topping.slice";
import {Topping} from "~/types/interfaces";
import {createStyles, makeStyles} from "@material-ui/core/styles";

type selectToppingProps = {
    selectedSize: string;
    onClickClose: () => void;
    propTopping: Topping[];
    onToppingChange: (t: Topping[]) => any;
    customRef?: React.Ref<HTMLDivElement>;
}
//第二引数にrefが指定されていると参照を受け取ってしまうためモーダル表示しようとすると警告文が出る
//だから、あくまでrefをpropsの一つとして渡し、後からrefに指定してexportする（それが WrappedSelectTopping）
export const SelectTopping: React.FC<selectToppingProps> = (props) => {

    const toppings = useSelector(selectToppings)
    const [selectedToppings, setSelectedToppings] = useState<Topping[]>(props.propTopping)

    const handleToppingChange = (topping: Topping) => {
        const index = selectedToppings.findIndex(t => t.id === topping.id)
        const newSelected: Topping[] = [...selectedToppings]
        if (index === -1 && selectedToppings.length < 3) newSelected.push(topping);
        if (index !== -1) newSelected.splice(index, 1);
        setSelectedToppings(newSelected);
        if (typeof props.onToppingChange !== "undefined") props.onToppingChange(newSelected)
    };
    const classes = toppingStyles();
    return (
        <Card className={classes.topping_modal}>
            <Grid>
                <Grid item container justify={"center"}>
                    {toppings.map((t) => {
                        return (<Grid item xs={4} className={classes.topping_card} key={`${t.name}${t.id}`}>
                            <ButtonBase onClick={() => handleToppingChange(t)}
                                        style={{width: "70%", height: "95%", color: "red"}}>
                                <Card style={{
                                    width: "100%", height: "100%",
                                    backgroundColor: `${selectedToppings.findIndex(topping => t.id === topping.id) === -1 ? "white" : "#ff9800"}`
                                }}>
                                    <Typography variant={"body1"} color={"primary"}
                                                component={"p"}>
                                        {t.name}<br/>{props.selectedSize === 'M' ? ` M : ${t.priceM}￥` : ` L : ${t.priceL}￥`}
                                    </Typography>
                                </Card>
                            </ButtonBase>
                        </Grid>)
                    })}
                </Grid>
                <Grid item container>
                    <Grid item xs={4}/>
                    <Grid item sm={4} container justify={"center"}>
                        <Button onClick={props.onClickClose} variant={"contained"} color={"primary"}>
                            <Typography>close</Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        ※トッピングは3つまで選択できます
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
};
export const WrappedSelectTopping = React.forwardRef<HTMLDivElement, selectToppingProps>((props, ref) =>
    <SelectTopping selectedSize={props.selectedSize} onClickClose={props.onClickClose} customRef={ref}
                   propTopping={props.propTopping} onToppingChange={props.onToppingChange}/>)

const toppingStyles = makeStyles(() => createStyles({
    topping_modal: {
        width: '100%',
        backgroundColor: "#BBBBBB",
        padding: "2%"
    },
    topping_card: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "0.5%",
        paddingRight: "10"
    }
}));
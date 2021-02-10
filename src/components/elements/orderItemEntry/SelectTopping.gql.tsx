import React, {useState} from "react";
import {Button, ButtonBase, Card, Grid, LinearProgress, Typography} from "@material-ui/core";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {ToppingType as Topping} from "~/generated/graphql";
import {useFetchToppingsQuery} from "~/generated/graphql";
import ErrorPage from "~/components/error";
import {THEME_COLOR_1} from "~/assets/color";

type selectToppingProps = {
    selectedSize: string;
    onClickClose: () => void;
    propTopping: Topping[];
    onToppingChange: (t: Topping[]) => any;
    customRef?: React.Ref<HTMLDivElement>;
}
//第二引数にrefが指定されていると参照を受け取ってしまうためモーダル表示しようとすると警告文が出る
//だから、あくまでrefをpropsの一つとして渡し、後からrefに指定してexportする（それが WrappedSelectTopping）
export const SelectToppingGQL: React.FC<selectToppingProps> = (props) => {

    const {data: toppings, loading: isLoadToppings} = useFetchToppingsQuery()
    const [selectedToppings, setSelectedToppings] = useState<Topping[]>(props.propTopping)

    const handleToppingChange = (topping: Topping) => {
        const index = selectedToppings.findIndex(t => t.id === (topping.id))
        let newSelected: Topping[] = [...selectedToppings]
        if (index === -1 && selectedToppings.length < 3) newSelected.push(topping);
        if (index !== -1) newSelected.splice(index, 1);
        setSelectedToppings(newSelected);
        if (typeof props.onToppingChange !== "undefined") props.onToppingChange(newSelected)
    };
    const classes = toppingStyles();

    if (!toppings) return <ErrorPage code={500}/>

    return (
        isLoadToppings ? <LinearProgress style={{width: "60%", marginTop: "20%", marginLeft: "20%"}}/> :
            <Card className={classes.topping_modal}>
                <Grid item container justify={"center"}>
                    {toppings!.toppings!.edges!.map((t) => {
                        return (<Grid item xs={4} className={classes.topping_card} key={`${t!.node!.id}`}>
                            <ButtonBase onClick={() => handleToppingChange(t!.node!)}
                                        style={{width: "70%", height: "95%", color: "red"}}>
                                <Card style={{
                                    width: "100%", height: "100%",
                                    backgroundColor: `${selectedToppings.findIndex(topping => t!.node!.id === topping.id) === -1 ? "white" : THEME_COLOR_1}`
                                }}>
                                    <Typography variant={"body1"} color={"primary"}
                                                component={"p"}>
                                        {t!.node!.name}<br/>{props.selectedSize === 'M' ? ` M : ${t!.node!.priceM}円` : ` L : ${t!.node!.priceL}円`}
                                    </Typography>
                                </Card>
                            </ButtonBase>
                        </Grid>)
                    })}
                </Grid>
                <Grid item container>
                    <Grid item xs={4}/>
                    <Grid item sm={4} container justify={"center"}>
                        <Button
                            onClick={props.onClickClose}
                            variant={"contained"}
                            color={"primary"}
                            data-testid={"selectTopping-modalButton"}
                        >
                            <Typography>close</Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        ※トッピングは3つまで選択できます
                    </Grid>
                </Grid>
            </Card>
    )
};
export const WrappedSelectToppingGQL = React.forwardRef<HTMLDivElement, selectToppingProps>((props, ref) =>
    <SelectToppingGQL selectedSize={props.selectedSize} onClickClose={props.onClickClose} customRef={ref}
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
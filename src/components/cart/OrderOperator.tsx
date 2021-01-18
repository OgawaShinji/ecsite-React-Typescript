import {FC, useEffect} from "react";
import {Button, Card, CardActionArea, CardActions, CardContent, makeStyles} from "@material-ui/core";

interface Props {
    subTotalPrice: number
}

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    btn: {
        margin: 'auto'
    }
});

const OrderOperator: FC<Props> = (props) => {

    const classes = useStyles();

    useEffect(() => {
        // console.log(props.subTotalPrice)
    })

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                    合計金額：2000
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" className={classes.btn}>
                    注文する
                </Button>
            </CardActions>
            <CardActions className={classes.btn}>
                <Button size="small" color="primary" className={classes.btn}>
                    カートを空にする
                </Button>
                <Button size="small" color="primary" className={classes.btn}>
                    買い物を続ける
                </Button>
            </CardActions>
        </Card>
    )
}
export default OrderOperator;
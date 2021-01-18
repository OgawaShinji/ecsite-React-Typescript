import {FC, useEffect} from "react";
import {useDispatch} from "react-redux";
import {OrderItem} from "~/types/interfaces"
import {
    Button,
    ButtonBase,
    Card,
    CardActions,
    createStyles,
    Grid,
    ListItem,
    makeStyles,
    Theme,
    Typography
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            width: 700,
        },
        image: {
            width: 128,
            height: 128,
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        },
        btn: {
            "margin-right": 40,
            "margin-left": 40
        }
    }),
);

interface Props {
    orderItem: OrderItem
    index: number
    setOrderItems: ({orderItem, index}: { orderItem?: OrderItem, index: number }) => void
}

const CartItem: FC<Props> = (props) => {
    const dispatch = useDispatch()
    const classes = useStyles();
    const {orderItem, index, setOrderItems} = props

    useEffect(() => {
        // orderItem.name='fff'
        // dispatch(setOrderItemsAndSubTotalPrice())
        // if (orderItem) {
        //     setOrderItems({orderItem, index})
        // }
    })

    useEffect(() => {

    })


    return (
        <ListItem>
            <Card className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg"/>
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={6} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="h6">
                                    {orderItem.item.name}
                                </Typography>
                                <Grid item container alignItems="center" justify="center">
                                    <Grid item xs={6}>
                                        <Typography
                                            gutterBottom>価格：{orderItem.size === 'M' ? orderItem.item.priceM : orderItem.item.priceL}</Typography>
                                        <Typography gutterBottom>サイズ：{orderItem.size}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <ul>
                                            {orderItem.orderToppings?.map(orderTopping => (
                                                <li>{orderTopping.topping.name}</li>
                                            ))}
                                        </ul>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <CardActions>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        className={classes.btn}
                                        onClick={() => setOrderItems({orderItem, index})}
                                    >削除</Button>
                                    <Button variant="outlined" color="primary" className={classes.btn}>編集</Button>
                                </CardActions>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} container alignItems="center">
                        <Typography variant="subtitle1">
                            {orderItem.quantity + '個'}
                        </Typography>
                        <Typography variant='h6'>
                            {orderItem.subTotalPrice + '円'}
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
        </ListItem>
    )
}
export default CartItem;
import React, {FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {OrderItem, OrderTopping, Topping} from "~/types/interfaces"
import OrderItemEntry, {itemEntryState} from "~/components/elements/orderItemEntry/orderItemEntry";
import {fetchToppings, selectToppings} from "~/store/slices/Domain/topping.slice";
import {
    Box,
    Button,
    ButtonBase,
    Card,
    CardActions,
    createStyles,
    Divider,
    Grid,
    ListItem,
    makeStyles,
    Modal, Paper,
    Theme,
    Typography
} from "@material-ui/core";


interface Props {
    orderItem: OrderItem
    index: number
    updateOrderItems: ({orderItem, index}: { orderItem: OrderItem, index: number }) => void
    deleteOrderItem: (orderItemId: number) => void
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            padding: theme.spacing(2),
            margin: 'auto',
            width: 700,
            maxHeight: 200
        },
        image: {
            width: 150,
            height: 150,
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
        },
        modal:{

        },
        dialog:{
            width:'70%',
            position: 'absolute',
            top:'50%',
            left:'50%',
            transform: "translate(-50%, -50%)"
        }
    }),
);


const CartItem: FC<Props> = (props) => {

    const dispatch = useDispatch()
    const classes = useStyles();
    const {orderItem, index, updateOrderItems, deleteOrderItem} = props

    const toppings: Topping[] = useSelector(selectToppings)
    const [modalIsOpen, setIsOpen] = useState<boolean>(false)

    const selectedTopping: Topping[] = []
    orderItem.orderToppings?.map(orderTopping => {
        selectedTopping.push(orderTopping.topping)
    })

    const selectedState: itemEntryState = {
        size: orderItem.size,
        quantity: orderItem.quantity,
        toppings: selectedTopping
    }

    // 初期表示
    useEffect(() => {
        if (toppings.length === 0) dispatch(fetchToppings())
    })

    /**
     * OrderItemEntryのダイアログを非表示にする関数
     */
    const onClickCloseOrderItemEntry = () => {
        setIsOpen(false)
    }

    /**
     * 商品のサイズを変更する関数
     * @Params inputSize: string
     */
    const handleSizeChange = (inputSize: string) => {
        const changedOrderItem = {...orderItem, size: inputSize}
        updateOrderItems({orderItem: changedOrderItem, index: index})
    }

    /**
     * 商品の数量を変更する関数
     * @Params inputQuantity: string
     */
    const handleQuantityChange = (inputQuantity: number) => {
        const changedOrderItem = {...orderItem, quantity: inputQuantity}
        updateOrderItems({orderItem: changedOrderItem, index: index})
    }

    /**
     * 商品のトッピングを変更する関数
     * @Params inputSize: string
     */
    const handleToppingChange = (toppings: Topping[]) => {
        // setSelectToppings(toppings)
        const newOrderToppings: OrderTopping[] = []
        toppings.map(topping => {
            const changedOrderTopping: OrderTopping = {topping: topping}
            newOrderToppings.push(changedOrderTopping)
        })
        const changedOrderItem = {...orderItem, orderToppings: newOrderToppings}
        updateOrderItems({orderItem: changedOrderItem, index: index})
    }


    return (
        <ListItem>
            <Card className={classes.root}>
                <Grid container spacing={2}>
                    {/*image*/}
                    <Grid item xs={3} container justify={"center"} alignItems={"center"}>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={orderItem.item.imagePath}/>
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={6} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item container>
                                <Grid item xs={1}/>
                                <Grid item xs={11}>
                                    <Typography gutterBottom variant="h6">
                                        <Box fontWeight="fontWeightBold">
                                            {orderItem.item.name}
                                        </Box>
                                    </Typography>
                                    <Divider/>
                                </Grid>
                            </Grid>
                            <Grid item container>
                                <Grid item xs={1}/>
                                <Grid item xs={5}>
                                    <Typography
                                        gutterBottom
                                    >
                                        価格
                                        ：{orderItem.size === 'M' ? orderItem.item.priceM.toLocaleString() : orderItem.item.priceL.toLocaleString()}円</Typography>
                                    <Typography gutterBottom>サイズ： {orderItem.size}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <ul>
                                        {orderItem.orderToppings?.map((orderTopping, index) => (
                                            <li key={index}>{orderTopping.topping.name}</li>
                                        ))}
                                    </ul>
                                </Grid>
                            </Grid>
                            <Grid item xs container>
                                <Grid item xs={1}/>
                                <Grid item xs={11}>
                                    <CardActions>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            className={classes.btn}
                                            onClick={() => deleteOrderItem(orderItem.id!)}
                                        >削除</Button>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            className={classes.btn}
                                            onClick={() => setIsOpen(true)}
                                        >注文内容を変更</Button>
                                    </CardActions>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} container alignItems="center">
                        <Grid item xs={5}>
                            <Typography variant="subtitle1">
                                {orderItem.quantity + '個'}
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant='h5'>
                                <Box fontWeight="fontWeightBold">
                                    {orderItem.subTotalPrice!.toLocaleString() + '円'}
                                </Box>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
            <Modal
                className={classes.modal}
                open={modalIsOpen}
                onClose={() => setIsOpen(false)}
            >
                <Paper className={classes.dialog}>
                    <OrderItemEntry
                        selectedState={selectedState}
                        parentComponent={"CartItem"}
                        onSizeChange={handleSizeChange}
                        onQuantityChange={handleQuantityChange}
                        onToppingChange={(t) => handleToppingChange(t)}
                        onClickCloseOrderItemEntity={onClickCloseOrderItemEntry}
                    />
                </Paper>
            </Modal>
        </ListItem>
    );
}
export default CartItem;
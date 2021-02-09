import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {OrderItem, OrderTopping, Topping} from "~/types/interfaces"
import OrderItemEntry, {itemEntryState} from "~/components/elements/orderItemEntry/OrderItemEntry";
import {fetchToppings, selectToppings} from "~/store/slices/Domain/topping.slice";
import {useHistory} from "react-router-dom";
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
    Modal,
    Theme,
    Typography
} from "@material-ui/core";
import {AppDispatch} from "~/store";
import {setError} from "~/store/slices/App/error.slice";

interface Props {
    orderItem: OrderItem
    index: number
    updateOrderItems: ({orderItem}: { orderItem: OrderItem }) => void
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
        modal: {},
        dialog: {
            width: '40%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: "translate(-50%, -50%)"
        }
    }),
);

const CartItem: React.FC<Props> = (props) => {

    const dispatch: AppDispatch = useDispatch()
    const history = useHistory();
    const classes = useStyles();
    const {orderItem, updateOrderItems, deleteOrderItem} = props

    const toppings: Topping[] = useSelector(selectToppings)
    const [modalIsOpen, setIsOpen] = useState<boolean>(false)

    // OrderItemEntryで受け渡す変数を定義
    const selectedTopping: Topping[] = []
    orderItem.orderToppings?.forEach(orderTopping => selectedTopping.push(orderTopping.topping))
    const selectedState: itemEntryState = {
        size: orderItem.size,
        quantity: orderItem.quantity,
        toppings: selectedTopping
    }

    // 初期表示
    useEffect(() => {
        if (toppings.length === 0) dispatch(fetchToppings()).catch((e) => {
            dispatch(setError({isError: true, code: e.message}))
        })
    }, [dispatch, toppings])

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
        updateOrderItems({orderItem: changedOrderItem})
    }

    /**
     * 商品の数量を変更する関数
     * @Params inputQuantity: string
     */
    const handleQuantityChange = (inputQuantity: number) => {
        const changedOrderItem = {...orderItem, quantity: inputQuantity}
        updateOrderItems({orderItem: changedOrderItem})
    }

    /**
     * 商品のトッピングを変更する関数
     * @Params toppings: Topping[]
     */
    const handleToppingChange = (toppings: Topping[]) => {
        // setSelectToppings(toppings)
        const newOrderToppings: OrderTopping[] = []
        toppings.forEach(topping => {
            const changedOrderTopping: OrderTopping = {topping: topping}
            newOrderToppings.push(changedOrderTopping)
        })
        const changedOrderItem = {...orderItem, orderToppings: newOrderToppings}
        updateOrderItems({orderItem: changedOrderItem})
    }

    const toItemDetail = () => {
        history.push(`/itemDetail/${props.orderItem.item.id}`)
    }


    return (
        <ListItem>
            <Card className={classes.root}>
                <Grid container spacing={2}>
                    {/*image*/}
                    <Grid item xs={3} container justify={"center"} alignItems={"center"}>
                        <ButtonBase className={classes.image} onClick={toItemDetail}>
                            <img className={classes.img} alt={`image${props.index}`} src={orderItem.item.imagePath}/>
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={6} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item container>
                                <Grid item xs={1}/>
                                <Grid item xs={11}>
                                    <ButtonBase onClick={toItemDetail}>
                                        <Typography gutterBottom variant="h6">
                                            <Box fontWeight="fontWeightBold">
                                                {orderItem.item.name}
                                            </Box>
                                        </Typography>
                                    </ButtonBase>
                                    <Divider/>
                                </Grid>
                            </Grid>
                            <Grid item container>
                                <Grid item xs={1}/>
                                <Grid item xs={5}>
                                    <Typography gutterBottom>
                                        価格
                                        ：{orderItem.size === 'M' ? orderItem.item.priceM.toLocaleString() : orderItem.item.priceL.toLocaleString()}円</Typography>
                                    <Typography gutterBottom>
                                        サイズ： {orderItem.size}
                                    </Typography>
                                    <Typography gutterBottom>
                                        個数 ： {orderItem.quantity + '個'}
                                    </Typography>
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
                                            data-testid={`deleteButton${props.index}`}

                                        >
                                            削除
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            className={classes.btn}
                                            onClick={() => setIsOpen(true)}
                                            data-testid={`updateButton${props.index}`}
                                        >
                                            注文内容を変更
                                        </Button>
                                    </CardActions>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} container alignItems="center">
                        <Grid item xs={2}/>
                        <Grid item xs={10}>
                            <Typography variant='h5'>
                                <Box fontWeight="fontWeightBold">
                                    小計：{orderItem.subTotalPrice!.toLocaleString() + '円'}
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
                <div className={classes.dialog}>
                    <OrderItemEntry
                        selectedState={selectedState}
                        parentComponent={"CartItem"}
                        onSizeChange={handleSizeChange}
                        onQuantityChange={handleQuantityChange}
                        onToppingChange={(t) => handleToppingChange(t)}
                        onClickCloseOrderItemEntity={onClickCloseOrderItemEntry}
                    />
                </div>
            </Modal>
        </ListItem>
    );
}
export default CartItem;
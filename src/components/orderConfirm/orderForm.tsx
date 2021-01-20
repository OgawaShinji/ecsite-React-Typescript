import React from "react";
import {Button, createStyles, Grid, makeStyles, Paper, Theme, Typography} from "@material-ui/core";
import TotalPrice from "~/components/elements/totalPrice";
import {useSelector} from "react-redux";
import {selectOrderSubTotalPrice} from "~/store/slices/Domain/order.slice";
import {User} from "~/types/interfaces";
import ShippingDialog from "~/components/orderConfirm/shippingDialog";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

type Props = {
    user: null | User
}

const OrderForm: React.FC<Props> = (props) => {
    //注文内容の小計を取得
    const orderSubTotalPrice = useSelector(selectOrderSubTotalPrice);
    //お届け先住所の変更フォームを非表示にセット
    const [open, setOpen] = React.useState(false);
    //デフォルトのユーザー情報をセット
    const [userInfo, setUserInfo] = React.useState<User | null>(props.user)
    //デフォルトの配達日時をセット
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date('2021-01-01T00:00:00'),
    );

    /**
     * [変更]ボタン押下時の処理 お届け先情報変更用フォームダイアログを表示
     */
    const handleDialogOpen = () => {
        setOpen(true);
    };

    /**
     * [閉じる]ボタン押下時の処理 お届け先情報変更用フォームダイアログを非表示
     */
    const handleClose = () => {
        setOpen(false);
    };

    /**
     * [変更する]ボタン押下時の処理 お届け先情報を変更用フォームに入力された内容に変更
     */
    const changeUserInfo = (changeUserInfo: User) => {
        setUserInfo(changeUserInfo)
    }

    /**
     * 配達日時選択中の処理 動的に日付の内容を更新
     */
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };


    /**
     * [この内容で注文する]ボタン押下時の処理  保留中
     */
    // const dispatch = useDispatch();
    const handleOrder = () => {
        // const date = new Date();
        setSelectedDate(selectedDate);
        // const consumptionTax = orderSubTotalPrice * 0.1
        // const totalPrice = orderSubTotalPrice + consumptionTax
        // const order = {
        //     status:1,
        //     totalPrice: totalPrice,
        //     order_data: date,
        //     destination_name: props.user?.name,
        //     destination_email: props.user?.email,
        //     destination_zipcode: props.user?.zipcode,
        //     destination_address: props.user?.address,
        //     destination_tel: props.user?.telephone,
        //     delivery_time: selectedDate,
        //     payment_method: 2
        // }
        // dispatch(postOrder(order))
    }

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                flexGrow: 1,
            },
            paper: {
                padding: theme.spacing(2),
                textAlign: 'center',
                color: theme.palette.text.secondary,
                height:215
            },
            paper2: {
                padding: theme.spacing(2),
                textAlign: 'center',
                color: theme.palette.text.secondary,
                height:145
            }
        }),
    );
    const classes = useStyles();

    return (
        <>
            <div className={classes.root}>
                <Grid container spacing={3} justify="center" alignItems="center"   >
                    <Grid item xs={6} sm={6}>
                        <Paper className={classes.paper}>
                            <Grid item xs={6} sm={11}>
                                <Grid container spacing={1} justify="center" alignItems="center">
                                    <Grid item xs={6} sm={4}>
                                        <Typography component="h6" variant="h6" align="left" >お届け先住所</Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={8}>
                                       <Button variant="contained"
                                               color="primary"
                                               fullWidth
                                               onClick={handleDialogOpen}
                                       >変更</Button>
                                        {/*お届け先情報変更用フォームのダイアログ*/}
                                        <ShippingDialog open={open} close={handleClose} changeUserInfo={changeUserInfo} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} justify="center" alignItems="center">
                                <Grid item xs={6} sm={11}>
                                    <Typography align="left">お名前: {userInfo?.name}　</Typography>
                                    <Typography align="left">郵便番号:　{userInfo?.zipcode}　</Typography>
                                    <Typography align="left">住所: {userInfo?.address}　</Typography>
                                    <Typography align="left">電話番号:　{userInfo?.telephone}　</Typography>
                                </Grid>
                            </Grid>
                            <br/>
                            <Grid item xs={6} sm={11}>
                                <Grid container spacing={3} justify="center" alignItems="center">
                                    <Grid item xs={6}>
                                        <Typography component="h6" variant="h6" align="left" >配送日時</Typography>
                                    </Grid>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid  item xs={3}>
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="date-picker-dialog"
                                                label="Date picker dialog"
                                                format="yyyy/MM/dd"
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <KeyboardTimePicker
                                                margin="normal"
                                                id="time-picker"
                                                label="Time picker"
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change time',
                                                }}
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                        <Paper className={classes.paper2}>
                            {/*合計金額表示用コンポーネント*/}
                            <TotalPrice subTotalPrice={orderSubTotalPrice}/>
                        </Paper>
                        <br/>
                        <Button variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleOrder}
                        >この内容で注文する</Button>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default OrderForm


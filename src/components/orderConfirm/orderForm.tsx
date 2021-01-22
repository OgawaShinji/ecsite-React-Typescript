import React, {useEffect} from "react";
import {Button, Checkbox, createStyles, Grid, makeStyles, Paper, Theme, Typography} from "@material-ui/core";
import TotalPrice from "~/components/elements/totalPrice/totalPrice";
import {useDispatch, useSelector} from "react-redux";
import {postOrder, selectOrderSubTotalPrice} from "~/store/slices/Domain/order.slice";
import {User} from "~/types/interfaces";
import ShippingDialog from "~/components/orderConfirm/shippingDialog";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {Path} from "~/router/routes";
import {useHistory} from "react-router-dom";

type Props = {
    user: null | User
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        orderFormPaper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
        },
        totalPricePaper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
        },
        color: {
            backgroundColor: "#ffa500",
            color: "white"
        },
        pad: {
            padding: theme.spacing(2)
        }
    }),
);

const OrderForm: React.FC<Props> = (props) => {

    const dispatch = useDispatch();
    const routeHistory = useHistory();

    useEffect( () => {
        setUserInfo(props.user)
    }, [dispatch,props.user])

    //注文内容の小計を取得
    const orderSubTotalPrice = useSelector(selectOrderSubTotalPrice);
    //お届け先住所の変更フォームを非表示にセット
    const [open, setOpen] = React.useState(false);
    //デフォルトのユーザー情報をセット
    const [userInfo, setUserInfo] = React.useState<User | null>(props.user)
    //デフォルトの配達日時をセット
    const [selectedDate, setSelectedDate] = React.useState<{ date: Date | null, errorMessage: string}>({
        date: null,
        errorMessage: ''
    });
    //デフォルトのお支払方法をセット
    const [checkedCash, setCheckedCash] = React.useState(true);
    const [checkedCredit, setCheckedCredit] = React.useState(false);


    //[変更]ボタン押下時の処理 お届け先情報変更用フォームダイアログを表示
    const handleDialogOpen = () => {
        setOpen(true);
    };
    //[閉じる]ボタン押下時の処理 お届け先情報変更用フォームダイアログを非表示
    const handleClose = () => {
        setOpen(false);
    };
    //[変更する]ボタン押下時の処理 お届け先情報を変更用フォームに入力された内容に変更
    const changeUserInfo = (changeUserInfo: User) => {
        setUserInfo(changeUserInfo)
    }
    //[クレジットカード決済]チェック時の処理 お支払方法をクレジットカード決済に変更
    const handleChangePaymentCash = () => {
        setCheckedCash(!checkedCash);
        if(checkedCredit){
            setCheckedCredit(false)
        }
    };
    //[代金引換]チェック時の処理 お支払方法を代金引換に変更
    const handleChangePaymentCredit = () => {
        setCheckedCredit(!checkedCredit);
        if(checkedCash){
            setCheckedCash(false)
        }
    };
    //配送日時のバリデーションチェック
    const deliveryDateValidation = (date: Date | null): string => {
        if(date){
            const orderDate = new Date();
            if (orderDate > date) {
                return '現在時刻よりも後を選んでください'
            } else{
                return ''
            }
        } else {
            return ''
        }
    }
    //配達日時選択中の処理 動的に日付の内容を更新
    const handleDateChange = (date: Date | null ) => {
        setSelectedDate({
            date: date,
            errorMessage: deliveryDateValidation(date)
        })
    };
    //[この内容で注文する]ボタン押下時の処理　
    const handleOrder = async () => {
        if(selectedDate.errorMessage.length === 0){
            const date = new Date();
            if(selectedDate.date){
                selectedDate?.date.setHours(selectedDate?.date.getHours() + 9)
            }
            const consumptionTax = orderSubTotalPrice * 0.1
            const totalPrice = orderSubTotalPrice + consumptionTax
            let paymentMethod;
            if( checkedCash ){
                paymentMethod = 1;
            } else if( checkedCredit ) {
                paymentMethod = 2;
            } else {
                paymentMethod = 0;
            }
            const order = {
                status:1,
                totalPrice: totalPrice,
                order_data: date,
                destination_name: userInfo?.name,
                destination_email: userInfo?.email,
                destination_zipcode: userInfo?.zipcode,
                destination_address: userInfo?.address,
                destination_tel: userInfo?.telephone,
                delivery_time: selectedDate,
                payment_method: paymentMethod
            }
            dispatch(postOrder(order));
            await routeHistory.push({pathname: Path.orderComplete, state: {judge: true}});
        }
    }

    const classes = useStyles();

    return (
        <>
            <div className={classes.root}>
                <Grid container spacing={3} justify="center" alignItems="center"   >
                    <Grid item xs={6} sm={7}>
                        <Paper className={classes.orderFormPaper}>
                            <Grid item xs={6} sm={11}>
                                <Grid container spacing={1}  alignItems="center">
                                    <Grid item xs={6} sm={3}>
                                        <Typography component="h6" variant="h6" align="left" >お届け先住所</Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={2}>
                                       <Button variant="contained"
                                               className={classes.color}
                                               onClick={handleDialogOpen}
                                               size={"small"}
                                       >変更</Button>
                                        {/*お届け先情報変更用フォームのダイアログ*/}
                                        <ShippingDialog open={open} close={handleClose} changeUserInfo={changeUserInfo} />
                                    </Grid>
                                    <Grid item xs={6} sm={7}>
                                       <Typography component="h6" variant="h6" align={"center"}>お支払情報</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} justify="center" alignItems="center">
                                <Grid item xs={6} sm={7}>
                                    <br/>
                                    <Typography align="left" variant={"subtitle2"}>お名前: {userInfo?.name}　</Typography>
                                    <Typography align="left" variant={"subtitle2"}>郵便番号:　{userInfo?.zipcode}　</Typography>
                                    <Typography align="left" variant={"subtitle2"}>住所: {userInfo?.address}　</Typography>
                                    <Typography align="left" variant={"subtitle2"}>電話番号:　{userInfo?.telephone}　</Typography>
                                </Grid>
                                <Grid item xs={6} sm={5}>
                                    <Grid item xs={6} sm={12} >
                                        代金引換
                                        <Checkbox
                                            color="default"
                                            checked={checkedCash}
                                            onChange={handleChangePaymentCash}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={12}>
                                        クレジットカード決済
                                        <Checkbox
                                            color="default"
                                            checked={checkedCredit}
                                            onChange={handleChangePaymentCredit}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <br/>
                            <Grid item xs={6} sm={11}>
                                <Grid container spacing={3}  alignItems="center">
                                    <Grid item xs={2}>
                                        <Typography component="h6" variant="h6" align="left">配送日時</Typography>
                                    </Grid>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid  item xs={3}>
                                            <KeyboardDatePicker
                                                id="date-picker-dialog"
                                                label="配送日"
                                                format="yyyy/MM/dd"
                                                value={selectedDate.date}
                                                onChange={handleDateChange}
                                                error={selectedDate.errorMessage.length > 0}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <KeyboardTimePicker
                                                id="time-picker"
                                                label="配送時間"
                                                value={selectedDate.date}
                                                onChange={handleDateChange}
                                                error={selectedDate.errorMessage.length > 0}
                                            />
                                        </Grid>
                                        <Grid>
                                            <Typography variant={"subtitle2"} style={{color: 'red'}}>{selectedDate.errorMessage}</Typography>
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                        <Paper className={classes.totalPricePaper}>
                            {/*合計金額表示用コンポーネント*/}
                            <TotalPrice subTotalPrice={orderSubTotalPrice}/>
                        </Paper>
                        <br/>
                        <Button variant="contained"
                                fullWidth
                                onClick={handleOrder}
                                className={classes.color}
                                disabled={selectedDate.errorMessage.length > 0}
                        >この内容で注文する</Button>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}
export default OrderForm


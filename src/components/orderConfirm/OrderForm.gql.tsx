import React, {useEffect} from "react";
import {
    Box,
    Button,
    Checkbox,
    createStyles,
    Grid,
    InputLabel,
    LinearProgress,
    makeStyles,
    MenuItem,
    Paper,
    Select,
    Theme,
    Typography
} from "@material-ui/core";
import TotalPrice from "~/components/elements/totalPrice/totalPrice";
import {useDispatch} from "react-redux";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {Path} from "~/router/routes";
import {useHistory} from "react-router-dom";
import {AppDispatch} from "~/store";
import {THEME_COLOR_2} from "~/assets/color";
import {FetchUserQuery, useOrderMutation} from "~/generated/graphql";
import ErrorPage from "~/components/error";
import ShippingDialogGQL from "~/components/orderConfirm/shippingDialog.gql";


type Props = {
    user: FetchUserQuery,
    orderSubTotalPrice: number
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
        orderButton: {
            backgroundColor: "#3cb371",
            '&:hover': {
                backgroundColor: '#3cb371',
            },
            color: "white"
        },
        changeButton: {
            backgroundColor: THEME_COLOR_2,
            '&:hover': {
                backgroundColor: THEME_COLOR_2,
            },
            color: "white"
        },
        pad: {
            padding: theme.spacing(2)
        },
        typoGraphColor: {
            color: "black"
        }
    }),
);

const OrderFormGQL: React.FC<Props> = (props) => {

    const dispatch: AppDispatch = useDispatch();
    const routeHistory = useHistory();

    //配送時間（○○時）
    const hourOption: string[] = [
        '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'
    ];
    //配送時間（○○分）
    const minutesOption = [
        '00', '10', '20', '30', '40', '50'
    ]

    //お届け先住所の変更フォームを非表示にセット
    const [open, setOpen] = React.useState(false);
    //デフォルトのユーザー情報をセット
    const [userInfo, setUserInfo] = React.useState<FetchUserQuery>(props.user)
    //デフォルトの配達日時をセット
    const [selectedDate, setSelectedDate] = React.useState<{ date: Date | null, errorMessage: string }>({
        date: new Date(),
        errorMessage: ''
    });
    //デフォルトのお支払方法をセット
    const [checkedCash, setCheckedCash] = React.useState(true);
    const [checkedCredit, setCheckedCredit] = React.useState(false);
    //デフォルトの配送時間をセット
    const [deliveryHour, setDeliveryHour] = React.useState<string>(String(new Date().getHours() + 2));
    const [deliveryMinutes, setDeliveryMinutes] = React.useState<string>("00");


    useEffect(() => {
        setUserInfo(userInfo)
        if (selectedDate.date) {
            selectedDate.date?.setDate(selectedDate.date.getDate());
            selectedDate.date?.setHours(Number(deliveryHour));
            selectedDate.date?.setMinutes(Number(deliveryMinutes));
            selectedDate.date?.setSeconds(Number("00"));
            selectedDate.date?.setMilliseconds(Number("00"));
            selectedDate.errorMessage = deliveryDateValidation(selectedDate.date);
        }
    }, [dispatch, selectedDate, deliveryHour, deliveryMinutes, userInfo])


    //[変更]ボタン押下時の処理 お届け先情報変更用フォームダイアログを表示
    const handleDialogOpen = () => {
        setOpen(true);
    };
    //[閉じる]ボタン押下時の処理 お届け先情報変更用フォームダイアログを非表示
    const handleClose = () => {
        setOpen(false);
    };
    //[変更する]ボタン押下時の処理 お届け先情報を変更用フォームに入力された内容に変更
    const changeUserInfo = (changeUserInfo: FetchUserQuery) => {
        setUserInfo(changeUserInfo)
    }
    //[クレジットカード決済]チェック時の処理 お支払方法をクレジットカード決済に変更
    const handleChangePaymentCash = () => {
        setCheckedCash(!checkedCash);
        if (checkedCredit) {
            setCheckedCredit(false)
        }
    };
    //[代金引換]チェック時の処理 お支払方法を代金引換に変更
    const handleChangePaymentCredit = () => {
        setCheckedCredit(!checkedCredit);
        if (checkedCash) {
            setCheckedCash(false)
        }
    };
    //配達日時選択中の処理 動的に日付の内容を更新
    const handleDateChange = (date: Date | null) => {
        if (date) {
            date.setHours(Number(deliveryHour));
            date.setMinutes(Number(deliveryMinutes));
        }
        setSelectedDate({
            date: date,
            errorMessage: deliveryDateValidation(date)
        })
    };
    //配送時間選択中の処理　動的に時間を更新
    const handleDeliveryHour = async (event: React.ChangeEvent<{ value: unknown }>) => {
        setDeliveryHour(event.target.value as string);
        selectedDate.date?.setHours(event.target.value as number);
        await setSelectedDate({
            date: selectedDate.date,
            errorMessage: deliveryDateValidation(selectedDate.date)
        })
    }
    //配送時間選択中の処理　動的に分を更新
    const handleDeliveryMinutes = async (event: React.ChangeEvent<{ value: unknown }>) => {
        setDeliveryMinutes(event.target.value as string);
        selectedDate.date?.setMinutes(event.target.value as number);
        await setSelectedDate({
            date: selectedDate.date,
            errorMessage: deliveryDateValidation(selectedDate.date)
        })
    }

    // 日付をYYYY-MM-DDの書式で返す
    function formatDate(date: Date | null) {
        if (date) {
            let year = date.getFullYear();
            let month = ('00' + (date.getMonth() + 1)).slice(-2);
            let day = ('00' + date.getDate()).slice(-2);
            return (year + '-' + month + '-' + day);
        }
    }

    //配送日時のバリデーションチェック
    const deliveryDateValidation = (date: Date | null): string => {
        if (date) {
            const orderDate = new Date();
            if (orderDate > date) {
                return '現在時刻よりも後を選んでください'
            } else {
                return ''
            }
        } else {
            return ''
        }
    }
    const classes = useStyles();

    //検証サーバーにデータを送る
    const [executeOrderMutation, {loading: executeOrderLoading, error: executeOrderError}] = useOrderMutation()
    const handleClick = async () => {
        let paymentMethod;
        let status;
        if (checkedCash) {
            paymentMethod = 1;
            status = 1;
        } else if (checkedCredit) {
            paymentMethod = 2;
            status = 2;
        } else {
            paymentMethod = 1;
            status = 1;
        }
        const orderInfo = {
            status: status,
            orderDate: formatDate(new Date()),
            destinationName: userInfo?.user!.name!,
            destinationEmail: userInfo?.user!.email!,
            destinationZipcode: userInfo?.user!.zipcode!,
            destinationAddress: userInfo?.user!.address!,
            destinationTel: userInfo?.user!.telephone!,
            deliveryTime: selectedDate.date!,
            paymentMethod: paymentMethod!
        }
        //入力されたしたお届け先情報を引数にセット
        await executeOrderMutation({variables: {order: orderInfo!}}).then(() => {
            //送られたデータはモックサーバーのファイルで確認できる
            routeHistory.push({pathname: Path.orderComplete, state: {judge: true}});
        }).catch(() => {
            // console.log(e)
        })
    }

    // エラーハンドリング
    if (executeOrderError) {
        const code = executeOrderError.graphQLErrors[0].extensions?.code;
        return <ErrorPage code={code}/>
    }

    return (executeOrderLoading ? (<LinearProgress style={{width: "60%", marginTop: "20%", marginLeft: "20%"}}/>) : (
        <div>
            <div className={classes.root}>
                <Grid container spacing={3} justify="center" alignItems="center">
                    <Grid item xs={6} sm={7}>
                        <Paper className={classes.orderFormPaper}>
                            <Grid item xs={6} sm={11}>
                                <Grid container spacing={1} alignItems="center">
                                    <Grid item xs={6} sm={3}>
                                        <Typography component="h6" variant="h5" align="left"
                                                    className={classes.typoGraphColor}>
                                            <Box fontWeight="fontWeightBold">
                                                お届け先情報
                                            </Box>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={2}>
                                        <Button variant="contained"
                                                className={classes.changeButton}
                                                onClick={handleDialogOpen}
                                                size={"small"}
                                        >変更</Button>
                                        {/*お届け先情報変更用フォームのダイアログ*/}
                                        <ShippingDialogGQL open={open} userInfo={userInfo} close={handleClose}
                                                           changeUserInfo={changeUserInfo}/>
                                    </Grid>
                                    <Grid item xs={6} sm={7}>
                                        <Typography component="h6" variant="h5" align={"center"}
                                                    className={classes.typoGraphColor}>
                                            <Box fontWeight="fontWeightBold">
                                                お支払方法
                                            </Box>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} justify="center" alignItems="center">
                                <Grid item xs={6} sm={7}>
                                    <br/>
                                    <Typography align="left" variant={"subtitle2"}
                                                style={{color: "black"}}>お名前: {userInfo?.user!.name} </Typography>
                                    <Typography align="left" variant={"subtitle2"} style={{color: "black"}}>
                                        郵便番号: {userInfo?.user!.zipcode!.substr(0, 3)}-{userInfo?.user!.zipcode!.substr(3, 4)}
                                    </Typography>
                                    <Typography align="left" variant={"subtitle2"}
                                                style={{color: "black"}}>住所: {userInfo?.user!.address} </Typography>
                                    <Typography align="left" variant={"subtitle2"}
                                                style={{color: "black"}}>電話番号: {userInfo?.user!.telephone} </Typography>
                                </Grid>
                                <Grid item xs={6} sm={5}>
                                    <Grid container alignItems={"center"}>
                                        <Grid item xs={2}>
                                            <Checkbox
                                                color="default"
                                                checked={checkedCash}
                                                onChange={handleChangePaymentCash}
                                            />

                                        </Grid>
                                        <Grid item xs={10}>
                                            <Typography style={{color: "black"}}>代金引換</Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Checkbox
                                                color="default"
                                                checked={checkedCredit}
                                                onChange={handleChangePaymentCredit}
                                            />
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Typography style={{color: "black"}}>クレジットカード決済</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <br/>
                            <Grid item xs={6} sm={11}>
                                <Grid container spacing={3} alignItems="center">
                                    <Grid item xs={2}>
                                        <Typography component="h6" variant="h5" align="left"
                                                    className={classes.typoGraphColor}>
                                            <Box fontWeight="fontWeightBold">
                                                配送日時
                                            </Box>
                                        </Typography>
                                    </Grid>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid item xs={3}>
                                            <KeyboardDatePicker
                                                id="date-picker-dialog"
                                                label="配送日"
                                                format="yyyy/MM/dd"
                                                //20時,21時に描画された場合、１日後にセット
                                                value={deliveryHour === "22" || deliveryHour === "23" ?
                                                    selectedDate.date?.setDate(selectedDate.date?.getDate() + 1) : selectedDate.date}
                                                onChange={handleDateChange}
                                                error={selectedDate.errorMessage.length > 0}
                                            />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <InputLabel htmlFor="age-native-simple">時</InputLabel>
                                            <Select onChange={handleDeliveryHour}
                                                //セットされた時間がオプションに含まれていない場合、デフォルトで正午にセット
                                                    value={hourOption.includes(deliveryHour) ? deliveryHour : '12'}
                                                    error={selectedDate.errorMessage.length > 0}
                                            >
                                                {hourOption.map((hour: string, index: number) => (
                                                    <MenuItem key={index} value={hour}>
                                                        {hour}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <InputLabel htmlFor="age-native-simple">分</InputLabel>
                                            <Select onChange={handleDeliveryMinutes}
                                                    value={deliveryMinutes ? deliveryMinutes : ''}
                                                    error={selectedDate.errorMessage.length > 0}
                                            >
                                                {minutesOption.map((minute: string, index: number) => (
                                                    <MenuItem key={index} value={minute}>
                                                        {minute}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant={"subtitle2"} align={"center"}
                                                        style={{color: 'red'}}>{selectedDate.errorMessage}</Typography>
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                        <Paper className={classes.totalPricePaper}>
                            {/*合計金額表示用コンポーネント*/}
                            <TotalPrice subTotalPrice={props.orderSubTotalPrice}/>
                        </Paper>
                        <br/>
                        <Button variant="contained"
                                fullWidth
                                onClick={handleClick}
                                className={classes.orderButton}
                                disabled={selectedDate.errorMessage.length > 0 || selectedDate.date === null}
                        >この内容で注文する</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    ))
}
export default OrderFormGQL

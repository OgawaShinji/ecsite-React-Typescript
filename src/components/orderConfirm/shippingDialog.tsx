import React, {useEffect, useState} from "react";
import {
    Button, createStyles,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, Grid,
    makeStyles, Paper, TextField, Theme, Typography,
} from "@material-ui/core";
import {User} from "~/types/interfaces";
import {THEME_COLOR_2} from "~/assets/color";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
            },
            width: 550
        },
        pad: {
            padding: theme.spacing(3),
        },
        root2: {
            width: 500
        },
        color: {
            backgroundColor: THEME_COLOR_2,
            '&:hover': {
                backgroundColor: THEME_COLOR_2,
            },
            color: "white"
        },
        textForm: {
            width: '50ch'
        },
        telForm: {
            width: '16ch'
        }
    }),
);

export interface SimpleDialogProps {
    open: boolean;
    close: () => void;
    changeUserInfo: (userInfo: User) => void;
    userInfo: User | null
}

const ShippingDialog: React.FC<SimpleDialogProps> = (props) => {

    const classes = useStyles();
    const {open, userInfo} = props;

    //変更ボタンの状態を切り替える
    const checkButtonDisabled = () => {
        if (
            name.value.length === 0  || name.value === '' || name.errorMessage.length > 0 ||
            email.value === '' || email.errorMessage.length > 0 ||
            zipcode1.value === '' || zipcode1.errorMessage.length > 0 ||
            zipcode2.value === '' || zipcode2.errorMessage.length > 0 ||
            address.value === '' || address.errorMessage.length > 0 ||
            firstTelephoneNum.value === '' || firstTelephoneNum.errorMessage.length > 0 ||
            secondTelephoneNum.value === '' || secondTelephoneNum.errorMessage.length > 0 ||
            thirdTelephoneNum.value === '' || thirdTelephoneNum.errorMessage.length > 0
        ) {
            return true
        } else {
            return false
        }
    }

    //デフォルト情報をセット
    const [name, setName] = useState<{ value: string, errorMessage: string }>({
        value: '', errorMessage: ''})
    const [email, setEmail] = useState<{ value: string, errorMessage: string }>({
        value: '', errorMessage: ''})
    const [zipcode1, setZipcode1] = useState<{ value: string, errorMessage: string }>({
        value: '', errorMessage: ''})
    const [zipcode2, setZipcode2] = useState<{ value: string, errorMessage: string }>({
        value: '', errorMessage: ''})
    const [address, setAddress] = useState<{ value: string, errorMessage: string }>({
        value: '', errorMessage: ''})
    const [firstTelephoneNum, setFirstTelephoneNum] = useState<{ value: string, errorMessage: string }>({
        value: '', errorMessage: ''})
    const [secondTelephoneNum, setSecondTelephoneNum] = useState<{ value: string, errorMessage: string }>({
        value: '', errorMessage: ''})
    const [thirdTelephoneNum, setThirdTelephoneNum] = useState<{ value: string, errorMessage: string }>({
        value: '', errorMessage: ''})

    useEffect(() => {
        if (userInfo) {
            setName({value: userInfo.name, errorMessage: ''})
            setEmail({value: userInfo.email, errorMessage: ''})
            //郵便番号を3桁と4桁で区切る
            setZipcode1({value: userInfo.zipcode.substr(0, 3), errorMessage: ''});
            setZipcode2({value: userInfo.zipcode.substr(3, 4), errorMessage: ''});
            setAddress({value: userInfo.address, errorMessage: ''})
            //電話番号をハイフンを基準にして分割する
            const telephoneNumbers: string[] = userInfo.telephone.split('-')
            setFirstTelephoneNum({value: telephoneNumbers[0], errorMessage: ''})
            setSecondTelephoneNum({value: telephoneNumbers[1], errorMessage: ''})
            setThirdTelephoneNum({value: telephoneNumbers[2], errorMessage: ''})
        }
    }, [userInfo])


    //---------------○○Validation-----------------------------------
    const nameValidation = (value: string): string => {
        if (!value || value === '') return '※名前を入力してください'
        return ''
    }
    const emailValidation = (value: string): string => {
        if (!value) return '※メールアドレスを入力してください';
        const regex = /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!regex.test(value) || value.length > 100) return '※正しい形式でメールアドレスを入力してください';
        return ''
    }
    const zipcodeValidation1 = (value: string): string => {
        if (!value || value === '') return '※郵便番号を入力してください'
        const regex = /^[0-9]+$/;
        if (!regex.test(value)) return '※半角数字を入力してください'
        if (3 !== value.length) return '※3桁で入力してください'
        return ''
    }
    const zipcodeValidation2 = (value: string): string => {
        if (!value || value === '') return '※郵便番号を入力してください'
        const regex = /^[0-9]+$/;
        if (!regex.test(value)) return '※半角数字を入力してください'
        if (4 !== value.length) return '※4桁で入力してください'
        return ''
    }
    const addressValidation = (value: string): string => {
        if (!value || value === '') return '※住所を入力してください'
        if (200 < value.length) return '※200字以内で入力してください'
        return ''
    }
    const telephoneValidation1 = (value: string): string => {
        if (!value || value === '') return '※電話番号を入力してください'
        const regex = /^[0-9]+$/;
        if (!regex.test(value)) return '※半角数字を入力してください'
        if (4 < value.length || value.length < 2) return '※2桁以上4桁以内で入力してください'
        return ''
    }
    const telephoneValidation2 = (value: string): string => {
        if (!value || value === '') return '※電話番号を入力してください'
        const regex = /^[0-9]+$/;
        if (!regex.test(value)) return '※半角数字を入力してください'
        if (4 !== value.length) return '※4桁で入力してください'
        return ''
    }
    const telephoneValidation3 = (value: string): string => {
        if (!value || value === '') return '※電話番号を入力してください'
        const regex = /^[0-9]+$/;
        if (!regex.test(value)) return '※半角数字を入力してください'
        if (4 !== value.length) return '※4桁で入力してください'
        return ''
    }

    //入力された情報を動的に更新
    const handleChangeName = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setName({
            value: event.target.value,
            errorMessage: nameValidation(event.target.value)
        })
    }
    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail({
            value: event.target.value,
            errorMessage: emailValidation(event.target.value)
        })
    }
    const handleChangeZipcode1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setZipcode1({
            value: event.target.value,
            errorMessage: zipcodeValidation1(event.target.value)
        })
    }
    const handleChangeZipcode2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setZipcode2({
            value: event.target.value,
            errorMessage: zipcodeValidation2(event.target.value)
        })
    }
    const handleChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress({
            value: event.target.value,
            errorMessage: addressValidation(event.target.value)
        })
    }
    const handleChangeTelFirstNum = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstTelephoneNum({
            value: event.target.value,
            errorMessage: telephoneValidation1(event.target.value)
        })
    }
    const handleChangeTelSecondNum = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSecondTelephoneNum({
            value: event.target.value,
            errorMessage: telephoneValidation2(event.target.value)
        })
    }
    const handleChangeTelThirdNum = (event: React.ChangeEvent<HTMLInputElement>) => {
        setThirdTelephoneNum({
            value: event.target.value,
            errorMessage: telephoneValidation3(event.target.value)
        })
    }

    const handleClose = () => {
        setName({value: name.value, errorMessage: ''});
        setEmail({value: email.value, errorMessage: ''});
        setZipcode1({value: zipcode1.value, errorMessage: ''});
        setZipcode2({value: zipcode2.value, errorMessage: ''});
        setAddress({value: address.value, errorMessage: ''});
        setFirstTelephoneNum({value: firstTelephoneNum.value, errorMessage: ''});
        setSecondTelephoneNum({value: secondTelephoneNum.value, errorMessage: ''});
        setThirdTelephoneNum({value: thirdTelephoneNum.value, errorMessage: ''});
        props.close();
    }

    const updateUserInfo = async () => {
        const zipcode = zipcode1.value + zipcode2.value;
        const telephone = firstTelephoneNum.value  + '-' + secondTelephoneNum.value + '-' + thirdTelephoneNum.value
        const userInfo = {
            name: name.value,
            email: email.value,
            zipcode: zipcode,
            address: address.value,
            telephone: telephone,
        }
        if (userInfo) {
            props.changeUserInfo(userInfo);
            await props.close();
        }
    }
    return (
        <>
            <Dialog open={open}>
                {/*ユーザー登録と同じ様な変更用フォームを表示*/}
                <DialogTitle id="simple-dialog-title">お届け先情報</DialogTitle>
                <DialogContent>
                    <Grid container alignContent="center" justify="center" className={classes.pad}>
                        <Paper elevation={0} className={classes.root2}>
                            <Grid container alignContent="center" justify="center" className={classes.pad}>
                                <div className={classes.root}>
                                    <Grid item xs={12}>
                                        <Typography style={{color: 'red', fontSize: "small"}} align={"center"}>{name.errorMessage}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="name"
                                            label="名前"
                                            size={"small"}
                                            variant="outlined"
                                            value={name.value}
                                            error={name.errorMessage.length > 0}
                                            onChange={handleChangeName}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography style={{color: 'red', fontSize: "small"}} align={"center"}>{email.errorMessage}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="email"
                                            label="メールアドレス"
                                            size={"small"}
                                            variant="outlined"
                                            value={email.value}
                                            error={email.errorMessage.length > 0}
                                            onChange={handleChangeEmail}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid container justify={"center"} alignItems={"center"}>
                                        <Grid item xs={6}>
                                            <Typography style={{color: 'red', fontSize: 'small'}} align={"center"}>{zipcode1.errorMessage}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography style={{color: 'red', fontSize: 'small'}} align={"center"}>{zipcode2.errorMessage}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container justify={"center"} alignItems={"center"}>
                                        <Grid item xs={5}>
                                            <TextField
                                                id="zipcode1"
                                                label="郵便番号( ○○○ )"
                                                size={"small"}
                                                variant="outlined"
                                                value={zipcode1.value}
                                                error={zipcode1.errorMessage.length > 0}
                                                onChange={handleChangeZipcode1}
                                            />
                                        </Grid>
                                        <Grid item xs={1}><Typography align={"center"}>-</Typography></Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                id="zipcode2"
                                                label="郵便番号( ○○○○ )"
                                                size={"small"}
                                                variant="outlined"
                                                value={zipcode2.value}
                                                error={zipcode2.errorMessage.length > 0}
                                                onChange={handleChangeZipcode2}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography style={{color: 'red', fontSize: "small"}} align={"center"}>{address.errorMessage}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="address"
                                            label="住所"
                                            size={"small"}
                                            variant="outlined"
                                            value={address.value}
                                            error={address.errorMessage.length > 0}
                                            onChange={handleChangeAddress}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid container justify={"center"} alignItems={"center"}>
                                        <Grid item xs={3}>
                                            <Typography style={{color: 'red', fontSize: 'x-small'}} align={"center"}>{firstTelephoneNum.errorMessage}</Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography style={{color: 'red', fontSize: 'x-small'}} align={"center"}>{secondTelephoneNum.errorMessage}</Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography style={{color: 'red', fontSize: 'x-small'}} align={"center"}>{thirdTelephoneNum.errorMessage}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container alignItems={"center"}>
                                        <Grid item xs={3}>
                                            <TextField
                                                id="telephone1"
                                                label="電話番号"
                                                size={"small"}
                                                variant="outlined"
                                                value={firstTelephoneNum.value}
                                                error={firstTelephoneNum.errorMessage.length > 0}
                                                onChange={handleChangeTelFirstNum}
                                            />
                                        </Grid>
                                        <Grid item><Typography align={"center"}>-</Typography></Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                id="telephone2"
                                                label="電話番号"
                                                size={"small"}
                                                variant="outlined"
                                                value={secondTelephoneNum.value}
                                                error={secondTelephoneNum.errorMessage.length > 0}
                                                onChange={handleChangeTelSecondNum}
                                            />
                                        </Grid>
                                        <Grid item ><Typography align={"center"}>-</Typography></Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                id="telephone3"
                                                label="電話番号"
                                                size={"small"}
                                                variant="outlined"
                                                value={thirdTelephoneNum.value}
                                                error={thirdTelephoneNum.errorMessage.length > 0}
                                                onChange={handleChangeTelThirdNum}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                        </Paper>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.color} variant={"contained"} onClick={handleClose}>閉じる</Button>
                    <Button
                        className={classes.color}
                        variant={"contained"}
                        onClick={updateUserInfo}
                        disabled={checkButtonDisabled()}
                    >変更する</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ShippingDialog
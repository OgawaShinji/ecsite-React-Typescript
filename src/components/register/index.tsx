import React, {FC, useState} from "react";
import {useDispatch} from "react-redux";
import {postRegisterUser} from "~/store/slices/Domain/user.slice";
import {Button, createStyles, Grid, makeStyles, Paper, TextField, Theme, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom"
import {Path} from "~/router/routes";
import {User} from "~/types/interfaces";
import {AppDispatch} from "~/store";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(2),
            },
        },
        pad: {
            padding: theme.spacing(2),
        },
        root2: {
            width: '55ch',
        },
        color: {
            backgroundColor: "#ffa500",
            color: "white"
        },
        zipForm: {
            width: '27ch',
        },
        telForm: {
            width: '17ch',
        },
    }),
);

const Register: FC = () => {

    const dispatch: AppDispatch = useDispatch();
    const routeHistory = useHistory();

    //------------------------- localのstateとして登録情報を管理 -----------------------
    const [name, setName] = useState<{ value: string, errorMessage: string }>({
        value: '',
        errorMessage: ''
    })
    const [email, setEmail] = useState<{ value: string, errorMessage: string }>({
        value: '',
        errorMessage: ''
    })
    const [zipcode, setZipcode] = useState<{ value: string, errorMessage: string }>({
        value: '',
        errorMessage: ''
    })
    const [address, setAddress] = useState<{ value: string, errorMessage: string }>({
        value: '',
        errorMessage: ''
    })
    const [telephone, setTelephone] = useState<{ value: string, errorMessage: string }>({
        value: '',
        errorMessage: ''
    })
    const [password, setPassword] = useState<{ value: string, errorMessage: string }>({
        value: '',
        errorMessage: ''
    })
    const [confirmationPassword, setConfirmationPassword] = useState<{ value: string, errorMessage: string }>({
        value: '',
        errorMessage: ''
    })
    //登録処理でエラーをキャッチしたかどうか
    const [emailDuplicated, setEmailDuplicated] = useState(false);

    //-----------------------　バリデーション : ○○Validation　-------------------------------------------
    const nameValidation = (value: string): string => {
        if (!value || value === '') return '*名前を入力してください'
        return ''
    }
    const emailValidation = (value: string): string => {
        if (!value) return '※メールアドレスを入力してください';
        const regex = /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!regex.test(value) || value.length > 100) return '※正しい形式でメールアドレスを入力してください';
        return ''
    }
    const zipcodeValidation = (value: string): string => {
        if (!value || value === '') return '*郵便番号を入力してください'
        if (7 < value.length) return '*7字以内で入力してください'
        return ''
    }
    const addressValidation = (value: string): string => {
        if (!value || value === '') return '*住所を入力してください'
        if (200 < value.length) return '*200字以内で入力してください'
        return ''
    }
    const telephoneValidation = (value: string): string => {
        if (!value || value === '') return '*電話番号を入力してください'
        if (15 < value.length) return '*15字以内で入力してください'
        return ''
    }
    const passwordValidation = (value: string): string => {
        if (!value) return '*パスワードを入力してください'
        if (value.length < 6) return '*6字以上で入力してください'
        return ''
    }
    const confirmationPasswordValidation = (value: string): string => {
        if (!value) return '*確認用パスワードを入力してください'
        if (value !== password.value) return '*パスワードと一致していません'
        if (value.length < 6) return '*6字以上で入力してください'
        return ''
    }

    //-----------------　動的変更処理 : handleChange○○（入力監視）-----------------------------
    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName({
            value: event.target.value,
            errorMessage: nameValidation(event.target.value)
        })
    }
    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (emailDuplicated) {
            setEmailDuplicated(false);
        }
        setEmail({
            value: event.target.value,
            errorMessage: emailValidation(event.target.value)
        })
    }
    const handleChangeZipcode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setZipcode({
            value: event.target.value,
            errorMessage: zipcodeValidation(event.target.value)
        })
    }
    const handleChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress({
            value: event.target.value,
            errorMessage: addressValidation(event.target.value)
        })
    }
    const handleChangeTel = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTelephone({
            value: event.target.value,
            errorMessage: telephoneValidation(event.target.value)
        })
    }
    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword({
            value: event.target.value,
            errorMessage: passwordValidation(event.target.value)
        })
    }
    const handleChangeConfirmationPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmationPassword({
            value: event.target.value,
            errorMessage: confirmationPasswordValidation(event.target.value)
        })
    }

    /**
     * [登録]ボタン押下時の処理　
     */
    const handleClickRegister = async () => {
        const userInfo: User = {
            name: name.value,
            email: email.value,
            zipcode: zipcode.value,
            address: address.value,
            telephone: telephone.value,
            password: password.value,
        }
        await dispatch(postRegisterUser(userInfo)).then((i) => {
            if (i.payload === '200') routeHistory.push(Path.login);
        }).catch((e) => {
            if (e.message === '400') {
                setEmailDuplicated(true);
            }
        });
    }

    const classes = useStyles();

    return (
        <>
            <Grid container alignContent="center" justify="center" className={classes.pad}>
                <Paper className={classes.root2}>
                    <Grid container alignContent="center" justify="center">
                        <div className={classes.root}>
                            <Typography className={classes.pad} component="h5" variant="h5"
                                        align={"center"}>新規ユーザー登録</Typography>
                            <Grid item xs={11}>
                                <div style={{color: 'red'}}>{name.errorMessage}</div>
                                <TextField
                                    size={"small"}
                                    id="name"
                                    label="名前"
                                    variant="outlined"
                                    value={name.value}
                                    error={name.errorMessage.length > 0}
                                    onChange={handleChangeName}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={11}>
                                <div style={{color: 'red'}}>{email.errorMessage}</div>
                                <TextField
                                    size={"small"}
                                    id="email"
                                    label="メールアドレス"
                                    variant="outlined"
                                    value={email.value}
                                    error={email.errorMessage.length > 0}
                                    onChange={handleChangeEmail}
                                    fullWidth
                                />
                            </Grid>
                            <Grid container  alignItems={"center"}>
                                <Grid item xs={5}>
                                    <div style={{color: 'red'}}>{zipcode.errorMessage}</div>
                                    <TextField
                                        size={"small"}
                                        id="zipcode"
                                        label="郵便番号（○○○）"
                                        variant="outlined"
                                        value={zipcode.value}
                                        error={zipcode.errorMessage.length > 0}
                                        onChange={handleChangeZipcode}
                                    />
                                </Grid>
                                <Grid item ><Typography align={"center"}>-</Typography></Grid>
                                <Grid item xs={6}>
                                    <div style={{color: 'red'}}>{zipcode.errorMessage}</div>
                                    <TextField
                                        size={"small"}
                                        id="zipcode"
                                        label="郵便番号（○○○○）"
                                        variant="outlined"
                                        value={zipcode.value}
                                        error={zipcode.errorMessage.length > 0}
                                        onChange={handleChangeZipcode}
                                        className={classes.zipForm}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={11}>
                                <div style={{color: 'red'}}>{address.errorMessage}</div>
                                <TextField
                                    size={"small"}
                                    id="address"
                                    label="住所"
                                    variant="outlined"
                                    value={address.value}
                                    error={address.errorMessage.length > 0}
                                    onChange={handleChangeAddress}
                                    fullWidth
                                />
                            </Grid>
                            <Grid container alignItems={"center"}>
                                <Grid item xs={3}>
                                    <div style={{color: 'red'}}>{telephone.errorMessage}</div>
                                    <TextField
                                        size={"small"}
                                        id="telephone1"
                                        label="電話番号"
                                        variant="outlined"
                                        value={telephone.value}
                                        error={telephone.errorMessage.length > 0}
                                        onChange={handleChangeTel}
                                    />
                                </Grid>
                                <Grid item ><Typography align={"center"}>-</Typography></Grid>
                                <Grid item xs={4}>
                                    <div style={{color: 'red'}}>{telephone.errorMessage}</div>
                                    <TextField
                                        size={"small"}
                                        id="telephone2"
                                        label="電話番号"
                                        variant="outlined"
                                        value={telephone.value}
                                        error={telephone.errorMessage.length > 0}
                                        onChange={handleChangeTel}
                                    />
                                </Grid>
                                <Grid item ><Typography align={"center"}>-</Typography></Grid>
                                <Grid item xs={4} >
                                    <div style={{color: 'red'}}>{telephone.errorMessage}</div>
                                    <TextField
                                        size={"small"}
                                        id="telephone3"
                                        label="電話番号"
                                        variant="outlined"
                                        value={telephone.value}
                                        error={telephone.errorMessage.length > 0}
                                        onChange={handleChangeTel}
                                        className={classes.telForm}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={11}>
                                <div style={{color: 'red'}}>{password.errorMessage}</div>
                                <TextField
                                    size={"small"}
                                    id="password"
                                    label="パスワード"
                                    variant="outlined"
                                    value={password.value}
                                    error={password.errorMessage.length > 0}
                                    onChange={handleChangePassword}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={11}>
                                <div style={{color: 'red'}}>{confirmationPassword.errorMessage}</div>
                                <TextField
                                    size={"small"}
                                    id="confirmationPassword"
                                    label="確認用パスワード"
                                    variant="outlined"
                                    value={confirmationPassword.value}
                                    error={confirmationPassword.errorMessage.length > 0}
                                    onChange={handleChangeConfirmationPassword}
                                    fullWidth
                                />
                            </Grid>
                            {emailDuplicated &&
                            <Typography className={classes.pad} variant={"subtitle1"} align={"center"}
                                        color={"secondary"}>メールアドレスが重複しています</Typography>}
                            <Grid className={classes.pad} container alignContent="center" justify="center">
                                <Button
                                    variant="contained"
                                    className={classes.color}
                                    onClick={handleClickRegister}
                                    disabled={
                                        name.errorMessage.length > 0 || name.value === '' ||
                                        email.errorMessage.length > 0 || email.value === '' ||
                                        zipcode.errorMessage.length > 0 || zipcode.value === '' ||
                                        address.errorMessage.length > 0 || address.value === '' ||
                                        telephone.errorMessage.length > 0 || telephone.value === '' ||
                                        password.errorMessage.length > 0 || password.value === '' ||
                                        confirmationPassword.errorMessage.length > 0 || confirmationPassword.value === ''
                                    }
                                >登録</Button>
                            </Grid>

                        </div>
                    </Grid>
                </Paper>
            </Grid>
        </>
    )
}
export default Register;
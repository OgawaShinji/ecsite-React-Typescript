import React, {FC, useState} from "react";
import {useDispatch} from "react-redux";
import {postRegisterUser} from "~/store/slices/Domain/user.slice";
import {
    Button,
    createStyles,
    Grid,
    IconButton, LinearProgress,
    makeStyles,
    Paper,
    TextField,
    Theme,
    Typography
} from "@material-ui/core";
import {useHistory} from "react-router-dom"
import {Path} from "~/router/routes";
import {User} from "~/types/interfaces";
import {AppDispatch} from "~/store";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {ListUserDocument, PostRegisterDocument, usePostRegisterMutation} from "~/gql/generated/user.graphql";
import {useLazyQuery} from "@apollo/client";



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

    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();
    const routeHistory = useHistory();

    //------------------------- localのstateとして登録情報を管理 -----------------------
    const [name, setName] = useState<{ value: string, errorMessage: string }>({
        value: '', errorMessage: ''
    })
    const [email, setEmail] = useState<{ value: string, errorMessage: string }>({
        value: '', errorMessage: ''
    })
    const [firstZipcode, setFirstZipcode] = useState<{ value: string, errorMessage: string }>({
        value: '', errorMessage: ''
    })
    const [secondZipcode, setSecondZipcode] = useState<{ value: string, errorMessage: string }>({
        value: '', errorMessage: ''
    })
    const [address, setAddress] = useState<{ value: string, errorMessage: string }>({
        value: '', errorMessage: ''
    })
    const [firstTelNum, setFirstTelNum] = useState<{ value: string, errorMessage: string }>({
        value: '', errorMessage: ''
    })
    const [secondTelNum, setSecondTelNum] = useState<{ value: string, errorMessage: string }>({
        value: '', errorMessage: ''
    })
    const [thirdTelNum, setThirdTelNum] = useState<{ value: string, errorMessage: string }>({
        value: '', errorMessage: ''
    })
    const [password, setPassword] = useState<{ value: string, errorMessage: string }>({
        value: '', errorMessage: ''
    })
    const [confirmationPassword, setConfirmationPassword] = useState<{ value: string, errorMessage: string }>({
        value: '', errorMessage: ''
    })
    //登録処理でエラーをキャッチしたかどうか
    const [emailDuplicated, setEmailDuplicated] = useState(false);
    //ブラインドのステータス
    const [passType, setPassType] = useState("password");
    const [confirmPassType, setConfirmPassType] = useState("password");
    //ローディング処理
    const [isLoading, setIsLoading] = useState<boolean>(false);


    //-----------------------　バリデーション : ○○Validation　-------------------------------------------
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
    const firstZipcodeValidation = (value: string): string => {
        if (!value || value === '') return '※郵便番号を入力してください'
        const regex = /^[0-9]+$/;
        if (!regex.test(value)) return '※半角数字を入力してください'
        if (3 !== value.length) return '※3桁で入力してください'
        return ''
    }
    const secondZipcodeValidation = (value: string): string => {
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
    const firstTelNumValidation = (value: string): string => {
        if (!value || value === '') return '※電話番号を入力してください'
        const regex = /^[0-9]+$/;
        if (!regex.test(value)) return '※半角数字を入力してください'
        if (4 < value.length || value.length < 2) return '※2桁以上4桁以内で入力して下さい'
        return ''
    }
    const secondTelNumValidation = (value: string): string => {
        if (!value || value === '') return '※電話番号を入力してください'
        const regex = /^[0-9]+$/;
        if (!regex.test(value)) return '※半角数字を入力してください'
        if (4 !== value.length) return '※4桁で入力して下さい'
        return ''
    }
    const thirdTelNumValidation = (value: string): string => {
        if (!value || value === '') return '※電話番号を入力してください'
        const regex = /^[0-9]+$/;
        if (!regex.test(value)) return '※半角数字を入力して下さい'
        if (4 !== value.length) return '※4桁で入力して下さい'
        return ''
    }
    const passwordValidation = (value: string): string => {
        if (!value) return '※パスワードを入力してください'
        const regex = /^[0-9]+$/;
        if (!regex.test(value)) return '※半角数字を入力してください'
        if (value.length < 6 || 16 < value.length) return '※6字以上16字以内で入力してください'
        return ''
    }
    const confirmationPasswordValidation = (value: string): string => {
        if (!value) return '※確認用パスワードを入力してください'
        if (value !== password.value) return '※パスワードと一致していません'
        const regex = /^[0-9]+$/;
        if (!regex.test(value)) return '※半角数字を入力してください'
        if (value.length < 6 || 16 < value.length) return '※6字以上6字以上16字以内で入力してください'
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
    const handleChangeFirstZipcode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstZipcode({
            value: event.target.value,
            errorMessage: firstZipcodeValidation(event.target.value)
        })
    }
    const handleChangeSecondZipcode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSecondZipcode({
            value: event.target.value,
            errorMessage: secondZipcodeValidation(event.target.value)
        })
    }
    const handleChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress({
            value: event.target.value,
            errorMessage: addressValidation(event.target.value)
        })
    }
    const handleChangeFirstTelNum = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstTelNum({
            value: event.target.value,
            errorMessage: firstTelNumValidation(event.target.value)
        })
    }
    const handleChangeSecondTelNum = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSecondTelNum({
            value: event.target.value,
            errorMessage: secondTelNumValidation(event.target.value)
        })
    }
    const handleChangeThirdTelNum = (event: React.ChangeEvent<HTMLInputElement>) => {
        setThirdTelNum({
            value: event.target.value,
            errorMessage: thirdTelNumValidation(event.target.value)
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
    //変数としてブラインドアイコンを定義
    const passBlindIcon = () => {
        return (passType === "password" ? <Visibility/> : <VisibilityOff/>);
    }
    const confirmPassBlindIcon = () => {
        return (confirmPassType === "password" ? <Visibility/> : <VisibilityOff/>);
    }
    //パスワードのブラインドを切替
    const switchBlindPass = () => {
        if (passType === "password") {
            setPassType("");
        } else {
            setPassType("password")
        }
    }
    //確認パスワードのブラインドを切替
    const switchBlindConfirmPass = () => {
        if (confirmPassType === "password") {
            setConfirmPassType("");
        } else {
            setConfirmPassType("password")
        }
    }

    //form送信によるリロードが行われずにすむやり方？(loginForm.tsx参照)
    const handleKeyPress = (e: string) => {
        if (e === "Enter") handleClickRegister().then();
    }

    /**
     * [登録]ボタン押下時の処理　
     */
    const handleClickRegister = async () => {
        setIsLoading(true);
        const zipcode = firstZipcode.value + secondZipcode.value;
        const telephone = firstTelNum.value + '-' + secondTelNum.value + '-' + thirdTelNum.value;
        let userInfo: User = {
            name: name.value,
            email: email.value,
            zipcode: zipcode,
            address: address.value,
            telephone: telephone,
            password: password.value,
        }
        await dispatch(postRegisterUser(userInfo)).then((i) => {
            if (i.payload === '200') routeHistory.push(Path.login);
        }).catch(async (e) => {
            if (e.message === '400') {
                const loading = async () => {
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 500)
                }
                loading().then(() => {
                    setEmailDuplicated(true);
                })
            }
        });
    }

    const [getUser,{data:data2}] = useLazyQuery(ListUserDocument,{
        fetchPolicy: "network-only"
    });

    const [postRegisterMutation, { data, loading, error }] = usePostRegisterMutation();

    const handleClick = async () => {
        const userInfo = {
            name:name.value,
            email:email.value,
            zipcode:firstZipcode.value + secondZipcode.value,
            address:address.value,
            telephone:firstTelNum.value + '-' + secondTelNum.value + '-' + thirdTelNum.value,
            password:password.value
        }
        console.log(userInfo)
        await postRegisterMutation({variables:{userInfo:userInfo}}).then( async () => {
               await console.log(data)
        });
    }

    const handleClick2 = async () => {
        getUser();
        await console.log(data2)
    }

    if (loading) return (<div>loading</div>);
    if (error) return (<div>error</div>);

    return (isLoading ? (<LinearProgress style={{width: "60%", marginTop: "20%", marginLeft: "20%"}}/>) : (
        <div>
            <button type={"button"} onClick={handleClick}>てすと</button>
            <button type={"button"} onClick={handleClick2}>get</button>
            <Grid container alignContent="center" justify="center" className={classes.pad}>
                <Paper className={classes.root2}>
                    <Grid container alignContent="center" justify="center">
                        <div className={classes.root}>
                            <Typography className={classes.pad} component="h5" variant="h5"
                                        align={"center"}>新規ユーザー登録</Typography>
                            <Grid item xs={11}>
                                <Typography style={{color: 'red', fontSize: "small"}}
                                            align={"center"}>{name.errorMessage}</Typography>
                                <TextField
                                    size={"small"}
                                    id="name"
                                    label="name"
                                    variant="outlined"
                                    value={name.value}
                                    error={name.errorMessage.length > 0}
                                    onChange={handleChangeName}
                                    onKeyPress={(e) => handleKeyPress(e.key)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={11}>
                                <Typography style={{color: 'red', fontSize: "small"}}
                                            align={"center"}>{email.errorMessage}</Typography>
                                <TextField
                                    size={"small"}
                                    id="email"
                                    label="e-mail"
                                    variant="outlined"
                                    value={email.value}
                                    error={email.errorMessage.length > 0}
                                    onChange={handleChangeEmail}
                                    onKeyPress={(e) => handleKeyPress(e.key)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid container alignItems={"center"}>
                                <Grid item xs={5}>
                                    <Typography style={{color: 'red', fontSize: "small"}}
                                                align={"center"}>{firstZipcode.errorMessage}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography style={{color: 'red', fontSize: "small"}}
                                                align={"center"}>{secondZipcode.errorMessage}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container alignItems={"center"}>
                                <Grid item xs={5}>
                                    <TextField
                                        size={"small"}
                                        id="firstZipcode"
                                        label="zipcode（○○○）"
                                        variant="outlined"
                                        value={firstZipcode.value}
                                        error={firstZipcode.errorMessage.length > 0}
                                        onChange={handleChangeFirstZipcode}
                                        onKeyPress={(e) => handleKeyPress(e.key)}
                                    />
                                </Grid>
                                <Grid item><Typography align={"center"}>-</Typography></Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        size={"small"}
                                        id="secondZipcode"
                                        label="zipcode（○○○○）"
                                        variant="outlined"
                                        value={secondZipcode.value}
                                        error={secondZipcode.errorMessage.length > 0}
                                        onChange={handleChangeSecondZipcode}
                                        onKeyPress={(e) => handleKeyPress(e.key)}
                                        className={classes.zipForm}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={11}>
                                <Typography style={{color: 'red', fontSize: "small"}}
                                            align={"center"}>{address.errorMessage}</Typography>
                                <TextField
                                    size={"small"}
                                    id="address"
                                    label="address"
                                    variant="outlined"
                                    value={address.value}
                                    error={address.errorMessage.length > 0}
                                    onChange={handleChangeAddress}
                                    onKeyPress={(e) => handleKeyPress(e.key)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid container alignItems={"center"}>
                                <Grid item xs={3}>
                                    <Typography style={{color: 'red', fontSize: "x-small"}}
                                                align={"center"}>{firstTelNum.errorMessage}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography style={{color: 'red', fontSize: "x-small"}}
                                                align={"center"}>{secondTelNum.errorMessage}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography style={{color: 'red', fontSize: "x-small"}}
                                                align={"center"}>{thirdTelNum.errorMessage}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container alignItems={"center"}>
                                <Grid item xs={3}>
                                    <TextField
                                        size={"small"}
                                        id="telephone1"
                                        label="telephone"
                                        variant="outlined"
                                        value={firstTelNum.value}
                                        error={firstTelNum.errorMessage.length > 0}
                                        onChange={handleChangeFirstTelNum}
                                        onKeyPress={(e) => handleKeyPress(e.key)}
                                    />
                                </Grid>
                                <Grid item><Typography align={"center"}>-</Typography></Grid>
                                <Grid item xs={4}>

                                    <TextField
                                        size={"small"}
                                        id="telephone2"
                                        label="telephone"
                                        variant="outlined"
                                        value={secondTelNum.value}
                                        error={secondTelNum.errorMessage.length > 0}
                                        onChange={handleChangeSecondTelNum}
                                        onKeyPress={(e) => handleKeyPress(e.key)}
                                    />
                                </Grid>
                                <Grid item><Typography align={"center"}>-</Typography></Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        size={"small"}
                                        id="telephone3"
                                        label="telephone"
                                        variant="outlined"
                                        value={thirdTelNum.value}
                                        error={thirdTelNum.errorMessage.length > 0}
                                        onChange={handleChangeThirdTelNum}
                                        onKeyPress={(e) => handleKeyPress(e.key)}
                                        className={classes.telForm}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography style={{color: 'red', fontSize: "small"}}
                                            align={"center"}>{password.errorMessage}</Typography>
                            </Grid>
                            <Grid container alignItems={"center"}>
                                <Grid item xs={1}>
                                    <Typography></Typography>
                                    <IconButton onClick={switchBlindPass}>
                                        {passBlindIcon()}
                                    </IconButton>
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField
                                        size={"small"}
                                        id="password"
                                        type={passType}
                                        label="password"
                                        variant="outlined"
                                        value={password.value}
                                        error={password.errorMessage.length > 0}
                                        onChange={handleChangePassword}
                                        onKeyPress={(e) => handleKeyPress(e.key)}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography style={{color: 'red', fontSize: "small"}}
                                            align={"center"}>{confirmationPassword.errorMessage}</Typography>
                            </Grid>
                            <Grid container alignItems={"center"}>
                                <Grid item xs={1}>
                                    <Typography></Typography>
                                    <IconButton onClick={switchBlindConfirmPass}>
                                        {confirmPassBlindIcon()}
                                    </IconButton>
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField
                                        size={"small"}
                                        id="confirmationPassword"
                                        type={confirmPassType}
                                        label="confirmationPassword"
                                        variant="outlined"
                                        value={confirmationPassword.value}
                                        error={confirmationPassword.errorMessage.length > 0}
                                        onChange={handleChangeConfirmationPassword}
                                        onKeyPress={(e) => handleKeyPress(e.key)}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            {emailDuplicated &&
                            <Typography className={classes.pad} variant={"subtitle1"} align={"center"}
                                        color={"secondary"}>メールアドレスが有効でない、もしくは重複しています</Typography>}
                            <Grid className={classes.pad} container alignContent="center" justify="center">
                                <Button
                                    variant="contained"
                                    className={classes.color}
                                    onClick={handleClickRegister}
                                    disabled={
                                        name.errorMessage.length > 0 || name.value === '' ||
                                        email.errorMessage.length > 0 || email.value === '' ||
                                        firstZipcode.errorMessage.length > 0 || firstZipcode.value === '' ||
                                        secondZipcode.errorMessage.length > 0 || secondZipcode.value === '' ||
                                        address.errorMessage.length > 0 || address.value === '' ||
                                        firstTelNum.errorMessage.length > 0 || firstTelNum.value === '' ||
                                        secondTelNum.errorMessage.length > 0 || secondTelNum.value === '' ||
                                        thirdTelNum.errorMessage.length > 0 || thirdTelNum.value === '' ||
                                        password.errorMessage.length > 0 || password.value === '' ||
                                        confirmationPassword.errorMessage.length > 0 || confirmationPassword.value === ''
                                    }
                                >登録</Button>
                            </Grid>
                        </div>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    ))
}
export default Register;
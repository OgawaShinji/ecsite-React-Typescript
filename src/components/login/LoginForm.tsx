import React, { useState } from "react";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    createStyles,
    Grid,
    TextField,
    Typography
} from "@material-ui/core";
import { AppDispatch } from "~/store";
import { useDispatch } from "react-redux";
import { fetchLoginUser, login, loginForm } from "~/store/slices/App/auth.slice";
import { useHistory } from "react-router-dom"
import { Path } from "~/router/routes";
import { setError } from "~/store/slices/App/error.slice";
import { THEME_COLOR_1, THEME_COLOR_2 } from "~/assets/color";
import { makeStyles } from "@material-ui/core/styles";

type loginFormProps = {
    setIsLoading: (is: boolean) => Promise<string>
}
const LoginForm: React.FC<loginFormProps> = (props) => {
    const dispatch: AppDispatch = useDispatch();
    const routeHistory = useHistory();

    const initialValue = { email: '', password: '' }
    const [inputValue, setInputValue] = useState<loginForm>(initialValue)

    const initialError = {
        failedLogin: false,
        email: false,
        password: false
    }
    const [hasError, setHasError] = useState(initialError)

    const EMAIL_ERROR_MESSAGE = '※正しい形式でメールアドレスを入力してください'
    const PASSWORD_ERROR_MESSAGE = '*6字以上16字以内で入力してください'
    const FAILED_LOGIN_MESSAGE = 'メールアドレスもしくはパスワードが違います'

    /**
     * Inputタグに入力が行われた際に入力されたstateを更新するメソッド
     * @param event 
     */
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const name = event.target.name;
        if (name === 'email' || 'password') setInputValue({ ...inputValue, [name]: event.target.value })
    }

    /**
     * email入力値をバリデーションチェックし適切な形式であればtrueを返す
     */
    const isValidEmail = (): boolean => {
        const regex = /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return regex.test(inputValue.email) && inputValue.email.length < 100;

    }
    /**
     * password入力値をバリデーションチェックし適切な形式であればtrueを返す
     */
    const isValidPassword = (): boolean => {
        return inputValue.password.length >= 6 && inputValue.password.length <= 16;

    }
    /**
     * keyが押される度に発火する
     * 押されたKeyがEnterの時のみhandleLoginClickを呼び出す
     * @param e:押されたKeyの値
     */
    const handleKeyPress = (e: string) => {
        if (e === "Enter" && isValidEmail() && isValidPassword()) handleLoginClick().then();
    }

    /**
     * login button クリック時の処理
     * 入力値が適切な形ならLogin処理を呼び出し、tokenが帰ってこれば商品一覧へ遷移、返ってこなければエラーメッセージ表示とパスワードを空に更新
     */
    const handleLoginClick = async () => {
        if (isValidEmail && isValidPassword) {
            await dispatch(login(inputValue)).then((body) => {
                if (body?.payload) {
                    //loading画面表示可能にした後画面遷移
                    props.setIsLoading(true).then(() => {
                        dispatch(fetchLoginUser()).then(() => {
                            routeHistory.push(Path.itemList)
                        }).catch((e) => {
                            dispatch(setError({ isError: true, code: e.message }))
                        })
                    })
                } else { throw new Error() }
            }).catch(() => {
                setInputValue({ ...inputValue, password: '' })
                setHasError({ ...initialError, failedLogin: true })
            })
        } else {
            if (!isValidEmail) setHasError({ ...hasError, email: true })
            if (!isValidPassword) setHasError({ ...hasError, password: true })
        }
    }

    //messageを渡せばエラーメッセージの形で表示してくれる
    const errorMessageCard = (message: string) => {
        return (<Card style={{ padding: "1%", backgroundColor: "#ffe0b2" }}>
            <Typography color={"secondary"}>{message}
            </Typography></Card>)
    }
    const classes = login_form_style();

    return (
        <Card>
            <Grid container justify={"center"}>
                <Grid item xs={12}>
                    <CardHeader title="Login" style={{ backgroundColor: THEME_COLOR_1 }} />
                </Grid>
                <Grid item xs={12}>
                    <CardContent>
                        {hasError.failedLogin ? errorMessageCard(FAILED_LOGIN_MESSAGE) : null}
                        {hasError.email ? errorMessageCard(EMAIL_ERROR_MESSAGE) : null}
                        <TextField
                            error={hasError.email}
                            fullWidth
                            id="email"
                            name='email'
                            type="email"
                            label="e-mail"
                            placeholder="***@***.***"
                            margin="normal"
                            value={inputValue.email}
                            onChange={handleChange}
                            onKeyPress={(e) => handleKeyPress(e.key)}
                        />
                        {hasError.password ? errorMessageCard(PASSWORD_ERROR_MESSAGE) : null}
                        <TextField
                            error={hasError.password || hasError.failedLogin}
                            fullWidth
                            id="password"
                            name='password'
                            type="password"
                            label="password (6 ~ 16字)"
                            placeholder="password"
                            margin="normal"
                            value={inputValue.password}
                            onChange={handleChange}
                            onKeyPress={(e) => handleKeyPress(e.key)}
                        />
                    </CardContent>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleLoginClick}
                        className={classes.button}
                        disabled={!isValidPassword() || !isValidEmail()}
                    >
                        Login
                    </Button>
                </Grid>
            </Grid>
        </Card>
    )
};
export default LoginForm;
const login_form_style = makeStyles(() => createStyles({
    button:
    {
        marginBottom: "5%",
        backgroundColor: THEME_COLOR_2,
        color: "white",
    }
}))
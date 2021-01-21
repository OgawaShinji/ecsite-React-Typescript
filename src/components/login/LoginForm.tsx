import React, {useState} from "react";
import {Button, Card, CardActions, CardContent, CardHeader, TextField, Typography} from "@material-ui/core";
import {AppDispatch} from "~/store";
import {useDispatch} from "react-redux";
import {fetchLoginUser, login, loginForm} from "~/store/slices/App/auth.slice";
import {useHistory} from "react-router-dom"
import {Path} from "~/router/routes";

type Props = {
    styleProps: React.CSSProperties
}
const LoginForm: React.FC<Props> = (props) => {
    const dispatch: AppDispatch = useDispatch();
    const [email, setEmail] = useState<{ value: string, errorMessage: string }>({
        value: '',
        errorMessage: ''
    })
    const [password, setPassword] = useState<{ value: string, errorMessage: string }>({
        value: '',
        errorMessage: ''
    })
    const [isIncorrectEntry, setIsIncorrectEntry] = useState<boolean>(false)
    const routeHistory = useHistory();

    const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
        setEmail({value: event.target.value, errorMessage: emailValidation(event.target.value)});
        if (isIncorrectEntry) setIsIncorrectEntry(false);
    }
    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setPassword({value: event.target.value, errorMessage: passwordValidation(event.target.value)})
        if (isIncorrectEntry) setIsIncorrectEntry(false)
    }

    /**
     * keyが押される度に発火する
     * 押されたKeyがEnterの時にみhandleLoginClickを呼び出す
     * @param e:押されたKeyの値
     */
    const handleKeyPress = (e: string) => {
        if (e === "Enter") handleLoginClick();
    }

    /**
     * login button クリック時の処理
     * errorMessageが空文字ならLogin処理を呼び出し、tokenが帰ってこれば商品一覧へ遷移、返ってこなければエラーメッセージ表示とパスワードを空に更新
     */
    const handleLoginClick = async () => {
        if (email.errorMessage.length === 0 && password.errorMessage.length === 0) {
            const input: loginForm = {email: email.value, password: password.value}
            await dispatch(login(input)).then(async(body) => {
                if (body?.payload?.token) {
                    await dispatch(fetchLoginUser())
                    await routeHistory.push(Path.itemList)
                } else {
                    setIsIncorrectEntry(true);
                    setPassword({value: "", errorMessage: ""})
                }
            })
        }
    }

    /**
     * email入力値に対するエラーメッセージを返すメソッド
     *
     * @param value :string
     * @return errorMessage :string(エラーが無いときは空文字を返す)
     */
    const emailValidation = (value: string): string => {
        if (!value) return '※メールアドレスを入力してください';
        const regex = /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!regex.test(value) || value.length > 100) return '※正しい形式でメールアドレスを入力してください';
        return ''
    }
    /**
     * password入力値に対するエラーメッセージを返すメソッド
     *
     * @param value :string
     * @return errorMessage :string(エラーが無いときは空文字を返す)
     */
    const passwordValidation = (value: string): string => {
        if (!value) return '*パスワードを入力してください'
        if (value.length > 16 || value.length < 6) return '*6字以上16字以内で入力してください'
        return ''
    }
    //messageを渡せばエラーメッセージの形で表示してくれる
    const errorMessageCard = (message: string) => {
        return (<Card style={{padding: "1%", backgroundColor: "#ffe0b2"}}>
            <Typography color={"secondary"}>{message}
            </Typography></Card>)
    }

    return (<>
        <Card style={props.styleProps}>
            <CardHeader title="Login" style={{backgroundColor: "#ffa500"}}/>
            <CardContent>
                <div>
                    {isIncorrectEntry ? errorMessageCard("メールアドレスもしくはパスワードが違います") : ""}
                    {email.errorMessage.length > 0 ? errorMessageCard(email.errorMessage) : ""}
                    <TextField
                        error={email.errorMessage.length > 0}
                        fullWidth
                        id="email"
                        type="email"
                        label="e-mail"
                        placeholder="***@***.***"
                        margin="normal"
                        value={email.value}
                        onChange={handleEmailChange}
                        onKeyPress={(e) => handleKeyPress(e.key)}
                    />
                    {password.errorMessage.length > 0 ? errorMessageCard(password.errorMessage) : ""}
                    <TextField
                        error={password.errorMessage.length > 0}
                        fullWidth
                        id="password"
                        type="password"
                        label="password"
                        placeholder="Password"
                        margin="normal"
                        value={password.value}
                        onChange={handlePasswordChange}
                        onKeyPress={(e) => handleKeyPress(e.key)}
                    />
                </div>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    size="large"
                    color={"secondary"}
                    style={{left: '35%'}}
                    onClick={handleLoginClick}
                    disabled={email.errorMessage.length > 0 || password.errorMessage.length > 0 || email.value === '' || password.value === ''}
                >
                    Login
                </Button>
            </CardActions>
        </Card>
    </>)
}
export default LoginForm;
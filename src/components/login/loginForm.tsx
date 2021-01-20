import React, {useState} from "react";
import {Button, Card, CardActions, CardContent, CardHeader, TextField} from "@material-ui/core";
import {AppDispatch} from "~/store";
import {useDispatch} from "react-redux";
import {login, loginForm} from "~/store/slices/App/auth.slice";
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

    const routeHistory = useHistory();

    const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
        setEmail({value: event.target.value, errorMessage: emailValidation(event.target.value)});
    }
    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setPassword({value: event.target.value, errorMessage: passwordValidation(event.target.value)})
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
     * errorMessageが空文字ならLogin処理を呼び出し、商品一覧へ遷移
     */
    const handleLoginClick = async () => {
        if (email.errorMessage.length === 0 && password.errorMessage.length === 0) {
            const input: loginForm = {email: email.value, password: password.value}
            await dispatch(login(input)).then(() => routeHistory.push(Path.itemList))
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

    return (<>
        <Card style={props.styleProps}>
            <CardHeader title="Login" style={{backgroundColor: "#ffa500"}}/>
            <CardContent>
                <div>
                    <div style={{color: 'red'}}>{email.errorMessage}</div>
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
                    <div style={{color: 'red'}}>{password.errorMessage}</div>
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
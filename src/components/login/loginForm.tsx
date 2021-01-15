import React, {useState} from "react";
import {Button, Card, CardActions, CardContent, CardHeader, TextField} from "@material-ui/core";
import {AppDispatch} from "~/store";
import {useDispatch} from "react-redux";
import {login, loginForm, logout} from "~/store/slices/App/auth.slice";
import {useHistory} from "react-router-dom"

type Props = {
    styleProps: React.CSSProperties
}
const LoginForm: React.FC<Props> = (props) => {
    const dispatch: AppDispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const routeHistory = useHistory()
    const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setPassword(event.target.value)
    }
    const handleLoginClick = async () => {
        console.log({email: email, pass: password})
        const input: loginForm = {email: email, password: password}
        await dispatch(login(input)).then(() => routeHistory.push('/'))
        //await dispatch(logout()).then(() => console.log(localStorage.getItem("Authorization"))).then()
    }

    return (<>
        <Card style={props.styleProps}>
            <CardHeader title="Login"/>
            <CardContent>
                <div>
                    <TextField
                        //error={state.isError}
                        fullWidth
                        id="email"
                        type="email"
                        label="e-mail"
                        placeholder="***@***.***"
                        margin="normal"
                        value={email}
                        onChange={handleEmailChange}
                        //onKeyPress={handleKeyPress}
                    />
                    <TextField
                        //error={state.isError}
                        fullWidth
                        id="password"
                        type="password"
                        label="Password"
                        placeholder="Password"
                        margin="normal"
                        //helperText={state.helperText}
                        value={password}
                        onChange={handlePasswordChange}
                        //onKeyPress={handleKeyPress}
                    />
                </div>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    style={{left: '35%'}}
                    //className={classes.loginBtn}
                    onClick={handleLoginClick}
                    //disabled={state.isButtonDisabled}
                >
                    Login
                </Button>
            </CardActions>
        </Card>
    </>)
}
export default LoginForm;
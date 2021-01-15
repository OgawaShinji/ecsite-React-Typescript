import React from "react"
import LoginForm from "~/components/login/loginForm";
import {Link} from 'react-router-dom'
import {Path} from "~/router/routes";

const Login: React.FC = () => {
    const style: { [key: string]: React.CSSProperties } = {
        LoginForm: {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        },
        Link: {
            position: 'absolute',
            left: '50%',
            top: '80%',
            transform: 'translate(-50%, -50%)'
        }
    }
    return (<>
        <LoginForm styleProps={style.LoginForm}/>
        <Link to={Path.register} style={style.Link}>ユーザー登録はこちらから</Link>
    </>)
}
export default Login;
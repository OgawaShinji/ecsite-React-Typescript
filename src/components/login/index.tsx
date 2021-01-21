import React from "react"
import LoginForm from "~/components/login/LoginForm";
import {Link} from 'react-router-dom'
import {Path} from "~/router/routes";

const Login: React.FC = () => {
    const style: { [key: string]: React.CSSProperties } = {
        LoginForm: {},
        Link: {}
    }
    return (<>
        <div style={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            width: "50%",
            margin: "0 auto",
            transform:"translateY(50%)"
        }}>
            <LoginForm styleProps={style.LoginForm}/>
            <Link to={Path.register} style={style.Link}>ユーザー登録はこちらから</Link>
        </div>
    </>)
};
export default Login;
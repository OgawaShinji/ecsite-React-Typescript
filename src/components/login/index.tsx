import React from "react"
import LoginForm from "~/components/login/LoginForm";
import {Link} from 'react-router-dom'
import {Path} from "~/router/routes";
import {createStyles, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const Login: React.FC = () => {
    const loginStyle = makeStyles(() => createStyles({
        LoginForm: {},
        Link: {},
        login_form: {
            textAlign: "center",
            width: "25%",
            marginTop: "7%",
            marginLeft: "37%",

        }
    }))
    const classes = loginStyle();

    return (
        <Grid container justify={"center"} className={classes.login_form}>
            <Grid item xs={12}>
                <LoginForm/>
            </Grid>
            <Grid item xs={12} style={{paddingTop: "10%"}}>
                <Link to={Path.register}>ユーザー登録はこちらから</Link>
            </Grid>
        </Grid>
    )
};

export default Login;
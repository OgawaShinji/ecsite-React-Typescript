import React, {useEffect} from "react"
import LoginForm from "~/components/login/LoginForm";
import {Link} from 'react-router-dom'
import {Path} from "~/router/routes";
import {createStyles, Grid, LinearProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {AppDispatch} from "~/store";
import {useDispatch, useSelector} from "react-redux";
import {selectIsLoading, setIsLoading} from "~/store/slices/App/displayUI.slice"

const Login: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading)
    useEffect(() => {
        dispatch(setIsLoading(false))
    }, [dispatch])
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

    return (isLoading ?
            <LinearProgress style={{width: "60%", marginTop: "20%", marginLeft: "20%"}}/>
            : <Grid container justify={"center"} className={classes.login_form}>
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
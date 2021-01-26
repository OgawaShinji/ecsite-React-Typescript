import React, {FC, useEffect, useState} from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {Button, Grid} from "@material-ui/core";

import {Link, RouteComponentProps, useHistory, withRouter} from 'react-router-dom'
import {Path} from "~/router/routes";
import {logout} from "~/store/slices/App/auth.slice";
import {AppDispatch} from "~/store";
import {useDispatch} from "react-redux";
import {setError} from "~/store/slices/App/error.slice"

interface Props {
    isLogin: boolean
}


const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        header: {
            backgroundColor: "#ffa500",
            height: 80
        },
        headerItem: {
            textDecoration: 'none',
            color: 'white'
        },
        title: {
            flexGrow: 1,
            color: 'white'
        },
        link: {
            textDecoration: 'none',
            color: 'black'
        }
    }),
);

const Header: FC<Props & RouteComponentProps> = (props) => {

    const dispatch: AppDispatch = useDispatch()
    const classes = useStyles();

    const isLogin = props.isLogin
    const [auth, setAuth] = useState(isLogin);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    //エラー画面表示後、別ページへ遷移が行われる時にエラーを非表示にする処理
    const history = useHistory();
    history.listen(() => {
        dispatch(setError({isError: false, code: null}))
    })

    useEffect(() => {
        setAuth(isLogin)
    }, [isLogin])

    /**
     * ログイン時、プロフィールを押下した時にモーダルを表示する関数
     * @param event:React.MouseEvent<HTMLElement>
     * @return void
     */
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    /**
     * ログイン時、プロフィールを押下した時に表示されるモーダルを閉じる関数
     * @return void
     */
    const handleClose = () => {
        setAnchorEl(null);
    };

    /**
     * ログアウト処理
     * @return void
     */
    const logoutInHeader = async () => {
        await handleClose()
        await dispatch(logout()).catch((e) => {
            dispatch(setError({isError: true, code: e.message}))
        });
        props.history.push({pathname: '/login'})
    }

    /**
     * 注文履歴画面へ遷移する関数
     * @return void
     */
    const transitionOrderHistory = () => {
        handleClose();
        props.history.push({pathname: '/history'})
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.header}>
                    <Grid container>
                        <Grid item xs={6} container justify={"center"} alignItems={"center"}>
                            <Link to={Path.itemList} className={classes.link}>
                                <Typography variant="h4" className={classes.title}>
                                    らくらくピザ
                                </Typography>
                            </Link>
                        </Grid>
                        <Grid item xs={2}/>
                        {auth ? (
                            <Grid item xs={3} container justify={"center"} alignItems={"center"}>
                                <Grid item xs={1}/>
                                <Grid item xs={5}>
                                    <Link to={Path.itemList} style={{textDecoration: 'none'}}>
                                        <Button style={{color: 'white'}}>商品一覧</Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={5}>
                                    <Link to={Path.cart} style={{textDecoration: 'none'}}>
                                        <Button style={{color: 'white'}}>カート一覧</Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={1}/>
                            </Grid>
                        ) : (
                            <Grid item xs={3}/>
                        )}
                        <Grid item xs={1}>
                            {auth ? (
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle/>
                                </IconButton>
                            ) : history.location.pathname !== '/login' ? (
                                <Link to={Path.login} className={classes.link}>
                                    <Button color="inherit">Login</Button>
                                </Link>
                            ) : (
                                <div/>
                            )
                            }
                        </Grid>
                    </Grid>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={transitionOrderHistory}>
                            注文履歴
                        </MenuItem>
                        <MenuItem onClick={logoutInHeader}>ログアウト</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withRouter(Header)
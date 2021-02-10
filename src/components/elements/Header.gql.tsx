import React, {useState} from 'react';
import {
    createStyles,
    makeStyles,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    MenuItem,
    Menu,
    Button,
    Grid
} from '@material-ui/core';

import AccountCircle from '@material-ui/icons/AccountCircle';

import {Link, RouteComponentProps, useHistory, withRouter} from 'react-router-dom'
import {Path} from "~/router/routes";

import {AppDispatch} from "~/store";
import {useDispatch} from "react-redux";
import {logout} from "~/store/slices/App/auth.slice";
import {setError} from "~/store/slices/App/error.slice"
import {useFetchUserQuery} from "~/generated/graphql";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        header: {
            backgroundColor: "#ffa500",
            height: 80
        },
        header_content: {
            paddingTop: 15
        },
        headerItem: {
            textDecoration: 'none',
            color: 'white'
        },
        title: {
            fontWeight: 'bold',
            fontFamily: 'Arial Black',
            fontSize: 40,
            flexGrow: 1,
            color: 'white',
            cursor: 'pointer'
        },
        link: {
            textDecoration: 'none',
            color: 'black'
        },
        login_btn: {
            textDecoration: 'none',
            color: 'black'
        }
    }),
);

const Header: React.FC<RouteComponentProps> = (props) => {

    const dispatch: AppDispatch = useDispatch();
    const classes = useStyles();

    const {error: fetchUserError} = useFetchUserQuery();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    //エラー画面表示後、別ページへ遷移が行われる時にエラーを非表示にする処理
    const history = useHistory();

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
        await handleClose();
        await dispatch(logout()).catch((e) => {
            dispatch(setError({isError: true, code: e.message}));
        });
        props.history.push({pathname: '/login'});
    }

    /**
     * 注文履歴画面へ遷移する関数
     * @return void
     */
    const transitionOrderHistory = () => {
        handleClose();
        props.history.push({pathname: '/history'});
    }

    /**
     * 商品一覧画面へ遷移する関数
     * @return void
     */
    const toItemList = () => {
        props.history.push({pathname: Path.itemList, state: {judge: true}});
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.header}>
                    <Grid container className={classes.header_content}>
                        <Grid item xs={6} container justify={"center"} alignItems={"center"}>
                            <Typography align="center" className={classes.title} onClick={toItemList}>
                                    <span style={{color: "red"}}>
                                       R
                                    </span>
                                akuraku&nbsp;
                                <span style={{color: "red"}}>
                                        P
                                    </span>
                                izza&nbsp;
                                <span style={{fontSize: 40}}>
                                        🍕
                                    </span>
                            </Typography>
                        </Grid>
                        <Grid item xs={2}/>
                        {!(fetchUserError) ? (
                            <Grid item xs={3} container justify={"center"} alignItems={"center"}>
                                <Grid item xs={1}/>
                                <Grid item xs={5}>
                                    <Button style={{color: 'white'}} onClick={toItemList}>商品一覧</Button>
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
                            {!(fetchUserError) ? (
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
                                <Link to={Path.login} className={classes.login_btn}>
                                    <Button
                                        variant="outlined"
                                        color="inherit"
                                    >
                                        Login
                                    </Button>
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
};

export default withRouter(Header);
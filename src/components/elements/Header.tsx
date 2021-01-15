import React, {FC, useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {Button} from "@material-ui/core";

import {Link} from 'react-router-dom'
import {Path} from "~/router/routes";
import {logout} from "~/store/slices/App/auth.slice";
import {AppDispatch} from "~/store";
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },
        link: {
            textDecoration: 'none'
        }
    }),
);

const Header: FC = () => {

    const dispatch: AppDispatch = useDispatch()
    const classes = useStyles();

    const [auth, setAuth] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const userToken = localStorage.getItem("Authorization")

    useEffect(() => {
        if (userToken) {
            setAuth(true)
        } else {
            setAuth(false)
        }
    }, [userToken])

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
    const logoutInHeader = () => {
        handleClose()
        dispatch(logout());
        setAuth(false)
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Link to={Path.itemList} className={classes.link}>
                        <Typography variant="h5" className={classes.title}>
                            らくらくラーメン
                        </Typography>
                    </Link>
                    <Link to={Path.itemList} className={classes.link}>商品一覧</Link>
                    <Link to={Path.cart} className={classes.link}>カート一覧</Link>
                    {auth ? (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
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
                                <MenuItem onClick={handleClose}>
                                    <Link to={Path.history} className={classes.link}>注文履歴</Link>
                                </MenuItem>
                                <MenuItem onClick={logoutInHeader}>ログアウト</MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <Link to={Path.login} className={classes.link}>
                            <Button color="inherit">Login</Button>
                        </Link>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header
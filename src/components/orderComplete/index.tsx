import React, {useEffect} from "react";
import {Button, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {Path} from "~/router/routes";

import { withRouter, RouteComponentProps, useLocation} from 'react-router-dom';
import {THEME_COLOR_2} from "~/assets/color";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            padding: theme.spacing(20),
            height: 200
        },
        space: {
            padding: theme.spacing(5),
            height: 30
        },
        pad: {
          padding: theme.spacing(2)
        },
        button: {
            backgroundColor: THEME_COLOR_2,
            '&:hover': {
                backgroundColor: THEME_COLOR_2,
            },
            color: 'white'
        }
    }),
);
const OrderComplete: React.FC<RouteComponentProps> = props => {

    const location = useLocation<{ judge: boolean }>();

    const routeHistory = useHistory();

    const classes = useStyles();

    useEffect(() => {
        if (!location.state) {
            props.history.push('/');
        }
    }, [location.state, props.history])

    /**
     * [トップ画面に戻る]ボタン押下時の処理　トップ（商品一覧）画面に遷移　
     */
    const handleClickBackToTop = () => {
        routeHistory.push(Path.itemList);
    }

    return (
        <>
            <Grid container justify="center" alignItems="center" className={classes.form} >
                <Grid item xs={12} className={classes.pad}>
                    <Typography component="h4" variant="h4" className={classes.space} align={"center"}>
                        決済が完了しました！
                    </Typography>
                    <Typography component="h6" variant="h6" align={"center"}>
                        この度はご注文ありがとうございます。
                    </Typography>
                    <Typography component="h6" variant="h6" align={"center"}>
                        お支払先は、お送りしたメールに記載してありますのでご確認ください。
                    </Typography>
                    <Typography component="h6" variant="h6" align={"center"}>
                        メールが届かない場合は「注文履歴」からご確認ください。
                    </Typography>
                </Grid>
                <Button
                    className={classes.button}
                    variant="contained"
                    onClick={handleClickBackToTop}
                >トップ画面に戻る</Button>

            </Grid>
        </>
    )

}
export default withRouter(OrderComplete);
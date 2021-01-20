import {FC} from "react";
import {Button, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {Path} from "~/router/routes";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            padding: theme.spacing(20),
            height:200
        },
        space: {
            padding: theme.spacing(5),
            height:30
        }
    }),
);

const OrderComplete: FC = () => {

    const routeHistory = useHistory();

    const classes = useStyles();

    /**
     * [トップ画面に戻る]ボタン押下時の処理　トップ（商品一覧）画面に遷移　
     */
    const handleClickBackToTop = () => {
        routeHistory.push(Path.itemList);
    }

    return (
        <>
            <Grid container spacing={0} justify="center" alignItems="center" className={classes.form}>
                <Grid item justify="center" xs={12}>
                    <Typography component="h4" variant="h4" className={classes.space}>
                        決済が完了しました！
                    </Typography>
                    <Typography component="h6" variant="h6">
                        この度はご注文ありがとうございます。
                    </Typography>
                    <Typography component="h6" variant="h6">
                        お支払先は、お送りしたメールに記載してありますのでご確認ください。
                    </Typography>
                    <Typography component="h6" variant="h6">
                        メールが届かない場合は「注文履歴」からご確認ください。
                    </Typography>
                </Grid>
                <Grid item justify="center" xs={12} className={classes.space}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClickBackToTop}
                    >トップ画面に戻る</Button>
                </Grid>

            </Grid>

        </>
    )
}
export default OrderComplete;
import React from "react"
import {Grid, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {
        position: "absolute",/* ←絶対位置 */
        bottom: 0,
        width: "100%",
        backgroundColor: '#696969',
        paddingTop: 50,
        paddingBottom: 30,
        color: 'white'
    },
    footer: {
        height: 100,
    },
    title: {
        fontWeight: 'bold',
        fontFamily: "'Zapfino', 'Gabriola'",
        fontSize: 45,
        flexGrow: 1,
        color: 'white'
    },
    footerItemContent: {
        "padding-left": "20%",
        "padding-right": "20%",
        "padding-top": 40,
    },
    footerItem: {
        margin: "auto"
    }
}))

const Footer: React.FC = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid className={classes.footer}>
                <Grid item container justify={"center"} alignItems={"center"}>
                    <Typography align="center" className={classes.title}>
                                    <span style={{color: "red"}}>
                                       R
                                    </span>
                        akuraku&nbsp;&nbsp;
                        <span style={{color: "red"}}>
                                        P
                                    </span>
                        izza&nbsp;&nbsp;
                        <span style={{fontSize: 40}}>
                                        🍕
                                    </span>
                    </Typography>
                </Grid>
                <Grid item container justify={"center"} alignItems={"center"} className={classes.footerItemContent}>
                    <Grid item className={classes.footerItem}>
                        about
                    </Grid>
                    <Grid item className={classes.footerItem}>
                        ご意見
                    </Grid>
                    <Grid item className={classes.footerItem}>
                        プライバシー
                    </Grid>
                    <Grid item className={classes.footerItem}>
                        採用情報
                    </Grid>
                    <Grid item className={classes.footerItem}>
                        Help
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
export default Footer;
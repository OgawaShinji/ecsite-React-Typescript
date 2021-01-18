import React from "react"
import {AppBar, makeStyles, Toolbar, Typography} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    title: {
        flexGrow: 1
    }
}))

const Footer: React.FC = () => {

    const classes = useStyles();

    return (<>
        <AppBar position={"absolute"}>
            <Toolbar>
                <Typography variant={"h6"} className={classes.title}>
                    らくらくラーメン
                </Typography>

            </Toolbar>
        </AppBar>
    </>)
}
export default Footer;
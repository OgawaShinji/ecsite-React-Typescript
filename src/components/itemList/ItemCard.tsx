import React from "react";

import {Paper, makeStyles, Grid, Avatar, CardActionArea, Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: '100%',
        height: 'auto'
    },
    title: {
        margin: theme.spacing(1),
        fontSize: 20,
        fontWeight: 'bold'
    },
    size: {
        backgroundColor: '#FF6666',
        width: theme.spacing(3),
        height: theme.spacing(3),
        fontSize: 12
    },
    control: {
        margin: theme.spacing(1),
        display: 'flex'
    }
}));

const ItemCard: React.FC = () => {

    const classes = useStyles();

    return (
        <div>
            <Paper elevation={0}>
                <CardActionArea>
                    <Grid container justify={"center"} alignItems={"center"}>
                        <Grid item xs={12}>
                            <Avatar variant={"rounded"} alt={'pizza'}
                                    src={"http://34.84.118.239/static/img/item/17.jpg"}
                                    className={classes.avatar}>P</Avatar>
                        </Grid>
                    </Grid>
                    <Grid container justify={"center"} alignItems={"center"}>
                        <Typography className={classes.title}>
                            じゃがバターベーコン
                        </Typography>
                    </Grid>
                    <Grid container justify={"center"} alignContent={"center"}>
                        <Grid item className={classes.control}>
                            <Avatar className={classes.size}>M</Avatar>&nbsp;
                            <Typography>
                                1,000円
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container justify={"center"} alignContent={"center"}>
                        <Grid item className={classes.control}>
                            <Avatar className={classes.size}>L</Avatar>&nbsp;
                            <Typography>
                                1,500円
                            </Typography>
                        </Grid>
                    </Grid>
                </CardActionArea>
            </Paper>
        </div>
    );
};

// TODO: setItemDetailが成功したらページ遷移（thenブロックで遷移処理書く）

export default ItemCard;
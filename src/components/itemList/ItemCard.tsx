import React from "react";

import {Paper, makeStyles, Grid, Avatar, CardActionArea, Typography} from '@material-ui/core';
import {Item} from '~/types/interfaces';

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: '100%',
        height: 'auto'
    },
    title: {
        margin: theme.spacing(1),
        fontSize: 18,
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

type Props = {
    item: Item;
}

const ItemCard: React.FC<Props> = props => {

    const classes = useStyles();

    return (
        <div>
            <Paper elevation={0}>
                <CardActionArea>
                    <Grid container justify={"center"} alignItems={"center"}>
                        <Grid item xs={12}>
                            <Avatar variant={"rounded"} alt={'pizza'}
                                    src={props.item.imagePath}
                                    className={classes.avatar}/>
                        </Grid>
                    </Grid>
                    <Grid container justify={"center"} alignItems={"center"}>
                        <Typography className={classes.title}>
                            {props.item.name}
                        </Typography>
                    </Grid>
                    <Grid container justify={"center"} alignContent={"center"}>
                        <Grid item className={classes.control}>
                            <Avatar className={classes.size}>M</Avatar>&nbsp;
                            <Typography>
                                {props.item.priceM.toLocaleString()}円
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container justify={"center"} alignContent={"center"}>
                        <Grid item className={classes.control}>
                            <Avatar className={classes.size}>L</Avatar>&nbsp;
                            <Typography>
                                {props.item.priceL.toLocaleString()}円
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
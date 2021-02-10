import React from "react";
import {useHistory} from 'react-router-dom';

import {Paper, makeStyles, Grid, Avatar, CardActionArea, Typography} from '@material-ui/core';

import {ItemType} from "~/generated/graphql";

type Props = {
    item: ItemType;
};

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

const ItemCardGQL: React.FC<Props> = props => {

    const history = useHistory();
    const classes = useStyles();

    const toItemDetail = () => {
        console.log(props.item.id)
        history.push({pathname: `/itemDetail/${props.item.id}`});
    };

    return (
        <div>
            <Paper elevation={0}>
                <CardActionArea onClick={toItemDetail}>
                    <Grid container justify={"center"} alignItems={"center"}>
                        <Grid item xs={12}>
                            <Avatar variant={"rounded"} alt={'pizza'}
                                    src={props.item!.imagePath!}
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
                                {props.item!.priceM!.toLocaleString()}円
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container justify={"center"} alignContent={"center"}>
                        <Grid item className={classes.control}>
                            <Avatar className={classes.size}>L</Avatar>&nbsp;
                            <Typography>
                                {props.item!.priceL!.toLocaleString()}円
                            </Typography>
                        </Grid>
                    </Grid>
                </CardActionArea>
            </Paper>
        </div>
    );
};

export default ItemCardGQL;
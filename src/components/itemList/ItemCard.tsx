import React from "react";
import {useHistory} from 'react-router-dom';

import {useDispatch} from "react-redux";
import {AppDispatch} from "~/store";
import {setItemDetail} from '~/store/slices/Domain/item.slice';

import {Paper, makeStyles, Grid, Avatar, CardActionArea, Typography} from '@material-ui/core';

import {Item} from '~/types/interfaces';
import {setError} from "~/store/slices/App/error.slice";

type Props = {
    item: Item;
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

const ItemCard: React.FC<Props> = props => {

    const dispatch: AppDispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const dispatchItemDetail = async () => {
        dispatch(setItemDetail(props.item));
    };

    const toItemDetail = () => {
        dispatchItemDetail()
            .then(() => {
                history.push({pathname: `/itemDetail/${props.item.id}`});
            })
            .catch((e) => {
                dispatch(setError({isError: true, code: e.message}));
            });
    };

    return (
        <div>
            <Paper elevation={0}>
                <CardActionArea onClick={toItemDetail} role={'cardActionArea'}>
                    <Grid container justify={"center"} alignItems={"center"}>
                        <Grid item xs={12}>
                            <Avatar variant={"rounded"} alt={'pizza'}
                                    src={props.item.imagePath}
                                    className={classes.avatar}/>
                        </Grid>
                    </Grid>
                    <Grid container justify={"center"} alignItems={"center"}>
                        <Typography className={classes.title} role={'typoItemName'}>
                            {props.item.name}
                        </Typography>
                    </Grid>
                    <Grid container justify={"center"} alignContent={"center"}>
                        <Grid item className={classes.control}>
                            <Avatar className={classes.size} role={'avatarM'}>M</Avatar>&nbsp;
                            <Typography role={'typoPriceM'}>
                                {props.item.priceM.toLocaleString()}円
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container justify={"center"} alignContent={"center"}>
                        <Grid item className={classes.control}>
                            <Avatar className={classes.size} role={'avatarL'}>L</Avatar>&nbsp;
                            <Typography role={'typoPriceL'}>
                                {props.item.priceL.toLocaleString()}円
                            </Typography>
                        </Grid>
                    </Grid>
                </CardActionArea>
            </Paper>
        </div>
    );
};

export default ItemCard;
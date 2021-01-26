import React, {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {fetchItems, selectItemCount, selectItems} from "~/store/slices/Domain/item.slice";
import {setError} from "~/store/slices/App/error.slice";
import {AppDispatch} from "~/store";

import {Button, Grid, makeStyles, Typography, Paper} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";

import SearchArea from "~/components/itemList/SearchArea";
import OptionForm from "~/components/itemList/OptionForm";
import ItemCard from "~/components/itemList/ItemCard";

import {animateScroll as scroll} from 'react-scroll';
import {SearchForm} from "~/types/interfaces";

const useStyles = makeStyles((theme) => ({
    itemCard: {
        margin: theme.spacing(1)
    },
    pagination: {
        margin: theme.spacing(3)
    },
    search0: {
        fontSize: '15px',
        fontWeight: 'bold',
        color: 'red',
        margin: theme.spacing(3)
    },
    control: {
        margin: theme.spacing(2)
    },
    paper: {
        backgroundColor: '#EEEEEE'
    }
}));

const ItemList: React.FC = () => {

    const dispatch: AppDispatch = useDispatch();
    const classes = useStyles();

    // 表示件数
    const displayItems = [
        {
            value: 9,
            label: '9件'
        },
        {
            value: 18,
            label: '18件'
        }
    ];

    // storeからstateの取得
    const items = useSelector(selectItems);
    const itemCount = useSelector(selectItemCount);

    // コンポーネント上のstate
    const [displayCount, setDisplayCount] = useState(displayItems[0].value);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchItems({itemName: '', sortId: 0}))
            .catch((e) => {
                dispatch(setError({isError: true, code: e.message}));
            });
    }, [dispatch]);

    useEffect(() => {
        // 総ページ数の算出
        let totalPageCount;
        if (items) {
            if (items.length % displayCount === 0) {
                totalPageCount = items.length / displayCount;
            } else {
                totalPageCount = Math.floor((items.length / displayCount) + 1);
            }
            setPageCount(totalPageCount);
            setPage(1);
        }

    }, [items, displayCount]);

    const handleSearch = (searchForm: SearchForm) => {
        dispatch(fetchItems(searchForm))
            .catch((e) => {
                dispatch(setError({isError: true, code: e.message}));
            });
    }

    const handleShowAll = () => {
        dispatch(fetchItems({itemName: '', sortId: 0}))
            .catch((e) => {
                dispatch(setError({isError: true, code: e.message}));
            });
    }

    return (
        <div>

            <Grid container justify={"center"} alignItems={"center"} className={classes.control}>

                {/*検索フォーム*/}
                <Grid item xs={7}>
                    <Paper variant={"outlined"} elevation={0} color={'#FFFFFF'} className={classes.paper}>
                        <Grid container justify={"center"} alignItems={"center"}>
                            <Grid item xs={12}>
                                <SearchArea handleSearch={(searchForm) => {
                                    handleSearch(searchForm)
                                }}/>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/*表示件数切り替え*/}
                <Grid item xs={2}>
                    <Grid container justify={"center"} alignItems={"center"}>
                        <OptionForm label={'表示件数'} value={displayCount} optionItems={displayItems}
                                    handleChange={(val) => {
                                        setDisplayCount(val);
                                    }}/>
                    </Grid>
                </Grid>
            </Grid>

            {/*商品一覧*/}
            <Grid container justify={"center"} alignItems={"center"}>
                <Grid item xs={10}>
                    <Grid container justify={"center"} alignItems={"center"}>
                        {itemCount && itemCount !== items?.length && (
                            // 一覧表示数と全商品数が一致しない場合に表示
                            <Grid container justify={"center"} alignItems={"center"}>
                                <Button color={"default"} variant={"outlined"} onClick={handleShowAll}
                                        className={classes.control}>
                                    商品を全件表示する
                                </Button>
                            </Grid>
                        )}

                        {items && items.slice(displayCount * (page - 1), displayCount * page).map((item) => (
                            // 商品一覧を表示
                            <Grid key={item.id} item xs={3} className={classes.itemCard}>
                                <ItemCard item={item}/>
                            </Grid>
                        ))}

                        {items && items.length === 0 && (
                            // 検索結果が0件の場合に表示
                            <Typography className={classes.search0}>
                                検索された商品は存在しません。
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </Grid>

            {/*Pagination*/}
            {items && items.length !== 0 && (
                <Grid container justify={"center"} alignItems={"center"}>
                    <Pagination count={pageCount} page={page} onChange={(e, val) => {
                        setPage(val);
                        scroll.scrollToTop();
                    }} className={classes.pagination} size={"large"}/>
                </Grid>
            )}

            {items && items.length !== 0 && (
                <Grid container justify={"center"} alignItems={"center"}>
                    ※価格は全て税抜です。
                </Grid>
            )}
        </div>
    );
};

export default ItemList;
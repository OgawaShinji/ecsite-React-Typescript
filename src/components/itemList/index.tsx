import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "~/store";
import {fetchItems, selectItemCount, selectItems} from "~/store/slices/Domain/item.slice";
import {setError} from "~/store/slices/App/error.slice";

import SearchArea from "~/components/itemList/SearchArea";
import OptionForm from "~/components/itemList/OptionForm";
import ItemCard from "~/components/itemList/ItemCard";

import {Button, Grid, LinearProgress, makeStyles, Paper, Typography} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";

import {animateScroll as scroll} from 'react-scroll';

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
    controlPadding: {
        padding: theme.spacing(2)
    },
    controlMargin: {
        margin: theme.spacing(2)
    },
    paper: {
        backgroundColor: '#EEEEEE'
    }
}));

const ItemList: React.FC = () => {

    const dispatch: AppDispatch = useDispatch();
    const classes = useStyles();
    const location = useLocation<{ judge: boolean }>();

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
    const [displayCount, setDisplayCount] = useState(displayItems[0].value);   // 表示件数
    const [pageCount, setPageCount] = useState(0);   // 総ページ数
    const [page, setPage] = useState(1);   // 現在のページ
    const [sortId, setSortId] = useState(0);   // 並び順
    const [itemName, setItemName] = useState('');   // 検索ワード
    const [isLoading, setIsLoading] = useState(false); // loading

    useEffect(() => {
        dispatch(fetchItems({itemName: '', sortId: 0}))
            .catch((e) => {
                dispatch(setError({isError: true, code: e.message}));
            });
    }, [dispatch]);

    useEffect(() => {
        setIsLoading(true);
        const loading = async () => {
            setTimeout(() => {
                setIsLoading(false);
            }, 500)
        }
        loading().then(() => {
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
        });

    }, [items, displayCount]);

    // methods
    /**
     * 商品検索を行う.
     **/
    const search = () => {
        setIsLoading(true);
        dispatch(fetchItems({itemName: itemName, sortId: sortId}))
            .catch((e) => {
                dispatch(setError({isError: true, code: e.message}));
            });
    };

    /**
     * 商品一覧を全件表示に戻し、検索フォームをリセットする.
     **/
    const showAll = () => {
        setIsLoading(true);
        dispatch(fetchItems({itemName: '', sortId: 0}))
            .then(() => {
                setSortId(0);
                setItemName('');
            })
            .catch((e) => {
                dispatch(setError({isError: true, code: e.message}));
            });
    };

    // Headerのロゴ、商品一覧ボタンを押した際に走る処理
    // 検索フォームをリセットし、全件表示に戻す
    if (location.state) {
        if (location.state.judge) {
            showAll();
            location.state.judge = false;
        }
    }

    return (
        <div>
            <Grid container justify={"center"} alignItems={"center"} className={classes.controlPadding}>

                {/*検索フォーム*/}
                <Grid item xs={7}>
                    <Paper variant={"outlined"} elevation={0} color={'#FFFFFF'} className={classes.paper}>
                        <Grid container justify={"center"} alignItems={"center"}>
                            <Grid item xs={12}>
                                <SearchArea itemName={itemName} sortId={sortId} handleItemNameChange={(itemName) => {
                                    setItemName(itemName)
                                }} handleSortIdChange={(sortId) => {
                                    setSortId(sortId)
                                }} handleSearch={search}/>
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
            {isLoading ? (
                <Grid container justify={"center"} alignItems={"center"}>
                    <Grid item xs={7}>
                        <LinearProgress style={{margin: '10%'}}/>
                    </Grid>
                </Grid>
            ) : (
                <Grid container justify={"center"} alignItems={"center"}>
                    <Grid item xs={10}>
                        <Grid container justify={"center"} alignItems={"center"}>
                            {itemCount && itemCount !== items?.length && (
                                // 一覧表示数と全商品数が一致しない場合に表示
                                <Grid container justify={"center"} alignItems={"center"}>
                                    <Button color={"default"} variant={"outlined"} onClick={showAll}
                                            className={classes.controlMargin}>
                                        商品を全件表示する
                                    </Button>
                                </Grid>
                            )}

                            {items && items.slice(displayCount * (page - 1), displayCount * page).map((item) => (
                                // 商品一覧を表示
                                <Grid key={item.id} item xs={3} className={classes.itemCard} role={`item${item.id}`}>
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
            )}

            {/*Pagination*/}
            {!isLoading && items && items.length !== 0 && (
                <div>
                    <Grid container justify={"center"} alignItems={"center"}>
                        <Pagination count={pageCount} page={page} onChange={(e, val) => {
                            setPage(val);
                            scroll.scrollToTop();
                        }} className={classes.pagination} size={"large"}/>
                    </Grid>
                    <Grid container justify={"center"} alignItems={"center"}>
                        ※価格は全て税抜です。
                    </Grid>
                </div>
            )}
        </div>
    );
};

export default ItemList;
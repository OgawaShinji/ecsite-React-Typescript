import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import ItemCardGQL from "~/components/itemList/ItemCard.gql";
import SearchAreaGQL from "~/components/itemList/SearchArea.gql";
import OptionFormGQL from "~/components/itemList/OptionForm.gql";

import {Button, Grid, LinearProgress, makeStyles, Paper, Typography} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";

import {animateScroll as scroll} from 'react-scroll';

import {useFetchItemsQuery, useFetchItemsTotalCountQuery} from '~/generated/graphql';
import ErrorPage from "~/components/error";

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

const ItemListGQL: React.FC = () => {

    const classes = useStyles();
    const location = useLocation<{ judge: boolean }>();

    // 表示件数
    const displayItems = [
        {
            value: '9',
            label: '9件'
        },
        {
            value: '18',
            label: '18件'
        }
    ];

    const [displayCount, setDisplayCount] = useState(Number(displayItems[0].value));   // 表示件数
    const [pageCount, setPageCount] = useState(0);   // 総ページ数
    const [page, setPage] = useState(1);   // 現在のページ
    const [sort, setSort] = useState('price_m');   // 並び順
    const [itemName, setItemName] = useState('');   // 検索ワード
    const [searchArg, setSearchArg] = useState<{ itemName: string, sort: string }>({
        itemName: '',
        sort: 'price_m'
    })

    const {data: itemsData, loading: isLoadItemsData, error: fetchItemsError} = useFetchItemsQuery({
        variables: {
            itemName: searchArg.itemName,
            sort: searchArg.sort
        }
    })
    const {data: totalCountData, error: fetchItemsTotalCountError} = useFetchItemsTotalCountQuery();


    useEffect(() => {
        // 総ページ数の算出
        let totalPageCount;
        let length: number | undefined;
        length = itemsData?.items?.edges.length;

        if (length) {
            if (length % displayCount === 0) {
                totalPageCount = length / displayCount;
            } else {
                totalPageCount = Math.floor((length / displayCount) + 1);
            }
            setPageCount(totalPageCount);
            setPage(1);
        }
    }, [itemsData, displayCount]);

    // methods
    /**
     * 商品検索を行う.
     **/
    const search = () => {
        setSearchArg({
            itemName: itemName,
            sort: sort
        })
    };

    /**
     * 商品一覧を全件表示に戻し、検索フォームをリセットする.
     **/
    const showAll = () => {
        setItemName('');
        setSort('price_m');
        setSearchArg({
            itemName: '',
            sort: 'price_m'
        })
    };

    // Headerのロゴ、商品一覧ボタンを押した際に走る処理
    // 検索フォームをリセットし、全件表示に戻す
    if (location.state) {
        if (location.state.judge) {
            showAll();
            location.state.judge = false;
        }
    }

    // Error画面の表示
    // BadRequest
    if (fetchItemsError?.graphQLErrors[0] && fetchItemsError?.graphQLErrors[0].extensions?.code === "BAD_REQUEST") return <ErrorPage
        code={404}/>
    // BadRequest以外
    if (fetchItemsError || fetchItemsTotalCountError) return <ErrorPage code={500}/>

    return (
        <div>
            <Grid container justify={"center"} alignItems={"center"} className={classes.controlPadding}>

                {/*検索フォーム*/}
                <Grid item xs={7}>
                    <Paper variant={"outlined"} elevation={0} color={'#FFFFFF'} className={classes.paper}>
                        <Grid container justify={"center"} alignItems={"center"}>
                            <Grid item xs={12}>
                                <SearchAreaGQL itemName={itemName} sort={sort} handleItemNameChange={(itemName) => {
                                    setItemName(itemName)
                                }} handleSortIdChange={(sort) => {
                                    setSort(sort)
                                }} handleSearch={search}/>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/*表示件数切り替え*/}
                <Grid item xs={2}>
                    <Grid container justify={"center"} alignItems={"center"}>
                        <OptionFormGQL label={'表示件数'} value={String(displayCount)} optionItems={displayItems}
                                       handleChange={(val) => {
                                           setDisplayCount(Number(val));
                                       }}/>
                    </Grid>
                </Grid>
            </Grid>

            {/*商品一覧*/}
            {isLoadItemsData ? (
                <Grid container justify={"center"} alignItems={"center"}>
                    <Grid item xs={7}>
                        <LinearProgress style={{margin: '10%'}}/>
                    </Grid>
                </Grid>
            ) : (
                <Grid container justify={"center"} alignItems={"center"}>
                    <Grid item xs={10}>
                        <Grid container justify={"center"} alignItems={"center"}>
                            {totalCountData && totalCountData.items && totalCountData.items.totalCount !== itemsData?.items?.edges.length && (
                                // 一覧表示数と全商品数が一致しない場合に表示
                                <Grid container justify={"center"} alignItems={"center"}>
                                    <Button color={"default"} variant={"outlined"} onClick={showAll}
                                            className={classes.controlMargin}>
                                        商品を全件表示する
                                    </Button>
                                </Grid>
                            )}

                            {itemsData && itemsData.items!.edges.slice(displayCount * (page - 1), displayCount * page).map(item =>
                                // 商品一覧を表示
                                <Grid key={item!.node!.id!} item xs={3} className={classes.itemCard}
                                      role={`item${item!.node!.id}`}>
                                    <ItemCardGQL item={item!.node!}/>
                                </Grid>
                            )}

                            {itemsData && itemsData.items!.edges.length === 0 && (
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
            {!isLoadItemsData && itemsData && itemsData.items!.edges.length !== 0 && (
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

export default ItemListGQL;
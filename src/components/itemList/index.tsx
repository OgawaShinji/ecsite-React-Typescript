import React, {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {fetchItems, selectItems} from "~/store/slices/Domain/item.slice";

import {Grid, makeStyles} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";

import SearchArea from "~/components/itemList/SearchArea";
import OptionForm from "~/components/itemList/OptionForm";
import ItemCard from "~/components/itemList/ItemCard";

const useStyles = makeStyles((theme) => ({
    itemCard: {
        margin: theme.spacing(1)
    },
    pagination: {
        margin: theme.spacing(3)
    }
}));

const ItemList: React.FC = () => {

    const dispatch = useDispatch();
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

    // コンポーネント上のstate
    const [displayCount, setDisplayCount] = useState(displayItems[0].value);
    const [pageCount, setPageCount] = useState(items.length / displayCount);
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchItems({itemName: '', sortId: 0}));
    }, [dispatch]);

    useEffect(() => {
        // 総ページ数の算出
        let totalPageCount;
        if (items.length % displayCount === 0) {
            totalPageCount = items.length / displayCount;
        } else {
            totalPageCount = Math.floor((items.length / displayCount) + 1);
        }
        setPageCount(totalPageCount);
        setPage(1);
    }, [items, displayCount]);

    return (
        <div>
            <Grid container justify={"center"} alignItems={"center"}>
                {/*検索フォーム*/}
                <Grid item xs={8}>
                    <SearchArea handleSearch={(searchForm) => {
                        dispatch(fetchItems(searchForm))
                    }}/>
                </Grid>

                {/*表示件数切り替え*/}
                <Grid item xs={2}>
                    <OptionForm label={'表示件数'} value={displayCount} optionItems={displayItems} handleChange={(val) => {
                        setDisplayCount(val);
                    }}/>
                </Grid>
            </Grid>

            {/*商品一覧*/}
            <Grid container justify={"center"} alignItems={"center"}>
                <Grid item xs={10}>
                    <Grid container justify={"center"} alignItems={"center"}>
                        {items && items.slice(displayCount * (page - 1), displayCount * page).map((item) => (
                            <Grid key={item.id} item xs={3} className={classes.itemCard}>
                                <ItemCard item={item}/>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            {/*Pagination*/}
            <Grid container justify={"center"} alignItems={"center"}>
                <Pagination count={pageCount} page={page} onChange={(e, val) => {
                    setPage(val)
                }} className={classes.pagination} size={"large"}/>
            </Grid>

            <Grid container justify={"center"} alignItems={"center"}>
                ※価格は全て税込です。
            </Grid>
        </div>
    );
};

export default ItemList;
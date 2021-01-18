import React, {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {fetchItems, selectItems} from "~/store/slices/Domain/item.slice";

import SearchArea from "~/components/itemList/SearchArea";
import {Grid} from "@material-ui/core";
import OptionForm from "~/components/itemList/OptionForm";

const ItemList: React.FC = () => {

    const dispatch = useDispatch();

    // 表示件数
    const displayItems = [
        {
            value: 9,
            label: '9件'
        },
        {
            value: 15,
            label: '15件'
        }
    ];
    const [displayCount, setDisplayCount] = useState(displayItems[0].value);

    // storeからstateの取得
    const items = useSelector(selectItems);

    useEffect(() => {
        dispatch(fetchItems({itemName: '', sortId: 0}));
    }, [dispatch]);

    return (
        <div style={{backgroundColor: 'rgb(211, 211, 211)'}}>
            <Grid container justify={"center"} alignItems={"center"}>
                <Grid item xs={8}>
                    <SearchArea handleSearch={(searchForm) => {
                        dispatch(fetchItems(searchForm))
                    }}/>
                </Grid>
                <Grid item xs={2}>
                    <OptionForm label={'表示件数'} value={displayCount} optionItems={displayItems} handleChange={(val) => {
                        setDisplayCount(val);
                    }}/>
                </Grid>
            </Grid>

            {items && items.map((item) => (
                <div key={item.id}>Mサイズ価格：{item.priceM}</div>
            ))}
        </div>
    )
}
export default ItemList;
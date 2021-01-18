import React, {useEffect, useState} from "react";
import OptionForm from "~/components/itemList/OptionForm";

import {useDispatch, useSelector} from "react-redux";
import {fetchItemNames, selectItemNames} from "~/store/slices/Domain/item.slice";

import {SearchForm} from '~/types/interfaces';

import {Button, Grid, TextField} from "@material-ui/core";
import {Autocomplete} from '@material-ui/lab';
import {Search} from "@material-ui/icons";

type Props = {
    handleSearch: (searchForm: SearchForm) => void;
}

const SearchArea: React.FC<Props> = props => {

    const dispatch = useDispatch();
    const optionItems = [
        {
            value: 0,
            label: '安い順'
        },
        {
            value: 1,
            label: '高い順'
        }
    ];

    // storeからstateの取得
    const itemNames = useSelector(selectItemNames);

    useEffect(() => {
        dispatch(fetchItemNames());
    }, [dispatch]);

    // searchForm stateとして管理
    const [sortId, setSortId] = useState(optionItems[0].value);
    const [itemName, setItemName] = useState('');

    // methods
    const search = () => {
        props.handleSearch({itemName: itemName, sortId: sortId});
    };

    return (
        <div style={{backgroundColor: 'rgb(211, 211, 100)'}}>
            <Grid container justify={"center"} alignItems={"center"}>
                <Grid item xs={1}>
                    <Search fontSize={"default"}/>
                </Grid>
                <Grid item xs={7}>
                    <Autocomplete
                        id="item-name-auto"
                        freeSolo
                        onInputChange={(e, val) => {
                            setItemName(val);
                        }}
                        options={itemNames.map((itemName) => itemName)}
                        renderInput={(params) => (
                            <TextField {...params} label="商品名" margin="normal" variant="outlined"/>
                        )}
                    />
                </Grid>
                <Grid item xs={2}>
                    <OptionForm label={'並び替え'} value={sortId} optionItems={optionItems} handleChange={(sortId) => {
                        setSortId(sortId);
                    }}/>
                </Grid>
                <Grid item xs={1}>
                    <Button variant={"contained"} color={"primary"} disableElevation onClick={() => {
                        search();
                    }}>
                        検索
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default SearchArea;
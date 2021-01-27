import React, {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import {fetchItemNames, selectItemNames} from "~/store/slices/Domain/item.slice";
import {setError} from "~/store/slices/App/error.slice";
import {AppDispatch} from "~/store";

import OptionForm from "~/components/itemList/OptionForm";
import {Button, Grid, TextField} from "@material-ui/core";
import {Autocomplete} from '@material-ui/lab';
import {Search} from "@material-ui/icons";

type Props = {
    itemName: string;
    sortId: number;
    handleItemNameChange: (itemName: string) => void;
    handleSortIdChange: (sortId: number) => void;
    handleSearch: () => void;
}

const SearchArea: React.FC<Props> = props => {

    const dispatch: AppDispatch = useDispatch();
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
        dispatch(fetchItemNames())
            .catch((e) => {
                dispatch(setError({isError: true, code: e.message}));
            });
    }, [dispatch]);

    // methods
    /**
     * 検索を行う(親コンポーネントへイベントアップ).
     */
    const search = () => {
        props.handleSearch();
    };

    /**
     * Enter押下時にsearch()を行う.
     * @param key キー
     */
    const handleKeyPress = (key: string) => {
        if (key === 'Enter') search();
    }

    return (
        <div>
            <Grid container justify={"center"} alignItems={"center"}>
                <Grid item xs={1}>
                    <Grid container justify={"center"} alignItems={"flex-end"}>
                        <Search fontSize={"default"}/>
                    </Grid>
                </Grid>
                <Grid item xs={7}>
                    <Autocomplete
                        id="item-name-auto"
                        freeSolo
                        onInputChange={(e, val) => {
                            props.handleItemNameChange(val);
                        }}
                        value={props.itemName}
                        options={itemNames.map((itemName) => itemName)}
                        renderInput={(params) => (
                            <TextField {...params} label="商品名" margin="normal" variant="outlined"
                                       onKeyPress={(e) => handleKeyPress(e.key)}/>
                        )}
                    />
                </Grid>
                <Grid item xs={2}>
                    <OptionForm label={'並び替え'} value={props.sortId} optionItems={optionItems}
                                handleChange={(sortId) => {
                                    props.handleSortIdChange(sortId);
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
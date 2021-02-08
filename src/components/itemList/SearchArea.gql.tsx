import React, {useEffect, useState} from "react";

import OptionFormGQL from "~/components/itemList/OptionForm.gql";

import {Button, Grid, TextField} from "@material-ui/core";
import {Autocomplete} from '@material-ui/lab';
import {Search} from "@material-ui/icons";

import {useFetchItemsQuery} from "~/generated/graphql";

type Props = {
    itemName: string;
    sort: string;
    handleItemNameChange: (itemName: string) => void;
    handleSortIdChange: (sortId: string) => void;
    handleSearch: () => void;
}

const SearchAreaGQL: React.FC<Props> = props => {

    const optionItems = [
        {
            value: 'price_m',
            label: '安い順'
        },
        {
            value: '-price_m',
            label: '高い順'
        }
    ];

    const {data: itemsData, loading: isLoadItemsData} = useFetchItemsQuery({
        variables: {
            itemName: '',
            sort: 'price_m'
        }
    })

    const [itemNames, setItemNames] = useState<Array<string>>([])

    useEffect(() => {
        if (!isLoadItemsData) {
            const itemNames = itemsData!.items!.edges.map((item) => item!.node!.name)
            setItemNames(itemNames);
        }
    }, [isLoadItemsData, itemsData]);

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
                    <OptionFormGQL label={'並び替え'} value={props.sort} optionItems={optionItems}
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

export default SearchAreaGQL;
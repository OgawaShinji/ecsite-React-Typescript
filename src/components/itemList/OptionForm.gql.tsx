import React from "react";
import {FormControl, Select, InputLabel, makeStyles, MenuItem} from "@material-ui/core";

type OptionItem = {
    value: string;
    label: string;
};

type Props = {
    label: string;
    value: string;
    optionItems: Array<OptionItem>;
    handleChange: (value: string) => void;
};

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 90,
    }
}));

const OptionFormGQL: React.FC<Props> = props => {

    const classes = useStyles();

    // optionのJSX作成
    const menuItems = props.optionItems.map((item) => (
        <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
    ));

    return (
        <FormControl variant="standard" className={classes.formControl} role={'formControl'}>
            <InputLabel role={'inputLabel'}>{props.label}</InputLabel>
            <Select
                labelId="select-form-label"
                id="select-form"
                value={props.value}
                onChange={(e) => {
                    props.handleChange(String(e.target.value))
                }}
                label={props.label}
            >
                {menuItems}
            </Select>
        </FormControl>
    );
};

export default OptionFormGQL;
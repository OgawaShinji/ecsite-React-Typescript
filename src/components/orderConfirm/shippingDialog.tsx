import React, {useState} from "react";
import {
    Button, createStyles,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, Grid,
    makeStyles, Paper, TextField, Theme,
} from "@material-ui/core";
import {User} from "~/types/interfaces";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: 400,
            },
        },
        pad:{
            padding: theme.spacing(3),
        },
        root2: {
            width: 550,
        },
        color: {
            backgroundColor: "#ffa500",
            color: "white"
        }
    }),
);

export interface SimpleDialogProps {
    open: boolean;
    close:() => void;
    changeUserInfo: (userInfo: User) => void;
}

const ShippingDialog: React.FC<SimpleDialogProps> = (props) => {

    const classes = useStyles();
    const { open } = props;
    //デフォルト情報をセット
    const [name, setName] = useState<{ value: string, errorMessage: string }>({
        value: '',
        errorMessage: ''
    })
    const [email, setEmail] = useState<{ value: string, errorMessage: string }>({
        value: '',
        errorMessage: ''
    })
    const [zipcode, setZipcode] = useState<{ value: string, errorMessage: string }>({
        value: '',
        errorMessage: ''
    })
    const [address, setAddress] = useState<{ value: string, errorMessage: string }>({
        value: '',
        errorMessage: ''
    })
    const [telephone, setTelephone] = useState<{ value: string, errorMessage: string }>({
        value: '',
        errorMessage: ''
    })

    const nameValidation = (value: string): string => {
        if (!value || value === '') return '*名前を入力してください'
        return ''
    }
    const emailValidation = (value: string): string => {
        if (!value) return '※メールアドレスを入力してください';
        const regex = /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!regex.test(value) || value.length > 100) return '※正しい形式でメールアドレスを入力してください';
        return ''
    }
    const zipcodeValidation = (value: string): string => {
        if (!value || value === '' ) return '*郵便番号を入力してください'
        if ( 7 < value.length ) return '*7字以内で入力してください'
        return ''
    }
    const addressValidation = (value: string): string => {
        if (!value || value === '') return '*住所を入力してください'
        if ( 200 < value.length ) return '*200字以内で入力してください'
        return ''
    }
    const telephoneValidation = (value: string): string => {
        if (!value || value === '') return '*電話番号を入力してください'
        if ( 15 < value.length ) return '*15字以内で入力してください'
        return ''
    }

    //入力された情報を動的に更新
    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName({
            value:event.target.value,
            errorMessage:nameValidation(event.target.value)
        })
    }
    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail({
            value:event.target.value,
            errorMessage:emailValidation(event.target.value)
        })
    }
    const handleChangeZipcode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setZipcode({
            value:event.target.value,
            errorMessage:zipcodeValidation(event.target.value)
        })
    }
    const handleChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress({
            value:event.target.value,
            errorMessage:addressValidation(event.target.value)
        })
    }
    const handleChangeTel = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTelephone({
            value:event.target.value,
            errorMessage:telephoneValidation(event.target.value)
        })
    }


    const updateUserInfo = async () => {
        const userInfo = {
            name: name.value,
            email: email.value,
            zipcode: zipcode.value,
            address: address.value,
            telephone: telephone.value,
        }
        props.changeUserInfo(userInfo);
        await props.close();
    }
    return(
        <>
            <Dialog open={open}  >
                {/*ユーザー登録と同じ様な変更用フォームを表示*/}
                <DialogTitle id="simple-dialog-title">お届け先情報</DialogTitle>
                <DialogContent >
                    <Grid container alignContent="center" justify="center" className={classes.pad}>
                        <Paper elevation={0} className={classes.root2}>
                            <Grid container alignContent="center" justify="center" className={classes.pad}>
                                <div className={classes.root}>
                                    <div style={{color: 'red'}}>{name.errorMessage}</div>
                                    <TextField
                                        id="standard-error"
                                        label="名前"
                                        variant="outlined"
                                        value={name.value}
                                        error={name.errorMessage.length > 0}
                                        onChange={handleChangeName}
                                    />
                                    <div style={{color: 'red'}}>{email.errorMessage}</div>
                                    <TextField
                                        id="filled-error"
                                        label="メールアドレス"
                                        variant="outlined"
                                        value={email.value}
                                        error={email.errorMessage.length > 0}
                                        onChange={handleChangeEmail}
                                    />
                                    <div style={{color: 'red'}}>{zipcode.errorMessage}</div>
                                    <TextField
                                        id="outlined-error"
                                        label="郵便番号（ハイフンなし）"
                                        variant="outlined"
                                        value={zipcode.value}
                                        error={zipcode.errorMessage.length > 0}
                                        onChange={handleChangeZipcode}
                                    />
                                    <div style={{color: 'red'}}>{address.errorMessage}</div>
                                    <TextField
                                        id="filled-error"
                                        label="住所"
                                        variant="outlined"
                                        value={address.value}
                                        error={address.errorMessage.length > 0}
                                        onChange={handleChangeAddress}
                                    />
                                    <div style={{color: 'red'}}>{telephone.errorMessage}</div>
                                    <TextField
                                        id="outlined-error"
                                        label="電話番号"
                                        variant="outlined"
                                        value={telephone.value}
                                        error={telephone.errorMessage.length > 0}
                                        onChange={handleChangeTel}
                                    />
                                </div>
                            </Grid>
                        </Paper>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.color} variant={"contained"} onClick={props.close}>閉じる</Button>
                    <Button className={classes.color} variant={"contained"} onClick={updateUserInfo}>変更する</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ShippingDialog
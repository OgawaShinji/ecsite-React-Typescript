import React from "react";
import {
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    makeStyles, TextField,
} from "@material-ui/core";
import {User} from "~/types/interfaces";


const useStyles = makeStyles({
    form: {
        flexDirection: 'column',
        width: 'fit-content',
    },
    root: {
        '& > *': {
            width: '65ch',
        },
    }
});
export interface SimpleDialogProps {
    open: boolean;
    close:() => void;
    changeUserInfo: (userInfo: User) => void;
}

const ShippingDialog: React.FC<SimpleDialogProps> = (props) => {

    const classes = useStyles();
    const { open } = props;
    //デフォルト情報をセット
    const [name, setName] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [zipcode, setZipcode] = React.useState<string>('');
    const [address, setAddress] = React.useState<string>('');
    const [telephone, setTelephone] = React.useState<string>('');

    //入力された情報を動的に更新
    const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }
    const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }
    const changeZipcode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setZipcode(event.target.value)
    }
    const changeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value)
    }
    const changeTelephone = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTelephone(event.target.value)
    }

    const updateUserInfo = async () => {
        const userInfo = {
            id:0,
            name: name,
            email: email,
            zipcode: zipcode,
            address: address,
            telephone: telephone,
            status:0,
        }
        props.changeUserInfo(userInfo);
        await props.close();
    }

    return(
        <>
            <Dialog open={open}  >
                {/*ユーザー登録と同じ様な変更用フォームを表示*/}
                <DialogTitle id="simple-dialog-title">お届け先情報</DialogTitle>
                <DialogContent className={classes.root}>
                    <form className={classes.form} noValidate >
                        <div>
                            <TextField id="standard-basic" margin="dense"
                                       fullWidth label="お名前" value={name}
                                       onChange={changeName}
                            />
                        </div>
                        <div>
                            <TextField id="standard-basic" margin="dense"
                                       fullWidth  label="メールアドレス" value={email}
                                       onChange={changeEmail}
                            />
                        </div>
                        <div>
                            <TextField id="standard-basic" margin="dense"
                                       fullWidth  label="郵便番号" value={zipcode}
                                       onChange={changeZipcode}
                            />
                        </div>
                        <div>
                            <TextField id="standard-basic" margin="dense"
                                       fullWidth  label="住所" value={address}
                                       onChange={changeAddress}
                            />
                        </div>
                        <div>
                            <TextField id="standard-basic" margin="dense"
                                       fullWidth  label="電話番号" value={telephone}
                                       onChange={changeTelephone}
                            />
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <button onClick={props.close}>閉じる</button>
                    <button onClick={updateUserInfo}>変更する</button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ShippingDialog
import React from "react";
import {Card} from "@material-ui/core";

import {useHistory} from 'react-router-dom';
import {Path} from "~/router/routes";

type ErrorProps = {
    code?: string
}
const ErrorPage: React.FC<ErrorProps> = (props) => {

    const history = useHistory();

    if (props.code === 'UNAUTHORIZED') {
        localStorage.removeItem('Authorization');
        history.push(Path.login);
    }
    let errorMessage = props.code === 'INTERNAL_SERVER_ERROR' ? "現在メンテナンス中です。" : "お探しのページが見つかりません。";

    return (<div style={{
        textAlign: "center",
        width: "80%",
        marginTop: "20%",
        marginLeft: "10%"
    }}>
        <Card style={{backgroundColor: "#ffa500"}}>
            {errorMessage}
        </Card>
    </div>)
};
export default ErrorPage;
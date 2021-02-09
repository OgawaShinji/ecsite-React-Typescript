import React from "react";
import {Card} from "@material-ui/core";

type ErrorProps = {
    code?: number
}
const ErrorPage: React.FC<ErrorProps> = (props) => {
    let errorMessage = props === 500 ? "現在メンテナンス中です。" : "お探しのページが見つかりません。"
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
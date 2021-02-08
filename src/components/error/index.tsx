import React from "react";
import {Card} from "@material-ui/core";

const ErrorPage: React.FC = () => {
    let errorMessage = "現在メンテナンス中です。"
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
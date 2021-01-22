import React from "react";
import {useSelector} from "react-redux";
import {selectError} from "~/store/slices/App/error.slice";
import {Card} from "@material-ui/core";

const ErrorPage: React.FC = () => {
    const error = useSelector(selectError);
    let errorMessage = "現在メンテナンス中です。"
    return (<div style={{
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        width: "80%",
        margin: "0 auto",
        transform: "translateY(50%)"
    }}>
        {error.code}
        <Card style={{backgroundColor: "#ffa500"}}>
            {errorMessage}
        </Card>
    </div>)
};
export default ErrorPage;
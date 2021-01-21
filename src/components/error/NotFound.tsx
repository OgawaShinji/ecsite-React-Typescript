import React from "react";
import {Card, Typography} from "@material-ui/core";

const NotFound: React.FC = () => {

    return (<>
        <div style={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            width: "80%",
            margin: "0 auto",
            transform: "translateY(50%)"
        }}>
            <Card style={{backgroundColor:"#ffa500"}}>
                <Typography variant={"h2"} color={"initial"}>お探しのページが見つかりませんでした。</Typography>
            </Card>
        </div>
    </>)
};
export default NotFound;
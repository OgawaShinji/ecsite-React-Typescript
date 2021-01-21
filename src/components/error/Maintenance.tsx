import {Card, Typography} from "@material-ui/core";
import React from "react";

const Maintenance: React.FC = () => {
    return (<>
        <div style={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            width: "80%",
            margin: "0 auto",
            transform: "translateY(50%)"
        }}>
            <Card style={{backgroundColor: "#ffa500"}}>
                <Typography variant={"h2"} color={"initial"}>現在メンテナンス中です。</Typography>
            </Card>
        </div>
    </>)
}
export default Maintenance;
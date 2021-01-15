import {FC, useEffect} from "react";
import {OrderItem} from "~/types/interfaces"
import {ListItem} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";

interface Props {
    orderItem: OrderItem
}

const CartItem: FC<Props> = (props) => {
    useEffect(() => {
        console.log(props.orderItem)
    })
    return (
       <ListItem>
           cartItem
       </ListItem>
    )
}
export default CartItem;
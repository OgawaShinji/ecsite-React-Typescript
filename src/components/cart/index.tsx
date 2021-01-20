import {FC} from "react";
import CartList from "./CartList"
import Header from "~/components/elements/Header"
import Footer from "~/components/elements/Footer"

const Cart: FC = () => {
    return (
        <div>
            <Header/>
            <CartList/>
            <Footer/>
        </div>
    )
}
export default Cart;
import React, {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import {
    fetchOrderHistory,
    fetchOrderHistoryTotalCount,
    selectOrderHistoryTotalCount
} from "~/store/slices/Domain/history.slice";

const OrderConfirm: React.FC = () => {

    const dispatch = useDispatch();

    //const orders = useSelector(selectOrders);
    const ordersTotalCount = useSelector(selectOrderHistoryTotalCount);

    useEffect(() => {
        dispatch(fetchOrderHistory({displayCount: 5, pageNum: 1}));
        dispatch(fetchOrderHistoryTotalCount());
    }, [dispatch])

    return (
        <>
            {ordersTotalCount}
        </>
    )
}
export default OrderConfirm;
import React, {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import {fetchItems, fetchItemNames, selectItems, selectItemNames} from "~/store/slices/Domain/item.slice";

const ItemList: React.FC = () => {

    const dispatch = useDispatch();

    // stateからデータを取得
    const items = useSelector(selectItems);
    const itemNames = useSelector(selectItemNames);

    useEffect(() => {
        dispatch(fetchItems({itemName: '', sortId: 0}));
        dispatch(fetchItemNames());
    }, [dispatch])

    return (
        <>
            {items && items.map((item) => (
                <div key={item.id}>Mサイズ価格：{item.priceM}</div>
            ))}

            {itemNames && itemNames.map((itemName, index) => (
                <div key={index}>{itemName}</div>
            ))}
        </>
    )
}
export default ItemList;
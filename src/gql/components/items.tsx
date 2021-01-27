import {useFetchItemNamesQuery, useFetchItemsLazyQuery, useFetchItemsQuery} from "~/gql/generated/graphql";

export const Items: React.FC = () => {
    const {loading, error, data, refetch, networkStatus} = useFetchItemNamesQuery();

    const [getItems] = useFetchItemsLazyQuery({
        fetchPolicy: "network-only",
    });
    const handleClick = () => {
        const items = getItems({
            variables: {first: 9, offset: 0, sort: "priceM", name: ""},
        })
        console.log(items)
    }

    if (loading) return (<div>loading</div>);
    if (error) return (<div>error</div>);

    return (
        <div>
            items:{data?.items?.edges.map((n) => {
            return <p>{n?.node?.name}</p>
        })}<br/>
            <button type={"button"} onClick={() => handleClick()}>button</button>
        </div>
    )
}


import {useFetchItemNamesQuery, useFetchItemsLazyQuery, useFetchItemsQuery} from "~/gql/generated/graphql";
import {InMemoryCache} from "@apollo/client";

export const Items: React.FC = () => {
    const {loading, error, data, refetch, networkStatus} = useFetchItemNamesQuery();

    const [getItems, {data: items}] = useFetchItemsLazyQuery({
        fetchPolicy: "network-only",
    });
    console.log(data?.items?.edges[0]?.node?.name)
    const handleClick = () => {
        getItems({
            variables: {f: 9, offset: 0, sort: "priceM", name: ""},
        })
        //fetchしてくる前に走るので1回目のみundefinedが返って来てしまう
        console.log(items?.items?.edges[0])
    }

    const cache=new InMemoryCache(({
        typePolicies:{
        }
    }))
    if (loading) return (<div>loading</div>);
    if (error) return (<div>error</div>);

    return (
        <div>
            {/*items:{data?.items?.edges.map((n) => {
            return <p>{n?.node?.name}</p>
        })}<br/>*/}
            <button type={"button"} onClick={() => handleClick()}>button</button>
        </div>
    )
}


import {useFetchItemsQuery} from "~/gql/generated/graphql";

export const Items: React.FC = () => {
    const {loading, error, data} = useFetchItemsQuery();
    if (loading) return (<div>loading</div>)
    if (error) return (<div>error</div>)
    const handleClick = () => {

    }
    return (
        <div>
            items:<br/>
            {data?.items?.edges.length}
        </div>
    )
}
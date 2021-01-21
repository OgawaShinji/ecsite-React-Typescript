import NotFound from "~/components/error/NotFound";
import Maintenance from "~/components/error/Maintenance";

type ErrorProps = {
    errorCode?: number
}
const ErrorPage: React.FC<ErrorProps> = props => {
    return (<>
        {props.errorCode === 404 ? <NotFound/> : <Maintenance/>}
    </>)
}
export default ErrorPage;
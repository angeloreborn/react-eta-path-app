import React from 'react'
import { 
    useParams,
    useLocation,
    useHistory,
} from "react-router-dom";
import Redirect from './Redirect';
interface Props {
    token: string | undefined
    children: any
}

/*
 * Authorize component wraps around routed components 
 * that require the current authorization token
 */
function Authorize(props: Props) {
    let history = useHistory()
    let params = useParams()   
    let location = useLocation()

    // Requests user authentication
    // Redirects to callback after success
    if (props.token === undefined){
        history.push({
             pathname:'/signin',
             search:`callback=${location.pathname}`       
         })
    }
    const {
        children,
        token
    } = props

    const Child = React.cloneElement(children, {
        token:token,
        params: params,
    }, null)

    if (!props.token)
    return (<Redirect to='/signin'/>)
    return (<>{Child}</>)
}

export default Authorize
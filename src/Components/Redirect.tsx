import {
    useHistory,
  } from "react-router-dom";

interface Props {
    to: string
}

// TODO error checking
function Redirect(props: Props) {
    useHistory().push(props.to)
    return (<> </>)
}

export default Redirect

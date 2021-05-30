import { PureComponent, ReactNode } from 'react'
import _View from './_View'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

interface Props {
    params?: Params
    token?: string | undefined
}
interface State { }

export interface Params {
    id: number
}

class View extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {}
    }

    render(): ReactNode {
        return (
            <main>
                
                <h1>View Package</h1>

                <_View
                    token={this.props.token}
                    params={this.props.params}
                />

                <Link to={`/package/edit/${this.props.params?.id}`}>Edit</Link>
                <Link to={`/package/delete/${this.props.params?.id}`}>Delete</Link>
                <Link to="/package/index">Back to packages</Link>

            </main>
        )
    }
}

export default View

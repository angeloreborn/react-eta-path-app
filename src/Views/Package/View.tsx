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
interface State {}

interface Params {
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
                    token = {this.props.token}
                    params = {this.props.params}
                />

                <button>Edit</button>
                <button>Delete</button>
                <Link to="/package">Back to packages</Link>

            </main>
        )
    }
}

export default View

import { PureComponent, ReactNode } from 'react'
import Redirect from './../../Components/Redirect'
import { Params } from './View'
import _View from './_View'


interface Props {
    params?: Params
    token?: string | undefined
}
interface State {
    redirect: ReactNode | undefined
}

class _delete extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            redirect: undefined
        }
        this.handleDelete = this.handleDelete.bind(this)
    }

    // TODO handle res.status
    handleDelete() {
        const options = {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                package_id: this.props.params?.id
            })
        }

        fetch('http://localhost:3000/api/v1/delete_package', options)
            .then(res => res.json())
            .then(json => {
                this.redirectToView()
            })
    }

    redirectToView() {
        this.setState(() => ({
            redirect: <Redirect to={`/package/index`} />
        }))
    }

    render(): ReactNode {
        return (
            <main>
                <h1>Are you sure you want to delete?</h1>
                <_View
                    params={this.props.params}
                    token={this.props.token}
                />
                <button>Go back</button>
                <button onClick={this.handleDelete}>Delete Package</button>
                {this.state.redirect}
            </main>
        )
    }
}

export default _delete

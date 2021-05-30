import { PureComponent, ReactNode } from 'react'
import { PackageForm } from './_Form'
import _Form from './_Form'
import Redirect from '../../Components/Redirect'

interface Props {
    token?: string
}
interface State {
    redirect: ReactNode
}

class Create extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            redirect: undefined
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    // TODO handle req.status
    handleFormSubmit(packageFormData: PackageForm) {
        const options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                package: packageFormData
            })
        }

        fetch('http://localhost:3000/api/v1/create_package', options)
            .then(res => res.json())
            .then(json => {
                this.redirectToView()
                console.log(json)
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
                <_Form onFormSubmit={this.handleFormSubmit}>
                    <button type='submit'>Sumbit</button>
                </_Form>
                {this.state.redirect}
            </main>
        )
    }
}

export default Create

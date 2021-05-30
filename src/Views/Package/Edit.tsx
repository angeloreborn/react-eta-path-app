import { PureComponent, ReactNode } from 'react'
import Redirect from './../../Components/Redirect'
import _Form from './_Form'
import {Package} from './Index'
import {PackageForm} from './_Form'
import {Params} from './View'

interface Props { 
    token? : string,
    params? : Params
}
interface State { 
    package: PackageForm | undefined,
    redirect: ReactNode | undefined
}

class Edit extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            package: undefined,
            redirect: undefined,
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    componentDidMount(){
        if (this.props.params === undefined) return

            const url_params = this.props.params
            const options = {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + this.props.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    package_id: url_params.id
                })
            }
            fetch('http://localhost:3000/api/v1/get_package', options)
                .then(res => {
                    if (res.status === 200)
                        return res.json()
                    throw res.status
                })
                .then((pkgArray: Package[]) => {
                    let pkg = pkgArray[0]
                    this.setState<any>(() => ({
                        package: {
                            referenceNumber: pkg.reference_number,
                            location: pkg.location,
                            destination: pkg.destination,
                            date: pkg.date,
                            time: pkg.timeslot
                        } as PackageForm
                    }))
                })
                .catch((err) => {
                    // handle error
                })
    }

    handleFormSubmit(packageForm : PackageForm){
        const options = {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                package:packageForm,
                package_id:this.props.params?.id
            })
        }

        fetch('http://localhost:3000/api/v1/update_package',options)
        .then(res=> res.json())
        .then(json => {
            this.redirectToView()
        })
    }

    redirectToView() {
        this.setState(() => ({
            redirect: <Redirect to={`/package/view/${this.props.params?.id}`} />
        }))
    }

    render(): ReactNode {
        if (!this.state.package){
            return (<h1>Loading</h1>)
        }else
        return (
            <main>
                <_Form package={this.state.package} onFormSubmit={this.handleFormSubmit}>
                    <button type='submit'>Update Package</button>
                </_Form>
                {this.state.redirect}
            </main>

        )
    }
}

export default Edit

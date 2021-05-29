import { PureComponent, ReactNode } from 'react'
import { Package } from './Index'
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

interface Props {
    params: Params | undefined
    token: string | undefined
}
interface State {
    token: string | undefined,
    package: Package | undefined
}

interface Params {
    id: number
}

class View extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)


        this.state = {
            token: this.props.token,
            package: undefined,
        }
    }
    componentDidMount() {

        if (this.props.params === undefined) return
        else {
            const url_params = this.props.params

            const options = {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + this.state.token,
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
                .then((pkg: Package[]) => {
                    this.setState(() => ({
                        package: pkg[0]
                    }))
                })
                .catch((err) => {
                    // Handle errors
                })

        }
    }
    render(): ReactNode {
        return (
            <div>
                <table>
                    <tbody>
                    <tr>
                        <th>Package ID</th>
                        <td>{this.state.package?.id}</td>
                    </tr>
                    <tr>
                        <th>Reference No.</th>
                        <td>{this.state.package?.reference_number}</td>
                    </tr>
                    <tr>
                        <th>Location</th>
                        <td>{this.state.package?.location}</td>
                    </tr>
                    <tr>
                        <th>Destiation</th>
                        <td>{this.state.package?.destination}</td>
                    </tr>
             
                    <tr>
                        <th>Timeslot</th>
                        <td>{this.state.package?.timeslot}</td>
                    </tr>
                    <tr>
                        <th>Created</th>
                        <td>{this.state.package?.created_at}</td>
                    </tr>
                    <tr>
                        <th>Modified</th>
                        <td>{this.state.package?.updated_at}</td>
                    </tr>
                    </tbody>   
                </table>
            </div>
        )
    }
}

export default View

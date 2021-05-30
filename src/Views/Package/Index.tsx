import React, { PureComponent, ReactNode } from 'react'

import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

interface Props {
    token?: string
}

// Resembles Package model
export interface Package {
    created_at: string
    date: string
    destination: string
    id: number
    location: string
    reference_number: string
    timeslot: string
    updated_at: string
    user_id: number
}

interface State {
    token: string | undefined,
    packages: Package[] | undefined
}

class PackageIndex extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
        console.log(this.props)
        this.state = {
            token: this.props.token,
            packages: undefined
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/v1/get_packages', {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + this.state.token,
            }
        })
            .then(res => res.json())
            .then(json => {
                let packages: Package[] = json
                this.setState(() => ({
                    packages: packages
                }))
            })
    }

    render(): ReactNode {
        if (!this.state.packages) {
            return <h1>Loading</h1>
        } else {
            return (
                <main>
                    <h1>Package Index</h1>
                    <Link to="/package/new">
                        <button>New package</button>
                    </Link>

                    <table>
                        <thead>
                            <tr>
                                <td>Reference<div>Number</div></td>
                                <td>Location</td>
                                <td>Destination</td>
                                <td>Timeslot</td>
                                <td>Created On</td>
                                <td>Last Update</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.packages.map(pkg => (
                                <tr key={pkg.id}>
                                    <td>{pkg.reference_number}</td>
                                    <td>{pkg.location}</td>
                                    <td>{pkg.destination}</td>
                                    <td>{pkg.timeslot}</td>
                                    <td>{pkg.created_at}</td>
                                    <td>{pkg.updated_at}</td>

                                    <Link to={`/package/view/${pkg.id}`}>view</Link>
                                    <Link to={`/package/edit/${pkg.id}`}>edit</Link>
                                    <Link to={`/package/delete/${pkg.id}`}>delete</Link>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            )
        }
    }
}

export default PackageIndex

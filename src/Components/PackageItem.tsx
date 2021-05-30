import React, { PureComponent, ReactNode } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

interface Props { 
    id: number,
    date?: string,
    time?: string,
    location?: string,
    destination: string,
    reference: string,
}
interface State {}

class PackageItem extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
        
        this.state = {

        }
    }

    render(): ReactNode {
        return (
            <div className='package-item'>
                <div className='container-left-25'>
                    <div className='date-box'>
                        <div>Date</div>
                        <div>{this.props.date}</div>

                    </div>
                    <div>
                        <div className='package-time-label'>Time</div>
                        <div className='package-time'>{this.props.time}</div>
                    </div>

                </div>
                <div className='container-right75'>

                    <table>
                        <tr>
                            <td className='table-header-light'>Location</td>
                            <td className='table-value-main'>{this.props.location}</td>
                        </tr>
                        <tr>
                            <td className='table-header-light'>Destination</td>
                            <td className='table-value-secondary'>{this.props.destination}</td>
                        </tr>
                    </table>

                </div>
                <div>
                    <Link to={`/package/view/${this.props.id}`}>
                        <button>View</button>
                    </Link>
                    <Link to={`/package/edit/${this.props.id}`}>
                        <button>Edit</button>
                    </Link>
                    <Link to={`/package/delete/${this.props.id}`}>
                        <button className='btn-delete'>Delete</button>
                    </Link>
                 
                 
                 
                    <div>
                        <div className='ref-txt-light'>{this.props.reference}</div>
                    </div>

                </div>
            </div>
        )
    }
}

export default PackageItem

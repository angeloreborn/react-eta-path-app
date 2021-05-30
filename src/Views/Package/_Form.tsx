import React, { PureComponent, ReactNode } from 'react'

export interface PackageForm {
    referenceNumber: string
    location: string
    destination: string
    date: string
    time: string
}

interface Props {
    onFormSubmit: Function,
    children: ReactNode,
    package?: PackageForm | undefined
}

interface State {
    referenceNo: string | undefined
    location: string | undefined
    destination: string | undefined
    date: string | undefined
    time: string | undefined
}

/*
* Partial form that is used to build Interface:PackageForm
*
* Callback props.onFormSubmit passes PackageForm object to parent
* TODO form validation
*/
class _Form extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            referenceNo: this.props.package?.referenceNumber,
            date: this.props.package?.date,
            destination: this.props.package?.destination,
            location: this.props.package?.location,
            time: this.props.package?.time
        }
        this.handleFormChange = this.handleFormChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    componentDidMount() {
        if (this.state.time) {
            let date = new Date(this.state.time)
            let time = date.toTimeString().split(' ')[0]
            this.setState<any>(() => ({
                time: time
            }))
        }
    }
    handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState<any>(() => ({
            [e.target.name]: e.target.value
        }))
    }

    handleFormSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        this.props.onFormSubmit(this.state)
    }

    render(): ReactNode {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <div>
                    reference number
                <input
                        onChange={this.handleFormChange}
                        name="referenceNo"
                        value={this.state.referenceNo}
                    />
                </div>
                <div>
                    Location
                <input
                        onChange={this.handleFormChange}
                        name="location"
                        value={this.state.location}
                    />
                </div>
                <div>
                    Destination
                <input
                        onChange={this.handleFormChange}
                        name="destination"
                        value={this.state.destination}
                    />
                </div>
                <div>
                    Date
                <input
                        onChange={this.handleFormChange}
                        name="date"
                        type="date"
                        value={this.state.date}
                    />
                </div>
                <div>
                    Time
                <input
                        onChange={this.handleFormChange}
                        name="time"
                        type="time"
                        value={this.state.time}
                    />
                </div>

                {this.props.children} # submit trigger element passed here
            </form>
        )
    }
}

export default _Form

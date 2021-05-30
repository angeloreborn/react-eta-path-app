import React, { PureComponent, ReactNode } from 'react'

import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import PackageItem from '../../Components/PackageItem';

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

                    {this.state.packages.map(pkg => {
                        let time = new Date(pkg.timeslot)
                        let timeTrail = ''
                        if (time.getHours() > 12){
                            timeTrail += 'PM'
                        }else{
                            timeTrail += 'AM'
                        }
                        let timeHHMM = `${time.getHours()}:${time.getMinutes()}${timeTrail}`
                        return <div className='package-wrap'>
                            <PackageItem
                                    id={pkg.id}
                                    location={pkg.location}
                                    destination={pkg.destination}
                                    date={pkg.date}
                                    time={timeHHMM}
                                    reference={pkg.reference_number}
                                />
                            </div>
                    })}
                    

                </main>
            )
        }
    }
}

export default PackageIndex

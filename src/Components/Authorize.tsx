import React, { PureComponent, ReactNode } from 'react'

interface Props {
    token: string
    children: any
}
interface State {
    token: string,
}

/*
 * Authorize component wraps around routed components 
 * that require the current authorization token
 */
class Authorize extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
        
        this.state = {
            token: this.props.token,
        }
        this.render = this.render.bind(this)   
    }

    // Clones child props to push new prop'token'
    render(): ReactNode {
        const Child = React.cloneElement(this.props.children, {token:this.state.token}, null)
        return (<>{Child}</>)
    }
}

export default Authorize

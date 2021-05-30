import React, { PureComponent, ReactNode } from 'react'
import Redirect from './../../Components/Redirect'

type Status = 'failed' | 'success'

interface Props {
    pushToken: Function
}

interface State {
    email: string,
    password: string,
    output: string,
    callback: string,
    redirect: any
}

interface AuthResponse {
    status: Status,
    errors?: string,
    message?: string,
    token?: string,
}

class SignIn extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            output: '',
            callback: '/',
            redirect: undefined
        }
    }
    // TODO make code more readable
    componentDidMount() {
        if (window.location.search) {
            let sp = window.location.search
            if (sp.length != 0) {
                let path = sp.split('=')[1]
                this.setState(() => ({
                    callback: path
                }))
            }
        }
    }
    handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState(() => ({
            email: e.target.value
        }))
    }

    handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState(() => ({
            password: e.target.value
        }))
    }

    updateTokenState = (token: string | undefined) => {
        this.props.pushToken(token)
    }


    handleSumbit = (e: React.FormEvent) => {
        e.preventDefault()
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }
        fetch('http://localhost:3000/api/v1/request_token', options)
            .then(res => res.json())
            .then((json: AuthResponse) => {
                if (json.status === 'failed') {
                    // handle fail status   
                }
                else{
                    this.updateTokenState(json.token)
                    this.setState(() => ({
                        redirect: <Redirect to={this.state.callback} />
                    }))
                }
            })
    }

    render(): ReactNode {
        return (
            <main>
                <h1>Sign In</h1>
                <form onSubmit={this.handleSumbit}>
                    <div>
                        <label>
                            <input id="email" autoComplete="on" placeholder='Enter email' type="email" value={this.state.email} name="email" onChange={this.handleEmailChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            <input placeholder='Enter password' type="password" value={this.state.password} name="name" onChange={this.handlePasswordChange} />
                        </label>
                    </div>
                    <button type="submit">Login</button>
                </form>
                {this.state.output}

                <button onClick={() => this.updateTokenState(Math.random.toString())}>Set Session</button>
                {this.state.redirect}
            </main>
        )
    }
}

export default SignIn

import { PureComponent, ReactNode } from 'react'
import Authorize from './Components/Authorize'
import Signin from './Views/User/SignIn'
import './App.scss'

// Views for Package
import PackageIndex from './Views/Package/Index'
import PackageView from './Views/Package/View'
import PackageDelete from './Views/Package/Delete'
import PackageEdit from './Views/Package/Edit'
import PackageCreate from './Views/Package/Create'

import PackageItem from './Components/PackageItem'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

interface Props { }

interface State {
  token: string | undefined
}

class App extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      token: undefined
    }

    this.handleToken = this.handleToken.bind(this)
  }

  handleToken(token: string | undefined) {
    this.setState(() => ({
      token: token
    }))
  }

  render(): ReactNode {
    return (
      <body>
        <Router>
          <header>
            <Link to="/">Home</Link>
            <Link to="/package/index">Packages</Link>
            <div>
              {!this.state.token &&
                <Link to="/signin">
                  <a className='nav-link'>Sign in</a>
                </Link>
              }
              {this.state.token &&
                <a className='nav-link' onClick={() => this.handleToken(undefined)}>Logout</a>
              }
            </div>
          </header>

          <Switch>

            <Route path="/signin">
              <Signin pushToken={this.handleToken} />
            </Route>

            <Route path="/package/index">
              <Authorize token={this.state.token}>
                <PackageIndex />
              </Authorize>
            </Route>

            <Route path="/package/view/:id">
              <Authorize token={this.state.token}>
                <PackageView></PackageView>
              </Authorize>
            </Route>

            <Route path="/package/edit/:id">
              <Authorize token={this.state.token}>
                <PackageEdit></PackageEdit>
              </Authorize>
            </Route>

            <Route path="/package/new">
              <Authorize token={this.state.token}>
                <PackageCreate></PackageCreate>
              </Authorize>
            </Route>

            <Route path="/package/delete/:id">
              <Authorize token={this.state.token}>
                <PackageDelete></PackageDelete>
              </Authorize>
            </Route>

            <Route path="/">
              <main>  
                <h1>Home</h1>
             
              </main>
            
            </Route>

          </Switch>

        </Router>
      </body>

    )
  }
}

export default App;

import { PureComponent, ReactNode} from 'react'

import './App.css';
import Signin from './Views/User/SignIn'
import Authorize from './Components/Authorize'
import PackageIndex from './Views/Package/Index'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

interface Props {}

interface State {
  token: string
}

class App extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      token: 'test-token'
    }

    this.handleToken = this.handleToken.bind(this)
  }

  handleToken(token: string) {
    this.setState(() => ({
      token: token
    }))
  }

  render(): ReactNode {
    return (
        <Router>

          <Link to="/">Home</Link>
          <Link to="/signin">Sign In</Link>
          <Link to="/package">Packages</Link>

          <Switch>

            <Route path="/package">
              <Authorize token={this.state.token}>
                <PackageIndex />
              </Authorize>
            </Route>

            <Route path="/signin">
              <Signin pushToken={this.handleToken} />
            </Route>
            <Route path="/">
            </Route>

          </Switch>
          
        </Router>
    )
  }
}

// function App() {
//   return (

//   );
// }

export default App;

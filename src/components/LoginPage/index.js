import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    isChecked: false,
    isError: false,
    errorMsg: '',
  }

  getName = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  checkInput = event => {
    if (event.target.checked) {
      this.setState(prevState => ({isChecked: !prevState.isChecked}))
    } else {
      this.setState({isChecked: false})
    }
  }

  successfullyLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwtToken', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitDetails = async event => {
    const {username, password} = this.state
    event.preventDefault()
    const person = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(person),
    }

    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)

    if (response.ok) {
      this.successfullyLogin(data.jwt_token)
    } else {
      this.setState({errorMsg: data.error_msg, isError: true})
    }
  }

  render() {
    const {username, password, isChecked, errorMsg, isError} = this.state
    console.log(errorMsg)
    const passwordViewType = isChecked ? 'text' : 'password'

    return (
      <div className="login-container">
        <div className="login-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="logo"
            width={130}
          />
          <form className="login-form-container" onSubmit={this.submitDetails}>
            <div className="input-container">
              <label htmlFor="name">USERNAME</label> <br />
              <input
                type="name"
                className="input"
                id="name"
                placeholder="rahul"
                onChange={this.getName}
              />
            </div>
            <div className="input-container-password">
              <label htmlFor="password">PASSWORD</label> <br />
              <input
                type={passwordViewType}
                className="input"
                id="password"
                placeholder="rahul@2021"
                onChange={this.getPassword}
              />
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                className="checkbox-input"
                onChange={this.checkInput}
              />
              <span>Show password</span>
            </div>
            <button className="login-btn" type="submit">
              Login
            </button>
            {isError && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage

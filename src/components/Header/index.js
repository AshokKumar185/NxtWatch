import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import './index.css'

const Header = props => {
  const ClickToLogout = () => {
    const {history} = props
    Cookies.remove('jwtToken')
    history.replace('/login')
  }

  const overStyle = {
    backgroundColor: '#8888',
  }

  const clickToHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <nav className="nav-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        alt="company logo"
        width={100}
        onClick={clickToHome}
      />
      <ul className="nav-list-container">
        <li>
          <button type="button" className="profile-btn">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
              width={35}
              className="logo"
            />
          </button>
        </li>
        <li>
          <Popup
            modal
            trigger={
              <button type="button" className="logout-btn lo-btn">
                Logout
              </button>
            }
            overlayStyle={overStyle}
          >
            {close => (
              <>
                <div className="popup-container">
                  <p className="popup-desc">Are you Sure, You want to logout</p>
                  <div className="button-container">
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="confirm-btn"
                      onClick={ClickToLogout}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </>
            )}
          </Popup>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)

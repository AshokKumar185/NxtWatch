import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {withRouter} from 'react-router-dom'
import {SiYoutubegaming} from 'react-icons/si'
import {RiMenuAddFill} from 'react-icons/ri'
import './index.css'

const SlideBar = props => {
  const clickToHome = () => {
    const {history} = props
    history.replace('/')
  }

  const ClickToTrending = () => {
    const {history} = props
    history.replace('/trending')
  }

  const clickToSaved = () => {
    const {history} = props
    history.replace('/saved')
  }

  const clickToGaming = () => {
    const {history} = props
    history.replace('/gaming')
  }

  return (
    <div className="side-bar-container">
      <ul className="side-bar-list-container">
        <li className="side-bar-list-item">
          <button
            type="button"
            className="side-list-btn sl-btn"
            onClick={clickToHome}
          >
            <AiFillHome />
            <p className="side-items">Home</p>{' '}
          </button>
        </li>
        <li className="side-bar-list-item">
          <button
            type="button"
            className="side-list-btn sl-btn"
            onClick={ClickToTrending}
          >
            <AiFillFire />
            <p className="side-items">Trending</p>{' '}
          </button>
        </li>
        <li className="side-bar-list-item">
          <button
            type="button"
            className="side-list-btn sl-btn"
            onClick={clickToGaming}
          >
            <SiYoutubegaming />
            <p className="side-items">Gaming</p>{' '}
          </button>
        </li>
        <li className="side-bar-list-item">
          <button
            type="button"
            className="side-list-btn sl-btn"
            onClick={clickToSaved}
          >
            <RiMenuAddFill />
            <p className="side-items">Saved</p>{' '}
          </button>
        </li>
      </ul>
      <div>
        <h3>Contact Us</h3>
        <ul className="social-media-container">
          <li className="social-list-item">
            <a href="https://www.linkedin.com/feed/">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in"
                width={27}
              />
            </a>
          </li>
          <li className="social-list-item">
            <a href="https://www.facebook.com/">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                width={27}
              />
            </a>
          </li>
          <li className="social-list-item">
            <a href="https://twitter.com/home">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                width={27}
              />
            </a>
          </li>
        </ul>
        <p className="contact-desc">
          Enjoy, Now to see your channels and recommendation
        </p>
      </div>
    </div>
  )
}

export default withRouter(SlideBar)

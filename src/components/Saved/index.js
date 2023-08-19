import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsFire} from 'react-icons/bs'
import {GoDotFill} from 'react-icons/go'
import StyledContext from '../../context/theme'
import SlideBar from '../SlideBar'
import Header from '../Header'
import './index.css'

class Saved extends Component {
  render() {
    return (
      <StyledContext.Consumer>
        {values => {
          const {savedVideos} = values
          const len = savedVideos.length
          console.log(len)
          return (
            <>
              <Header />
              <div className="home-container">
                <SlideBar />
                <div>
                  <div className="main-home-container">
                    <div className="trending-top-container">
                      <BsFire className="fire-icon" />
                      <h1>Saved</h1>
                    </div>

                    {len === 0 ? (
                      <div className="no-saved-videos">
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                          alt="saved videos"
                          width={400}
                        />
                        <h1>No Saved videos found</h1>
                      </div>
                    ) : (
                      <ul className="trending-list-container">
                        {savedVideos.map(eachItem => (
                          <Link
                            to={`/videos/${eachItem.id}`}
                            className="link-video-item"
                          >
                            <li className="trending-list-item tre">
                              <img
                                src={eachItem.thumbnailUrl}
                                alt="thumb"
                                width={350}
                              />
                              <div className="side-trending-details">
                                <h2 className="trending-heading">
                                  {eachItem.title}
                                </h2>
                                <p>{eachItem.name}</p>
                                <div className="count-publish-container">
                                  <p className="video-count">
                                    {eachItem.viewCount} Views
                                  </p>
                                  <GoDotFill />
                                  <p className="video-publish">
                                    {eachItem.publishedAt}
                                  </p>
                                </div>
                              </div>
                            </li>
                          </Link>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </>
          )
        }}
      </StyledContext.Consumer>
    )
  }
}

export default Saved

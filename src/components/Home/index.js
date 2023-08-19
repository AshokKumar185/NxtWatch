import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiOutlineClose} from 'react-icons/ai'
import {GoDotFill} from 'react-icons/go'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import SlideBar from '../SlideBar'
import './index.css'

class Home extends Component {
  state = {videoData: [], isBanner: true, search: '', isLoad: true}

  componentDidMount() {
    this.getHomeVideos()
  }

  getSearch = event => {
    this.setState({search: event.target.value})
  }

  clickSearchBtn = () => {
    const {search} = this.state
    this.getHomeVideos(search)
  }

  onKey = event => {
    if (event.key.toLowerCase() === 'enter') {
      this.getSearch()
    }
  }

  loaderSpinner = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#C70039" height={50} width={50} />
    </div>
  )

  getHomeVideos = async (search = '') => {
    const jwtToken = Cookies.get('jwtToken')
    const url = `https://apis.ccbp.in/videos/all?search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    const fetchedData = data.videos.map(eachVideo => ({
      id: eachVideo.id,
      profileImgUrl: eachVideo.channel.profile_image_url,
      name: eachVideo.channel.name,
      publishedAt: eachVideo.published_at,
      thumbnailUrl: eachVideo.thumbnail_url,
      viewCount: eachVideo.view_count,
      tittle: eachVideo.title,
    }))
    this.setState({videoData: fetchedData, isLoad: false})
  }

  clickToClose = () => {
    this.setState(prevState => ({isBanner: !prevState.isBanner}))
  }

  clickToRetry = () => {
    this.setState({search: ''})
    this.getHomeVideos()
  }

  dataSuccess = () => {
    const {videoData} = this.state
    const len = videoData.length
    return len !== 0 ? (
      <ul className="home-video-container">
        {videoData.map(eachItem => (
          <Link to={`/videos/${eachItem.id}`} className="link-video-item">
            <li className="video-list-item">
              <img src={eachItem.thumbnailUrl} alt="thumbnail" width={300} />
              <div className="bottom-video-container">
                <div className="profile-container">
                  <img
                    src={eachItem.profileImgUrl}
                    alt="profile"
                    width={30}
                    className="profile-img"
                  />
                </div>
                <div>
                  <p className="video-title">{eachItem.tittle}</p>
                  <p className="video-name">{eachItem.name}</p>
                  <div className="count-publish-container">
                    <p className="video-count">{eachItem.viewCount} Views</p>
                    <GoDotFill />
                    <p className="video-publish">{eachItem.publishedAt}</p>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    ) : (
      <div className="no-saved-videos">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
          width={300}
        />
        <h1 className="no-heading">No search Result found</h1>
        <p className="no-desc">
          Try different key word or remove search filter
        </p>
        <button
          type="button"
          onClick={this.clickToRetry}
          className="confirm-btn"
        >
          Retry
        </button>
      </div>
    )
  }

  render() {
    const {isBanner, videoData, isLoad, search} = this.state
    return (
      <>
        <Header />
        <div className="home-container">
          <SlideBar />
          <div>
            <div className="main-home-container">
              {isBanner && (
                <div className="banner-container">
                  <div>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      alt="company logo"
                      width={100}
                    />
                    <p className="premium-desc">
                      Buy Nxt watch premium prepaid plans with UPI
                    </p>
                    <button type="button" className="premium-btn">
                      GET IT NOW
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="close-icon-btn"
                      onClick={this.clickToClose}
                      onKeyDown={this.onKey}
                    >
                      <AiOutlineClose />
                    </button>
                  </div>
                </div>
              )}
              <div className="search-input-container">
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  onChange={this.getSearch}
                  value={search}
                />
                <button
                  type="button"
                  className="search-btn"
                  onClick={this.clickSearchBtn}
                >
                  <BsSearch />
                </button>
              </div>
              {isLoad ? this.loaderSpinner() : this.dataSuccess()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Home

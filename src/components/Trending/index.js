import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {GoDotFill} from 'react-icons/go'
import Header from '../Header'
import SlideBar from '../SlideBar'
import './index.css'

class Trending extends Component {
  state = {trendingVideos: [], isLoad: true}

  componentDidMount() {
    this.getTrending()
  }

  getTrending = async () => {
    const jwtToken = Cookies.get('jwtToken')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const fetchedData = data.videos.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.channel.name,
        profileImgUrl: eachItem.channel.profile_image_url,
        publishedAt: eachItem.published_at,
        thumbnailUrl: eachItem.thumbnail_url,
        viewCount: eachItem.view_count,
        title: eachItem.title,
      }))
      console.log(fetchedData)

      this.setState({trendingVideos: fetchedData, isLoad: false})
    }
  }

  loaderSpinner = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#C70039" height={50} width={50} />
    </div>
  )

  render() {
    const {trendingVideos, isLoad} = this.state

    return (
      <>
        <Header />
        <div className="home-container">
          <SlideBar />
          <div>
            <div className="main-home-container">
              <div className="trending-top-container">
                <img
                  src="https://yt3.googleusercontent.com/FGP0uHApLVuocH77OLtgXtz6-6ClmhQNLch3l1964mOFt-lpe_PdUNjmgG-9trkw9LcTcoKa=s900-c-k-c0x00ffffff-no-rj"
                  alt="trending logo"
                  width={80}
                  className="trend-img"
                />
                <h1 className="trend-trend">Trending</h1>
              </div>
              <ul className="trending-list-container">
                {isLoad
                  ? this.loaderSpinner()
                  : trendingVideos.map(eachItem => (
                      <Link
                        to={`/videos/${eachItem.id}`}
                        className="link-video-item"
                      >
                        <li className="trending-list-item tre">
                          <img
                            src={eachItem.thumbnailUrl}
                            alt="thumbnail"
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
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Trending

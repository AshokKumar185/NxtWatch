import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {SiYoutubegaming} from 'react-icons/si'
import Header from '../Header'
import SlideBar from '../SlideBar'
import './index.css'

class Gaming extends Component {
  state = {gameData: [], isLoad: true}

  componentDidMount() {
    this.getGamingData()
  }

  getGamingData = async () => {
    const jwtToken = Cookies.get('jwtToken')
    const url = 'https://apis.ccbp.in/videos/gaming'
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
        thumbnailUrl: eachItem.thumbnail_url,
        viewCount: eachItem.view_count,
        title: eachItem.title,
      }))

      this.setState({gameData: fetchedData, isLoad: false})
    }
  }

  loaderSpinner = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#C70039" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoad, gameData} = this.state
    return (
      <>
        <Header />
        <div className="home-container">
          <SlideBar />
          <div>
            <div className="main-home-container">
              <div className="trending-top-container">
                <SiYoutubegaming className="gaming-icon" />
                <h1>Gaming</h1>
              </div>

              {isLoad ? (
                this.loaderSpinner()
              ) : (
                <ul className="home-video-container">
                  {' '}
                  {gameData.map(eachData => (
                    <Link
                      to={`/videos/${eachData.id}`}
                      className="link-video-item"
                    >
                      <li className="gaming-list-item">
                        <img
                          src={eachData.thumbnailUrl}
                          alt="thumbnail url"
                          width={220}
                          height={330}
                        />
                        <h3 className="gaming-title">{eachData.title}</h3>
                        <p className="gaming-view">
                          {eachData.viewCount} Watching worldwide
                        </p>
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>{' '}
      </>
    )
  }
}

export default Gaming

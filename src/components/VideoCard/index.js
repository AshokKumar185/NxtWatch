import {Component} from 'react'
import ReactPlayer from 'react-player'
import Cookies from 'js-cookie'
import {GoDotFill} from 'react-icons/go'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {RiMenuAddFill} from 'react-icons/ri'
import StyledContext from '../../context/theme'
import Header from '../Header'
import SlideBar from '../SlideBar'
import './index.css'

class VideoCard extends Component {
  state = {
    videoList: {},
    chanelList: {},
    isLike: false,
    isDislike: false,
    isSaved: false,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwtToken')

    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const responseData = data.video_details
      const convertedData = {
        id: responseData.id,
        publishedAt: responseData.published_at,
        thumbnailUrl: responseData.thumbnail_url,
        videoUrl: responseData.video_url,
        viewCount: responseData.view_count,
        description: responseData.description,
        title: responseData.title,
      }
      const channelData = {
        profileImgUrl: responseData.channel.profile_image_url,
        subscriberCount: responseData.channel.subscriber_count,
        name: responseData.channel.name,
      }
      console.log(convertedData)
      this.setState({videoList: convertedData, chanelList: channelData})
    }
  }

  clickToChange = () => {
    this.setState({isLike: true, isDislike: false})
  }

  clickToDisLike = () => {
    this.setState({isDislike: true, isLike: false})
  }

  isSaved = () => {
    this.setState({isSaved: true})
  }

  render() {
    const {videoList, chanelList, isLike, isDislike, isSaved} = this.state
    const {
      thumbnailUrl,
      videoUrl,
      title,
      publishedAt,
      viewCount,
      description,
    } = videoList
    const {profileImgUrl, subscriberCount, name} = chanelList

    const likeColor = isLike ? 'color-blue' : ''
    const disLikeColor = isDislike ? 'color-blue' : ''
    const saveColor = isSaved ? 'color-blue' : ''
    const saveName = isSaved ? 'Saved' : 'Save'

    return (
      <StyledContext.Consumer>
        {values => {
          const {savedVideos, addVideos} = values

          const clickToSaved = () => {
            this.isSaved()
            addVideos(videoList)
          }

          return (
            <>
              <Header />
              <div className="home-container">
                <SlideBar />
                <div>
                  <div className="main-home-container">
                    <div className="react-player-container">
                      <ReactPlayer
                        url={videoUrl}
                        controls
                        width={1000}
                        height={400}
                      />
                      <h2 className="video-card-heading">{title}</h2>
                      <div className="bottom-video-container">
                        <div className="count-publish-container">
                          <p className="video-count">{viewCount} Views</p>
                          <GoDotFill />
                          <p className="video-publish">{publishedAt}</p>
                        </div>
                        <ul className="video-feedback-container">
                          <li className="video-feedback-item">
                            <button
                              type="button"
                              className={`feedback-buttons ${likeColor}`}
                              onClick={this.clickToChange}
                            >
                              <AiOutlineLike /> Like
                            </button>
                          </li>
                          <li className="video-feedback-item">
                            <button
                              type="button"
                              className={`feedback-buttons ${disLikeColor}`}
                              onClick={this.clickToDisLike}
                            >
                              {' '}
                              <AiOutlineDislike /> Dislike
                            </button>
                          </li>
                          <li className="video-feedback-item">
                            <button
                              type="button"
                              className={`feedback-buttons ${saveColor}`}
                              onClick={clickToSaved}
                            >
                              <RiMenuAddFill /> {saveName}
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div className="channel-container">
                        <img src={profileImgUrl} alt="profile img" width={50} />
                        <div>
                          <p className="channel-name">{name}</p>
                          <p className="channel-sub">
                            {subscriberCount} Subscribers
                          </p>
                        </div>
                      </div>
                      <p className="channel-description">{description}</p>
                    </div>
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

export default VideoCard

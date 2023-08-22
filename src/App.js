import {Component} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import StyledContext from './context/theme'
import Header from './components/Header'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './components/LoginPage'
import VideoCard from './components/VideoCard'
import NotFound from './components/NotFound'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import Saved from './components/Saved'

class App extends Component {
  state = {savedVideos: []}

  addSavedVideos = async data => {
    const {savedVideos} = this.state
    if (savedVideos.length > 0) {
      const savedVid = savedVideos.filter(eachData => eachData.id === data.id)
      if (savedVid.length === 0) {
        await this.setState({savedVideos: [...savedVideos, data]})
      }
    } else {
      this.setState({savedVideos: [...savedVideos, data]})
    }
  }

  render() {
    const {savedVideos} = this.state
    return (
      <StyledContext.Provider
        value={{
          savedVideos,
          addVideos: this.addSavedVideos,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/videos/:id" component={VideoCard} />
            <ProtectedRoute exact path="/trending" component={Trending} />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <ProtectedRoute exact path="/saved" component={Saved} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </StyledContext.Provider>
    )
  }
}
export default App

import React, { Component } from 'react';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';

// Add API keys here before running
const YT_API_KEY = '';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };
    }

    videoSearch(term) {
        YTSearch({key: YT_API_KEY, term: term}, (data) => {
            console.log(term);
            this.setState({
                videos: data,
                selectedVideo: data[0]
            });
        });
    }

    render() {
        return (
            <div>
                <SearchBar onSubmit={searchTerm => this.videoSearch(searchTerm)}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={userSelected => this.setState({selectedVideo: userSelected})}
                    videos={this.state.videos} />
            </div>
        );
    }
}

export default App;

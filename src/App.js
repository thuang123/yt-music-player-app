import React, { Component } from 'react';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';

// Add API keys here before running
export const API_KEYS = {
    YT_API_KEY : '',
    YT_MP3_API_KEY : ''
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };
    }

    videoSearch(term) {
        let that = this;

        // Attempt playlist search first
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=` + term + `&key=` + API_KEYS.YT_API_KEY;
        fetch(url, { method: 'GET'
        }).then(res => res.json()).then((res) => {
            that.setState({
                videos: res.items,
                selectedVideo: res.items[0],
            });
        }).catch(function(error) {
            // if fails, perform general Youtube search
            YTSearch({key: API_KEYS.YT_API_KEY, term: term}, (data) => {
                console.log(term);
                that.setState({
                    videos: data,
                    selectedVideo: data[0],
                });
            });
        });
    }

    render() {
        return (
            <div>
                <SearchBar onSubmit={searchTerm => this.videoSearch(searchTerm)}/>
                <br></br>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={userSelected => this.setState({selectedVideo: userSelected})}
                    videos={this.state.videos} />
            </div>
        );
    }
}

export default App;

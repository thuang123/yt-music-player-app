import React from 'react';
import * as App from '../App'

const VideoDetail = (props) => {
    const video = props.video;

    if(!video) {
        return <div></div>;
    }

    const videoId = video.id.videoId;
    const videoUrl = `https://www.youtube.com/embed/${videoId}`;
    const downloadUrl = `https://www.download-mp3-youtube.com/api/?api_key=${App.API_KEYS.YT_MP3_API_KEY}&format=mp3&video_id=${videoId}`;

    return (
        <div className="video-detail col-md-8">
            <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src={videoUrl}></iframe>
            </div>
            <div className="details">
                <div>{video.snippet.title}</div>
                <div>{video.snippet.description}</div>
                <iframe width="250px" height="60px" scrolling="no" styles="border:none;" src={downloadUrl}></iframe>
            </div>
        </div>
    );
};

export default VideoDetail;
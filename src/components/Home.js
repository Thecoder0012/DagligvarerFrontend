import React from 'react'
import "../css/Home.css";
import Video from "../video/video.mp4"


function Home() {
  return (
    <div>
        <div className='main-video'>
                    <div className="overlay"></div>
                        <video src={Video} autoPlay loop muted />
                            <div className="content">
                            </div>
                </div>

    </div>
  )
}

export default Home
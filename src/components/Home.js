import React from 'react'
import "../css/Home.css";
import Video from "../video/video.mp4"


function Home() {
  return (
    <div>
        <div className='video-container'>
                    <div className="shadow"></div>
                        <video src={Video} autoPlay loop muted />
                            <div className="text">
                                <h1>Velkommen til dagligvarer webshoppen</h1>
                            </div>
                </div>

    </div>
  )
}

export default Home
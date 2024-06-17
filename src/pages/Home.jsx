import React, { useState, useEffect, useContext } from 'react';
import BongoCat from './BongoCat';
import useFetchData from '../hook/useFetchData';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { MusicPlayerContext } from '../context/MusicPlayerProvider';

const Home = () => {
  const [musicData, setMusicData] = useState([]);
  const { addTrackToList, addTrackToEnd, playTrack } = useContext(MusicPlayerContext);
  const { data, loading, error } = useFetchData('./data/yih.json');

  const handlePlayNow = (result) => {
    const newTrack = {
        title: result.title,
        videoID: result.videoID,
        imageURL: result.imageURL,
        artist: result.artist,
        rank: 1
    };
    addTrackToList(newTrack);
    playTrack(0);
};

  const likeData = data.slice(0 , 6)

  useEffect(() => {
    
  }, []);

  if (loading) return <Loading loading={loading} />;
  if (error) return <Error message={error.message} />;
  return (
    <div className="home-container">
      <BongoCat />
      <div className="overlay-conts">
        <h1 className="home-title">어떤 노래를 들어볼까?</h1>
        <div className="music-box">
          {likeData.map((item, idx) => (
            <div key={idx} className="music-item" onClick={() => handlePlayNow(item)}>
              <img src={item.imageURL} alt={item.title} className="music-image" />
              <span className="music-title">{item.title.slice(0,12)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

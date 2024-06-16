import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { FcRating, FcPlus, FcApproval } from "react-icons/fc";
import { IoMusicalNotes } from "react-icons/io5";
import { BsFillMusicPlayerFill, BsFillRecordCircleFill } from 'react-icons/bs';
import { PiVinylRecordBold, PiVinylRecordDuotone, PiVinylRecordFill } from 'react-icons/pi';
import { LiaRecordVinylSolid } from 'react-icons/lia';
import { SiPlayerfm } from 'react-icons/si';

const Header = () => {
    const [showInput, setShowInput] = useState(false); // 입력 박스 표시 여부 상태
    const [newItem, setNewItem] = useState(''); // 새 항목의 제목 상태
    const [playlistCount, setPlaylistCount] = useState(0); // 플레이리스트 개수 상태

    useEffect(() => {
        const count = localStorage.getItem('playlistCount') || 0; // 로컬 스토리지에서 플레이리스트 개수를 가져옴
        setPlaylistCount(Number(count)); // 상태 업데이트
    }, []);

    const handleAddClick = () => {
        setShowInput(true); // 입력 박스 표시
    };

    const handleInputChange = (e) => {
        setNewItem(e.target.value); // 입력 값 업데이트
    };

    const handleAddItem = () => {
        if (newItem.trim() !== '') { // 제목이 비어있지 않은 경우
            const newCount = playlistCount + 1; // 새로운 플레이리스트 번호
            const playlistKey = `playlist${newCount}`; // 플레이리스트 키 (예: playlist1, playlist2)
            const newPlaylist = {
                id: playlistKey,
                name: newItem,
                items: [] // 초기 항목 배열
            };

            localStorage.setItem(playlistKey, JSON.stringify(newPlaylist)); // 로컬 스토리지에 저장
            localStorage.setItem('playlistCount', newCount.toString()); // 플레이리스트 개수 저장
            setPlaylistCount(newCount); // 상태 업데이트
            setNewItem(''); // 입력 값 초기화
            setShowInput(false); // 입력 박스 숨기기
        }
    };

    const playlistLinks = [];
    for (let i = 1; i <= playlistCount; i++) {
        const playlistKey = `playlist${i}`;
        const playlist = JSON.parse(localStorage.getItem(playlistKey));
        playlistLinks.push(
            <li key={i}>
                <Link to={`/playlist/${playlistKey}`}><span className='icon2'><FcApproval /></span>{playlist.name}</Link>
            </li>
        );
    }

    return (
        <header id='header' role='banner'>
            <h1 className='logo'>
                <Link to='/'><IoMusicalNotes />봉팔이의 라디오</Link>
            </h1>
            <h2>chart</h2>
            <ul>
                {/* <li><Link to='chart/melon'><span className='icon'></span>멜론 챠트</Link></li>
                <li><Link to='chart/bugs'><span className='icon'></span>벅스 챠트</Link></li>
                <li><Link to='chart/apple'><span className='icon'></span>애플 챠트</Link></li>
                <li><Link to='chart/genie'><span className='icon'></span>지니 챠트</Link></li>
                <li><Link to='chart/billboard'><span className='icon'></span>빌보드 챠트</Link></li> */}
                <li><Link to='chart/melon'><BsFillRecordCircleFill /><span>멜론 차트</span></Link></li>
                <li><Link to='chart/bugs'><PiVinylRecordFill/><span>벅스 차트</span></Link></li>
                <li><Link to='chart/apple'><PiVinylRecordBold/><span>애플 차트</span></Link></li>
                <li><Link to='chart/genie'><LiaRecordVinylSolid/> <span>지니 차트</span></Link></li>
                <li><Link to='chart/billboard'><PiVinylRecordDuotone /> <span>빌보드 차트</span></Link></li>
            </ul>
            <h2>playlist</h2>
            <ul>
                {/* <li><Link to='/mymusic'><span className='icon2'><FcRating /></span>Mymusic</Link></li> */}
                <li><Link to='/mymusic'><SiPlayerfm/> <span>recent</span></Link></li>
                {playlistLinks}
                <li>
                    {showInput ? (
                        <div className='input__list'>
                            <input
                                type='text'
                                value={newItem}
                                onChange={handleInputChange}
                            />
                            <button onClick={handleAddItem}>Add</button>
                        </div>
                    ) : (
                        // <Link to='#' onClick={handleAddClick}><span className='icon2'><FcPlus /></span>Create</Link>
                        <Link to='#' onClick={handleAddClick}><BsFillMusicPlayerFill/><span>Create</span></Link>
                    )}
                </li>
            </ul>
        </header>
    );
}

export default Header;
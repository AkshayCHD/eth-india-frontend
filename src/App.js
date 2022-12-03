import React, { useState, useEffect } from 'react';
import Snake from './components/Snake/Snake';
import UserIdDialog from './components/UserIdDialog/UserIdDialog';
import axios from 'axios';
import './App.css';

const App = () => {
  const [userId, setUserId] = useState();
  const [snakeArray, setSnakeArray] = useState([1, 2, 3, 4]);
  const [startGame, setStartGame] = useState(false);
  const [slowSpeed, setSlowSpeed] = useState(false);
  const [shortSnake, setShortSnake] = useState(false);
  const [color, setColor] = useState("default");
  const fetchNftConfig = async (userId) =>  {
    const response = await axios.get(`http://localhost:3030/get-user-data?id=${userId}`);
    const nftConfigs = response.data.userNfts;
    const speedNft = nftConfigs.find((nft) => nft.name === "speed");
    // const colorNft = nftConfigs.find((nft) => nft.name === "color");
    const lengthNft = nftConfigs.find((nft) => nft.name === "length");
    
    console.log(speedNft)
    if(speedNft) {
      setSlowSpeed(true);
    }
    if(lengthNft) {
      setShortSnake(true);
    }
    setStartGame(true);
  }
  useEffect(() => {
      console.log(userId)
      fetchNftConfig(userId);
  }, [userId])
  console.log(userId)
  return (
    userId ? 
    startGame ?
    <div className="App">
      <Snake 
        color1="#248ec2"
        color2="#1d355e"
        backgroundColor="#ebebeb"
        slowSpeed={slowSpeed}
        color={color}
        shortSnake={shortSnake}
        />
    </div>:
    <div></div>
    : <div>
      <UserIdDialog setUserId={setUserId}/>
    </div>
  );
}

export default App;

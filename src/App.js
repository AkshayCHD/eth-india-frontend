import React, { useState, useEffect } from "react";
import Snake from "./components/Snake/Snake";
import UserIdDialog from "./components/UserIdDialog/UserIdDialog";
import axios from "axios";
import "./App.css";
// import { createClient } from "urql";

// const APIURL = "https://api.thegraph.com/subgraphs/name/anubhavitis/ethindia22";

// const transfersQuery = `
//   query {
//     transfers(first: 10){
//       id
//       tokenId
//       from
//     }
//   }
// `;
// const users = [
//   {
//     id: 1,
//     name: "user1",
//     publicKey: "0xe196C91ABFb4DFba4c57704C530Be52C3c3ddD9B",
//     level: 1,
//   },
//   {
//     id: 2,
//     name: "user2",
//     publicKey: "0xB63Cf430fe1Ca8d80dff1F714B71fD688e8F5F6d",
//     level: 2,
//   },
//   {
//     id: 3,
//     name: "user3",
//     publicKey: "0xb360ffa8E8a35f99bB3392F6F79d9b1116ddF8D8",
//     level: 1,
//   },
// ];

// const client = createClient({
//   url: APIURL,
// });
const App = () => {
  const [userId, setUserId] = useState();
  const [snakeArray, setSnakeArray] = useState([1, 2, 3, 4]);
  const [startGame, setStartGame] = useState(false);
  const [slowSpeed, setSlowSpeed] = useState(false);
  const [shortSnake, setShortSnake] = useState(false);
  const [color, setColor] = useState("default");
  const fetchNftConfig = async (userId) => {
    // const data = await client.query(transfersQuery).toPromise();
    // const user = users.find((user) => user.id === parseInt(userId))
    // console.log(data);
    const response = await axios.get(
      `http://localhost:3030/get-user-data?id=${userId}`
    );
    const nftConfigs = response.data.userNfts;
    const speedNft = nftConfigs.find((nft) => nft.name === "speed");
    // const colorNft = nftConfigs.find((nft) => nft.name === "color");
    const lengthNft = nftConfigs.find((nft) => nft.name === "length");

    console.log(speedNft);
    if (speedNft) {
      setSlowSpeed(true);
    }
    if (lengthNft) {
      setShortSnake(true);
    }
    setStartGame(true);
  };
  useEffect(() => {
    console.log(userId);
    // fetchNftConfig(userId);

    setStartGame(true);
  }, [userId]);
  console.log(userId);
  return userId ? (
    startGame ? (
      <div className="App">
        <Snake
          color1="#248ec2"
          color2="#f0cb16"
          backgroundColor="#3F56AF"
          slowSpeed={slowSpeed}
          color={color}
          shortSnake={shortSnake}
        />
      </div>
    ) : (
      <div></div>
    )
  ) : (
    <div>
      <UserIdDialog setUserId={setUserId} />
    </div>
  );
};

export default App;

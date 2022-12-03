import React, { useState, useEffect } from "react";
import Snake from "./components/Snake/Snake";
import UserIdDialog from "./components/UserIdDialog/UserIdDialog";
import axios from "axios";
import "./App.css";
import { createClient } from "urql";

const APIURL = "https://api.thegraph.com/subgraphs/name/anubhavitis/easygames";

const transfersQuery = `
  query {
    newNfts(first: 20) {
      id
      name
      from
      to
    }
    transferNfts(first: 20) {
      id
      from
      to
      tokenId
      name
    }
  }
`;
const users = [
  {
    id: 1,
    name: "user1",
    publicKey: "0xe196C91ABFb4DFba4c57704C530Be52C3c3ddD9B",
    level: 1,
  },
  {
    id: 2,
    name: "user2",
    publicKey: "0xB63Cf430fe1Ca8d80dff1F714B71fD688e8F5F6d",
    level: 2,
  },
  {
    id: 3,
    name: "user3",
    publicKey: "0xb360ffa8E8a35f99bB3392F6F79d9b1116ddF8D8",
    level: 1,
  },
];

const client = createClient({
  url: APIURL,
});
const App = () => {
  const [userId, setUserId] = useState();
  const [startGame, setStartGame] = useState(false);
  const [slowSpeed, setSlowSpeed] = useState(false);
  const [shortSnake, setShortSnake] = useState(false);

  const fetchNftConfig = async (userId) => {
    if(!userId) {
      return;
    }
    const user = users.find((user) => user.id === parseInt(userId));
    const data = await client.query(transfersQuery).toPromise();
    console.log(data);
    const newNfts = data.data.newNfts;
    const transferList = data.data.transferNfts;
    let speedCount = 0;
    let lengthCount = 0;
    let colorCount = 0;

    newNfts.forEach(newNft => {
      console.log(newNft.to)
      console.log(user.publicKey)
      console.log(String(newNft.to).toLowerCase() === String(user.publicKey).toLowerCase())

      if(String(newNft.from).toLowerCase() === String(user.publicKey).toLowerCase()) {
        if(newNft.name === "speed") {
          speedCount--;
        } else if(newNft.name === "length") {
          lengthCount--;
        } else if(newNft.color === "color") {
          colorCount--;
        }
      } else if(String(newNft.to).toLowerCase() === String(user.publicKey).toLowerCase()) {
        console.log("123123")
        if(newNft.name === "speed") {
          speedCount++;
        } else if(newNft.name === "length") {
          lengthCount++;
        } else if(newNft.color === "color") {
          colorCount++;
        }
      } 
    })
    transferList.forEach(transfer => {
      if(String(transfer.from).toLowerCase() === String(user.publicKey).toLowerCase()) {
        if(transfer.name === "speed") {
          speedCount--;
        } else if(transfer.name === "length") {
          lengthCount--;
        } else if(transfer.color === "color") {
          colorCount--;
        }
      } else if(String(transfer.to).toLowerCase() === String(user.publicKey).toLowerCase()) {
        if(transfer.name === "speed") {
          speedCount++;
        } else if(transfer.name === "length") {
          lengthCount++;
        } else if(transfer.color === "color") {
          colorCount++;
        }
      }
    });
    console.log({ lengthCount, speedCount, colorCount });

    if (speedCount > 0) {
      setSlowSpeed(true);
    }
    if (lengthCount > 0) {
      setShortSnake(true);
    }
    setStartGame(true);
  };
  useEffect(() => {
    console.log(userId);
    fetchNftConfig(userId);
  }, [userId]);
  console.log(userId);
  return userId ? (
    startGame ? (
      <div className="App">
        <Snake
          color1="#248ec2"
          color2="#1d355e"
          backgroundColor="#ebebeb"
          slowSpeed={slowSpeed}
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

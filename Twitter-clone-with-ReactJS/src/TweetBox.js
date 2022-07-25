import React from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@mui/material";
import db from "./firebase";
import { useState } from "react";
function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");

  const sendTweet = (e) => {
    e.preventDefault();

    db.collection("posts").add({
      displayName: "LinhDT",
      username: "dinhtronglinh",
      verified: true,
      text: tweetMessage,
      image: tweetImage,
      avatar:
        "https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/271902580_3887859298105948_6056592652319827281_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=rlBmjsFK13QAX8RkGNG&_nc_ht=scontent.fhan2-4.fna&oh=00_AT9x15qq4lalLZnKqe-QVWE9-iKlBLiLoUpcfoWHqD8VfQ&oe=62E14DE7",
    });

    setTweetMessage("");
    setTweetImage("");
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src="https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/271902580_3887859298105948_6056592652319827281_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=rlBmjsFK13QAX8RkGNG&_nc_ht=scontent.fhan2-4.fna&oh=00_AT9x15qq4lalLZnKqe-QVWE9-iKlBLiLoUpcfoWHqD8VfQ&oe=62E14DE7" />
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            type="text"
          />
        </div>
        <div className="tweetBox__option">
          <input
            value={tweetImage}
            onChange={(e) => setTweetImage(e.target.value)}
            className="tweetBox__imageInput"
            placeholder="Optional: Enter image URL"
            type="text"
          />
          <Button
            onClick={sendTweet}
            type="submit"
            className="tweetBox__tweetButton"
          >
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TweetBox;

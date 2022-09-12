import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import TopBar from "../components/top-bar";
import "./pagesCss/account-home.css";

const AccountHome = () => {
  const cookies = new Cookies();
  const username = cookies.get("username");

  // const LoadServerTwo = () => {
  //   axios
  //     .get("http://localhost:4000/", {
  //       headers: { "Content-Type": "application/json" },
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   LoadServerTwo();
  // }, []);

  const [description, setDescription] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [errorState, setErrorState] = useState("");

  const PushUpload = (e) => {
    e.preventDefault();
    let fileUpload = new FormData();
    fileUpload.append("itemDescription", description);
    fileUpload.append("imageUpload", imageUpload[0]);

    axios
      .put("http://localhost:4000/put/putItem", fileUpload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        console.log(response.data.data.url);
        setImageUrl(response.data.data.url);
        setPostDescription(response.data.data.postDescription);
        console.log(response.data.data.postDescription);
      })
      .catch((error) => {
        setErrorState(error.response.data.message);
        console.log(error.response.data.message);
      });
  };
  return (
    <>
      <motion.div
        className="user-account"
        style={{ "--darkmode": "#282c34" }}
        //motion framer page animation styling
        initial={{ width: 0, overflow: "hidden" }}
        animate={{ width: "100%" }}
        exit={{ x: "100%", transition: { duration: 0.1 } }}
      >
        <header>
          <TopBar />
        </header>
        <main>
          <h1>Welcome Home {username}</h1>
        </main>
        <div>
          <span>{errorState}</span>
        </div>
        <div>
          <img
            src={imageUrl}
            alt={postDescription}
            style={{ width: "300px" }}
          />
        </div>
        <div>
          <form
            onSubmit={PushUpload}
            method="post"
            encType="multipart/form-data"
          >
            <input
              type="file"
              name="avatar"
              // value={imageUpload}
              onChange={(e) => setImageUpload(e.target.files)}
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
            />
            <button type="submit">submit</button>
          </form>
        </div>
      </motion.div>
    </>
  );
};

export default AccountHome;

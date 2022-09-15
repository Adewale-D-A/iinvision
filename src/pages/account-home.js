import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
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

  // console.log(imageUpload);
  // const url = URL.createObjectURL(imageUpload[0]);
  // console.log(url);

  const PushUpload = (e) => {
    e.preventDefault();
    let fileUpload = new FormData();
    fileUpload.append("itemDescription", description);
    fileUpload.append("mediaUpload", imageUpload[0]);

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

  const checkUpload = (e) => {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      const hideThumbnail = document.getElementsByClassName("thumbnail");
      if (hideThumbnail.length > 0) {
        for (let i = 0; i < hideThumbnail.length; i++) {
          hideThumbnail[i].style.display = "none";
        }
      }

      const files = e.target.files;
      const output = document.querySelector("#result");
      setImageUpload(files);

      if (files.length > 0) {
        if (files[0].type.match("image")) {
          const filesData = e.target.files[0];
          Object.assign(filesData, {
            preview: URL.createObjectURL(filesData),
          });

          const div = document.createElement("div");
          div.innerHTML = `<img class="thumbnail" src="${filesData.preview}" title="${filesData.name}" alt="${filesData.name}"/>`;
          output.appendChild(div);
        } else if (files[0].type.match("video")) {
          const filesData = e.target.files[0];
          Object.assign(filesData, {
            preview: URL.createObjectURL(filesData),
          });

          const div = document.createElement("div");
          div.innerHTML = `<video class="thumbnail" controls><source src="${filesData.preview}" type="${filesData.type}"></source><video>`;
          output.appendChild(div);
        } else {
          alert("file type not supported");
        }
      }
    } else {
      alert("window does not support this files");
    }
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
          <div>
            <span>Welcome Home {username}</span>
          </div>
        </header>
        <main>
          <div>
            <form
              onSubmit={PushUpload}
              method="post"
              encType="multipart/form-data"
            >
              <div>
                <textarea
                  className="upload-descriptor"
                  type="text"
                  placeholder="what do you have for us today?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  name="description"
                />
              </div>
              <div>
                <label htmlFor="files">Media upload</label>
                <input
                  type="file"
                  id="files"
                  accept="image/jpg, image/png, image/jpeg, image/gif, video/mp4"
                  onChange={(e) => checkUpload(e)}
                />
              </div>
              {/* <div>
                <input
                  type="file"
                  name="avatar"
                  className="upload-btn"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => setImageUpload(e.target.files)}
                />
              </div> */}
              <button type="submit">submit</button>
            </form>
          </div>
          <div>
            <img src={imageUrl} alt="img" style={{ width: "100px" }} />
          </div>
        </main>
        <div>
          <span>{errorState}</span>
        </div>
        <div>
          <img src="" alt={postDescription} style={{ width: "300px" }} />
        </div>
        {/* <div>
          <label htmlFor="files">Media upload</label>
          <input
            type="file"
            id="files"
            accept="image/jpg, image/png, image/jpeg, image/gif, video/mp4"
            onChange={(e) => checkUpload(e)}
          />
        </div> */}
        <div>
          <output id="result" />
        </div>
      </motion.div>
    </>
  );
};

export default AccountHome;

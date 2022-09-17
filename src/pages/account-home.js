import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import TopBar from "../components/top-bar";
import "./pagesCss/account-home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const AccountHome = () => {
  const cookies = new Cookies();
  const username = cookies.get("username");

  const [description, setDescription] = useState("");
  const [mediaUpload, setMediaUpload] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [resData, setResData] = useState([]);

  const WarnUser = () => {
    toast.warn(`media and media desciption is required`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
    });
  };

  const UploadInProgress = () => {
    toast.info(`upload in progress ...`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
    });
  };

  const UploadSuccess = () => {
    toast.success("Post Updated", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
    });
  };
  const GetAll = () => {
    toast.success("Feeds Updated", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
    });
  };

  const UserTokenFailed = (errorMsg) => {
    toast.error(`Failed, ${errorMsg}`, {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  const UploadFailed = (errorMsg) => {
    toast.error(`${errorMsg}, please try again later`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: 0,
    });
  };

  const GetAllPost = () => {
    axios
      .get("http://localhost:4000/getAll/getAllItems", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        setResData(response.data.data);
        GetAll();
      })
      .catch((error) => {
        if (error.response.data?.message) {
          if (
            error.response.data?.message ===
            "please log in, your access credentials has expired"
          ) {
            UserTokenFailed(error.response.data?.message);
          } else {
            UploadFailed(error.response.data?.message);
          }
        }
        if (error.message === "Network Error") {
          UploadFailed(error.message);
        }
      });
  };

  useEffect(() => {
    GetAllPost();
  }, []);

  const PushUpload = (e) => {
    e.preventDefault();
    let fileUpload = new FormData();
    fileUpload.append("itemDescription", description);
    fileUpload.append("mediaUpload", mediaUpload[0]);

    if (description && mediaUpload[0]) {
      axios
        .put("http://localhost:4000/put/putItem", fileUpload, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          onUploadProgress: (ProgressEvent) => {
            setUploadProgress(
              Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
            );
            UploadInProgress();
          },
        })
        .then((response) => {
          UploadSuccess();
          GetAllPost();
        })
        .catch((error) => {
          if (error.response.data?.message) {
            if (
              error.response.data?.message ===
              "please log in, your access credentials has expired"
            ) {
              UserTokenFailed(error.response.data?.message);
            } else {
              UploadFailed(error.response.data?.message);
            }
          }
          if (error.message === "Network Error") {
            UploadFailed(error.message);
          }
        });
    } else {
      WarnUser();
    }
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
      setMediaUpload(files);

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
          div.innerHTML = `<video class="thumbnail" controls><source src="${filesData.preview}" type="${filesData.type}"></source></video>`;
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
        <div>
          <ToastContainer
            position="top-center"
            autoClose={true}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            className="toast-pop"
          />
        </div>
        <div>{uploadProgress}</div>
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
                  accept="image/jpg, image/png, image/jpeg, image/gif, image/tiff, image/bmp, video/mp4"
                  onChange={(e) => checkUpload(e)}
                />
              </div>
              <button type="submit">submit</button>
            </form>
            <div>
              <output id="result" />
            </div>
          </div>
          <div className="feeds-items">
            {resData.map((post, key) => {
              if (post.filetype.match("image")) {
                return (
                  <div key={post.id} className="feeds-img-container">
                    <div>
                      <LazyLoadImage
                        src={post.mediaUpload}
                        placeholderSrc={post.mediaThumbnail}
                        alt=""
                        effect="blur"
                        className="lazy-load-img"
                        loading="lazy"
                      />
                    </div>
                    <div className="feed-desciption">
                      <div className="feed-desc-bck">
                        <span className="feed-date">
                          {formatDate(post.dateCreated)}
                        </span>{" "}
                        <br />
                        <span className="description-tag">Description:</span>
                        <br />
                        <span className="feed-desc">{post.description}</span>
                      </div>
                      {/* <span>Date updated: {formatDate(post.dateUpdated)}</span> */}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={post.id} className="feeds-video-container">
                    <div>
                      <video class="video-feed" controls className="video-feed">
                        <source
                          src={post.mediaUpload}
                          type={post.filetype}
                        ></source>
                      </video>
                    </div>
                    <div className="feed-desciption">
                      <div className="feed-desc-bck">
                        <span className="feed-date">
                          {formatDate(post.dateCreated)}
                        </span>{" "}
                        <br />
                        <span className="description-tag">Description:</span>
                        <br />
                        <span className="feed-desc">{post.description}</span>
                      </div>
                      {/* <span>Date updated: {formatDate(post.dateUpdated)}</span> */}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </main>
      </motion.div>
    </>
  );
};

export default AccountHome;

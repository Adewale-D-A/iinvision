import axios from "axios";
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState, useRef } from "react";
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
  const add_edit = useRef();

  const [stepsInput, setStepsInput] = useState("");
  const [recipeList, setRecipeList] = useState([]);
  const [editPos, setEditPos] = useState();

  // useEffect(() => {
  //   console.log(process.env.REACT_APP_UPLOAD_BACKEND_URL);
  // }, []);
  const toastFormat = useMemo(() => {
    return {
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
    };
  }, []);

  const cookies = new Cookies();
  const username = cookies.get("username");
  const Accesstoken = cookies.get("uz96_o");

  // const [description, setDescription] = useState("");
  const [mediaUpload, setMediaUpload] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [resData, setResData] = useState([]);
  const [fileChosen, setFileChosen] = useState("No file chosen");
  const [fileLoader, setFileLoader] = useState("none");

  const WarnUser = useCallback(() => {
    toast.warn(`media and media desciption is required`, {
      position: "top-center",
      autoClose: 2000,
      ...toastFormat,
    });
  }, [toastFormat]);

  // const UploadInProgress = useCallback(() => {
  //   toast.info(`upload in progress ...`, {
  //     position: "top-right",
  //     autoClose: 2000,
  //     limit: 2,
  //     ...toastFormat,
  //   });
  // }, [toastFormat]);

  const UploadSuccess = useCallback(() => {
    toast.success("Post Updated", {
      position: "top-right",
      autoClose: 2000,
      ...toastFormat,
    });
  }, [toastFormat]);

  const GetAll = useCallback(() => {
    toast.success("Feeds Updated", {
      position: "top-center",
      autoClose: 1000,
      limit: 1,
      ...toastFormat,
    });
  }, [toastFormat]);

  const UserTokenFailed = useCallback(
    (errorMsg) => {
      toast.error(`Failed, ${errorMsg}`, {
        position: "top-right",
        autoClose: false,
        limit: 2,
        ...toastFormat,
      });
    },
    [toastFormat]
  );

  const UploadFailed = useCallback(
    (errorMsg) => {
      toast.error(`${errorMsg}, please try again later`, toastFormat);
    },
    [toastFormat]
  );

  const getAllPost = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_UPLOAD_BACKEND_URL}/getAll/getAllItems`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Accesstoken}`,
        },
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
  }, [GetAll, UploadFailed, UserTokenFailed, Accesstoken]);

  useEffect(() => {
    getAllPost();
  }, [getAllPost]);

  const PushUpload = useCallback(
    (e) => {
      e.preventDefault();
      let fileUpload = new FormData();
      fileUpload.append("itemDescription", recipeList);
      fileUpload.append("mediaUpload", mediaUpload[0]);

      if (recipeList && mediaUpload[0]) {
        setFileLoader("");
        axios
          .put(
            `${process.env.REACT_APP_UPLOAD_BACKEND_URL}/put/putItem`,
            fileUpload,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Accesstoken}`,
              },
              withCredentials: true,
              onUploadProgress: (ProgressEvent) => {
                setUploadProgress(
                  Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
                );
              },
            }
          )
          .then((response) => {
            UploadSuccess();
            setFileLoader("none");
            setStepsInput([]);
            setFileChosen("No file chosen");
            document.querySelector("#result").style.display = "none";
            getAllPost();
          })
          .catch((error) => {
            console.log(error);
            setFileLoader("none");
            if (error?.response.data?.message) {
              if (
                error?.response.data?.message ===
                "please log in, your access credentials has expired"
              ) {
                UserTokenFailed(error?.response.data?.message);
              } else {
                UploadFailed(error?.response.data?.message);
              }
            }
            if (error.message === "Network Error") {
              UploadFailed(error.message);
            }
          });
      } else {
        WarnUser();
      }
    },
    [
      recipeList,
      mediaUpload,
      UploadFailed,
      UploadSuccess,
      UserTokenFailed,
      WarnUser,
      getAllPost,
      Accesstoken,
    ]
  );

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
        setFileChosen(files[0].name);
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

  //pause video when user moves outside tab
  var videoElement = document.getElementById("videoFeed");

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      videoElement?.pause();
      // console.log("video paused");
    }
  });

  const addInput = (e) => {
    e.preventDefault();
    if (
      add_edit?.current.innerHTML ===
      'add this step <i class="fa-solid fa-check"></i>'
    ) {
      setRecipeList([...recipeList, stepsInput]);
      setStepsInput("");
    } else {
      recipeList.splice(editPos, 1, stepsInput);
      setRecipeList([...recipeList]);
      add_edit.current.innerHTML =
        'add this step <i class="fa-solid fa-check"></i>';
      setStepsInput("");
    }
  };

  const removeItem = (item) => {
    recipeList.splice(recipeList.indexOf(item), 1);
    setRecipeList([...recipeList]);
  };

  const editItem = (item) => {
    setEditPos(recipeList.indexOf(item));
    setStepsInput(`${item}`);
    add_edit.current.innerHTML =
      'add edited step <i class="fa-solid fa-pen-nib"></i>';
  };

  return (
    <>
      <motion.div
        className="user-account"
        style={{ "--darkmode": "#282c34" }}
        //motion framer page animation styling
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.1 }}
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
        <main className="user-home">
          <div>
            <form
              onSubmit={PushUpload}
              method="post"
              encType="multipart/form-data"
            >
              <div className="description-input">
                <form className="input-form">
                  <div className="text-addbtn">
                    <input
                      placeHolder="Add recipe steps"
                      type="text"
                      className="recepe-input"
                      value={stepsInput}
                      onChange={(e) => setStepsInput(e.target.value)}
                    />{" "}
                    <button
                      onClick={(e) => addInput(e)}
                      className="add-btn"
                      ref={add_edit}
                      type="submit"
                    >
                      add this step <i class="fa-solid fa-check"></i>
                    </button>
                  </div>
                </form>
                {/* <textarea
                  className="upload-descriptor"
                  type="text"
                  placeholder="what do you have for us today?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  name="description"
                /> */}
                <div className="output-thumbnail">
                  <output id="result" />
                </div>
              </div>
              <div
                className="load-upload"
                style={{ display: fileLoader }}
              ></div>
              <div className="upload-sub-btn">
                <label htmlFor="files" className="choose-file">
                  Upload Media <i class="fa-solid fa-paperclip"></i>
                  {" ("}
                  {fileChosen}
                  {")"}
                </label>
                <div className="hide-file-upload-btn">
                  <input
                    type="file"
                    id="files"
                    accept="image/jpg, image/png, image/jpeg, image/gif, image/tiff, image/bmp, video/mp4"
                    onChange={(e) => checkUpload(e)}
                  />
                </div>
                <motion.button
                  type="submit"
                  className="feed-smt-btn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  post
                </motion.button>
                <span>{uploadProgress}%</span>
              </div>
            </form>
          </div>
          <div className="recipe-list-flex">
            {recipeList.map((item) => {
              return (
                <div key={item} className="recipe-steps">
                  <ul>
                    <li>
                      {item}{" "}
                      <span
                        onClick={() => removeItem(item)}
                        className="trash-splice"
                        title="delete item"
                      >
                        <i class="fa-solid fa-trash"></i>
                      </span>
                      <span
                        onClick={() => editItem(item)}
                        className="edit-splice"
                        title="edit item"
                      >
                        <i class="fa-solid fa-pen-nib"></i>
                      </span>
                    </li>{" "}
                  </ul>
                </div>
              );
            })}
          </div>
          <div className="feeds-items">
            {resData
              .sort(
                (a, b) =>
                  new Date(b.dateCreated).getTime() -
                  new Date(a.dateCreated).getTime()
              )
              .map((post, key) => {
                if (post.filetype.match("image")) {
                  return (
                    <motion.div
                      key={post.id}
                      className="feeds-img-container"
                      initial={{ x: "-20vw" }}
                      whileInView={{
                        x: 0,
                      }}
                      transition={{
                        duration: 0.1,
                      }}
                      // viewport={{ once: true }}
                    >
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
                    </motion.div>
                  );
                } else {
                  return (
                    <motion.div
                      key={post.id}
                      className="feeds-video-container"
                      initial={{ x: "-20vw" }}
                      whileInView={{
                        x: 0,
                      }}
                      transition={{
                        duration: 0.1,
                      }}
                      // viewport={{ once: true }}
                    >
                      <div>
                        <video
                          class="video-feed"
                          controls
                          className="video-feed"
                          id="videoFeed"
                        >
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
                    </motion.div>
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

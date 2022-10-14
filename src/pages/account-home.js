import axios from "axios";
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import Cookies from "universal-cookie";
import TopBar from "../components/top-bar";
import "./pagesCss/account-home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "./pagesCss/blur.css";

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
  const uploadref = useRef();
  const changeClickAread = useRef();
  const reverseArrow = useRef();

  const [stepsInput, setStepsInput] = useState("");
  const [editPos, setEditPos] = useState();

  //upload to backend
  const [mediaUpload, setMediaUpload] = useState("");
  const [recipeList, setRecipeList] = useState([]);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadPrice, setUploadPrice] = useState();
  const [uploadType, setUploadType] = useState("recipe");
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
        if (error?.response?.data?.message) {
          if (
            error?.response?.data?.message ===
            "please log in, your access credentials has expired"
          ) {
            UserTokenFailed(error.response.data?.message);
          } else {
            UploadFailed(error.response.data?.message);
          }
        }
        if (error?.message === "Network Error") {
          UploadFailed(error.message);
        }
      });
  }, [GetAll, UploadFailed, UserTokenFailed, Accesstoken]);

  useEffect(() => {
    reverseArrow.current.style.rotate = "0deg";
    uploadref.current.style.display = "none";
    changeClickAread.current.innerHTML = "<h4>Open Upload Dock</h4>";
  }, []);

  useEffect(() => {
    getAllPost();
  }, [getAllPost]);

  const PushUpload = useCallback(
    (e) => {
      e.preventDefault();
      let fileUpload = new FormData();
      fileUpload.append("itemDescription", recipeList);
      fileUpload.append("mediaUpload", mediaUpload[0]);
      fileUpload.append("uploadTitle", uploadTitle);
      fileUpload.append("uploadPrice", uploadPrice);
      fileUpload.append("uploadType", uploadType);

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
      uploadPrice,
      uploadTitle,
      uploadType,
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
      const thumbnailTrash = document.getElementsByClassName("thumbnail-trash");
      if (hideThumbnail.length > 0) {
        for (let i = 0; i < hideThumbnail.length; i++) {
          hideThumbnail[i].style.display = "none";
        }
      }
      if (thumbnailTrash.length > 0) {
        for (let i = 0; i < thumbnailTrash.length; i++) {
          thumbnailTrash[i].style.display = "none";
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
          div.innerHTML = `<div class="img-thumnail-ctn"><img class="thumbnail" src="${filesData.preview}" title="${filesData.name}" alt="${filesData.name}"/> <span class="trash-thumbnail"><i class="fa-solid fa-trash thumbnail-trash"></i></span></div>`;
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

  const trashThumbnail = () => {
    setFileChosen("No file chosen");
    const hideThumbnail = document.getElementsByClassName("thumbnail");
    const thumbnailTrash = document.getElementsByClassName("thumbnail-trash");
    if (hideThumbnail.length > 0) {
      for (let i = 0; i < hideThumbnail.length; i++) {
        hideThumbnail[i].style.display = "none";
      }
    }
    if (thumbnailTrash.length > 0) {
      for (let i = 0; i < thumbnailTrash.length; i++) {
        thumbnailTrash[i].style.display = "none";
      }
    }
  };

  const [hideUpload, setHideUpload] = useState(true);

  const ClickUpload = () => {
    setHideUpload(!hideUpload);
    if (!hideUpload) {
      reverseArrow.current.style.rotate = "0deg";
      uploadref.current.style.display = "none";
      changeClickAread.current.innerHTML = "<h4>Open Upload Dock</h4>";
    } else {
      uploadref.current.style.display = "";
      reverseArrow.current.style.rotate = "180deg";
      changeClickAread.current.innerHTML = "<h4>Hide Upload Dock</h4>";
    }
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
          <div className="click-to-display" onClick={() => ClickUpload()}>
            <div>
              <span ref={changeClickAread}>
                <h4>Open Upload Dock</h4>
              </span>
            </div>
            <div className="reverseArrow-class">
              <i ref={reverseArrow} class="fa-solid fa-chevron-down"></i>
            </div>
          </div>
          <div className="user-feed-upload-container" ref={uploadref}>
            {/* <form
              onSubmit={PushUpload}
              method="post"
              encType="multipart/form-data"
            > */}
            <div className="description-input">
              <div className="title-price">
                <div className="title-ctn">
                  <label htmlFor="upload-title" className="upload-item-label">
                    Upload Title:
                  </label>
                  <input
                    type="text"
                    placeholder="Upload Title"
                    className="upload-title"
                    id="upload-title"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                  />
                </div>
                <div className="radion-btn-ctn title-ctn">
                  <div>
                    <span>Upload type:</span>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="type-rd-btn"
                      value="recipe"
                      id="recipe-radio"
                      defaultChecked
                      onChange={(e) => setUploadType(e.target.value)}
                    />
                    <label htmlFor="recipe-radio">Recipe</label>
                    <input
                      type="radio"
                      name="type-rd-btn"
                      value="kitchenware"
                      id="kitchenware-radio"
                      onChange={(e) => setUploadType(e.target.value)}
                    />
                    <label htmlFor="kitchenware-radio">Kitchen Ware</label>
                    <input
                      type="radio"
                      name="type-rd-btn"
                      value="kitchenhack"
                      id="kitchenhack-radio"
                      onChange={(e) => setUploadType(e.target.value)}
                    />
                    <label htmlFor="kitchenhack-radio">Kitchen Hack</label>
                  </div>
                </div>
                <div className="price-ctn">
                  <label htmlFor="upload-price" className="upload-item-label">
                    Upload Price:
                  </label>
                  <input
                    type="number"
                    placeholder="item price"
                    className="upload-price"
                    id="upload-price"
                    value={uploadPrice}
                    onChange={(e) => setUploadPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-form">
                <form className="add-from">
                  <div className="text-addbtn">
                    <input
                      placeholder="Add recipe steps"
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
                  <output id="result" onClick={() => trashThumbnail()} />
                </div>
              </div>
            </div>

            <div className="load-upload" style={{ display: fileLoader }}></div>
            <div className="recipe-list-flex">
              <ol>
                {recipeList.map((item) => {
                  return (
                    <li key={item} className="recipe-steps">
                      <span>{item}</span>
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
                    </li>
                  );
                })}
              </ol>
            </div>
            <div className="upload-sub-btn">
              <div className="upload-user-media">
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
              </div>
              <div className="submit-feed-btn">
                <div className="inner-sbt-btn">
                  <motion.button
                    onClick={(e) => PushUpload(e)}
                    type="submit"
                    className="feed-smt-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    post <span>{uploadProgress}%</span>
                  </motion.button>
                </div>
              </div>
            </div>
            {/* </form> */}
          </div>
          <div className="input-line"></div>
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

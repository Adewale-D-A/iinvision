import React, { Suspense, useRef, useState } from "react";
import { motion } from "framer-motion";

import "./pagesCss/home-screen.css";
import { Link } from "react-router-dom";
import pizzaSlice1 from "../staticAssets/pizza_display_1.jpg";
import pizzaSlice2 from "../staticAssets/pizza_display_2.jpg";
import imageLoader from "../staticAssets/loader.gif";
import LandingScreen from "./landing-screen";
import piz from "../staticSample/pizza_display.jpg";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "./pagesCss/black-and-white.css";

function HomeSreen() {
  // const [clientX, setClientX] = useState("");

  // const handleMouse = (e) => {
  //   console.log(e.clientX, e.clientY, e.pageX, e.pageY, e.screenX, e.screenY);
  // };
  const liked = useRef();
  const disliked = useRef();
  const add_edit = useRef();

  const LikedItem = () => {
    liked.current.style.color = "red";
  };

  const DislikeItem = () => {
    disliked.current.style.color = "black";
  };

  const [stepsInput, setStepsInput] = useState("");
  const [recipeList, setRecipeList] = useState([]);
  const [editPos, setEditPos] = useState();

  const addInput = () => {
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

  const consoleLog = () => {
    console.log(recipeList);
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
      <Suspense fallback={<LandingScreen />}>
        <motion.div
          className="home"
          style={{ "--darkmode": "#282c34" }}
          //motion framer page animation styling
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.1 }}
          // onMouseMove={(e) => handleMouse(e)}
        >
          <header className="home-header">
            <div className="i-logo">
              <span>iinvision &#128161;</span>
            </div>
            <div className="i-motto">
              <span>document your technological ideas</span>
            </div>
            <div className="sign-up_in">
              <Link to="/login" className="sign_user">
                <span className="login_user" text-data="login">
                  login
                </span>
              </Link>
              <Link to="/signup" className="signup-user">
                <span text-data="signup" className="sign_up_user">
                  signup
                </span>
              </Link>
            </div>
          </header>
          <main className="home-main">
            <div className="img-ctn">
              <div className="dash-text">
                <h1>recipe book</h1>
              </div>
              <motion.img
                src={pizzaSlice1}
                alt=""
                className="piza_home"
                initial={{
                  x: -400,
                }}
                whileInView={{ x: 0, transition: { duration: 1 } }}
              />
              <motion.img
                src={pizzaSlice2}
                alt=""
                className="piza_home"
                initial={{
                  x: 400,
                }}
                whileInView={{ x: 0, transition: { duration: 1 } }}
              />
            </div>
            <div className="body-feed">
              <div className="recipe-feed-list">
                <div className="recipe-feed-section">
                  <div>
                    <h2>Recipes</h2>
                  </div>
                  <div className="recipe-search">
                    <input
                      type="text"
                      placeHolder="search your favourite recipe"
                      className="recipe-search-input"
                    />
                    <button className="search-btn">
                      <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="home-feed-ctn">
                <div className="home-feed-items">
                  <div className="img-ctn-feed">
                    <div className="feed-ctn">
                      <LazyLoadImage
                        src={piz}
                        placeholderSrc={imageLoader}
                        alt=""
                        effect="black-and-white"
                        loading="lazy"
                        className="home-feed-img"
                      />
                    </div>
                    {/* <img src={piz} alt="" className="feed-ctn" /> */}
                    <div className="feed-intr">
                      <div className="price-tag">
                        <span className="item-price">$10</span>
                      </div>
                      <div className="intr-values">
                        <div>
                          <span>
                            8k <i className="fa-solid fa-heart liked-ic"></i>
                          </span>
                        </div>
                        <div>
                          <span>
                            2 <i className="fa-solid fa-comment"></i>
                          </span>
                        </div>
                        <div>
                          <span>
                            5 <i className="fa-solid fa-star rated-star"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span>Pizza Recipe</span>
                  </div>
                  <div className="feed-intr-items">
                    <div className="feed-interactions">
                      <div className="ratings">
                        <div>
                          <span>rate recipe:</span>
                        </div>
                        <div>
                          <span>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                          </span>
                        </div>
                      </div>
                      <div className="interactions">
                        <span onClick={(e) => LikedItem()} ref={liked}>
                          <i className="fa-solid fa-heart yet-liked"></i>
                        </span>
                        <span>
                          <i className="fa-solid fa-comment new-comment"></i>
                        </span>
                        <span onClick={(e) => DislikeItem()} ref={disliked}>
                          <i className="fa-solid fa-thumbs-down yet-disliked"></i>
                        </span>
                      </div>
                    </div>
                    <div className="recipe-desc">
                      <span>recipe: </span>
                      <span>
                        general random ra dranddom random continuaratio in
                        writing random description of food items
                      </span>
                    </div>
                    <div className="feed-readmore">
                      <div className="readmore">
                        <span>... read more</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="body-feed">
              <div className="home-feed-section">
                <h2>Top Chef'ng Tools</h2>
              </div>
              <div className="home-feed-ctn">
                <div className="home-feed-items">
                  <div className="img-ctn-feed">
                    <img src={piz} alt="" className="feed-ctn" />
                    <div className="feed-intr">
                      <div className="price-tag">
                        <span className="item-price">$10</span>
                      </div>
                      <div className="intr-values">
                        <div>
                          <span>8k</span>
                        </div>
                        <div>
                          <span>2</span>
                        </div>
                        <div>
                          <span>5 star</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="feed-intr-items">
                    <div className="feed-interactions">
                      <div className="ratings">
                        <div>
                          <span>rate recipe:</span>
                        </div>
                        <div>
                          <span>stars</span>
                        </div>
                      </div>
                      <div className="interactions">
                        <span>like</span>
                        <span>comment(0)</span>
                        <span>dislike</span>
                      </div>
                    </div>
                    <div className="recipe-desc">
                      <span>use: </span>
                      <span>this cooker cooks really well brother</span>
                    </div>
                    <div className="feed-readmore">
                      <div className="readmore">
                        <span>... read more</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="body-feed">
              <div className="home-feed-section">
                <h2>Best Cooking Hacks</h2>
              </div>
              <div className="home-feed-ctn">
                <div className="home-feed-items">
                  <div className="img-ctn-feed">
                    <img src={piz} alt="" className="feed-ctn" />
                    <div className="feed-intr">
                      <div className="price-tag">
                        <span className="item-price">$10</span>
                      </div>
                      <div className="intr-values">
                        <div>
                          <span>8k</span>
                        </div>
                        <div>
                          <span>2</span>
                        </div>
                        <div>
                          <span>5 star</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="feed-intr-items">
                    <div className="feed-interactions">
                      <div className="ratings">
                        <div>
                          <span>rate recipe:</span>
                        </div>
                        <div>
                          <span>stars</span>
                        </div>
                      </div>
                      <div className="interactions">
                        <span>like</span>
                        <span>comment(0)</span>
                        <span>dislike</span>
                      </div>
                    </div>
                    <div className="recipe-desc">
                      <span>use: </span>
                      <span>this cooker cooks really well brothes</span>
                    </div>
                    <div className="feed-readmore">
                      <div className="readmore">
                        <span>... read more</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <footer>
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
            <input
              placeHolder="Add recipe steps"
              type="text"
              className="recepe-input"
              value={stepsInput}
              onChange={(e) => setStepsInput(e.target.value)}
            />
            <button
              onClick={(e) => addInput()}
              className="add-btn"
              ref={add_edit}
            >
              add this step <i class="fa-solid fa-check"></i>
            </button>
            <button onClick={(e) => consoleLog()}>console</button>
            <h1>Footer</h1>
          </footer>
        </motion.div>
      </Suspense>
    </>
  );
}

export default HomeSreen;

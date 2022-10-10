import React, { Suspense } from "react";
import { motion } from "framer-motion";

import "./pagesCss/home-screen.css";
import { Link } from "react-router-dom";
import pizzaSlice1 from "../staticAssets/pizza_display_1.jpg";
import pizzaSlice2 from "../staticAssets/pizza_display_2.jpg";
import LandingScreen from "./landing-screen";
import piz from "../staticSample/pizza_display.jpg";

function HomeSreen() {
  // const [clientX, setClientX] = useState("");

  // const handleMouse = (e) => {
  //   console.log(e.clientX, e.clientY, e.pageX, e.pageY, e.screenX, e.screenY);
  // };

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
              <div className="home-feed-section">
                <h2>Top Recipe of the week</h2>
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
                <h2>Top cooking utensils of the week</h2>
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
                <h2>Cooking hacks</h2>
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
            <h1>Footer</h1>
          </footer>
        </motion.div>
      </Suspense>
    </>
  );
}

export default HomeSreen;

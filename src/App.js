import React, { useState, useEffect } from "react";
import "./styles/App.scss";
import Grow from "@mui/material/Grow";
import Fade from "@mui/material/Fade";

// svg 引入
import { imagesSVG } from "./lib/imagesSVG";

function App() {
  // 獲取裝置高度
  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);

  const [showVideo, setShowVideo] = useState(true);
  const [allResult, setAllResult] = useState({});
  const [mostResult, setMostResult] = useState("");
  const [leastResult, setLeastResult] = useState("");
  const [otherResult, setOtherResult] = useState([]);
  // const [showGrowIn, setShowGrowIn] = useState(true);

  const getResultCount = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL_DEV}/stats`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error sending data to server");
        }
        return response.json();
      })
      .then((data) => {
        console.log("[success get result]", data);
        setAllResult(data);
      })
      .catch((error) => {
        console.error("Error sending data to server", error);
      });
  };

  // 每十秒打一次 API 拿到最新結果
  useEffect(() => {
    // 定義一個函數，用於執行 getResultCount
    const fetchResultAndSwitchToResult = () => {
      getResultCount();
      setShowVideo(false);
      setTimeout(() => {
        setShowVideo(true);
      }, 10000);
    };

    // 在組件加載時首先調用一次
    fetchResultAndSwitchToResult();

    // 然後設置每隔十秒執行一次
    const intervalId = setInterval(() => {
      fetchResultAndSwitchToResult();
    }, 20000);

    // 清理定時器以避免內存泄漏
    return () => clearInterval(intervalId);

    // 取消檢驗下一行
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 當結果資料有改變時，取得最大＆最小＆其他結果分別 set 到 state 中
  useEffect(() => {
    setTimeout(() => {
      const updatedResult = { ...allResult };

      let maxKey = null;
      let maxValue = -Infinity;

      // 找到具有最大值的键
      for (const key in updatedResult) {
        if (updatedResult[key] > maxValue) {
          maxValue = updatedResult[key];
          maxKey = key;
        }
      }

      // 删除具有最大值的键
      delete updatedResult[maxKey];
      let minKey = null;
      let minValue = Infinity;

      // 找到具有最小值的键
      for (const key in updatedResult) {
        if (updatedResult[key] < minValue) {
          minValue = updatedResult[key];
          minKey = key;
        }
      }

      const resultKeyAll = [
        "AAA",
        "AAB",
        "ABA",
        "ABB",
        "BAA",
        "BAB",
        "BBA",
        "BBB",
      ];

      // 因為 API 以關閉所以這邊資料先寫死
      // setMostResult(maxKey);
      // setLeastResult(minKey);
      // setOtherResult(
      //   resultKeyAll.filter((item) => item !== maxKey && item !== minKey)
      // );
      setMostResult("AAA");
      setLeastResult("AAB");
      setOtherResult(["ABA", "ABB", "BAA", "BAB", "BBA", "BBB"]);
    }, 1000);
  }, [allResult]);

  const resultName = (r) =>
    r === "AAA"
      ? "鬼才大導演"
      : r === "AAB"
      ? "魅力千萬直播主"
      : r === "ABA"
      ? "Shorts 挑戰大師"
      : r === "ABB"
      ? "流量密碼創造機"
      : r === "BAA"
      ? "超級剪輯神手"
      : r === "BAB"
      ? "創意企劃百變達人"
      : r === "BBA"
      ? "品牌瘋搶合作王"
      : r === "BBB"
      ? "百萬訂閱創作者"
      : null;

  return (
    <div className="App">
      {!showVideo && (
        <Fade
          in={!showVideo}
          timeout={1500}
          easing={{ enter: "ease-in", exit: "ease-out" }}
        >
          <div className="bg">
            <div className="container">
              <div className="wrap">
                <div className="content">
                  <div className="title_box">{imagesSVG.title()}</div>
                  <div className="content_text">
                    遊走在 <span className="yt600">YouTube Works Award</span>{" "}
                    優秀的得獎廣告之中，你是否也在想像可以創作出精彩的影音之作？
                  </div>
                  <div className="content_text">
                    不要懷疑，每個人都有著潛力無窮的「
                    <span className="yt600">YouTube DNA</span>」，場內限定{" "}
                    <span className="yt600">YouTube DNA</span>{" "}
                    鑑定測驗，推薦適合你的得獎廣告作品，挖掘屬於你的創作能量領域，你將成為{" "}
                    <span className="yt600">YouTube</span>{" "}
                    工作室中獨一無二的隱藏角色，下一座{" "}
                    <span className="yt600">YouTube Works Awards</span>{" "}
                    年度廣告大賞獎盃有可能就在你的手中！
                  </div>
                  <div className="qr_box">
                    <div className="qr">{imagesSVG.qr()}</div>
                    <div className="qr_text">
                      掃描 <span className="yt700">QR CODE</span> <br />
                      進入 <span className="yt700">YOUTUBE</span> 工作室
                      <br />
                      一起激發 <span className="yt700">YOUTUBE DNA</span>！
                    </div>
                  </div>
                </div>
                <div className="result">
                  {mostResult && leastResult && (
                    <Grow in={!showVideo}>
                      <div className="spotlight_container">
                        <div className="spotlight_box most">
                          <div className="spotlight_light">
                            {imagesSVG.light()}
                          </div>
                          <div className="star spotlight_star_1">
                            {imagesSVG.star()}
                          </div>
                          <div className="star spotlight_star_2">
                            {imagesSVG.star()}
                          </div>
                          <div className="star spotlight_star_3">
                            {imagesSVG.star()}
                          </div>
                          <div className="result_icon">
                            {imagesSVG[`icon_${mostResult}`]()}
                          </div>
                          <div className="result_title yt900">
                            {resultName(mostResult)}
                          </div>
                          <div className="intro yt700">最熱門 DNA</div>
                        </div>
                        <div className="spotlight_box least">
                          <div className="spotlight_light">
                            {imagesSVG.light()}
                          </div>
                          <div className="star spotlight_star_1">
                            {imagesSVG.star()}
                          </div>
                          <div className="star spotlight_star_2">
                            {imagesSVG.star()}
                          </div>
                          <div className="star spotlight_star_3">
                            {imagesSVG.star()}
                          </div>
                          <div className="result_icon">
                            {imagesSVG[`icon_${leastResult}`]()}
                          </div>
                          <div className="result_title yt900">
                            {resultName(leastResult)}
                          </div>
                          <div className="intro yt700">最稀有 DNA</div>
                        </div>
                      </div>
                    </Grow>
                  )}
                  <Grow
                    in={!showVideo}
                    {...(!showVideo ? { timeout: 1500 } : {})}
                  >
                    <div className="other_box">
                      {otherResult.length === 6 &&
                        otherResult.map((result) => (
                          <div className="other_icon_box" key={result}>
                            <div className="other_icon_svg">
                              {imagesSVG[`icon_${result}`]()}
                            </div>
                            <div className="other_icon_title yt900">
                              {resultName(result)}
                            </div>
                          </div>
                        ))}
                    </div>
                  </Grow>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      )}
      {showVideo && (
        <Fade
          in={showVideo}
          timeout={1500}
          easing={{ enter: "ease-in", exit: "ease-out" }}
        >
          <video
            className="video_container"
            loop
            muted
            autoPlay
            width="100%"
            height="100%"
            src="https://oss.uppmkt.com/202308/ytfg/short.webm"
          >
            <source
              src="https://oss.uppmkt.com/202308/ytfg/short.webm"
              type="video/webm"
            />
            Your browser does not support the video tag.
          </video>
        </Fade>
      )}
    </div>
  );
}

export default App;

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const port = process.env.PORT || 5649;
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", async function (req, res) {
  const shfe_url = "https://www.shfe.com.cn/data/delaymarket_ru.dat";
  const tocom_url =
    "https://cf.market-info.jp/jpx/json/commodity_value?lang=en";
  var config = {
    method: "get",
    url: shfe_url,
    headers: {
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "max-age=0",
      Connection: "keep-alive",
      Host: "www.shfe.com.cn",
      "If-Modified-Since": "0",
      Referer: "https://www.shfe.com.cn/en/products/NaturalRubber/",
      "sec-ch-ua":
        '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
    },
  };
  let shfe_res = await axios(config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });

  var config = {
    method: "get",
    url: tocom_url,
    headers: {},
  };
  let tocom_res = await axios(config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });

  try {
    res.send({
      tocom_data: tocom_res["RSS3 Rubber Futures"],
      shfe_data: shfe_res,
    });
  } catch (e) {
    console.log(e);
    res.send({
      tocom_data: {},
      shfe_data: {},
    });
  }
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

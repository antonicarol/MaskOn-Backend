import express from "express";
import mongoose from "mongoose";
import Masks from "./models/dbProduct.js";
import messages from "./messages.js";
import { sortBySales, sortByPopular, sortByTimeStamp } from "./utils/sort.js";
import Cors from "cors";

// APP CONFIG
const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader("Access-Control-Allow-Headers", "*"),
    next();
});
app.use(Cors());

//MONGODHB CONFIG
const connectionUrl =
  "mongodb+srv://admin:DGYCTHH1B2DuGbRk@clustermaskon.fitzw.mongodb.net/maskon?retryWrites=true&w=majority";

mongoose.connect(connectionUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//API CALLS

//#region GET
app.get("/", (req, res) => {
  res.status(200).send("Welcome To the MaskOn Api 💯🔥🚀");
});

app.get("/api/masks/all", (req, res) => {
  Masks.find({ onSale: false }, (err, data) => {
    if (err) {
      res.status(500).send(messages.No_Masks_Found);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/api/masks/onSale", (req, res) => {
  Masks.find({ onSale: true }, (err, data) => {
    if (err) {
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/api/masks/moreSold", (req, res) => {
  Masks.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const sortedMasks = sortBySales(data);
      console.log(sortedMasks.length);
      res.status(200).send(sortedMasks);
    }
  });
  //Do a filter by sales and clicks
});

app.get("/api/masks/morePopular", (req, res) => {
  Masks.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const sortedMasks = sortByPopular(data);
      console.log(sortedMasks.length);
      res.status(200).send(sortedMasks);
    }
  });
  //Do a filter by sales and clicks
});

app.get("/api/masks/moreRecent", (req, res) => {
  Masks.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const sortedMasks = sortByTimeStamp(data);
      console.log(sortedMasks.length);
      res.status(200).send(sortedMasks);
    }
  });
});

app.get("/api/masks/:type", (req, res) => {
  const query = req.params;
  Masks.find({ type: query.type }, (err, data) => {
    if (err) {
      res.status(500).send(`${messages.No_Masks_Match_Type}${type.toString()}`);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/api/masks/:price/gte", (req, res) => {
  const query = req.params;
  const price = parseInt(query.price, 0);
  Masks.find({ price: { $gte: price } }, (err, data) => {
    if (err) {
      res.status(500).send(messages.No_Masks_Found);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/api/masks/:price/lte", (req, res) => {
  const query = req.params;
  const price = parseInt(query.price, 0);
  Masks.find({ price: { $lte: price } }, (err, data) => {
    if (err) {
      res.status(500).send(messages.No_Masks_Found);
    } else {
      res.status(200).send(data);
    }
  });
});

app.put("/api/masks/currencyExchange/:diff", (req, res) => {
  const diff = req.params["diff"];
  Masks.update(
    {},
    { $set: { price: price * diff } },
    { multi: true },
    (err, data) => {
      res.send("updated");
    }
  );
});

//#endregion

// LISTEN AND OPEN SERVER AT PORT DEFINED
app.listen(port, () => console.log(`listening at port : ${port}`));

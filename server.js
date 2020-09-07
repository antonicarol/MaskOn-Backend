import express from "express";
import mongoose from "mongoose";
import Masks from "./models/dbProduct.js";
import messages from "./messages.js";

// APP CONFIG
const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader("Access-Control-Allow-Headers", "*"),
    next();
});

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
  Masks.find({}, (err, data) => {
    if (err) {
      res.status(500).send(messages.No_Masks_Found);
    } else {
      res.status(200).send(data);
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

//#endregion

// LISTEN AND OPEN SERVER AT PORT DEFINED
app.listen(port, () => console.log(`listening at port : ${port}`));

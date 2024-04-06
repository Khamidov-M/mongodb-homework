const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/homework", { useNewUrlParser: true })
  .then(() => {
    console.log("connected to mongodb...");
  })
  .catch(() => {
    console.log("filed while connecting to mongodb...");
  });

const sizeSchema = new mongoose.Schema({
  h: Number,
  w: Number,
  uon: String,
});
const rateSchema = new mongoose.Schema({
  item: String,
  qty: Number,
  size: sizeSchema,
  status: String,
});

const Rate = mongoose.model("items", rateSchema);

async function createItem() {
  const item = new Rate({
    item: "Postcard",
    qty: 45,
    status: "A",
  });
  const publishItem = await item.save();
  console.log(publishItem);
}

// createItem();

async function findItem() {
  const item = await Rate.find({ status: "A" })
    .select({ item: 1, qty: 1, _id: 0 })
    .sort({ qty: 1 });

  console.log(item);
}

// findItem();

async function getItem() {
  const item = await Rate.find()
    .or([{ qty: { $lte: 50 } }, { item: /.*l.*/i }])
    .sort({ qty: -1 });
  console.log(item);
}

getItem();

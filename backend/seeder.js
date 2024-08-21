const mongoose = require("mongoose");
require("dotenv").config();
const products = require("./data/products");
const user = require("./data/users");
const ProductModel = require("./model/productModel");
// const OrderModel = require("./model/orederModle");
const UserModel = require("./model/userModel");
const DB = require("./config/db-connection");
const ProfileModel = require("./model/profileMiodel");
const PostModel = require("./model/postModel");
const data = require("./data/profile");
DB();
const importData = async () => {
  try {
    await ProductModel.deleteMany();
    await UserModel.deleteMany();

    const createUser = await UserModel.insertMany(user);
    const admin = createUser[0]._id;
    const createSampleProduct = products.map((product) => ({
      ...product,
      user: admin,
    }));
    await ProductModel.insertMany(createSampleProduct);

    console.log("data seeded!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
const importProfile = async () => {
  try {
    await ProfileModel.deleteMany();
    await PostModel.deleteMany();

    await ProfileModel.insertMany(data.profile);
    await PostModel.insertMany(data.post);

    console.log("data seeded?");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    await ProductModel.deleteMany();
    await UserModel.deleteMany();

    console.log("dataBase deleted");
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
if (process.argv[2] === "-d") {
  destroyData();
} else if (process.argv[2] === "-profile") {
  importProfile();
} else {
  importData();
}

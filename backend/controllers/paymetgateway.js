const SSLCommerzPayment = require("sslcommerz-lts");
const orederModel = require("../model/orederModel");
require("dotenv").config();
const store_id = process.env.SSLSTORE_ID;
const store_passwd = process.env.SSLKEY;
const is_live = false; //true for live, false for sandbox

//sslcommerz init
module.exports = async (req, res) => {
  const order = await orederModel
    .findById(req.params.id)
    .populate("user", "name username");

  const data = {
    total_amount: order.totalPrice,
    currency: "BDT",
    tran_id: order.id, // use unique tran_id for each api call
    success_url: `${process.env.BASE}/order/success/${order.id}`,
    fail_url: `${process.env.BASE}/order/fail/${order.id}`,
    cancel_url: `${process.env.BASE}/cancel`,
    ipn_url: `${process.env.BASE}/ipn`,
    shipping_method: "Courier",
    product_name: order.orderItems.map((x) => x.name).toString(),
    product_category: "Electronic",
    product_profile: "general",
    cus_name: order.user.name,
    cus_email: order.user.username,
    cus_add1: order.shippingAddress.address,
    // cus_add2: "Dhaka",
    cus_city: order.shippingAddress.city,
    cus_state: "Dhaka",
    cus_postcode: order.shippingAddress.postalCode,
    cus_country: order.shippingAddress.country,
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

  const response = await sslcz.init(data);

  res.status(200).send({ url: response.GatewayPageURL });
};

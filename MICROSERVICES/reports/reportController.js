const axios = require('axios')

const welcomeToService = (req,res) => {
  res.status(200).json("Welcome to reports service");
}

const userReport = async (req, res) => {
  await axios.get('http://localhost:9000/users/stats', req).then((response) => {
    res.status(200).json(response.data);
  }).catch((error) => {
    res.status(500).json(error.message);
  })
}

const getSales = async (req, res) => {
  await axios.get('http://localhost:9000/orders/sales', req).then((response) => {
    res.status(200).json(response.data);
  }).catch((error) => {
    res.status(500).json(error);
  })
 }

  module.exports = { welcomeToService, userReport, getSales }
const processPayment = (req, res) => {
    
    res.status(200).json("Payment processed sucessfully");
  }

module.exports = { processPayment }
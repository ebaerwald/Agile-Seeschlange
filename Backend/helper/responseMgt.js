exports.succes = (successMessage, res) => {
  res.status(200).json({
    success: true,
    successMessage,
  });
};
exports.faild = (errorMessage, res) => {
  res.status(500).json({
    success: false,
    errorMessage,
  });
};

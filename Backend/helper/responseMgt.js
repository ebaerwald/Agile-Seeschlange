exports.success = (successMessage, res) => {
  res.status(200).json(successMessage);
};
exports.faild = (errorMessage, res) => {
  res.status(500).json(errorMessage);
};

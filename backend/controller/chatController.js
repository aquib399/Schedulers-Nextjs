const test = (req, res) => {
  console.log("Testing chat -> /chat/test");
  return res.json({ error: false, message: "Chat Test Success" });
};

module.exports = { test };

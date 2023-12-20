function test(req, res) {
  console.log("Testing chat -> /chat/test");
  return res.json({ error: false, message: "Chat Test Success", payload: req.body });
}

module.exports = { test };

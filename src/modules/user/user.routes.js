const express = require("express");
const userService = require("./user.service");

const router = express.Router();

// GET /api/user
router.get("/api/user", async (req, res) => {
  // #swagger.tags = ['Usuario']
  try {
    params = JSON.parse(req.headers['params']) 
    let paginated = await userService.paginated(params)
    return res.status(200).send(paginated);

  } catch (error) {
    console.log(error)
    return res.status(500).send(error);
  }
});

// GET /api/user/:id
router.get("/api/user/:id",  async (req, res) => {
  // #swagger.tags = ['Usuario']
  try {
    const userId = req.params.id;
    const user = await userService.findOneById(userId);
    return res.status(200).send(user);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// POST /api/user
router.post("/api/user", async (req, res) => {
  // #swagger.tags = ['Usuario']
  try {
    const newUser = req.body;
    console.log("Request received at /api/user with body:", newUser); // Log para verificar que el cuerpo de la solicitud está siendo recibido
    const user = await userService.save(newUser);
    console.log("User saved successfully:", user); // Log para verificar que el usuario se guardó correctamente
    return res.status(201).send(user);
  } catch (error) {
    console.error("Error in /api/user:", error); // Log para capturar cualquier error
    return res.status(500).send(error);
  }
});
// PUT /api/user/:id
router.put("/api/user/:id",  async (req, res) => {
  // #swagger.tags = ['Usuario']
  try {
    const userId = req.params.id;
    const updatedUser = req.body;
    const user = await userService.update(userId, updatedUser);
    return res.status(200).send(user);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// DELETE /api/user/:id
router.delete("/api/user/:id", async (req, res) => {
  // #swagger.tags = ['Usuario']
  try {
    const userId = req.params.id;
    await userService.remove(userId);
    return res.status(200).send("Usuario eliminado correctamente.");

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
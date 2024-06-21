const express = require("express");
const taskService = require("./task.services");
const router = express.Router();


// GET /api/tasks
router.get("/api/tasks", async (req, res) => {
  // #swagger.tags = ['Tareas']  
  try {
      const { page, limit } = req.query;
      if (page && limit) {
        const tasks = await taskService.findAllPaginated(page, limit);
        res.status(200).json(tasks);
      } else {
        const tasks = await taskService.findAll();
        res.status(200).json(tasks);
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });



/*
Esta ruta acepta los parámetros page y limit 
como parámetros de consulta para controlar 
la paginación.
*/


// GET /api/tasks/:id
router.get("/api/tasks/:id", async (req, res) => {
  // #swagger.tags = ['Tareas'] 
  try {
    const task = await taskService.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/tasks
router.post("/api/tasks", async (req, res) => {
  // #swagger.tags = ['Tareas'] 
  try {
    const newTask = await taskService.create(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/tasks/:id
router.put("/api/tasks/:id", async (req, res) => {
  // #swagger.tags = ['Tareas'] 
  try {
    const updatedTask = await taskService.update(req.params.id, req.body);
    if (!updatedTask) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/tasks/:id
router.delete("/api/tasks/:id", async (req, res) => {
  // #swagger.tags = ['Tareas'] 
  try {
    const deletedTask = await taskService.remove(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "area no encontrada" });
    }
    res.status(200).json({ message: "Tarea eliminada con exito" });	
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

/*
Estas rutas definen los endpoints para las operaciones CRUD de la entidad Task.
*/
const taskModel = require("../../models/task");
const userModel = require("../../models/user");




async function findAllPaginated(params) {
  let perPage = params.perPage ? params.perPage : 10;
  let page = Math.max(0, params.page);
  let filter = params.filter ? params.filter : {};
  let sort = params.sort ? params.sort : {};

  let count = await taskModel.countDocuments(filter);
  let data = await taskModel
    .find(filter)
    .limit(perPage)
    .skip(perPage * page)
    .sort(sort)
    .populate('user')
    .exec();

  return pager.createPager(page, data, count, perPage);
}







/*
async function findAllPaginated(page, limit) {
  const options = {
    page: page || 1,
    limit: limit || 10,
    populate: 'user',
    lean: true
  };

  return await taskModel.paginate({}, options);
}
*/





async function create(taskData) {
  const newTask = new taskModel(taskData);
  const savedTask = await newTask.save();
  
  // Actualizamos el usuario para añadir la referencia a la tarea
  await userModel.findByIdAndUpdate(savedTask.task, {
      $push: { task: savedTask._id }
  });

  return savedTask;
}

async function findAll() {
  return await taskModel.find().populate("user").exec();
}

async function findById(id) {
  return await taskModel.findById(id).populate("user").exec();
}

async function update(taskId, taskData) {
  const updatedTask = await taskModel.findByIdAndUpdate(taskId, taskData, { new: true });

  if (updatedTask) {
      // Actualizamos el usuario para asegurar que la referencia esté presente
      await userModel.findByIdAndUpdate(updatedTask.task, {
          $addToSet: { task: updatedTask._id }
      });
  }

  return updatedTask;
}

async function remove(id) {
  return await taskModel.findByIdAndDelete(id).exec();
}

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove
};

/*
Estas funciones implementan las operaciones 
CRUD básicas para la entidad Task. La función 
findAll y findById utilizan el método populate de
 Mongoose para cargar los datos del usuario 
 relacionado.
*/
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true
    }
}, { timestamps: true });


TaskSchema.statics.getAll = async function(user) {
    const tasks = await this.find({ userId: user._id });
    return tasks;
};

TaskSchema.statics.getOneById = async function(user, id) {
    if (!mongoose.isValidObjectId(id)){
        throw Error("Task id is not valid");
    }
    const task = await this.findOne({ _id: id });
    if (!task){
        throw Error("Cannot get task that doesn't exist");
    }
    if (task.userId !== user._id){
        throw Error("Cannot get task that doesn't belong to you");
    }
    return task;
};

TaskSchema.statics.createOne = async function(user, newTask) {
    newTask.userId = user._id;
    const tasks = await this.create(newTask);
    return tasks;
};

TaskSchema.statics.deleteOneById = async function(user, id) {
    if (!mongoose.isValidObjectId(id)){
        throw Error("Task id is not valid");
    }
    const task = await this.findOne({ _id: id });
    if (!task){
        throw Error("Cannot delete task that doesn't exist");
    }
    if (task.userId !== user._id){
        throw Error("Cannot delete task that doesn't belong to you");
    }
    const deletedTask = await this.deleteOne({ _id: id });
    return deletedTask;
};

TaskSchema.statics.updateOneById = async function(user, id, newTask) {
    if (!mongoose.isValidObjectId(id)){
        throw Error("Task id is not valid");
    }
    const task = await this.findOne({ _id: id });
    if (!task){
        throw Error("Cannot update task that doesn't exist");
    }
    if (task.userId !== user._id){
        throw Error("Cannot update task that doesn't belong to you");
    }

    const deletedTask = await this.replaceOne({ _id: id }, newTask);
    
    return deletedTask;
};


module.exports = mongoose.model("Task", TaskSchema);
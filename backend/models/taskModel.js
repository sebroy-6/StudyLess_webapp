const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		difficulty: {
			type: String,
		},
		subject: {
			type: String,
		},
		duration: {
			type: String,
		},
		description: {
			type: String,
		},
		isCompleted: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

TaskSchema.statics.getAll = async function (user) {
	return await this.find({ userId: user._id }).sort({ name: 1 });
};

TaskSchema.statics.getOneById = async function (user, id) {
	if (!mongoose.isValidObjectId(id)) {
		throw Error("ERROR! Task id is not valid");
	}
	const task = await this.findOne({ _id: id });
	if (!task) {
		throw Error("ERROR! Cannot get task that doesn't exist");
	}
	if (task.userId !== user._id) {
		throw Error("ERROR! Cannot get task that doesn't belong to you");
	}
	return task;
};

TaskSchema.statics.createOne = async function (user, newTask) {
	newTask.userId = user._id;
	return await this.create(newTask);
};

TaskSchema.statics.deleteOneById = async function (user, id) {
	if (!mongoose.isValidObjectId(id)) {
		throw Error("ERROR! Task id is not valid");
	}
	const task = await this.findOne({ _id: id });
	if (!task) {
		throw Error("ERROR! Cannot delete task that doesn't exist");
	}
	if (task.userId !== user._id) {
		throw Error("ERROR! Cannot delete task that doesn't belong to you");
	}
	return await this.deleteOne({ _id: id });
};

TaskSchema.statics.updateOneById = async function (user, id, newTask) {
	if (!mongoose.isValidObjectId(id)) {
		throw Error("ERROR! Task id is not valid");
	}
	const task = await this.findOne({ _id: id });
	if (!task) {
		throw Error("ERROR! Cannot update task that doesn't exist");
	}
	if (task.userId !== user._id) {
		throw Error("ERROR! Cannot update task that doesn't belong to you");
	}

	const deletedTask = await this.replaceOne({ _id: id }, newTask);
	return deletedTask;
};

module.exports = mongoose.model("Task", TaskSchema);

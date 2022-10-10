const mongoose = require("mongoose");
const { reqError } = require("../utils/requestError");

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
		progress: {
			type: String,
			default: "todo",
		},
	},
	{ timestamps: true }
);

TaskSchema.statics.getAll = async function (user) {
	return await this.find({ userId: user._id }).sort({ name: 1 });
};

TaskSchema.statics.getOneById = async function (user, id) {
	if (!mongoose.isValidObjectId(id)) {
		throw reqError("Task id is not valid");
	}
	const task = await this.findOne({ _id: id });
	if (!task) {
		throw reqError("Cannot get task that doesn't exist");
	}
	if (task.userId !== user._id) {
		throw reqError("Cannot get task that doesn't belong to you");
	}
	return task;
};

TaskSchema.statics.createOne = async function (user, newTask) {
	newTask.userId = user._id;
	const diffLevels = ["easy", "medium", "hard"];
	if (diffLevels.includes(newTask.difficulty)) {
		return await this.create(newTask);
	} else
		throw reqError(
			`Task difficulty is not valid (must be 'easy', 'medium' or 'hard')`
		);
};

TaskSchema.statics.deleteOneById = async function (user, id) {
	if (!mongoose.isValidObjectId(id)) {
		throw reqError("Task id is not valid");
	}
	const task = await this.findOne({ _id: id });
	if (!task) {
		throw reqError("Cannot delete task that doesn't exist");
	}
	if (task.userId !== user._id) {
		throw reqError("Cannot delete task that doesn't belong to you");
	}
	return await this.deleteOne({ _id: id });
};

TaskSchema.statics.updateOneById = async function (user, id, newTask) {
	if (!mongoose.isValidObjectId(id)) {
		throw reqError("Task id is not valid");
	}
	const task = await this.findOne({ _id: id });
	if (!task) {
		throw reqError("Cannot update a task that doesn't exist");
	}
	if (task.userId !== user._id) {
		throw reqError("Cannot update a task that doesn't belong to you");
	}
	if (task.userId !== newTask.userId) {
		throw reqError("Cannot change the ownership of a task");
	}
	newTask._id = id;
	return await this.replaceOne({ _id: id }, newTask);
};

module.exports = mongoose.model("Task", TaskSchema);

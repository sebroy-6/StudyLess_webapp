const mongoose = require("mongoose");
const { isValidDate } = require("../utils/DateFunctions");

const EventSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		class: {
			type: String,
		},
		type: {
			type: String,
		},
		instances: [
			{
				startTime: {
					type: Date,
					required: true,
				},
				endTime: {
					type: Date,
					required: true,
				},
			},
		],
	},
	{ timestamps: true }
);

EventSchema.statics.getByDay = async function (user, day) {
	if (!isValidDate(new Date(day))) {
		throw new Error("ERROR! invalid day string was given");
	}
	const start = new Date(day);
	const end = new Date(day);
	end.setDate(end.getDate() + 1);
	return await this.find({
		userId: user._id,
		"instances.startTime": { $gte: start, $lt: end },
	});
};

EventSchema.statics.createOne = async function (user, event) {
	event.userId = user._id;
	return await this.create(event);
};

EventSchema.statics.deleteOneById = async function (user, id) {
	if (!mongoose.isValidObjectId(id)) {
		throw Error("ERROR! event id is not valid");
	}
	const event = await this.findOne({ _id: id });
	if (!event) {
		throw Error("ERROR! Cannot delete event that doesn't exist");
	}
	if (event.userId !== user._id) {
		throw Error("ERROR! Cannot delete event that doesn't belong to you");
	}
	return await this.deleteOne({ _id: id });
};

module.exports = mongoose.model("Event", EventSchema);

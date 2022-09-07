const mongoose = require("mongoose");
const { isValidDate } = require("../utils/dateFunctions");
const { reqError } = require("../utils/requestError");

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

EventSchema.statics.getByDay = async function (user, dateString) {
	if (!isValidDate(dateString)) {
		throw new reqError("invalid date was given (YYYY-MM-DD)");
	}
	const start = new Date(dateString);
	const end = new Date(dateString);

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
		throw reqError("event id is not valid");
	}
	const event = await this.findOne({ _id: id });
	if (!event) {
		throw reqError("Cannot delete an event that doesn't exist");
	}
	if (event.userId !== user._id) {
		throw reqError("Cannot delete an event that doesn't belong to you");
	}
	return await this.deleteOne({ _id: id });
};

EventSchema.statics.updateOneById = async function (user, id, newEvent) {
	if (!mongoose.isValidObjectId(id)) {
		throw reqError("event id is not valid");
	}
	const event = await this.findOne({ _id: id });
	if (!event) {
		throw reqError("Cannot update an event that doesn't exist");
	}
	if (event.userId !== user._id) {
		throw reqError("Cannot update an event that doesn't belong to you");
	}
	if (event.userId !== newEvent.userId) {
		throw reqError("Cannot change the ownership of an event");
	}
	newEvent._id = id;
	return await this.replaceOne({ _id: id }, newEvent);
};

module.exports = mongoose.model("Event", EventSchema);

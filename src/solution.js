const { orderBy } = require("lodash");

// Please implement your solution in this file
const fetchFlights = () => {
	return fetch("https://api.spacexdata.com/v3/launches/past")
		.then((response) => response.json())
		.then(prepareData);
};

const includesNasa = (flight) => {
	if (
		!flight ||
		!flight.rocket ||
		!flight.rocket.second_stage ||
		!flight.rocket.second_stage.payloads ||
		flight.rocket.second_stage.payloads.length === 0
	) {
		return false;
	}

	const payloads = flight.rocket.second_stage.payloads;

	for (const payload of payloads) {
		if (
			payload.customers.includes("NASA") ||
			payload.customers.includes("NASA (CRS)")
		) {
			return true;
		}
	}

	return false;
};

const prepareData = (flights) => {
	const parsedArray = [];
	flights.forEach((flight) => {
		if (flight.launch_year == "2018" && includesNasa(flight)) {
			const { flight_number, mission_name } = flight;
			const payloads_count = flight.rocket.second_stage.payloads.length;
			parsedArray.push({ flight_number, mission_name, payloads_count });
		}
	});

	return orderBy(
		parsedArray,
		["payloads_count", "flight_number"],
		["desc", "desc"]
	);
};

const renderData = (flights) => {
	document.getElementById("out").append(JSON.stringify(flights, null, 2));
};

module.exports = {
	fetchFlights,
	prepareData,
	renderData,
};

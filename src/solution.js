// Please implement your solution in this file
const fetchFlights = () => {
	return fetch("https://api.spacexdata.com/v3/launches/past")
		.then((response) => response.json())
		.then(prepareData);
};

const prepareData = (flights) => {
	return flights.map((flight) => {
		const { flight_number, mission_name, payloads_count } = flight;
		return { flight_number, mission_name, payloads_count };
	});
};

const renderData = (flights) => {
	document.getElementById("out").append(JSON.stringify(flights, null, 2));
};

module.exports = {
	fetchFlights,
	prepareData,
	renderData,
};

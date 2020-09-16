const makes = ["Toyota", "Ford", "Porsche", "Ferari", "Honda", "Tesla"];
const models = ["Celica", "Trans-Am", "Fit", "CR-V", "Explorer", "Prius"];
const basePrice = 100000;

const getRandomNoDashGuid = () => {
	return (
		`${((Math.random() * 0x7fffffff) | 0).toString(16)}00000000`.substring(
			0,
			8
		) +
		`${((Math.random() * 0x7fffffff) | 0).toString(16)}00000000`.substring(
			0,
			8
		) +
		`${((Math.random() * 0x7fffffff) | 0).toString(16)}00000000`.substring(
			0,
			8
		) +
		`${((Math.random() * 0x7fffffff) | 0).toString(16)}00000000`.substring(
			0,
			8
		)
	);
};

export const getRandomRows = () => {
	const rowCount = 1;
	const rows: {
		id: string;
		make: string;
		model: string;
		price: number;
	}[] = [];
	for (let i = 0; i < rowCount; i++) {
		const makeIndex = Math.floor(Math.random() * makes.length);
		const modelIndex = Math.floor(Math.random() * models.length);
		rows.push({
			make: makes[makeIndex],
			model: models[modelIndex],
			price: basePrice * Math.random(),
			id: getRandomNoDashGuid(),
		});
	}
	return rows;
};

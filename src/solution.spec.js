import { renderData, prepareData } from "./solution";
import payload from "../fixtures/payload.json";
import output from "../fixtures/output.json";

describe(`prepareData`, () => {
	it(`consolidates the data correctly`, () => {
		global.fetch = jest.fn(() => Promise.resolve(output));
		expect(prepareData(payload)).toEqual(output);
	});
});

describe(`renderData`, () => {
	it(`renders the output correctly`, () => {
		const example = [
			{
				foo: 2,
				bar: "baz",
			},
		];

		const expected = [
			`[`,
			`  {`,
			`    "foo": 2,`,
			`    "bar": "baz"`,
			`  }`,
			`]`,
		].join("\n");

		document.body.innerHTML = `<pre id="out"></pre>`;
		renderData(example);
		expect(document.getElementById("out").innerHTML).toEqual(expected);
	});
});

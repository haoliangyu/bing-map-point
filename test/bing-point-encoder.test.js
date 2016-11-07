const bpe = require('../dist/bing-point-encoder.js');
const chai = require('chai');
const expect = chai.expect;

let coords = [
    [-110.72522000409663, 35.894309002906084],
    [-110.72577999904752, 35.893930979073048],
    [-110.72606003843248, 35.893744984641671],
    [-110.72661500424147, 35.893366960808635]
];

let coordStr = 'vx1vilihnM6hR7mEl2Q';

describe('Test Bing Point Coordinate Encoder', () => {
    it('should return an encoded string', () => {
        let encoded = bpe.encode(coords);
        expect(encoded).to.equal(coordStr);
    });

    it('should return an array of point coordinates', () => {
        let round5 = num => Math.round(num * 100000) / 100000;

        // reproduce the accuracy loss brought by encoding
        let lessAccurate = coords.map(coord => [round5(coord[0]), round5(coord[1])]);
        let decoded = bpe.decode(coordStr);
        expect(decoded).to.deep.equal(lessAccurate);
    });
});

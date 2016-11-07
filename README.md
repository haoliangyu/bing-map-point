# bing-point-encoder

encode and decode point coordinates for Bing Spatial Data APIs.

## Installation

``` bash
npm install bing-point-encoder
```

## Usage

* Encode an array of point coordinates

``` javascript
let bpe = require('bing-point-encoder');

let coords = [
    [-110.72522000409663, 35.894309002906084],
    [-110.72577999904752, 35.893930979073048],
    [-110.72606003843248, 35.893744984641671],
    [-110.72661500424147, 35.893366960808635]
];

let result = bpe.encode(coords);

// result = 'vx1vilihnM6hR7mEl2Q'
```

* Decode a coordinate string

``` javascript
let bpe = require('bing-point-encoder');

let result = bpe.decode('vx1vilihnM6hR7mEl2Q');

// result = [
//    [-110.72522, 35.89430],
//    [-110.72577, 35.89393],
//    [-110.72606, 35.89374],
//    [-110.72661, 35.89336]
// ]
```

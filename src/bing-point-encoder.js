const safeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';

/**
 * Decode point string into GeoJSON point coordinates.
 * Source: http://stackoverflow.com/questions/30960232/decompress-bing-maps-geodata-borders-with-python
 *
 * @param  {string}   pointStr  point string
 * @return {object[]}           GeoJSON point coordinates
 */
exports.decode = pointStr => {
    let latLng = [];
    let pointsArray = [];
    let point = [];
    let lastLat = 0;
    let lastLng = 0;

    pointStr.split('').forEach(code => {
        let num = safeChars.indexOf(code);
        if (num < 32) {
            point.push(num);
            pointsArray.push(point);
            point = [];
        }
        else {
            num -= 32;
            point.push(num);
        }
    });

    pointsArray.forEach(pnt => {
        let result = 0;

        pnt.reverse().forEach(num => {
            if (result === 0) {
                result = num;
            } else {
                result = result * 32 + num;
            }
        });

        let diag = Math.trunc((Math.sqrt(8 * result + 5) - 1) / 2);

        let latY = result - diag * (diag + 1) / 2;
        let lngX = diag - latY;

        if (latY % 2 === 1) {
            latY = -(latY + 1);
        }

        if (lngX % 2 === 1) {
            lngX = -(lngX + 1);
        }

        latY /= 2;
        lngX /= 2;

        let lat = latY + lastLat;
        let lng = lngX + lastLng;

        lastLat = lat;
        lastLng = lng;

        latLng.push([lng / 100000, lat / 100000]);
    });

    return latLng;
};

/**
 * Encode GeoJSON point coordinates into string.
 * Source: https://msdn.microsoft.com/en-us/library/jj158958.aspx#Anchor_1
 *
 * @param  {object[]} points  GeoJSON point coordinates
 * @return {string}           compressed point string
 */
exports.encode = points => {
    let latitude = 0;
    let longitude = 0;
    let result = [];

    for (let point in points) {

        // step 2
        let newLatitude = Math.round(points[point][1] * 100000);
        let newLongitude = Math.round(points[point][0] * 100000);

        // step 3
        let dy = newLatitude - latitude;
        let dx = newLongitude - longitude;
        latitude = newLatitude;
        longitude = newLongitude;

        // step 4 and 5
        dy = (dy << 1) ^ (dy >> 31);
        dx = (dx << 1) ^ (dx >> 31);

        // step 6
        var index = (dy + dx) * (dy + dx + 1) / 2 + dy;

        while (index > 0) {

            // step 7
            var rem = index & 31;
            index = (index - rem) / 32;

            // step 8
            if (index > 0) {
                rem += 32;
            }

            // step 9
            result.push(safeChars[rem]);
        }
    }

    // step 10
    return result.join('');
};

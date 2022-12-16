const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const habitablePlanets = [];

function isHabitable(planet) {
    return planet['koi_disposition'] === 'CONFIRMED' 
    && planet['koi_insol'] > 0.36
    && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true
    }))
    .on('data', (data) => {
        if (isHabitable(data)) {
            habitablePlanets.push(data);
        }
    })
    .on('error', (err) => {
        console.log(err);
    })
    .on('end', () => {
        console.log('.-.-.-.-.-.-..-.-.-.-.-.-..-.-.-.-.-.-..-.-.-.-.-.-..-.-.-.-.-.-..-.-.-.-.-.-..-.-.-.-.-.-.');
        console.log(`Data pipeline is finished. Data read ${habitablePlanets.length} habitable planets.`);
        console.log('.-.-.-.-.-.-..-.-.-.-.-.-..-.-.-.-.-.-..-.-.-.-.-.-..-.-.-.-.-.-..-.-.-.-.-.-..-.-.-.-.-.-.');
        console.log(habitablePlanets.map((planet) => {
            return planet['kepler_name'];
        }));
        console.log('.-.-.-.-.-.-..-.-.-.-.-.-..-.-.-.-.-.-..-.-.-.-.-.-..-.-.-.-.-.-..-.-.-.-.-.-..-.-.-.-.-.-.');
    });



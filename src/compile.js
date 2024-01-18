const fs = require('fs');

module.exports = ((d) => {
    let dir = `${__dirname}/${d}`;
    let files = fs.readdirSync(dir).filter( file => ((file.endsWith('.js') || file.endsWith('.ts')) ));  
    files.forEach( (file) => {
        require(`${dir}/${file}`);
    });
})

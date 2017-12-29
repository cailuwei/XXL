const glob = require('glob');
const path = require('path');

exports.pickFiles = function (options) {
    const files = glob.sync(options.pattern);
    return files.reduce((data, filename) => {
        if (filename.endsWith('.js')) {
            const matched = filename.match(options.id);
            let name = matched[1];
            name = name.replace('.min', '');
            data[name] = path.resolve(__dirname, filename);
            return data;
        } else {
            return data;
        }
    }, {});
};


exports.fullPath = function (dir) {
    return path.resolve(__dirname, dir);
};

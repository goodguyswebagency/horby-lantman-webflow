// this is the config file for a plugins that minifies css and does the autoprefix
// you can also set a condition to use some plugin only on production mode
// if(process.env.NODE_ENV === 'production') {...} else {...}
module.exports = {
    plugins: {
        autoprefixer: {},
        cssnano: {}
    }
}
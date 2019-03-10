// Eslint configuration

module.exports = {
    parser: 'babel-eslint',
    extends: 'airbnb-base',
    env: {
        browser: true
    },
    rules: {
        indent: ['error', 4],
        'arrow-parens': ['error', 'as-needed'],
        'no-param-reassign': 0,
        'linebreak-style': 0
    }
}
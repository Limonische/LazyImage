module.exports = {
    parser: 'babel-eslint',
    extends: 'airbnb-base',
    env: {
        browser: true,
        node: true
    },
    rules: {
        indent: ['error', 4],
        'arrow-parens': ['error', 'as-needed'],
        'no-param-reassign': 0
    }
}
const viewGenerator = require('./plop/view/prompt.cjs')
const componentGenerator = require('./plop/component/prompt.cjs')

module.exports = function (plop) {
  plop.setGenerator('view', viewGenerator)
  plop.setGenerator('component', componentGenerator)
}

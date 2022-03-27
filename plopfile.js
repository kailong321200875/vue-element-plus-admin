const createNewModule = require('./plop/generator/newModule')

function Cli(plop) {
  plop.setGenerator('newModule', createNewModule)
}

module.exports = Cli

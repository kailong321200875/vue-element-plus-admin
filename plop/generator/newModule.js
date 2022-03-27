const PAGE_PATH = 'src/views/'

const toUpperCase = (str) => str.charAt(0).toUpperCase() + str.slice(1)

module.exports = {
  description: 'Create a new Module',
  prompts: [
    {
      type: 'input',
      name: 'pagePath',
      message: 'What is the path to the page?'
    },
    {
      type: 'input',
      name: 'moduleName',
      message: 'What is the name of the module?'
    }
  ],
  actions: (data) => {
    const { pagePath, moduleName } = data
    const upperFirstName = toUpperCase(moduleName)

    const actions = []
    if (moduleName) {
      actions.push({
        type: 'add',
        path: `${PAGE_PATH}${pagePath}/${moduleName}/index.vue`,
        templateFile: 'plop/template/newModule/index.hbs',
        data: {
          name: moduleName,
          upperFirstName
        }
      })
    }

    return actions
  }
}

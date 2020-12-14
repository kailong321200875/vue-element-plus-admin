const req = require.context('@/assets/icons/svg', false, /\.svg$/)
const requireAll = (requireContext: any) => requireContext.keys()

const re = /\.\/(.*)\.svg/

const svgIcons = requireAll(req).map((i: any) => {
  return i.match(re)[1]
})

export default svgIcons

const req: any = require.context('./svg', false, /\.svg$/)
const requireAll: any = (requireContext: any) => {
  requireContext.keys().map(requireContext)
}
requireAll(req)

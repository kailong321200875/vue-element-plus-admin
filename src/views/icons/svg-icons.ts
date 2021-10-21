const modules = import.meta.glob('../../assets/icons/*.svg')

const svgIcons: string[] = []

for (const key in modules) {
  svgIcons.push(key.split('../../assets/icons/')[1].split('.')[0])
}

export default svgIcons

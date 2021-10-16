import IntroJs from 'intro.js'
import 'intro.js/introjs.css'

export function useIntro() {
  const intro: IntroJs.IntroJs = new (IntroJs as any)()

  return {
    intro
  }
}

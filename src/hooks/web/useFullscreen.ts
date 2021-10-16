import screenfull from 'screenfull'

export function useFullscreen() {
  const sf = screenfull as any

  return {
    sf
  }
}

import type Lenis from 'lenis'

export const useLenis = () => {
  const nuxtApp = useNuxtApp()

  return nuxtApp.$lenis as Lenis | undefined
}

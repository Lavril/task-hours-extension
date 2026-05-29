import { useRef } from "react"

export const useDebouncedCallback = (
  callback: (...args: any[]) => void,
  delay: number
) => {
  const timeoutRef = useRef<number | undefined>(undefined)

  return (...args: any[]) => {
    window.clearTimeout(timeoutRef.current)

    timeoutRef.current = window.setTimeout(() => {
      callback(...args)
    }, delay)
  }
}
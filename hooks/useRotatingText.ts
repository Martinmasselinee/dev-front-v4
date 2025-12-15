import { useState, useEffect } from 'react'
import { TIME } from '../constants/time'

export const useRotatingText = (texts: string[]) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }, TIME.INTERVAL.ROTATING_TEXT)

    return () => clearInterval(interval)
  }, [texts.length])

  return { currentTextIndex, currentText: texts[currentTextIndex] }
}


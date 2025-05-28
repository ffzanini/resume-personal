'use client'

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  ReactNode,
} from 'react'
import { en, pt } from '../locales'

type Locations = 'pt' | 'en'

export interface InternacionalizationInterface {
  location: Locations
  setLocation: (location: Locations) => void
  translations: typeof pt
}

const InternacionalizationContext = createContext(
  {} as InternacionalizationInterface,
)

const useTranslation = () => {
  const context = useContext(InternacionalizationContext)

  if (context === undefined) {
    throw new Error(
      'useTranslation must be used within InternacionalizationProvider',
    )
  }

  return context
}

const InternacionalizationProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [location, setLocation] = useState<Locations>('pt')

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const lang = urlParams.get('lang')
    if (lang && (lang === 'pt' || lang === 'en')) {
      setLocation(lang as Locations)
    }
  }, [])

  const getTranslations = useCallback(() => {
    if (location === 'en') return en
    return pt
  }, [location])

  const objTranslations = useMemo(
    () => ({ location, setLocation, translations: getTranslations() }),
    [location, getTranslations],
  )

  return (
    <InternacionalizationContext.Provider value={objTranslations}>
      {children}
    </InternacionalizationContext.Provider>
  )
}

export { InternacionalizationProvider, useTranslation }

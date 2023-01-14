'use client'

import { createContext, useState } from 'react'

type ContextProviderProps = {
  children: React.ReactNode
}

type ContextType = {
  logged: boolean
  setLogged: React.Dispatch<React.SetStateAction<boolean>>
}

export const Context = createContext<ContextType | null>(null)

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [logged, setLogged] = useState<boolean>(false)
  return (
    <Context.Provider value={{ logged, setLogged }}>{children}</Context.Provider>
  )
}
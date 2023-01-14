'use client'

import { createContext, useState } from 'react'

type ContextProviderProps = {
  children: React.ReactNode
}

type ContextType = {
  hidden: boolean
  setHidden: React.Dispatch<React.SetStateAction<boolean>>
}

export const Context = createContext<ContextType | null>(null)

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [hidden, setHidden] = useState<boolean>(false)
  return (
    <Context.Provider value={{ hidden, setHidden }}>{children}</Context.Provider>
  )
}
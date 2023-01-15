'use client'

import React, { createContext, useState } from 'react'

type task = {
  name: string;
  date: string;
  priority: number;
}

type ContextProviderProps = {
  children: React.ReactNode
}

type ContextType = {
  logged: boolean
  setLogged: React.Dispatch<React.SetStateAction<boolean>>
  task: task
  setTask: React.Dispatch<React.SetStateAction<task>>
}

export const Context = createContext<ContextType | null>(null)

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [logged, setLogged] = useState<boolean>(false)
  const [task, setTask] = useState<task>({} as task)
  return (
    <Context.Provider value={{ logged, setLogged, task, setTask }}>{children}</Context.Provider>
  )
}
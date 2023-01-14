import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import Header from './(components)/Header'
import Navbar from './(components)/Navbar'
import { ContextProvider } from '@/context/ContextProvider'
import Table from './(components)/Table'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <ContextProvider>
        <Header />
        <Navbar />
        <Table />
      </ContextProvider>
    </>
  )
}


import type { NextPage } from 'next'
import Head from 'next/head'

import React, { useContext } from 'react'

import styles from '../styles/Home.module.scss'

import StartScreen from '../components/StartScreen'
import MainScreen from '../components/MainScreen';
import Modals from '../components/Modals'
import { DataContext } from '../useData'
import { UIContext } from '../useUI'


const Home: NextPage = () => {
  
  const {isStarted} = useContext(DataContext);

  const {showGameOverModal, showRestartModal} = useContext(UIContext);


  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" sizes="32x32" href="./assets/favicon-32x32.png" />
        <title>Frontend Mentor | Tic Tac Toe</title>
      </Head>
        <main className={styles.main}
          data-black-screen={showGameOverModal || showRestartModal}
        >
          {
            isStarted?
              <MainScreen />
              : <StartScreen />
          }
        </main>
        <Modals />
    </>
  )
}

export default Home

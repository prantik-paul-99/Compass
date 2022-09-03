import React from 'react'
import AboutUs from '../AboutUs/AboutUs'
import CompassFooter from '../CompassFooter/CompassFooter'
import MsgAlert from '../Header/MsgAlert'
import HomeCarousel from './HomeCarousel'

export default function Home() {
  return (
    <>
        <HomeCarousel/>
        <AboutUs/>
        <CompassFooter/>
    </>
  )
}

import React, { useEffect, useState } from 'react'
import { IpLookup } from '../IpLookup'
import { IIpInfo } from '../../models/ip'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import './App.scss'
import { ImageToText } from '../ImageToText'
import { Navigation } from '../Navigation'


const App = () => {
  const [ipInfo, setIpInfo] = useState<IIpInfo | null>(null)
  const [imageInfo, setImageInfo] = useState('')
  const [page, setPage] = useState('')

  useEffect(() => {
    if (page === 'ip') {
      setImageInfo('')
    }
    if (page === 'image') {
      setIpInfo(null)
    }
  }, [page])

  useEffect(() => {
    const createBubbles = () => {
      const bubblesContainer = document.querySelector('.bubbles')

      if (bubblesContainer) {
        for (let i = 0; i < 256; i++) {
          const bubble = document.createElement('div')
          bubble.className = 'bubble'

          const size = 2 + Math.random() * 4 + 'rem'
          const distance = 6 + Math.random() * 6 + 'rem'
          const position = -5 + Math.random() * 110 + '%'
          const time = 2 + Math.random() * 2 + 's'
          const delay = -1 * (2 + Math.random() * 2) + 's'

          bubble.style.setProperty('--size', size)
          bubble.style.setProperty('--distance', distance)
          bubble.style.setProperty('--position', position)
          bubble.style.setProperty('--time', time)
          bubble.style.setProperty('--delay', delay)

          bubblesContainer.appendChild(bubble)
        }
      }
    }

    createBubbles()
  }, [])

  const updateIpInfo = (data: IIpInfo) => {
    setIpInfo(data)
    setPage('ip')
  }

  const updateImageInfo = (data: string) => {
    setImageInfo(data)
    setPage('image')
  }

  return (
    <div>
      <div className='App'>
        <div className='main'>
          <Router>
            <Navigation />
            <Routes>
              <Route path='/' element={<div className='welcome'>Hello, world!</div>} />
              <Route path='/IpLookup' element={<IpLookup updateIpInfo={updateIpInfo}/>} />
              <Route
                path='/ImageToText'
                element={<ImageToText updateImageInfo={updateImageInfo} />}
              />
            </Routes>
          </Router>
        </div>
        <div className='footer'>
          <div className='bubbles'></div>
          <div className='content'>
            <div>
              {ipInfo && (
                <div className='info'>
                  <div>
                    <span className='title'>Ip Address: </span>
                    {ipInfo.address}
                  </div>
                  <div>
                    <span className='title'>City: </span>
                    {ipInfo.city}
                  </div>
                  <div>
                    <span className='title'>Country: </span>
                    {ipInfo.country}
                  </div>
                  <div>
                    <span className='title'>Country Code: </span>
                    {ipInfo.country_code}
                  </div>
                  <div>
                    <span className='title'>Is valid: </span>
                    {ipInfo.is_valid && 'OK'}
                  </div>
                </div>
              )}
              {imageInfo && <div className='info'>{imageInfo}</div>}
            </div>
            <div>IVAROVSKIY</div>
          </div>
        </div>

        <svg style={{ position: 'fixed', top: '100vh' }}>
          <defs>
            <filter id='blob'>
              <feGaussianBlur in='SourceGraphic' stdDeviation='10' result='blur'></feGaussianBlur>
              <feColorMatrix
                in='blur'
                mode='matrix'
                values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9'
                result='blob'
              ></feColorMatrix>
              <feComposite in='SourceGraphic' in2='blob' operator='atop'></feComposite>
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  )
}

export default App

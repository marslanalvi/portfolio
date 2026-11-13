import { useEffect } from 'react'
import { initScene } from './scene.js'

export default function Stage() {
  useEffect(() => initScene(), [])
  return (
    <div className="stage" id="stage">
      <canvas id="gl" role="img" aria-label="3D diagram of a software system: clients, API services, an AI layer, workers and data stores, with requests flowing between the layers" />
    </div>
  )
}

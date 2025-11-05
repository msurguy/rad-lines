import React, { useRef, useEffect, useState } from 'react'
import ClosedPolyline from './ClosedPolyline.jsx'
import { eventBus } from '../utils/eventBus.js'
import downloadSVG from 'svg-file-downloader'
import math from '../lib/math'
import Randoma from 'randoma'
import './Polygons.scss'

const generatePoints = (seed, maxAngle, minRadius, maxRadius, breaks) => {
  const random = new Randoma({ seed: seed })
  let points = []
  const slice = degreesToRadians(maxAngle) / breaks

  for (let i = 0; i <= breaks; i++) {
    const point = [i * slice, random.integerInRange(minRadius, maxRadius)]
    points.push(point)
  }
  points[0][1] = points[points.length - 1][1]

  return points
}

const transformPoints = (points, scaleIncrement, rotationIncrement) => {
  return points.map((point) => {
    return [degreesToRadians(rotationIncrement) + point[0], scaleIncrement + point[1]]
  })
}

const degreesToRadians = (degrees) => {
  return degrees * (Math.PI / 180)
}

const getPathPoints = (pathStr, numPoints = 100) => {
  const tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  const tempPath = document.createElementNS("http://www.w3.org/2000/svg", "path")
  tempPath.setAttribute("d", pathStr)
  tempSvg.appendChild(tempPath)
  document.body.appendChild(tempSvg)

  const pathLength = tempPath.getTotalLength()
  let points = []
  for (let i = 0; i < numPoints; i++) {
    const pt = tempPath.getPointAtLength(pathLength * i / (numPoints - 1))
    points.push([pt.x, pt.y])
  }
  document.body.removeChild(tempSvg)
  return points
}

const transformCustomPathPoints = (points, scale, rotation, tx, ty) => {
  const rad = rotation * (Math.PI / 180)
  return points.map(p => {
    let xScaled = p[0] * scale
    let yScaled = p[1] * scale
    let xRotated = xScaled * Math.cos(rad) - yScaled * Math.sin(rad)
    let yRotated = xScaled * Math.sin(rad) + yScaled * Math.cos(rad)
    return [xRotated + tx, yRotated + ty]
  })
}

const Polygons = ({
  customPath = '',
  scaleFormula = 'i*i/2',
  rotationFormula = '10 * sin(i * pi / 9)',
  paperColor = '#CCCCCC',
  paperColorEnabled = true,
  strokeColor = '#000000',
  strokeWidth = '0.4mm',
  xPositionFormula = '400',
  yPositionFormula = '400',
  width = 800,
  height = 800,
  quantity = 10,
  sides = 5,
  roundness = 0.8,
  minRadius = 20,
  maxRadius = 50,
  minAngle = 0,
  maxAngle = 360,
  curve = 'curveCardinalClosed',
  randomize = false,
  seed = 10
}) => {
  const svgRef = useRef(null)
  const [polygons, setPolygons] = useState([])

  const createPolygon = (x, y, numOfSides, radius, minAngle, maxAngle) => {
    let arr = []
    for (let i = 0; i < numOfSides; i++) {
      let t = (degreesToRadians(maxAngle) / numOfSides * i) + minAngle * (Math.PI / 180)
      let xo = x + radius * Math.sin(t)
      let yo = y + radius * Math.cos(t)
      arr.push([xo, yo])
    }
    return arr
  }

  const generatePolygonData = () => {
    const newPolygons = []
    math.config({ randomSeed: seed })

    if (customPath && customPath.trim() !== "") {
      const basePoints = getPathPoints(customPath, 100)
      for (let i = 0; i < quantity; i++) {
        try {
          const scaleVal = math.evaluate(scaleFormula, { i: i })
          const rotationVal = math.evaluate(rotationFormula, { i: i })
          const tx = math.evaluate(xPositionFormula, { i: i })
          const ty = math.evaluate(yPositionFormula, { i: i })
          const transformedPoints = transformCustomPathPoints(basePoints, scaleVal, rotationVal, tx, ty)
          newPolygons.push(transformedPoints)
        } catch (e) {
          console.log(e)
        }
      }
    } else {
      let originalPoints = randomize
        ? generatePoints(seed, maxAngle, minRadius, maxRadius, sides)
        : []
      for (let i = 0; i < quantity; i++) {
        try {
          if (randomize) {
            newPolygons.push(
              transformPoints(
                originalPoints,
                math.evaluate(scaleFormula, { i: i }),
                minAngle + math.evaluate(rotationFormula, { i: i })
              )
            )
          } else {
            newPolygons.push(
              createPolygon(
                math.evaluate(xPositionFormula, { i: i }),
                math.evaluate(yPositionFormula, { i: i }),
                sides,
                minRadius + math.evaluate(scaleFormula, { i: i }),
                minAngle + math.evaluate(rotationFormula, { i: i }),
                maxAngle
              )
            )
          }
        } catch (e) {
          console.log(e)
        }
      }
    }

    setPolygons(newPolygons)
  }

  useEffect(() => {
    generatePolygonData()
  }, [
    customPath, minAngle, maxAngle, minRadius, maxRadius, sides, quantity,
    width, height, scaleFormula, rotationFormula, xPositionFormula,
    yPositionFormula, randomize, seed, strokeWidth, strokeColor
  ])

  useEffect(() => {
    const unsubscribe = eventBus.on('download', () => {
      if (svgRef.current) {
        downloadSVG(svgRef.current, 2, 'rad-lines' + Date.now() + '.svg', true)
      }
    })

    return unsubscribe
  }, [])

  const transform = randomize ? `translate(${width / 2}, ${height / 2})` : undefined

  return (
    <svg
      ref={svgRef}
      className="svg-paper"
      width={width}
      height={height}
      title="polygons"
      version="1.1"
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {paperColorEnabled && (
        <rect width={width} height={height} fill={paperColor} />
      )}
      <g transform={transform}>
        <desc>
          pwidth:{width};pheight:{height};pcolor:{paperColor};seed:{seed};sf:{scaleFormula};
          rf:{rotationFormula};xf:{xPositionFormula};yf:{yPositionFormula};qt:{quantity};
          sd:{sides};rn:{roundness};minrd:{minRadius};maxrd:{maxRadius};mina:{minAngle};
          maxa:{maxAngle};cv:{curve};rd:{randomize}
        </desc>
        {polygons.map((polygon, index) => (
          <ClosedPolyline
            key={index}
            roundness={roundness}
            lineData={polygon}
            curve={curve}
            randomize={randomize}
            strokeWidth={strokeWidth}
            strokeColor={strokeColor}
          />
        ))}
      </g>
    </svg>
  )
}

export default Polygons

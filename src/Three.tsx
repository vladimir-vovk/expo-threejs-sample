import { ExpoWebGLRenderingContext, GLView } from 'expo-gl'
import { Renderer } from 'expo-three'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import {
  HemisphereLight,
  IcosahedronGeometry,
  LineSegments,
  Mesh,
  MeshPhongMaterial,
  LineBasicMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  DoubleSide
} from 'three'

const ThreeJs = () => {
  let timeout: number

  React.useEffect(() => {
    // Clear the animation loop when the component unmounts
    return () => clearTimeout(timeout)
  }, [])

  const { width: WIDTH } = useWindowDimensions()

  return (
    <GLView
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }}
      onContextCreate={async (gl: ExpoWebGLRenderingContext) => {
        const { drawingBufferWidth: width, drawingBufferHeight: height } = gl
        const sceneColor = 0xffffff

        // Create a WebGLRenderer without a DOM element
        const renderer = new Renderer({ gl })
        renderer.setSize(width, height)
        renderer.setClearColor(sceneColor)

        const camera = new PerspectiveCamera(70, width / height, 0.01, 1000)
        camera.position.set(0, 0, 500)

        const scene = new Scene()

        const hemisphereLight = new HemisphereLight('white', 'grey', 0.5)
        scene.add(hemisphereLight)

        const pointLight = new PointLight('white', 0.75)
        pointLight.position.set(0, 200, 200)
        scene.add(pointLight)

        const geometry = new IcosahedronGeometry(WIDTH / 3, 1)
        const material = new MeshPhongMaterial({
          color: 'goldenrod',
          shininess: 20,
          specular: 'lightgrey',
          side: DoubleSide,
          flatShading: true,
          opacity: 0.8
        })
        const cube = new Mesh(geometry, material)
        cube.add(
          new LineSegments(
            geometry,
            new LineBasicMaterial({
              color: 'white',
              transparent: true,
              opacity: 0.7
            })
          )
        )
        scene.add(cube)

        function update() {
          cube.rotation.y += 0.005
          cube.rotation.x += 0.015
        }

        // Setup an animation loop
        const render = () => {
          timeout = requestAnimationFrame(render)
          update()
          renderer.render(scene, camera)
          gl.endFrameEXP()
        }
        render()
      }}
    />
  )
}

export default ThreeJs

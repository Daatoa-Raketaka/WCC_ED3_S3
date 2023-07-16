import './3D.scss'

import { Group, PerspectiveCamera, Scene, WebGLRenderer, VSMShadowMap, Vector3, TextureLoader, ReinhardToneMapping, Vector2, Layers, ShaderMaterial, MeshBasicMaterial, MeshPhongMaterial, DoubleSide, Color } from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

const ENTIRE_SCENE = 0, BLOOM_SCENE = 1;
const bloomLayer = new Layers();
bloomLayer.set( BLOOM_SCENE );

const scene = new Scene()
scene.background = new Color(0x909090)

let cameraLook = new Vector3(0, 50, 0)
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)
camera.position.set(0, 120, 500)
camera.lookAt(cameraLook)

const cameraPos = camera.position.clone()

const renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas: document.getElementById('bg') as HTMLCanvasElement
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.toneMapping = ReinhardToneMapping
renderer.shadowMap.enabled = true
renderer.shadowMap.type = VSMShadowMap

const textureLoader = new TextureLoader()

const fbxLoader = new FBXLoader()

// Render Postprocessing
const params = {
    exposure: 1,
    bloomStrength: 0.4,
    bloomThreshold: 0,
    bloomRadius: 0.1
}

const renderScene = new RenderPass( scene, camera )
const bloomPass = new UnrealBloomPass( new Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = params.bloomThreshold
bloomPass.strength = params.bloomStrength
bloomPass.radius = params.bloomRadius

const bloomComposer = new EffectComposer( renderer )
bloomComposer.renderToScreen = false
bloomComposer.addPass( renderScene )
bloomComposer.addPass( bloomPass )

const finalPass = new ShaderPass(
    new ShaderMaterial( {
        uniforms: {
            baseTexture: { value: null },
            bloomTexture: { value: bloomComposer.renderTarget2.texture }
        },
        vertexShader: (document.getElementById('vertexshader') as HTMLElement).textContent as string,
        fragmentShader: (document.getElementById('fragmentshader') as HTMLElement).textContent as string,
        defines: {}
    } ), 'baseTexture'
)

finalPass.needsSwap = true

const finalComposer = new EffectComposer(renderer)
finalComposer.addPass(renderScene)
finalComposer.addPass(finalPass)


fbxLoader.load('/Setup.fbx', (obj: Group) => {

    const mouse = obj.children[0]
    const mouseMaterial = new MeshPhongMaterial({
        emissive: 0xf43148,
        emissiveIntensity: 5,
    })
    ;(mouse as any).material[1] = mouseMaterial
    mouse.layers.toggle(BLOOM_SCENE)
    
    const keyboard = obj.children[1]

    const keyboardGreenLight = new MeshPhongMaterial({
        emissive: 0x00ff00,
        emissiveIntensity: 15
    })
    ;(keyboard.children[1] as any).material = keyboardGreenLight

    ;(keyboard as any).material[0].side = DoubleSide
    const keyboardMaterial = new MeshPhongMaterial({
        emissive: 0x3b45d8,
        emissiveIntensity: 5,
    })
    ;(keyboard as any).material[1] = keyboardMaterial
    keyboard.layers.toggle( BLOOM_SCENE )
    
    const screen = obj.children[2]
    const desktop = textureLoader.load('/desktop.png')
    const material = new MeshBasicMaterial( { map: desktop } );
    (screen as any).material[1] = material
    screen.layers.toggle(BLOOM_SCENE)

    const ghost = textureLoader.load('/ghost.jpg')
    ;(obj.children[5] as any).material[1].map = ghost


    console.log(obj)
    scene.add(obj)/* 
    overlay.style.transform = 'translateY(-100%)'
    overlay.style.opacity = '0' */
    
}/* , (ev) => {
    const loaded = (ev.loaded * 100) / ev.total
    document.body.style.backgroundImage = 'none'
    progress.style.width = loaded + '%'
    pNum.innerText = loaded.toFixed(1) + '%'
} */)

/** Emit and receive shadow **/
/* function configureShadow(model: Object3D) {
    model.receiveShadow = true
    model.castShadow = true
} */

window.addEventListener('mousemove', (ev) => {
    const offset = 0.2
    const newPos = {
        x: cameraPos.z - (ev.clientX - (window.innerWidth / 2)) * offset,
        y: cameraPos.y + (ev.clientY - (window.innerHeight / 2)) * offset
    }
    camera.position.setZ(newPos.x)
    camera.position.setY(newPos.y)
    camera.lookAt(cameraLook)
})

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
})

function animate() {
    requestAnimationFrame(animate)

    camera.layers.set( BLOOM_SCENE )
    bloomComposer.render()
    camera.layers.set( ENTIRE_SCENE )
    finalComposer.render()
}

animate()
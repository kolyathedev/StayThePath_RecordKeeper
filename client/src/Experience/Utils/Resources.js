import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import EventEmitter from './EventEmitter.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default class Resources extends EventEmitter {
	constructor(sources) {
		super()

		this.sources = sources

		this.items = {}
		this.toLoad = this.sources.length
		this.loaded = 0

		this.setLoaders()
		this.startLoading()
	}

	setLoaders() {
		this.loaders = {}
		this.loaders.dracoLoader = new DRACOLoader()
		this.loaders.dracoLoader.setDecoderPath('static/draco/')

		this.loaders.gltfLoader = new GLTFLoader()
		this.loaders.gltfLoader.dracoLoader = this.loaders.dracoLoader
		this.loaders.FBXLoader = new FBXLoader()

		this.loaders.textureLoader = new THREE.TextureLoader()
		this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
	}

	startLoading() {
		// Load each source
		for (const source of this.sources) {
			if (source.type === 'gltfModel') {
				this.loaders.gltfLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file)
				})
			} else if (source.type === 'texture') {
				this.loaders.textureLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file)
				})
			} else if (source.type === 'cubeTexture') {
				this.loaders.cubeTextureLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file)
				})
			} else if (source.type === 'FBXModel') {
				this.loaders.FBXLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file)
				})
			}
		}
	}

	sourceLoaded(source, file) {
		this.items[source.name] = file

		this.loaded++

		if (this.loaded === this.toLoad) {
			this.trigger('ready')
		}
	}
}

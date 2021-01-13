
const container = document.querySelector('.scene');
// Je cible la balise html qui a pour class "scene"

const scene = new THREE.Scene();
// Je crée la scène

const fov = 55;
// Je définis le champ de vision de la camera à 75 degrés
const aspect = container.clientWidth / container.clientHeight
// Je définis le ratio de la caméra
const near = 0.1;
// Je définis la distance la plus petite
const far = 500;
// Je définis la distance la plus grande

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
// Je crée la caméra avec les paramètres donnés ci-dessous
camera.position.set( 0, 1.7, 7 );
// Je donne une position de départ à la caméra

const ambient = new THREE.AmbientLight(0x404040, 30);
// Je crée une lumiere ambiante, diffuse dans toutes les directions
// La première valeur correspond à la couleur de la lumière et la deuxième à son intensité
scene.add(ambient);

const renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
// Je crée le moteur de rendu
renderer.setSize(container.clientWidth, container.clientHeight);
// J'indique la taille de l'image que je souhaite rendre
renderer.setPixelRatio(window.devicePixelRatio);
// Le ratio des pixels s'adaptera à l'appreil sur lequel le site est visualisé

container.appendChild(renderer.domElement);
// J'injecte le <canvas> créé par three.js dans la balise html ciblé dans container

// CHARGEMENT MODELES 3D
const loaderPorsche911turbo = new THREE.GLTFLoader();
// Je crée le loader qui va me permettre de récupérer mon élement 3D
loaderPorsche911turbo.load('../assets/3D models/free_1975_porsche_911_930_turbo/scene.gltf', function(porsche911turbo){
    // Je récupère le modèle 3D
    console.log(porsche911turbo);
    porsche911turbo.scene.position.x = -3.5;
    porsche911turbo.scene.rotation.y = .9;
    scene.add(porsche911turbo.scene);
    // J'ajoute l'élément récupéré à la scène
})

const loaderPorsche911carrera = new THREE.GLTFLoader();
loaderPorsche911carrera.load('../assets/3D models/free_porsche_911_carrera_4s/scene.gltf', function(porsche911carrera){
    porsche911carrera.scene.position.x = 3.5;
    porsche911carrera.scene.position.y = .7;
    porsche911carrera.scene.scale.x = 1.2;
    porsche911carrera.scene.scale.y = 1.2;
    porsche911carrera.scene.scale.z = 1.2;
    porsche911carrera.scene.rotation.y = -.9;
    scene.add(porsche911carrera.scene);
})

const animate = function () {
    requestAnimationFrame(animate);
    // Je crée une render loop qui va permettre de recalculer la scène 60fois/seconde (sur un écran classique).
    renderer.render( scene, camera );
    // Je rends la scène et la caméra ensemble
};

animate();

function onWindowResize(){
    camera.aspect = container.clientWidth / container.clientHeight
    // Je lui demande de recalculer l'aspect de la camera
    camera.updateProjectionMatrix();
    //J'appelle une fonction qui s'occupe de tout pour nous

    renderer.setSize(container.clientWidth, container.clientHeight)
    // Je lui reprécise la taille de l'écran à rendre
}

window.addEventListener("resize", onWindowResize)
// A chaque changment de taille, je lance la fonction onWindowResize
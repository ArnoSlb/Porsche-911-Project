const container = document.querySelector('.scene');
// Je cible la balise html qui a pour class "scene"

var manager = new THREE.LoadingManager(); 

manager.onStart = function(item, loaded, total) { 

    console.log('Loading started'); 
    // const chargement = <h1>Chargement</h1>
    // container.appendChild(chargement.domElement);

    

}; 

manager.onLoad = function() { 

    console.log('Loading complete'); 

}; 

manager.onProgress = function(item, loaded, total) { 

    console.log(item, loaded, total); 

}; 

manager.onError = function(url) { 

    console.log('Error loading'); 

}; 





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

// Porsche 911 CarreraS camera position
// camera.position.set( 6, 1, 0.5 );
// camera.rotation.set(0,1.5,0);

// Porsche 911 Turbo
// camera.position.set( -7.2, 1, -.5 );
// camera.rotation.set(0,-1.6,0);


// LUMIERES
{
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.PointLight(color, intensity);
    light.position.set(0, 12, 0);
    scene.add(light);
}

{
    const color = 0xFFFFFF;
    const intensity = 1;
    const light2 = new THREE.PointLight(color, intensity);
    light2.position.set(- 2, 12, 3);
    // scene.add(light2);
}

{
    const color = 0xFFFFFF;
    const intensity = 1;
    const light3 = new THREE.PointLight(color, intensity);
    light3.position.set(-10, 5, 0);
    // scene.add(light3);
}

{
    const color = 0xFFFFFF;
    const intensity = 1;
    const directionnalLight = new THREE.DirectionalLight(color, intensity);
    directionnalLight.position.set(0,10,10);
    directionnalLight.castshadow = true;
    scene.add(directionnalLight);

}

const renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
// Je crée le moteur de rendu
renderer.setSize(container.clientWidth, container.clientHeight);
// J'indique la taille de l'image que je souhaite rendre
renderer.setPixelRatio(window.devicePixelRatio);
// Le ratio des pixels s'adaptera à l'appreil sur lequel le site est visualisé

container.appendChild(renderer.domElement);
// J'injecte le <canvas> créé par three.js dans la balise html ciblé dans container


// CHARGEMENT MODELES 3D
const loaderPorsche911turbo = new THREE.GLTFLoader(manager);
// Je crée le loader qui va me permettre de récupérer mon élement 3D
loaderPorsche911turbo.load('../assets/3D models/free_1975_porsche_911_930_turbo/scene.gltf', function(porsche911turbo){
    // Je récupère le modèle 3D
    console.log(porsche911turbo);
    porsche911turbo.scene.castShadow= true;
    porsche911turbo.scene.position.x = -3.6;
    porsche911turbo.scene.rotation.y = .9;
    scene.add(porsche911turbo.scene);
    // J'ajoute l'élément récupéré à la scène
})

const loaderPorsche911carrera = new THREE.GLTFLoader(manager);
loaderPorsche911carrera.load('../assets/3D models/free_porsche_911_carrera_4s/scene.gltf', function(porsche911carrera){
    porsche911carrera.scene.position.x = 3.1;
    porsche911carrera.scene.position.y = .9;
    porsche911carrera.scene.position.z = .9;
    porsche911carrera.scene.rotation.y = -.9;
    scene.add(porsche911carrera.scene);
})

const loaderPorsche911 = new THREE.GLTFLoader(manager);
loaderPorsche911.load('../assets/3D models/porsche_911/scene.gltf', function(loader){
    const porsche911 = loader.scene.children[0];
    console.log(loader)
    porsche911.scale.x = .011;
    porsche911.scale.y = .011;
    porsche911.scale.z = .011;

    
    porsche911.position.x = 3;
    porsche911.position.y = 0.05;
    porsche911.position.z = -5;

    porsche911.rotation.z = -.9;
    
    // scene.add(porsche911);
})

{
    const planeSize = 40;

    const loader = new THREE.TextureLoader(manager);
    const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize/2);
    const planeMat = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -.5;
    scene.add(mesh);
  }

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

function tweenCamera( targetPosition, duration ) {

    // controls.enabled = false;

    var position = new THREE.Vector3().copy( camera.position );

    var tween = new createjs.Tween ( position )
        .to ( targetPosition, duration )
        // .OnUpdate( function () {
        //     camera.position.copy( position );
        //     // camera.lookAt( controls.target );
        // })
        // .OnComplete( function () {
        //     camera.position.copy( targetPosition );
        //     // camera.lookAt( controls.target );
        //     // controls.enabled = true;
        // })
        // .start();
}



function mouseOnLeftSide(){
    console.log('je suis sur la porsche 911 Turbo de 1975');
    camera.position.set( -8, 1.2, -.5 );
    camera.rotation.set(0,-1.6,0);
    // createjs.Tween.get(camera.position).to({ x: -8, y: 1.2, z:-.5});
    
}

const middle = document.querySelector("#middle");
middle.addEventListener("mouseover", mouseOnMiddle);

function mouseOnMiddle(){
    // console.log('je suis sur la porsche 911 Turbo de 1975');
    camera.position.set( 0, 1.7, 7 );
    camera.rotation.set(0,0,0);
}

const leftSide = document.querySelector("#left");
leftSide.addEventListener("mouseover", mouseOnLeftSide);

function mouseOnRightSide(){
    console.log('je suis sur la porsche 911 CarreraS');
    camera.position.set( 7.2, 1.2, 0.5 );
    camera.rotation.set(0,1.6,0);
}

const rightSide = document.querySelector("#right");
rightSide.addEventListener("mouseover", mouseOnRightSide);


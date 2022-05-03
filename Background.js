let scene, camera, renderer, starGeo, stars;
      function generateRandomColor(){
        let maxVal = 0xFFFFFF; // 16777215
        let randomNumber = Math.random() * maxVal; 
        randomNumber = Math.floor(randomNumber);
        randomNumber = randomNumber.toString(16);
        let randColor = randomNumber.padStart(6, 0);   
        return `#${randColor.toUpperCase()}`
      }
      function init() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 1;
        camera.rotation.x = Math.PI/2;

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        starGeo = new THREE.Geometry();
        for(let i=0; i<6000;i++){
            let star = new THREE.Vector3(
            Math.random() * 800 - 300,
            Math.random() * 800 - 300,
            Math.random() * 800 - 300
          );
          star.velocity = 0;
          star.acceleration = 0.02;
          starGeo.vertices.push(star);
        }
        let sprite = new THREE.TextureLoader().load('Wow.png');
        let starMaterial = new THREE.PointsMaterial({
          color: generateRandomColor(),
          size: 0.7,
          map: sprite
        });
        
        stars = new THREE.Points(starGeo, starMaterial)
        scene.add(stars);
        animate();
      }
      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
      function animate(){
        starGeo.vertices.forEach(p => {
          p.velocity += p.acceleration;
          p.y -= p.velocity;
          if(p.y <-200) {
            p.y = 200;
            p.velocity = 0;
        }
        });
        starGeo.verticesNeedUpdate = true;
        stars.rotation.y += 0.002;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);  
      }
      init();

!function () {
    window.addEventListener("load", () => {
        const canvasContainer = document.getElementById("canvas-container");
        const canvas = document.getElementById("canvas");
        const amountInput = document.getElementById("amount");
        const segmentsInput = document.getElementById("segments");
        const fpsCounter = document.getElementById("fps-counter");
        engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

        // Create the scene space
        var scene = new BABYLON.Scene(engine);

        // Add a camera to the scene and attach it to the canvas
        var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0,0,5), scene);
        camera.attachControl(canvas, true);

        // Add lights to the scene
        var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);

        // Add and manipulate meshes in the scene
        var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:1}, scene);

        let meshes = [ sphere ];

        const colours = [
            BABYLON.Color3.Random(), BABYLON.Color3.Random(), BABYLON.Color3.Random(),
            BABYLON.Color3.Random(), BABYLON.Color3.Random(), BABYLON.Color3.Random(),
            BABYLON.Color3.Random(), BABYLON.Color3.Random(), BABYLON.Color3.Random(),
            BABYLON.Color3.Random(), BABYLON.Color3.Random(), BABYLON.Color3.Random(),
            BABYLON.Color3.Random(), BABYLON.Color3.Random(), BABYLON.Color3.Random(),
            BABYLON.Color3.Random(), BABYLON.Color3.Random(), BABYLON.Color3.Random(),
            BABYLON.Color3.Random(), BABYLON.Color3.Random(), BABYLON.Color3.Random(),
            BABYLON.Color3.Random(), BABYLON.Color3.Random(), BABYLON.Color3.Random(),
        ];

        window.updateScene = () => {
            for (const mesh of meshes) {
                mesh.dispose();
            }
            meshes = [];

            const amount = parseInt(amountInput.value, 10);
            const segments = parseInt(segmentsInput.value, 10);

            let x = -5;
            let y = -5;

            for (let i = 0; i < amount; i++) {
                const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {
                    diameter: 0.1,
                    segments,
                }, scene);
                sphere.material = new BABYLON.StandardMaterial(i, scene);
                sphere.material.diffuseColor = colours[i % colours.length];
                sphere.position.copyFromFloats(x, y, 0);

                x += 0.1;

                if (x > 5) {
                    x = -5;
                    y += 0.1;
                }

                sphere.freezeWorldMatrix();
                sphere.material.freeze();
                sphere.freezeNormals();

                meshes.push(sphere);
            }
        };

        updateScene();

        scene.debugLayer.show({
            globalRoot: canvasContainer,
        });

        let lastFrame = Date.now();
        let lastUpdate = 0;
        let fps = 0;
        // Register a render loop to repeatedly render the scene
        engine.runRenderLoop(function () {
            now = Date.now();
            const diff = now - lastFrame;
            lastFrame = now;

            if (now - lastUpdate >= 1000) {
                fps = 1 / (diff * 0.001);
                fpsCounter.innerText = fps.toFixed(0);
                lastUpdate = now;
            }

            scene.render();
        });

        // Watch for browser/canvas resize events
        window.addEventListener("resize", function () {
            engine.resize();
        });


    });
}();

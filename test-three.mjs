import assert from 'node:assert/strict';
import {createOrbitScene} from './dist/assets/orbit-scene.mjs';
const world=createOrbitScene();assert.equal(world.satellites.length,6);assert.equal(world.links.length,6);assert.equal(world.rings.length,3);
for(let i=0;i<6;i++){world.select(i);assert.equal(world.satellites.filter(s=>s.material.emissiveIntensity>1).length,1);assert.equal(world.links.filter(l=>l.material.opacity>.5).length,1);assert.equal(world.satellites[i].scale.x,1.6);assert.equal(world.links[i].material.opacity,.9);assert.ok(Math.abs(world.satellites[i].position.length()-2.05)<.0001)}
let vertices=0;world.scene.traverse(o=>{if(o.geometry)vertices+=o.geometry.attributes.position.count});assert.ok(vertices<30000);world.dispose();console.log('Three.js scene: six capability markers, exclusive selection, active paths, geometry budget and disposal passed. Actual GPU rendering is not exercised by this test.');

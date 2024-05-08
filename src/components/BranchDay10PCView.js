import React, { useState, useEffect } from 'react';
import { ForceGraph3D } from 'react-force-graph';
import * as THREE from 'three';
import styles from '../styles/BranchDay10PCView.module.css';
import PointCloud from './PointCloud';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const BranchDay10PCView = ( {chartsBranchData} ) => {

  const [points, setPoints] = useState([]);

  useEffect(() => {
    console.log("@@@@@@chartsBranchData, ", chartsBranchData)
    Object.keys(chartsBranchData).forEach((sampleKey)  => {
      console.log(chartsBranchData[sampleKey]["link"].split('_Info'))
      // let branchName = chartsBranchData[sampleKey]["link"].split('_Info')[0] + '_8.txt'
      let minX = 1000;
      let maxX = -1000;
      let minY = 1000;
      let maxY = -1000;
      let minZ = 1000;
      let maxZ = -1000;
      let branchName = 'KIT_C_10D_11.txt';
      fetch(`/data/branchDay10/${branchName}`)
      .then(response => response.text())
      .then(text => {
        const pointsData  = [];

        const lines = text.split(/\r\n|\n/); // Split the text into lines
        console.log("lines, ", lines)

        lines.forEach(line => {
          const wordsArray = line.split(/\s+/); 
          if (wordsArray.length >= 6) {
            let tempX = parseFloat(wordsArray[0]);
            let tempY = parseFloat(wordsArray[1]);
            let tempZ = parseFloat(wordsArray[2]);

            if (minX > tempX) {
              minX = tempX;
            }
            if (maxX < tempX) {
              maxX = tempX;
            }

            if (minY > tempY) {
              minY = tempY;
            }
            if (maxY < tempY) {
              maxY = tempY;
            }

            if (minZ > tempZ) {
              minZ = tempZ;
            }
            if (maxZ < tempZ) {
              maxZ = tempZ;
            }
            pointsData.push({
              // x: (tempX - 102.5) / 137,
              // y: (tempY - 63) / 137,
              // z: (tempZ - 346.5)/ 137,
              // x: (tempX - 102.5) / 137,
              // y: (tempY - 63) / 137,
              // z: (tempZ - 346.5)/ 137,
              x: tempX,
              y: tempY,
              z: tempZ,
              // x: parseFloat(wordsArray[0]) * 1.2 - 100,
              // y: parseFloat(wordsArray[1]) * 1.2 + 600,
              // z: parseFloat(wordsArray[2]) * 1.2 - 150,
              color: `rgb(${wordsArray[3]}, ${wordsArray[4]}, ${wordsArray[5]})`
            });

          }
        });
        let maxLength = maxX - minX;
        if (maxLength < (maxY - minY)) {
          maxLength = maxY - minY;
        }
        if (maxLength < (maxZ - minZ)) {
          maxLength = maxZ - minZ;
        }
        let cenX = (maxX + minX) / 2.0;
        let cenY = (maxY + minY) / 2.0;
        let cenZ = (maxZ + minZ) / 2.0;

        pointsData.forEach(point => {
          point.x = (point.x - cenX) /  maxLength;
          point.y = (point.y - cenY) /  maxLength;
          point.z = (point.z - cenZ) /  maxLength;
          // console.log(`Name: ${user.name}, Age: ${user.age}`);
        });
        // console.log("MIN, MAX, ", minX, minY, minZ, maxX, maxY, maxZ)  
        // console.log("pointsData, ", pointsData)  
        setPoints(pointsData);
      })
      .catch(error => console.error('Error loading the file', error));
    });
  // });  
  }, [chartsBranchData]);
  
  // const graphData = { chartsBranchData["node"], chartsBranchData["branch"] }; 
  return (
    <div className={styles.dayTenPCPlot}>
      <Canvas
        camera={{ position: [0, 1.5, 0], fov: 60 }}
        // camera={{ position: [0, 1000, 400], fov: 60 }}
        // style={{ background: 'black', height: '100vh', width: '100vw' }}>
        style={{ background: 'black', height: '200px', width: '200px' }}>
        <ambientLight intensity={1.0} />
        <pointLight position={[0, 100, 0]} />
        <PointCloud points={points} />
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      </Canvas>

      {/* {points.length > 0 && <PointCloud points={points} />} */}
    </div>
  );
};

export default BranchDay10PCView;
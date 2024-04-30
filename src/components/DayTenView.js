import React, { useState, useEffect, useRef } from 'react';
import { ForceGraph3D } from 'react-force-graph';
import * as THREE from 'three';
import SpriteText from 'three-spritetext';
import styles from '../styles/DayTenView.module.css';

const DayTenView = ( {chartsBranchData} ) => {

  // const gridDay10GraphRefs = useRef([]);
  // gridDay10GraphRefs.current = Array(Object.keys(chartsBranchData).length).fill().map(() => React.createRef());

  // const [forceGraph3DToRender, setForceGraph3DToRender] = useState(<div></div>);

  // useEffect(() => {
  //   console.log("@@@@@@chartsBranchData, ", chartsBranchData)
  //   const newData = transformTrtData(chartsData);
  //   setDay10GraphData(newData);
  //   console.log("     day10GraphData, ", day10GraphData)

    // Object.keys(chartsBranchData).forEach(trtKey  => {
    //   var cellIndex = chartsBranchData[trtKey]["sampleIndex"];
    //   console.log("     cellIndex, ", cellIndex);
    //   var result = chartsBranchData[trtKey]["data"]; 
    //   var color = chartsBranchData[trtKey]["color"];
    //   console.log("result, ", result)
      // setForceGraph3DToRender(
      //   <ForceGraph3D
      //     ref={gridDay10GraphRefs.current[cellIndex].current}
      //     graphData={chartsBranchData[trtKey]["data"]}
      //     nodeAutoColorBy="color"
      //     // nodeLabel="name"
      //     linkDirectionalParticles="value"
      //     linkDirectionalParticleWidth={2}
      //     width={200}
      //     height={500}
      //     // nodeThreeObject={node => {
      //     //   const sprite = new SpriteText(node.name);
      //     //   sprite.color = node.color;
      //     //   sprite.textHeight = 8;
      //     //   return sprite;
      //     // }}
      //     nodeThreeObject={node => {
      //       const material = new THREE.MeshBasicMaterial({ color: node.color });
      //       const geometry = new THREE.SphereGeometry(3); // Adjust size here
      //       return new THREE.Mesh(geometry, material);
      //     }}
      //     linkMaterial={link => {
      //       return new THREE.LineBasicMaterial({
      //         color: link.color || 'lightgreen',
      //         linewidth: 2 // Adjust link width here
      //       });
      //     }}

      //     dagMode="null" // Disable any automatic repositioning
      //     dagLevelDistance={null}
      //     enableNodeDrag={false} // Disables node dragging
      //     backgroundColor="black"  // Set background color to white
      //     cooldownTicks={0} // Stop simulation immediately
      //     onEngineTick={() => null} // Override physics engine ticks
      //     onEngineStop={() => console.log('Simulation stopped')} // Notification on simulation stop          
      //   />
  //     );
  //   });
  // }, [chartsBranchData]);
  // }, []);
  // });  
  
  // const graphData = { chartsBranchData["node"], chartsBranchData["branch"] }; 
  return (
    <div className={styles.dayTenViewPlot}>
      {/* {forceGraph3DToRender} */}
      {Object.keys(chartsBranchData).map((sampleKey, index)  => {
        console.log("*************************************************")
        const cellIndex = chartsBranchData[sampleKey]["sampleIndex"];
        // const divTrtDiff = gridDay10GraphRefs.current[cellIndex].current;
        console.log(chartsBranchData[sampleKey]["data"]);

        return (
          <div key={index} className={styles.DayTenViewIndividual}>
            <ForceGraph3D
              // ref={divTrtDiff}
              graphData={chartsBranchData[sampleKey]["data"]}
              nodeAutoColorBy="color"
              // nodeLabel="name"
              linkDirectionalParticles="value"
              linkDirectionalParticleWidth={2}
              width={200}
              height={500}
              // nodeThreeObject={node => {
              //   const sprite = new SpriteText(node.name);
              //   sprite.color = node.color;
              //   sprite.textHeight = 8;
              //   return sprite;
              // }}
              nodeThreeObject={node => {
                const material = new THREE.MeshBasicMaterial({ color: node.color });
                const geometry = new THREE.SphereGeometry(3); // Adjust size here
                return new THREE.Mesh(geometry, material);
              }}
              linkMaterial={link => {
                return new THREE.LineBasicMaterial({
                  color: link.color || 'lightgreen',
                  linewidth: 2 // Adjust link width here
                });
              }}
              // dagMode="null" // Disable any automatic repositioning
              dagLevelDistance={null}
              enableNodeDrag={false} // Disables node dragging
              backgroundColor="black"  // Set background color to white
              cooldownTicks={0} // Stop simulation immediately
              onEngineTick={() => null} // Override physics engine ticks
              onEngineStop={() => console.log('Simulation stopped')} // Notification on simulation stop
            />         
          </div>
        );
      })}
    </div>
    
  );
};

export default DayTenView;




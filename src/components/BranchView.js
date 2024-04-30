import styles from '../styles/BranchView.module.css';
import HeightGraph from './HeightGraph';
import SpreadOfBranchesGraph from './SpreadOfBranchesGraph';
import BranchDay10GraphView from './BranchDay10GraphView';
import React, { useEffect, useState } from 'react';

// Function to transform JSON data into a suitable format for the RadarChartComponent
function transformDataForDay10Graph(jsonData) {
  console.log("jsonData.branch.noBranches, ", jsonData.branch.noBranches)
  let nodes = [];
  let links = [];
  let lastBranchId = 'branch_0_end';
  for (let i = 0; i < jsonData.branch.noBranches; i++) {
    let branchTopId = 'branch_' + i;
    // console.log('console.log(jsonData["branch10Day"]["branchInd_" + i]["branchUpperPos"][0])')
    // console.log(jsonData["branch10Day"]["branchInd_" + i]["branchUpperPos"])
    let eachBranchTop = {
      "id": branchTopId + '_top', 
      "name": branchTopId,
      "color": "darkgreen",
      "x": jsonData["branch10Day"]["branchInd_" + i]["branchUpperPos"][1]  * 1.5,
      "y": (jsonData["branch10Day"]["branchInd_" + i]["branchUpperPos"][2] - 120 )  * 1.5,
      "z": jsonData["branch10Day"]["branchInd_" + i]["branchUpperPos"][0]  * 1.5};
    nodes.push(eachBranchTop);
    let branchEndId = 'branch_' + i;
    let eachBranchEnd = {
      "id": branchEndId + '_end', 
      "name": branchEndId,
      "color": "darkgreen",
      "x": jsonData["branch10Day"]["branchInd_" + i]["branchLowerPos"][1] * 1.5,
      "y": (jsonData["branch10Day"]["branchInd_" + i]["branchLowerPos"][2]  - 120) *1.5,
      "z": jsonData["branch10Day"]["branchInd_" + i]["branchLowerPos"][0] * 1.5};
    nodes.push(eachBranchEnd);
    // console.log("eachBranchTop, ", eachBranchTop)
    let branch = {
      "source": branchEndId + '_top',
      "target": branchEndId + '_end',
      "color": "white"
    }
    links.push(branch);

    if (i !== 0) {
      let stem = {
        "source": lastBranchId,
        "target": branchEndId + '_end',
        "color": "grey"
      }
      links.push(stem);
    }
    
    lastBranchId = branchEndId + '_end';
    
  }

  let day10Graph = { nodes, links };

  return day10Graph;
}



const BranchView = ({ dataMaps }) => {

  // const [chartsBranchData, setChartsBranchData] = useState(dataMaps);
  const [chartsBranchData, setChartsBranchData] = useState({});
  
  useEffect(() => {
    console.log("     dataMaps. ", dataMaps)
    // setChartsBranchData(prevData => ({...prevData, 
    //                                   numIndex: 0}));
    // setChartsBranchData(prevData => ({...prevData, 
    //                                   numIndex: dataMaps["numIndex"]}));
    Object.entries(dataMaps).forEach(([sampleKey, sampleObject])  => {
      // setChartsBranchData(prevData => ({...prevData}));
      Object.entries(sampleObject).forEach(([dayKey, sampleDayObject])  => {
        console.log("sampleKey, dayKey, ", sampleKey, dayKey)
        if (dayKey === "10D" && sampleDayObject.link) {
          fetch(`/data/${sampleDayObject.link}`)
          .then(response => response.json())
          .then(data => {

            let day10GraphData = transformDataForDay10Graph(data);
            // setChartsBranchData(day10GraphData);

            setChartsBranchData(prevData => ({
              ...prevData, 
              [sampleKey]: {...dataMaps[sampleKey]["10D"],
                            "data": day10GraphData}
            }));
          })
          .catch(error => console.error('Error fetching data:', error));
        } 
      });
    });
    console.log("!!!!!, ", chartsBranchData)
  }, [dataMaps]);
  // });



  return (
    <div className={styles.branchView}>
      <h2 className={styles.branchTitle}>Branch View</h2>
      <div className={styles.branchHeight}>
        <div className={styles.branchHeightName}> 
          Branch Height
        </div>
        <div className={styles.branchHeightPlot}>
          <HeightGraph />
        </div>
      </div>

      <div className={styles.branchSpread}>
        <div className={styles.branchSpreadName}> 
          Branch Spread
        </div>
        <div className={styles.branchSpreadPlot}>
          <SpreadOfBranchesGraph />
        </div>
      </div>

      <div className={styles.dayTenView}>
        <div className={styles.dayTenViewName}> 
          Day 10 View
        </div>
        <BranchDay10GraphView chartsBranchData={chartsBranchData} />
      </div>

      {/* Insert additional components for the branch view */}
    </div>
  );
};

export default BranchView;

import React, { useState } from 'react';
import styles from '../styles/CheckboxTable.module.css';

const CheckboxTable = () => {
  // Create a state to manage the checkboxes
  const [checkedGenoState, setCheckedGenoState] = useState({
    KIT: false,
    HO1: false,
    HO2: false,
    HC2: false,
    HC5: false,
  });
  
  const [checkedTrtState, setCheckedTrtState] = useState({
    Control: false,
    HDNT: false,
  });
  
  const [checkedTimeState, setCheckedTimeState] = useState({
    D4: false,
    D7: false,
    D10: false,
  });


  // Function to handle checkbox change
  const handleCheckboxGenoChange = (event) => {
    setCheckedGenoState({
      ...checkedGenoState,
      [event.target.name]: event.target.checked,
    });
  };

  const handleCheckboxTrtChange = (event) => {
    setCheckedTrtState({
      ...checkedTrtState,
      [event.target.name]: event.target.checked,
    });
  };

  const handleCheckboxTimeChange = (event) => {
    setCheckedTimeState({
      ...checkedTimeState,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div> 

        <div className={styles.checkboxWithDimName}>
            <p className={styles.dimName}>Genotype</p>
            <table className={styles.checkboxWithLabel}>
                <thead>
                    <tr>
                        <th>KIT</th>
                        <th>HO1</th>
                        <th>HO2</th>
                        <th>HC2</th>
                        <th>HC5</th>
                    </tr>
                </thead>
                
                <tbody>
                    <tr>
                        <td className={styles.checkboxEach}>
                            <input type="checkbox" name="KIT" checked={checkedGenoState.KIT}
                            onChange={handleCheckboxGenoChange} />
                        </td>
                        <td className={styles.checkboxEach}>
                            <input type="checkbox" name="HO1" checked={checkedGenoState.HO1}
                            onChange={handleCheckboxGenoChange} />
                        </td>
                        <td className={styles.checkboxEach}>
                            <input type="checkbox" name="HO2" checked={checkedGenoState.HO2}
                            onChange={handleCheckboxGenoChange} />
                        </td>
                        <td className={styles.checkboxEach}>
                            <input type="checkbox" name="HC2" checked={checkedGenoState.HC2}
                            onChange={handleCheckboxGenoChange} />
                        </td>
                        <td className={styles.checkboxEach}>
                            <input type="checkbox" name="HC5" checked={checkedGenoState.HC5}
                            onChange={handleCheckboxGenoChange} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div className={styles.checkboxWithDimName}>
            <p className={styles.dimName}>Treatment</p>
            <table className={styles.checkboxWithLabel}>
                <thead>
                    <tr>
                        <th>Control</th>
                        <th>HDNT</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td className={styles.checkboxEach}>
                            <input type="checkbox" name="Control" checked={checkedTrtState.Control}
                            onChange={handleCheckboxTrtChange} />
                        </td>
                        <td className={styles.checkboxEach}>
                            <input type="checkbox" name="HDNT" checked={checkedTrtState.HDNT}
                            onChange={handleCheckboxTrtChange} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
            
        <div className={styles.checkboxWithDimName}>
            <p className={styles.dimName}>Time Sequence</p>
            <table className={styles.checkboxWithLabel}>
                <thead>
                    <tr>
                        <th>D4</th>
                        <th>D7</th>
                        <th>D10</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td className={styles.checkboxEach}>
                            <input type="checkbox" name="D4" checked={checkedTimeState.D4}
                            onChange={handleCheckboxTimeChange} />
                        </td>
                        <td className={styles.checkboxEach}>
                            <input type="checkbox" name="D7" checked={checkedTimeState.D7}
                            onChange={handleCheckboxTimeChange} />
                        </td>
                        <td className={styles.checkboxEach}>
                            <input type="checkbox" name="D10" checked={checkedTimeState.D10}
                            onChange={handleCheckboxTimeChange} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        
    </div>
        
  );
};

export default CheckboxTable;

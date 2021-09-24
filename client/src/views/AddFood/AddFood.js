import React, { useState } from "react";
import FoodForm from "../../components/FoodForm";
import "./styles.css";
import DisplayFood from "../../components/DisplayFood";
import EditFood from "../../components/EditFood";

function AddFood(props) {
  const [dummy, setDummy] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editFood, setEditFood] = useState({});

  return (
    <div id="backImage">
      <div style={{ width: "50%", margin: "0px auto", paddingTop: "40px" }}>
        <FoodForm setDummy={setDummy} dummy={dummy} />
      </div>
      <div>
        <DisplayFood
          setDummy={setDummy}
          dummy={dummy}
          setIsEdit={setIsEdit}
          setEditFood={setEditFood}
        />
        {isEdit ? (
          <EditFood
            open={isEdit}
            setIsEdit={setIsEdit}
            existingFood={editFood}
          />
        ) : (
          false
        )}
      </div>
    </div>
  );
}

export default AddFood;

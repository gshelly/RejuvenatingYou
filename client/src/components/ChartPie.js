import React from "react";
import { Doughnut } from "react-chartjs-2";

function ChartPie(props) {
  const { foodData, weights, activityLevel, age, height, initialWeight } =
    props;

  const calculateFat = () => {
    let totalFat = 0;
    foodData &&
      foodData.breakfast &&
      foodData.breakfast.forEach((food) => {
        totalFat += food.food_id.fat * food.quantity;
      });

    foodData &&
      foodData.lunch &&
      foodData.lunch.forEach((food) => {
        totalFat += food.food_id.fat * food.quantity;
      });
    foodData &&
      foodData.dinner &&
      foodData.dinner.forEach((food) => {
        totalFat += food.food_id.fat * food.quantity;
      });

    return totalFat * 9;
  };

  const calculateCarb = () => {
    let totalCarb = 0;
    foodData &&
      foodData.breakfast &&
      foodData.breakfast.forEach((food) => {
        totalCarb += food.food_id.carb * food.quantity;
      });
    foodData &&
      foodData.lunch &&
      foodData.lunch.forEach((food) => {
        totalCarb += food.food_id.carb * food.quantity;
      });
    foodData &&
      foodData.dinner &&
      foodData.dinner.forEach((food) => {
        totalCarb += food.food_id.carb * food.quantity;
      });
    return totalCarb * 4;
  };

  const calculateProtein = () => {
    let totalProtein = 0;
    foodData &&
      foodData.breakfast &&
      foodData.breakfast.forEach((food) => {
        totalProtein += food.food_id.protein * food.quantity;
      });
    foodData &&
      foodData.lunch &&
      foodData.lunch.forEach((food) => {
        totalProtein += food.food_id.protein * food.quantity;
      });
    foodData &&
      foodData.dinner &&
      foodData.dinner.forEach((food) => {
        totalProtein += food.food_id.protein * food.quantity;
      });
    return totalProtein * 4;
  };

  const totalCalorie = () => {
    let activityRatio = 0;
    let weightForCalc = 0;
    if (!weights[weights.length - 1]) {
      weightForCalc = initialWeight;
    } else {
      weightForCalc = weights[weights.length - 1];
    }
    if (activityLevel === "noActivity") activityRatio = 1.2;
    if (activityLevel === "lightActivity") activityRatio = 1.375;
    if (activityLevel === "moderateActivity") activityRatio = 1.55;
    if (activityLevel === "heavyActivity") activityRatio = 1.725;
    let BMR = 66 + 6.3 * weightForCalc + 12.9 * (height / 2.54) - 6.8 * age;
    let total = Math.floor(BMR * activityRatio);
    const fat = calculateFat();
    const protein = calculateProtein();
    const carb = calculateCarb();
    total = total - fat - protein - carb;
    if (total < 0) {
      return 0;
    }
    return total;
  };

  const data = {
    labels: ["Calories Left", "Fat", "Protein", "Carb"],
    datasets: [
      {
        label: "My First Dataset",
        data: [
          totalCalorie(),
          calculateFat(),
          calculateProtein(),
          calculateCarb(),
        ],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(50,205,50)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <>
      <Doughnut data={data} />
    </>
  );
}

export default ChartPie;

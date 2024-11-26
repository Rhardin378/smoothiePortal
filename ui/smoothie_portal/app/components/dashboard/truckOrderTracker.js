import React from "react";
import moment from "moment";
import { useState, useEffect } from "react";
const TruckOrderTracker = ({ day }) => {
  //on Mount get day and compare it to that day of the week
  const week = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  const [daysUntilOrder, setDaysUntilOrder] = useState(0);
  const [bgColor, setBgColor] = useState("bg-gray-200");

  const getDayInMoment = (day) => {
    return week[day];
  };

  useEffect(() => {
    const today = moment().day();
    const orderDayInMoment = getDayInMoment(day);
    let daysDifference = orderDayInMoment - today;

    if (daysDifference < 0) {
      daysDifference += 7; // Adjust for the next week
    }

    setDaysUntilOrder(daysDifference);
  }, [day]);

  useEffect(() => {
    if (daysUntilOrder === 0) {
      setBgColor("bg-red-300 animate-pulse");
    } else {
      setBgColor("bg-gray-200");
    }
  }, [daysUntilOrder]);
  return (
    <div className="flex items-center justify-center w-full">
      <div className={`${bgColor}  p-8 rounded-lg shadow-lg m-2  max-w-md`}>
        <div className=" text-center p-4 rounded-lg">
          <h2 className="text-xl  font-bold mb-2">Days Until Order:</h2>
          <p className="text-gray-700 text-3xl font-bold">
            {daysUntilOrder === 0 ? "Order Day" : daysUntilOrder}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TruckOrderTracker;

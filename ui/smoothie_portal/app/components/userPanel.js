import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../store/slices/authSlice";
const UserPanel = () => {
  const name = useSelector((state) => state.auth.name);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <div className="flex flex-col ml-auto text-right  p-6">
      <p className=" font-mono text-3xl font bold">{name}</p>
      <p className="font-mono text-lg">{role}</p>
    </div>
  );
};

export default UserPanel;

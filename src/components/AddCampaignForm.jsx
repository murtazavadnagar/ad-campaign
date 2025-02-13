import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCampaign } from "../redux/campaignSlice";

const AddCampaignForm = () => {
  const dispatch = useDispatch();
  const [campaign, setCampaign] = useState({
    name: "",
    startDate: "",
    endDate: "",
    Budget: "",
    userId: "",
  });

  const handleChange = (e) => {
    setCampaign({ ...campaign, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(addCampaign({ ...campaign, id: Math.random() }));
  };

  return (
    <div>
      <input
        type="text"
        name="name"
        placeholder="Campaign Name"
        onChange={handleChange}
      />
      <input type="date" name="startDate" onChange={handleChange} />
      <input type="date" name="endDate" onChange={handleChange} />
      <input
        type="number"
        name="Budget"
        placeholder="Budget"
        onChange={handleChange}
      />
      <input
        type="number"
        name="userId"
        placeholder="User ID"
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Add Campaign</button>
    </div>
  );
};

export default AddCampaignForm;

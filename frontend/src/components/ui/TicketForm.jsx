import React, { useState } from "react";
import API from "../../api"; // adjust path as needed

const TicketForm = ({ testId }) => {
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tickets", { testId, category, message });
      setSuccess("Ticket submitted!");
      setCategory(""); setMessage("");
    } catch (err) { setSuccess("Failed to submit."); }
  };
  return (
    <form onSubmit={handleSubmit} style={{maxWidth:340, margin:"10px auto"}}>
      <label>Category</label>
      <select value={category} onChange={e=>setCategory(e.target.value)}>
        <option value="">Choose...</option>
        <option value="Test Issue">Test Issue</option>
        <option value="General">General</option>
      </select>
      <label>Message</label>
      <textarea required value={message} onChange={e=>setMessage(e.target.value)}>
      </textarea>
      <button type="submit">Submit Ticket</button>
      {success && <div>{success}</div>}
    </form>
  );
};

export default TicketForm;

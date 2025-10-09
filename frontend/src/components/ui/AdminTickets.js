import React, { useEffect, useState } from "react";
import API from "../../api"; // adjust path

const AdminTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [reply, setReply] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    API.get("/admin/tickets").then(({ data }) => setTickets(data));
  }, []);

  const handleUpdate = async (id) => {
    await API.patch(`/admin/tickets/${id}`, { status: "resolved", adminReply: reply });
    setSelectedId(null); setReply("");
    API.get("/admin/tickets").then(({ data }) => setTickets(data));
  };

  return (
    <div>
      <h2>Support Tickets</h2>
      <table>
        <thead>
          <tr>
            <th>User</th><th>Category</th><th>Message</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(t => (
            <tr key={t._id}>
              <td>{t.userId}</td>
              <td>{t.category}</td>
              <td>{t.message}</td>
              <td>{t.status}</td>
              <td>
                {t.status !== "resolved" &&
                  <button onClick={() => setSelectedId(t._id)}>Resolve</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedId && (
        <div>
          <textarea value={reply} onChange={e => setReply(e.target.value)} />
          <button onClick={() => handleUpdate(selectedId)}>Submit Reply & Resolve</button>
        </div>
      )}
    </div>
  );
};

export default AdminTickets;

import React, { useEffect, useState } from "react";
import { API } from "../services/api";

export default function Search() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    API.get("/profile/search").then(res => setResults(res.data));
  }, []);

  const express = async (rid) => {
    await API.post("/interest/send", { senderId: "user123", receiverId: rid });
    alert("Interest Sent");
  };

  return (
    <div>
      {results.map(p => (
        <div key={p._id}>
          <p>{p.gender}, Age: {p.age}</p>
          {p.image && <img src={`http://localhost:5000/uploads/${p.image}`} width="100" />}
          <button onClick={() => express(p.userId)}>Express Interest</button>
          <hr />
        </div>
      ))}
    </div>
  );
}
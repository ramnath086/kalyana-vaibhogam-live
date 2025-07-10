import React, { useEffect, useState } from "react";
import { API } from "../services/api";

export default function Search() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    API.get("/profile/search").then(res => setResults(res.data));
  }, []);

  const express = async (receiverId) => {
    await API.post("/interest/send", { senderId: "user123", receiverId });
    alert("Interest Sent");
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>🧑‍💼 Browse Profiles</h2>

      {results.length === 0 ? (
        <p style={{ textAlign: "center", color: "gray" }}>Loading profiles...</p>
      ) : (
        results.map(p => (
          <div key={p._id} style={{ textAlign: "center", marginBottom: "20px" }}>
            <p>
              <strong>{p.gender}</strong>, Age: {p.age}
            </p>
            {p.image && (
              <img
                src={p.image}
                alt={`Profile of ${p.name || "user"}`}
                width="150"
                style={{ borderRadius: "8px" }}
              />
            )}
            <br />
            <button onClick={() => express(p.userId)} style={{ marginTop: "10px" }}>
              ❤️ Express Interest
            </button>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}
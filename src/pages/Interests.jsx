import React, { useEffect, useState } from "react";
import { API } from "../services/api";

export default function Interests() {
  const [data, setData] = useState([]);
  useEffect(() => {
    API.get("/interest/sent/user123").then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h2>Sent Interests</h2>
      {data.map((i) => (
        <p key={i._id}>You liked profile ID: {i.receiverId}</p>
      ))}
    </div>
  );
}
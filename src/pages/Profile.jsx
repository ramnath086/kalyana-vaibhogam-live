import React, { useState } from "react";
import { API } from "../services/api";

export default function Profile() {
  const [form, setForm] = useState({});
  const [img, setImg] = useState();

  const submit = async () => {
    const data = new FormData();
    Object.keys(form).forEach(k => data.append(k, form[k]));
    data.append("image", img);
    data.append("userId", "user123"); // Replace with decoded ID

    await API.post("/profile", data);
    alert("Profile Created");
  };

  return (
    <div>
      <input placeholder="Gender" onChange={(e) => setForm({ ...form, gender: e.target.value })} />
      <input placeholder="Age" type="number" onChange={(e) => setForm({ ...form, age: e.target.value })} />
      <input placeholder="Religion" onChange={(e) => setForm({ ...form, religion: e.target.value })} />
      <input placeholder="Caste" onChange={(e) => setForm({ ...form, caste: e.target.value })} />
      <input placeholder="Education" onChange={(e) => setForm({ ...form, education: e.target.value })} />
      <textarea placeholder="Bio" onChange={(e) => setForm({ ...form, bio: e.target.value })} />
      <input type="file" onChange={(e) => setImg(e.target.files[0])} />
      <button onClick={submit}>Submit Profile</button>
    </div>
  );
}
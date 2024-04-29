import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dash = () => {
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3001/dash")
      .then((res) => {
        if (res.data.valid) {
          setMessage(res.data.message);
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  });

  return <div> Dash {message}</div>;
};

export default Dash;

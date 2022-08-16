import React, { useEffect, useState } from "react";
import axios from "../axios/axios";
import { useParams } from "react-router-dom";
const Verify = () => {
  const [verify, setVerify] = useState("");

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("/verify", {
        headers: {
          authorization: id,
        },
      })
      .then((res) => {
        setVerify(res.data.msg);
      })
      .catch((err) => {
        setVerify(err.data.msg);
      });
  }, [id]);

  return (
    <div>
      <h1>{verify}</h1>
    </div>
  );
};

export default Verify;

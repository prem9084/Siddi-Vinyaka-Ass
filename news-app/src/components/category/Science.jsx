import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Science = () => {
  const [data, setData] = useState([]);
  const fatchTopHeadline = async () => {
    try {
      const { data } = await axios.get(
        "https://newsapi.org/v2/everything?q=science&from=2024-02-29&sortBy=publishedAt&apiKey=3425a9c5d690483c8292113046210665"
      );
      setData(data.articles);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fatchTopHeadline();
  }, []);

  return (
    <>
      <div
        className="container-fluid text-white  d-flex align-items-center justify-content-center flex-column hero"
        style={{ height: "50vh" }}
      >
        {" "}
        <h1>News India</h1>
        <h4>THE WEBSITE BUILD WITH THE NEWS API</h4>
      </div>
      <h2
        className="text-center mt-4"
        style={{ textDecoration: "underline", fontWeight: "bold" }}
      >
        News updates
      </h2>

      <div
        className="container my-4"
        style={{ fontFamily: "inherit", fontWeight: "bold" }}
      >
        <h2 className="text-center" style={{ fontSize: "bold" }}>
          Related Science
        </h2>
        <div
          className="container d-flex align-items-center justify-content-center flex-column my-2 rounded"
          style={{ border: "1px solid black" }}
        >
          {data
            ? data.map((item) => (
                <>
                  <div className="container mt-4 mb-4">
                    <h5>{item.title}</h5>
                    <div className="d-flex align-items-center justify-content-center">
                      <img
                        src={item.urlToImage}
                        alt={item.name}
                        className="img-fluid rounded"
                        style={{
                          width: "auto",
                          height: "500px",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    <p>{item.content}</p>
                    <Link to={item.url} className="btn btn-primary">
                      View More...
                    </Link>
                    <hr />
                  </div>
                </>
              ))
            : "LOADING..."}
        </div>
      </div>
    </>
  );
};

export default Science;

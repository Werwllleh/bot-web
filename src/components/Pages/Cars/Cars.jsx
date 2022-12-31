import axios from "axios";
import React, { useEffect, useState } from "react";
import useTelegram from "../../../hooks/useTelegram";
import s from "./Cars.module.css";

import { ImageList } from "@mui/material";
import { Image } from "antd";
import Header from "../../Header/Header";

const Cars = () => {
  const [images, setImages] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const { tg } = useTelegram();

  useEffect(() => {
    tg.expand();
  }, []);

  useEffect(() => {
    if (fetching) {
      axios
        .get(`https://92.255.78.177/api/ourcars?page=${currentPage}`)
        .then((res) => {
          setImages([...images, ...res.data.files]);
          setTotalCount(res.data.pageCount);
          setCurrentPage((prevState) => prevState + 1);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching, currentPage, images]);

  // console.log(images);
  // console.log(currentPage);
  // console.log(totalCount);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      currentPage < totalCount
    ) {
      setFetching(true);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler, true);
    return function () {
      document.removeEventListener("scroll", scrollHandler, true);
    };
  }, [totalCount, currentPage]);

  return (
    <div className={s.cars_body}>
      <Header title={"Автомобили нашего клуба"} />
      <div className={s.image_grid}>
        <ImageList variant="masonry" sx={{ width: 600 }} cols={3} gap={5}>
          {images.map((photo) => (
            <Image
              // width={150}
              decoding="async"
              loading="lazy"
              style={{ width: "200px", verticalAlign: "baseline" }}
              key={photo + "_" + Math.random((Math.ceil + 2.4) * 0.25)}
              src={"https://92.255.78.177/api/image/" + photo}
              alt=""
            />
          ))}
        </ImageList>
      </div>
    </div>
  );
};

export default Cars;

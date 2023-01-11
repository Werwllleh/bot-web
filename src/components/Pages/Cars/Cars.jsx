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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [countPhotos, setCountPhotos] = useState("");

  const { tg } = useTelegram();

  useEffect(() => {
    tg.expand();
  }, []);

  useEffect(() => {
    if (fetching) {
      axios
        .get(`https://92.255.78.177/api/ourcars?page=${currentPage}`)
        .then((res) => {
          setCountPhotos(res.data.countPhotos);
          setImages([...images, ...res.data.files]);
          setTotalCount(res.data.pageCount);
          setCurrentPage((prevState) => prevState + 1);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching, currentPage, images, countPhotos]);

  // console.log(images);
  // console.log(currentPage);
  // console.log(totalCount);
  // console.log(countPhotos);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      images.length < countPhotos
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
        <ImageList
          variant="standart"
          cols={3}
          gap={8}
          style={{ alignItems: "center" }}
        >
          {images.map((photo) => (
            <Image
              preview={{
                src: "https://92.255.78.177/api/image/" + photo,
              }}
              style={{
                objectFit: "cover",
                height: "150px",
                width: "150px",
              }}
              loading="lazy"
              key={photo + "_" + Math.random((Math.ceil + 2.4) * 0.25)}
              src={
                "https://92.255.78.177/api/image/small/" +
                photo +
                "_" +
                "small.jpeg"
              }
              alt=""
            />
          ))}
        </ImageList>
      </div>
    </div>
  );
};

export default Cars;

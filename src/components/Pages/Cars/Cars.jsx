import axios from "axios";
import React, { useEffect, useState } from "react";
import useTelegram from "../../../hooks/useTelegram";
import s from "./Cars.module.css";

import { ImageList, ImageListItem } from "@mui/material";
import Header from "../../Header/Header";

const Cars = () => {
  const [images, setImages] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
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
          setCurrentPage((prevState) => prevState + 1);
          setTotalCount(res.data.pageCount);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching, currentPage, images]);

  useEffect(() => {
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
    document.addEventListener("scroll", scrollHandler, true);
    return function () {
      document.removeEventListener("scroll", scrollHandler, true);
    };
  }, [totalCount, currentPage]);

  return (
    <div className={s.cars_body}>
      <Header title={"Автомобили нашего клуба"} />
      <div className={s.image_grid}>
        <ImageList sx={{ width: 600 }} cols={2}>
          {images.map((photo) => (
            <ImageListItem
              key={photo + "_" + Math.random((Math.ceil + 2.4) * 0.25)}
            >
              <img
                src={"https://92.255.78.177/api/image/" + photo}
                loading="lazy"
                alt=""
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
};

export default Cars;

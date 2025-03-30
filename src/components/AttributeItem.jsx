import React, {useEffect, useState} from 'react';
import {CMS} from "../utils/consts";
import {Link} from "react-router-dom";

const AttributeItem = ({data}) => {

  const [images, setImages] = useState([]);

  useEffect(() => {

    const imagesData = data.images;
    const imagesLinks = [];

    imagesData.map(image => {
      imagesLinks.push(CMS + image.url)
    })

    setImages(imagesLinks);

  }, [data])


  return (
    <div
      className="product"
      key={data.documentId}
    >
      <div className="product__body">
        <div className="product__image">
          <img src={CMS + data.preview_image.url} alt=""/>
        </div>
        <h4 className="product__title">{`${data.type} ${data.title}`}</h4>
      </div>
      <Link className="product__link" to={`/attributes/${data.slug}`} />
    </div>
  );
};

export default AttributeItem;

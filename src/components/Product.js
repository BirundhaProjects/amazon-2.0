import { useEffect } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useState } from "react";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image, }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [hasPrime, setHasPrime] = useState(false);

  useEffect(() => {
    setRating(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING);
    setHasPrime(Math.random() < 0.5);
  }, []);

  const addItemToBasket = () => {
    const product = {
      id, 
      title, 
      price,
      rating, 
      description, 
      category, 
      image,
      hasPrime,
    };
    dispatch(addToBasket(product));
  };

  return (
    <div className="relative flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">{category}</p>
      <Image src={image} height={200} width={200} style={{objectFit: "contain"}} alt="" />
      <h4 className="my-3">{title}</h4>
      <div className="flex">
        {Array(rating).fill().map((_, i) => (
          <div key={i}>
            <StarIcon className="h-5 text-yellow-500" />
          </div>
        ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div className="mb-5">
        <Currency quantity={price} currency="INR" />
      </div>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img className="w-12" src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/052018/untitled-1_282.png" alt="" />
          <p className="text-xs text-gray-500">Free Next day Delivery</p>
        </div>
      )}
      <button onClick={addItemToBasket} className="w-full button">Add to Basket</button>
    </div>
  );
}

export default Product;

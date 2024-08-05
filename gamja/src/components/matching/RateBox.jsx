import React, { useState, useEffect } from "react";
import styled from "styled-components";

const RateBox = ({ rating }) => {
  const starsArr = ["first", "second", "third", "fourth", "last"];
  const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);

  const calcStarRates = (rating) => {
    let tempStarRatesArr = [0, 0, 0, 0, 0];
    let remainingScore = (rating * 120) / 100;
    let i = 0;

    while (remainingScore > 24) {
      tempStarRatesArr[i] = 24;
      i += 1;
      remainingScore -= 24;
    }
    tempStarRatesArr[i] = remainingScore;
    return tempStarRatesArr;
  };

  useEffect(() => {
    setRatesResArr(calcStarRates(rating));
  }, [rating]);

  return (
    <RatingBox>
      <StarRateWrap>
        {starsArr.map((item, idx) => {
          const gradientId = `${item}StarGradient`;
          const isPartialStar = ratesResArr[idx] < 24 && ratesResArr[idx] > 0;

          return (
            <span className="star_icon" key={`${item}_${idx}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 23 24"
                fill="none"
              >
                {/* <clipPath id={`${item}StarClip`}>
                  <rect width={`${ratesResArr[idx]}`} height="19" />
                </clipPath> */}
                <defs>
                  {isPartialStar && (
                    <linearGradient
                      id={gradientId}
                      x1="0.622282"
                      y1="9.49279"
                      x2="18"
                      y2="9.4791"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FDDE55" />
                      <stop offset="1" stopColor="#494949" />
                    </linearGradient>
                  )}
                </defs>
                <path
                  id={`${item}Star`}
                  d="M0.0292969 12L8.10606 8.77197L11.3519 0.69517L14.5685 8.77451L22.6478 12.0089L14.571 15.2369L11.343 23.3137L8.10861 15.2344L0.0292969 12Z"
                  fill={
                    ratesResArr[idx] === 0
                      ? "#494949"
                      : isPartialStar
                      ? `url(#${gradientId})`
                      : "#FDDE55"
                  }
                />
              </svg>
            </span>
          );
        })}
      </StarRateWrap>
      <Rating>
        {rating}
        <span>/100</span>
      </Rating>
    </RatingBox>
  );
};

export default RateBox;

const RatingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  border-radius: 15px;
  background: #f8f8f8;
  width: 275px;
  height: 18px;
  padding: 16px 25px;
`;

const StarRateWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 16.72px;
  .star_icon {
    display: inline-flex;
  }
`;

const Rating = styled.div`
  color: #494949;
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  > span {
    color: #a4a4a4;
  }
`;

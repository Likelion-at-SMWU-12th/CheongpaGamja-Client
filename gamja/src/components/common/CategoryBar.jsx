import React, { useState } from "react";
import styled from "styled-components";

const categories = [
  "전체",
  "가치관",
  "사랑",
  "생활지식",
  "인간관계",
  "재테크",
  "진로",
];

const CategoryBar = ({ onSelectCategory }) => {
  const [selectCategory, setSelectCategory] = useState("전체");

  const onClickCategory = (category) => {
    setSelectCategory(category);
    onSelectCategory(category);
  };

  return (
    <Categories>
      {categories.map((category) => (
        <Category
          key={category}
          $isactive={selectCategory === category}
          onClick={() => onClickCategory(category)}
        >
          {category}
        </Category>
      ))}
    </Categories>
  );
};

export default CategoryBar;

const Categories = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 23px 40px;
  /* margin-bottom: 28px; */
`;

const Category = styled.div`
  color: ${(props) => (props.$isactive ? "#000" : "#a4a4a4")};
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
`;

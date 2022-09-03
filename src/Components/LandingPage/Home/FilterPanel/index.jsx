import React from "react";
import { categoryList, ratingList } from "../../constants";
import CheckboxProton from "../../common/CheckboxProton";
import FilterListToggle from "../../common/FilterListToggle";
import "./styles.css";

const FilterPanel = ({
  selectedRating,
  selectRating,
  categories,
  changeChecked,
  tags,
  changeCheckedTags,
}) => (
  <div>
    <div className="input-group">
      <p className="label">Category</p>
      {categories.map((category) => (
        <CheckboxProton
          key={category.id}
          category={category}
          changeChecked={changeChecked}
        />
      ))}
    </div>
    <hr />
    <div className="input-group">
      <p className="label">Star Rating</p>
      <FilterListToggle
        options={ratingList}
        value={selectedRating}
        selectToggle={selectRating}
      />
    </div>
    <hr />
    <div className="input-group">
      <p className="label">Tags</p>
      {tags.map((tag) => (
        <CheckboxProton
          key={tag.id}
          category={tag}
          changeChecked={changeCheckedTags}
        />
      ))}
    </div>
  </div>
);

export default FilterPanel;

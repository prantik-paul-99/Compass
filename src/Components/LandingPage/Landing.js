import React, { useEffect, useState } from "react";
import EmptyView from "./common/EmptyView";
import FilterPanel from "./Home/FilterPanel";
import List from "./Home/List";
import SearchBar from "./Home/SearchBar";
import { dataList } from "./constants";
import "./styles.css";

const Landing = () => {
  const host = "http://localhost:5000";

  const [businesses, setBusinesses] = useState([]); // keep track of all businesses available
  const [selectedRating, setSelectedRating] = useState(null); // keep track of selected ratings

  const [categories, setcategories] = useState([
    { id: 1, checked: false, label: "Restaurant" },
    { id: 2, checked: false, label: "Shop" },
    { id: 3, checked: false, label: "HomeService" },
    { id: 4, checked: false, label: "Others" },
  ]);

  const [tags, settags] = useState([
    { id: 1, checked: false, label: "Social" },
    { id: 2, checked: false, label: "Food" },
    { id: 3, checked: false, label: "Expensive" },
    { id: 4, checked: false, label: "Entertainment" },
    { id: 5, checked: false, label: "Local" },
    { id: 6, checked: false, label: "Sports" },
    { id: 7, checked: false, label: "Shopping" },
    { id: 8, checked: false, label: "Repair" },
    { id: 9, checked: false, label: "Exclusive" },
    { id: 10, checked: false, label: "Homemade" },
    { id: 11, checked: false, label: "Service" },
    { id: 12, checked: false, label: "Public" },
  ]);

  const [list, setList] = useState(null);
  const [resultsFound, setResultsFound] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  const handleSelectRating = (event, values) => {
    if (values.length) setSelectedRating(values);
    else setSelectedRating(null);
  };

  const handleChangeChecked = (id) => {
    const categoriesStateList = categories;
    const changeCheckedcategories = categoriesStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setcategories(changeCheckedcategories);
  };

  const handleChangeCheckedTags = (id) => {
    const tagsStateList = tags;
    const changeCheckedTags = tagsStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    settags(changeCheckedTags);
  };

  const applyFilters = () => {
    let updatedList = businesses;

    // Rating Filter
    if (selectedRating) {
      //iterate over selectedRating
      let ratedFilters = [];
      //if selected rating includes the rating, push it to the ratedFilters array
      selectedRating.forEach((rating) => {
        updatedList.forEach((business) => {
          if (Math.round(business.average_star_count) === rating)
            ratedFilters.push(business);
        });
      });

      updatedList = ratedFilters;
    }

    // category Filter
    const categoriesChecked = categories
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());

    if (categoriesChecked.length) {
      updatedList = updatedList.filter((item) =>
        categoriesChecked.includes(item.category.toLowerCase())
      );
    }

    // tags Filter
    const tagsChecked = tags
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());

    if (tagsChecked.length) {
      //for each tags
      let tagsFilters = [];
      for(let i=0; i<updatedList.length; i++){
        for(let j=0; j<updatedList[i].tags.length; j++){
          if(tagsChecked.includes(updatedList[i].tags[j].toLowerCase())
            && !tagsFilters.includes(updatedList[i])){
            tagsFilters.push(updatedList[i]);
          }
        }
      }
      updatedList = tagsFilters;
    }

    // Search Filter
    if (searchInput) {
      updatedList = updatedList.filter(
        (item) =>
          item.business_name
            .toLowerCase()
            .search(searchInput.toLowerCase().trim()) !== -1
      );
    }

    setList(updatedList);

    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedRating, categories, searchInput, tags, list]);

  //fetch all businesses when component mounts
  useEffect(() => {
    let isMounted = true;
    const fetchAllBusinesses = async () => {
      // API Call
      const response = await fetch(`${host}/api/business/getallbusinesses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      const allbusinesses = JSON.parse(JSON.stringify(json));
      if (isMounted) {
        setList(allbusinesses);
        setBusinesses(allbusinesses);
      }
    };
    fetchAllBusinesses();

    return () => (isMounted = false);
  }, []);

  return (
    <div className="home">
      {/* Search Bar */}
      <SearchBar
        value={searchInput}
        changeInput={(e) => setSearchInput(e.target.value)}
      />
      <div className="home_panelList-wrap">
        {/* Filter Panel */}
        <div className="home_panel-wrap">
          <FilterPanel
            selectedRating={selectedRating}
            selectRating={handleSelectRating}
            categories={categories}
            changeChecked={handleChangeChecked}
            tags={tags}
            changeCheckedTags={handleChangeCheckedTags}
          />
        </div>
        {/* List & Empty View */}
        <div className="home_list-wrap">
          {resultsFound ? <List list={list} /> : <EmptyView />}
        </div>
      </div>
    </div>
  );
};

export default Landing;

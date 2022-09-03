// import SideBar from "./Sidebar/Sidebar";

import Home from "./Home";
import {useParams} from 'react-router-dom';

import Sidebar from "../../Sidebar/Sidebar";

import BusinessHomeState from "../../../../Context/BusinessHome/BusinessHomeState";
import TopReviews from "./TopReviews/TopReviews";

// import "./Sidebar/styles.css";

function BusinessHome() {
  const { business_id } = useParams();
  return (
    <>
      <BusinessHomeState business_id={business_id} >
      <div className="wrapper">
        <Sidebar />
        <div className="main_content" style={{width:"87%"}}>
          {/* <div className="info"> */}
          <div className="container ">
            <div className="main_content_body">
              {/* Add Your Main Content Codes Here */}
              <Home />             
            </div>
          </div> 
        </div>
      </div>
      </BusinessHomeState>
    </>
  );
}

export default BusinessHome;

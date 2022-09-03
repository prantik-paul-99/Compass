import React from "react";

import { Carousel } from "react-bootstrap";

import food from "../../Images/home_food.jpg";
import shop from "../../Images/home_shopping.jpg";
import business from "../../Images/home_business.unsplash.jpg";
import logo from "../../Images/project_logo.png";

export default function HomeCarousel() {
  return (
    <div className="mx-4 mt-4">
      <Carousel>
        <Carousel.Item interval={3000}>
          <img
            className="d-block"
            style={{ height: "600px", width: "100%" }}
            src={logo}
            alt="Food"
          />
          <Carousel.Caption>
            <h3>Welcome To Compass!</h3>
            <p>
              Compass is a social site for everything local. Using Yelp, one can
              find nearby restaurants, bars, shops, etc., read reviews customers
              left for businesses, and write reviews with ease.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img
            className="d-block "
            style={{ height: "600px", width: "100%" }}
            src={food}
            alt="Food"
          />
          <Carousel.Caption>
            <h3>Welcome To Compass!</h3>
            <p>
              With trusted local business information, photos and review
              content, Compass provides a one-stop local platform for consumers
              to discover, connect and transact with local businesses of all
              sizes.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img
            className="d-block "
            style={{ height: "600px", width: "100%" }}
            src={business}
            alt="Business"
          />
          <Carousel.Caption>
            <h3>Welcome To Compass!</h3>
            <p>
              With trusted local business information, photos and review
              content, Compass provides a one-stop local platform for consumers
              to discover, connect and transact with local businesses of all
              sizes
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block "
            src={shop}
            style={{ height: "600px", width: "100%" }}
            alt="Shopping"
          />
          <Carousel.Caption>
            <h3>Welcome To Compass!</h3>
            <p>
              With trusted local business information, photos and review
              content, Compass provides a one-stop local platform for consumers
              to discover, connect and transact with local businesses of all
              sizes
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function BusinessExternalLinks() {
  return (
    <>
      <div
        className="link_container my-4"
        style={{
          marginLeft: "600px",
          width: "60%",
          border: "3px solid #ffffff",
          padding: "10px",
          height: "75px",
          overflow: "hidden",
        }}
      >
        <div className="write_review_container" style={{ float: "left" }}>
          <Link to="/review">
            <Button
              className="me-2"
              role="button"
              style={{ background: "red" }}
            >
              <div className="review_icon" style={{ float: "left" }}>
                <i className="bi bi-star me-2"></i>
              </div>
              <div className="review_text" style={{ float: "right" }}>
                Write A Review
              </div>
            </Button>
          </Link>
        </div>
        <div className="add_photo_container" style={{ float: "left" }}>
          <Link to="#">
            <Button
              className="me-2"
              role="button"
              style={{ background: "red" }}
            >
              <div className="photo_icon" style={{ float: "left" }}>
                <i className="bi bi-camera me-2"></i>
              </div>
              <div className="photo_text" style={{ float: "right" }}>
                Add Photo
              </div>
            </Button>
          </Link>
        </div>
        <div className="share_container" style={{ float: "left" }}>
          <Link to="#">
            <Button className="me-2" role="button">
              <div className="share_icon" style={{ float: "left" }}>
                <i className="bi bi-share me-2"></i>
              </div>
              <div className="share_text" style={{ float: "right" }}>
                Share
              </div>
            </Button>
          </Link>
        </div>
        <div className="save_container" style={{ float: "left" }}>
          <Link to="#">
            <Button className="me-2" role="button">
              <div className="save_icon" style={{ float: "left" }}>
                <i className="bi bi-save me-2"></i>
              </div>
              <div className="save_text" style={{ float: "right" }}>
                Save
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

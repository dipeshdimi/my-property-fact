"use client";
import Link from "next/link";
import Slider from "react-slick";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/virtual";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Virtual } from "swiper/modules";
import "./property.css";
import "@/app/components/header/header.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../components/footer/page";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faChartArea,
  faMarker,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Featured from "../components/home/featured/page";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Property({ slug }) {
  const [amenities, setAmenities] = useState([]);
  const [projectDetail, setProjectDetail] = useState([]);
  const [isAnswerVisible, setIsAnswerVisible] = useState([false, false]);
  const [floorPlanList, setFloorPlanList] = useState([]);
  const [galleryList, setGalleryList] = useState([]);
  const [benefitList, setBenefitList] = useState([]);
  const [aboutData, setAboutData] = useState([]);
  const [walkthrough, setWalkthrough] = useState([]);
  const [bannerData, setBannerData] = useState([]);
  const [faqs, setFaqs] = useState([]);
  var [count, setCount] = useState(1);

  const toggleAnswer = (index) => {
    const updatedVisibility = [...isAnswerVisible];
    updatedVisibility[index] = !updatedVisibility[index];
    setIsAnswerVisible(updatedVisibility);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };

  const fetchGallery = async () => {
    const data = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + `project-gallery/get/${slug}`
    );
    setGalleryList(data.data);
  };

  const fetchWalkthrough = async () => {
    const data = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + `project-walkthrough/get/${slug}`
    );
    setWalkthrough(data.data);
  };

  const fetchFaqs = async () => {
    const data = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + `project-faqs/get/${slug}`
    );
    setFaqs(data.data);
  };

  const fetchProjectAbout = async () => {
    const data = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + `project-about/get/${slug}`
    );
    setAboutData(data.data);
  };

  const fetchBanners = async () => {
    const data = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + `project-banner/get/${slug}`
    );
    setBannerData(data.data);
  };

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        const data = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + `projects/get/${slug}`
        );
        setProjectDetail(data.data);
      } catch (error) {}
    };

    const fetchFloorPlans = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + `floor-plans/get/${slug}`
        );
        console.log(response);
        setFloorPlanList(response.data);
      } catch (error) {}
    };

    const fetchData = async () => {
      try {
        const allFeaturedProperties = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}project-amenity/get/${slug}`
        );
        setAmenities(allFeaturedProperties.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    const fetchBenifits = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}location-benefit/get/${slug}`
        );
        setBenefitList(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
    fetchProjectDetail();
    fetchFloorPlans();
    fetchGallery();
    fetchFaqs();
    fetchBenifits();
    fetchProjectAbout();
    fetchWalkthrough();
    fetchBanners();
  }, []);

  const imageSrc = `${process.env.NEXT_PUBLIC_IMAGE_URL}properties/${bannerData.slugURL}/${bannerData.desktopBanner}`;
  // const imageSrc = `${process.env.NEXT_PUBLIC_IMAGE_URL}properties/${projectDetail.slugURL}/${projectDetail.projectThumbnail}`;

  return (
    <>
      <header className="header bg-light">
        <div className="main-header">
          <div className="container-lg d-flex justify-content-between position-relative align-items-center">
            <div className="project-logo">
              <Link href="/">
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}properties/${projectDetail.slugURL}/${projectDetail.projectLogo}`}
                  alt="logo"
                />
              </Link>
            </div>
            <nav className="navi d-none d-md-flex">
              <div className="menu">
                <ul className="list-inline">
                  <li>
                    <Link href="#overview">Overview</Link>
                  </li>
                  <li>
                    <Link href="#amenities">Amenities</Link>
                  </li>
                  <li>
                    <Link href="#floorplan">Plans &amp; Price</Link>
                  </li>
                  <li>
                    <Link href="#gallery">Gallery</Link>
                  </li>
                  <li>
                    <Link href="#location">Location</Link>
                  </li>
                </ul>
              </div>
            </nav>
            <div className="menuBtn d-flex d-lg-none ">
              <span id="menuLine1"></span>
              <span id="menuLine2"></span>
              <span id="menuLine3"></span>
            </div>
            <div className="logo">
              <Link className="mt-2 text-dark" href="/">
                <img src="/logo.png" alt="logo" style={{ width: "60px" }} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container-fluid mt-5 p-0">
        <div className="slick-slider-container banner-container">
          <Slider {...settings}>
            <div>
              <img className="slider-image" src={imageSrc} alt="Slide 1" />
            </div>
          </Slider>
          <div className="banner-form">
            <Form>
              <h5 className="fw-semibold mb-3">Interested in the Project?</h5>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="text" placeholder="Name*" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email*" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="text" placeholder="Phone Number*" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" style={{fontSize: "14px"}} />
              </Form.Group>
              <Button variant="success" type="submit">
                Submit
              </Button>
            </Form>
          </div>
          <div className="short-info">
            <p className="m-0 p-0">{projectDetail.projectName}</p>
            <small>
              <FontAwesomeIcon icon={faMarker} width={10} />{" "}
              {projectDetail.projectAddress}
            </small>
            <span>
              {projectDetail.projectPrice}* |{" "}
              {projectDetail.projectConfiguration}
            </span>
            <div className="btn btn-success">Get Details</div>
          </div>
        </div>
        <div>
          <h1 className="text-center mt-5 fw-bold">About The Project</h1>
          <div className="px-3 pb-3 pt-1">
            <p
              className="text-center about-desc"
              dangerouslySetInnerHTML={{ __html: aboutData.shortDesc }}
            ></p>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <button className="btn btn-success fs-6">READ MORE</button>
          <button className="btn btn-success mx-3 fs-6">
            DOWNLOAD BROCHURE
          </button>
          <button className="btn btn-success fs-6">
            SCHEDULE A SITE VISIT
          </button>
        </div>
        <div className="d-flex justify-content-center mt-5">
          <div className="walkthrough-container">
            <div className="text-center">
              <p className="h1 text-light mt-5">Walkthrough</p>
            </div>
            <div className="text-center py-3 px-5">
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    walkthrough.walkthroughDesc ||
                    "Project Walkthrough not Found!",
                }}
              ></p>
            </div>
            <div className="text-center">
              <button className="btn btn-success mb-5">View</button>
            </div>
          </div>
        </div>

        <div className="container-fluid bg-dark p-5 mt-5" id="amenities">
          <p className="h1 text-center text-light fw-semibold mb-3">
            Amenities
          </p>
          <div>
            <p
              className="text-center text-light fw-medium"
              dangerouslySetInnerHTML={{ __html: projectDetail.amenityDesc }}
            ></p>
          </div>
          <div className="row">
            <div className="d-flex flex-wrap justify-content-center align-items-center gap-4">
              {amenities.map((item) => (
                <div key={item.id} className="amenity-card">
                  <div className="amenity-card-overlay" />
                  <img
                    className="card-img"
                    src={
                      process.env.NEXT_PUBLIC_IMAGE_URL +
                      "amenity/" +
                      item.amenityImageUrl
                    }
                    alt={item.altTag}
                  />
                  <h5 className="card-title">{item.title}</h5>
                </div>
              ))}
            </div>
            <div className="mt-5 text-center">
              <button className="btn btn-success">VIEW ALL</button>
            </div>
          </div>
        </div>
        <div className="container-fluid" id="floorplan">
          <div className="p-5 pb-4">
            <p className="h1 text-center fw-semibold">Floor Plans</p>
            <p
              className="text-center"
              dangerouslySetInnerHTML={{ __html: projectDetail.floorPlanDesc }}
            ></p>
          </div>
          <div className="d-flex justify-content-center p-2 mb-5">
            {floorPlanList.map((item) => (
              <div key={count++} className="card mx-2 bg-light" style={{ width: "30%" }}>
                <div className="p-3 rounded-sm">
                  <img
                    src="https://www.starestate.com/assets/images/generic-floorplan.jpg"
                    alt="floor plan"
                    style={{width: "100%", borderRadius: "8px", border: "1px solid #999"}}
                  />
                </div>
                <div className="border-bottom property-type-detail">
                  <p className="fw-semibold">
                    <FontAwesomeIcon icon={faBed} width={20} color="green" />{" "}
                    Type
                  </p>
                  <p>{item.planType}</p>
                </div>
                <div className="mt-2 property-type-detail">
                  <p className="fw-semibold">
                    <FontAwesomeIcon
                      icon={faChartArea}
                      width={20}
                      color="green"
                    />{" "}
                    Area
                  </p>
                  <p>{item.areaSqft} sqft*</p>
                  <p>{item.areaSqmt} sqmt*</p>
                </div>
                <div className="pb-4 ps-2 mt-4">
                  <button className="btn btn-success">PRICE ON REQUEST</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container-fluid bg-dark p-5" id="gallery">
          <p className="text-center h1 text-light">Gallery</p>
          <Swiper
            slidesPerView={3}
            grabCursor={true}
            centeredSlides={true}
            centeredSlidesBounds={true}
            freeMode={true}
            navigation={true}
            modules={[FreeMode, Navigation, Virtual]}
            className="mySwiper no-slider-arrow library-swiper"
          >
            {galleryList.map((item) => (
              <SwiperSlide
                key={item.id}
                style={{ borderRadius: "12px", overflow: "hidden" }}
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}properties/${projectDetail.slugURL}/${item.image}`}
                  alt="floor plan"
                  style={{height: "300px"}}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="container-fluid mt-5">
          <div>
            <p className="h1 text-center fw-semibold">Location</p>
          </div>
          <div className="text-center px-5 fw-medium">
            <p
              dangerouslySetInnerHTML={{ __html: projectDetail.locationDesc }}
            ></p>
          </div>
          <div className="row p-2">
            <div className="col-md-6">
              <div className="row d-flex flex-wrap justify-content-between">
                {benefitList.map((item) => (
                  <div key={item.id} className="col-6">
                    <div className="d-flex location-benifits mx-1 mt-2">
                      <img
                        style={{ width: "40px" }}
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}icon/${item.iconImage}`}
                        alt={item.iconImage}
                      />
                      <p className="h6 text-center">{item.benefitName}</p>
                      <div className="distance-value">{item.distance}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row border mt-3 p-3 d-flex justify-content-center">
                <div className="col-md-6">
                  <div className="d-flex">
                    <p className="text-success">Address:&nbsp;</p>
                    <p>{projectDetail.projectLocality}</p>
                  </div>
                  <div className="d-flex">
                    <p className="text-success">State:&nbsp;</p>
                    <p>{projectDetail.state}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex">
                    <p className="text-success">City:&nbsp;</p>
                    <p>{projectDetail.cityLocation}</p>
                  </div>
                  <div className="d-flex">
                    <p className="text-success">Country:&nbsp;</p>
                    <p>India</p>
                  </div>
                </div>
                <div className="d-flex">
                  <button className="btn btn-success">View On Map</button>
                </div>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <Link href="#formModal" data-bs-toggle="modal">
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}properties/${projectDetail.slugURL}/${projectDetail.locationMap}`}
                  className="h-100 object-cover"
                  alt="Location Map"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="get-in-touch">
        <div className="contact-container">
          <div className="contact-left">
            <h2>GET IN TOUCH</h2>
            <p className="contact-description">
              If you would like to know more details or something specific, feel
              free to contact us. Our site representative will give you a call
              back.
            </p>
          </div>

          <div className="contact-right">
            <form>
              <input
                type="text"
                name="name"
                placeholder="Enter your Name"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Enter your Phone Number"
                required
              />
              <div className="checkbox-container">
                <input type="checkbox" name="acceptedTerms" required />
                <label>
                  I accept the <a href="#">Terms of Service</a>
                </label>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>

      <div className="container-fluid pb-5" style={{ background: "#cccccc" }}>
        <p className="h1 text-center pt-5 fw-semibold">FAQs</p>
        <div className="container mt-3">
          {faqs.map((item, index) => (
            <div key={item.id}>
              <div
                className="container questions mt-3 d-flex"
                id="question1"
                onClick={() => toggleAnswer(item.id)}
              >
                <p>Q{index+1}: </p> {item.faqQuestion}
                <span className="plus-icon">+</span>
              </div>
              <div
                className={`container questions ${
                  isAnswerVisible[item.id] ? "" : "d-none"
                } bg-light`}
                id="answer1"
              >
                <p>Ans: </p>
                {item.faqAnswer}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container-fluid">
        <Featured />
      </div>
      {/* <div
        className="container-fluid d-flex justify-content-center"
        style={{ background: "#68ac78" }}
      >
        <div>
          <img src="/logo.png" alt="logo" style={{ width: "200px" }} />
        </div>
        <div></div>
      </div> */}
      <Footer />
    </>
  );
}

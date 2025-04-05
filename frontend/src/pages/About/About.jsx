import React, { useState } from 'react';
import './About.css';
import Layout from '../../components/Layout/Layout.jsx';

import storyImg from '../../assets/images/about-jumbo-img.jpeg';
import Stats from '../../components/Stats/Stats.jsx';
import Contributor from '../../components/Contributor/Contributor.jsx';
import Services from '../../components/Services/Services.jsx';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const About = () => {
  const contributors = [
    { name: "Manu", role: "Designer" },
    { name: "Vishal", role: "Developer" },
    { name: "Ravi", role: "Marketing Specialist" },
    { name: "Anita", role: "Customer Support" },
    { name: "Karan", role: "Operations Manager" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Move Slider Left
  const slideLeft = () => {
    setActiveIndex((prev) => (prev === 0 ? contributors.length - 1 : prev - 1));
  };

  // Move Slider Right
  const slideRight = () => {
    setActiveIndex((prev) => (prev === contributors.length - 1 ? 0 : prev + 1));
  };

  return (
    <Layout title="UrbanCarts - About">
      <div className="about-page">
        {/* Our Story Section */}
        <div className="our-story">
          <img src={storyImg} alt="UrbanCarts Story" className="story-img" />
          <div className="story">
            <h2 className="story-heading">Our Story</h2>
            <p>
              UrbanCarts was founded with a simple yet powerful mission: to make shopping effortless, affordable, and accessible for
              everyone. What started as a small idea among a passionate team quickly grew into a thriving marketplace that connects 
              customers with top-quality products at unbeatable prices.
            </p>
            <p>
              Our journey began with a commitment to **quality, convenience, and customer satisfaction**. From carefully curating our 
              product selections to ensuring smooth and secure transactions, we believe in creating a seamless shopping experience.
            </p>
            <p>
              As we continue to grow, we stay true to our core values of **integrity, innovation, and excellence**. We are proud to be a 
              brand that puts customers first and constantly adapts to meet their evolving needs. With a dedicated team and an ever-expanding 
              catalog, UrbanCarts is shaping the future of online shopping—one happy customer at a time.
            </p>
          </div>
        </div>

        {/* Full Width Stats Section */}
        <div className="full-width">
          <Stats />
        </div>

        {/* Full Width Contributors Section (Simple Slider) */}
        <div className="full-width contributors">
          <button className="slider-btn left-btn" onClick={slideLeft}>
            <FiChevronLeft size={24} />
          </button>

          <div className="contributors-slider">
            <Contributor name={contributors[activeIndex].name} role={contributors[activeIndex].role} />
          </div>

          <button className="slider-btn right-btn" onClick={slideRight}>
            <FiChevronRight size={24} />
          </button>
        </div>

        {/* Full Width Services Section */}
        <div className="full-width">
          <Services />
        </div>
      </div>
    </Layout>
  );
};

export default About;

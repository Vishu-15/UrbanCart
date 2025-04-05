import React, { useState, useEffect } from 'react';
import './HomeSubLayout.css';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const HomeSubLayout = ({ prodCount, heading, children }) => {
    const [slideCount, setSlideCount] = useState(0);
    const [visibleItems, setVisibleItems] = useState(4); // Default for large screens

    // Adjust visible items based on screen width
    useEffect(() => {
        const updateVisibleItems = () => {
            if (window.innerWidth < 480) {
                setVisibleItems(1); // Show 1 product per scroll
            } else if (window.innerWidth < 768) {
                setVisibleItems(2); // Show 2 products per scroll
            } else if (window.innerWidth < 1024) {
                setVisibleItems(3); // Show 3 products per scroll
            } else {
                setVisibleItems(4); // Show 4 products per scroll
            }
        };

        updateVisibleItems(); // Call on initial render
        window.addEventListener('resize', updateVisibleItems);

        return () => window.removeEventListener('resize', updateVisibleItems);
    }, []);

    // Maximum slides that can be moved
    const maxSlide = -(prodCount - visibleItems);

    const handleSlider = (inc) => {
        setSlideCount((prevCount) => {
            const newCount = prevCount + inc;
            if (newCount > 0 || newCount < maxSlide) return prevCount; // Prevent out-of-bounds movement
            return newCount;
        });
    };

    return (
        <div className="homesub-container">
            {/* Heading */}
            <div className="homesub-heading">{heading}</div>

            {/* Content Slider */}
            <div className="homesub-content">
                <div
                    className="homesub-content-slider"
                    style={{ transform: `translateX(${slideCount * (100 / visibleItems)}%)` }}
                >
                    {children}
                </div>
            </div>

            {/* Slider Controls */}
            <div className="sliders">
                <button
                    className="left-slide"
                    onClick={() => handleSlider(1)}
                    disabled={slideCount === 0}
                >
                    <ArrowBackIcon />
                </button>
                <button
                    className="right-slide"
                    onClick={() => handleSlider(-1)}
                    disabled={slideCount === maxSlide}
                >
                    <ArrowForwardIcon />
                </button>
            </div>
        </div>
    );
};

export default HomeSubLayout;

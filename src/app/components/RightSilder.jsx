import React, { Component } from "react";
import Swipe from "react-easy-swipe";

const CarouselData = [
  {
    image: "/svg/login/swiperlogin1.svg",
  },
  {
    image: "/svg/login/swiperlogin2.svg",
  },
  {
    image: "/svg/login/swiperlogin1.svg",
  },
];

class RightSilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0,
      paused: false,
    };
  }

  componentDidMount() {
    setInterval(() => {
      if (this.state.paused === false) {
        let newSlide =
          this.state.currentSlide === CarouselData.length - 1
            ? 0
            : this.state.currentSlide + 1;
        this.setState({ currentSlide: newSlide });
      }
    }, 5000);
  }

  nextSlide = () => {
    let newSlide =
      this.state.currentSlide === CarouselData.length - 1
        ? 0
        : this.state.currentSlide + 1;
    this.setState({ currentSlide: newSlide });
  };

  prevSlide = () => {
    let newSlide =
      this.state.currentSlide === 0
        ? CarouselData.length - 1
        : this.state.currentSlide - 1;
    this.setState({ currentSlide: newSlide });
  };

  setCurrentSlide = (index) => {
    this.setState({ currentSlide: index });
  };

  render() {
    return (
      <div className="w-1/2 h-[100vh] fixed">
        <div className="h-full w-full max-sm:px-0 max-md:h-auto overflow-hidden relative">
          <Swipe onSwipeLeft={this.nextSlide} onSwipeRight={this.prevSlide}>
            {CarouselData.map((slide, index) => {
              return (
                <img
                  src={slide.image}
                  alt="Slide 1"
                  className={`w-full
                    ${
                      index === this.state.currentSlide
                        ? "w-fit h-full !object-contain opacity-100 transition-all"
                        : "hidden"
                    }
                  `}
                  onMouseEnter={() => {
                    this.setState({ paused: true });
                  }}
                  onMouseLeave={() => {
                    this.setState({ paused: false });
                  }}
                />
              );
            })}
          </Swipe>
          <div className="absolute w-full flex justify-center bottom-0">
            {CarouselData.map((element, index) => {
              return (
                <div
                  aria-label="next"
                  className={
                    index === this.state.currentSlide
                      ? "h-4 w-12 transition-all  shadow-2xl backdrop-blur-2xl bg-dark-blue rounded-full mx-2 mb-2 cursor-pointer"
                      : "h-4 w-4 bg-dark-gray backdrop-blur-3xl rounded-full mx-2 mb-2 cursor-pointer"
                  }
                  key={index}
                  onClick={() => {
                    this.setCurrentSlide(index);
                  }}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default RightSilder;

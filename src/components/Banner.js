import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Banner() {
  return (
    <div className="relative">
        <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
            <img loading="lazy" src="https://media.hearstapps.com/vader-prod.s3.amazonaws.com/1633619877-Screen_Shot_2021-10-07_at_11.17.38_AM.png" alt="" />
        </div>
        <div>
        <img loading="lazy" src="https://links.papareact.com/6ff" alt="" />
        </div>
        <div>
        <img loading="lazy" src="https://links.papareact.com/7ma" alt="" />
        </div>
      </Carousel>
    </div>
  )
}

export default Banner

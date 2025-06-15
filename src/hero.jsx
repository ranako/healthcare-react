import { FaArrowRightLong } from "react-icons/fa6";
import heroimage from "./assets/image2.png";
import face1 from "./assets/face1.png";
import face2 from "./assets/face2.png";
import face3 from "./assets/face3.png";
import face4 from "./assets/face4.png";
import "./hero.css";

function Hero() {

    return (
        <div className="hero-container">
            <div className="left">
                <div className="left-text">
                <div className="box-heading"><p>AI POWERED HEALTHCARE</p></div>
                <div className="sub_heading"><p>Personalized Care Beyond <br /> The prescription</p></div>
                <div className="para"><p>Our AI-powered healthcare assistant helps you go beyond justtaking edicines. Upload your prescriptiom amd get personalixed medication schedules ,food recommendations ,and recovery tips - all designed to make your treatment smarter ,safer, easier </p></div>
                <div className="button">Explore More <FaArrowRightLong className="arrow" /> </div>
            </div>
            <div className="testmonials">
                <div className="images">
                    <img src={face1} className="circles first"/>
                    <img src={face2} className="circles second"/>
                    <img src={face3} className="circles third"/>
                    <img src={face4} className="circles fourth"/>
                </div>
                <p className="testimonials-text"><span className="bold">Trusted by hundreads</span> for <br />making their recovery <span className="less-bold">simple and stress-free</span></p>
            </div>
            </div>
            <div className="right">
                <div className="about">
                    <div className="firstabout"> <p className="about-text">Tailored reminders & food guides <br /> based on your prescription</p></div>
                    <div className="secondabout"><p className="about-text">Instant answers to your medication,<br /> diet, and recovery questions.</p></div>
                </div>
                <div className="robot-image">
                    <img src={heroimage} alt="" />
                </div>
            </div>
        </div>
    );
}
export default Hero;
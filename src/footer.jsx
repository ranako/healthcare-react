import './footer.css';
import shortimage from './assets/image2.png';

function Footer() {
    return (
        <div className="footer">
            <div className="top">
                <div className="footer-text">
                    <h1>Empowering Healthcare With <br />Cutting-Edge AI Solutions</h1>
                    <p>We provide personalizd reports, intelligent recommendations,<br />and reliable healthcare insights for a heathier future </p>
                </div>
                <div className="top-image">
                    <img src={shortimage} alt="robot" />
                </div>
            </div>
            <div className="bottom">
                <div className="bottom-container">
                    <div className="box">
                        <ul>
                             <h3>Quick Links</h3>
                            <li>Home</li>
                            <li>About Us</li>
                            <li>Pricing</li>
                        </ul>
                    </div>
                    <div className="box">
                        <h3>Socials</h3>
                        <ul>
                            <li><a href="https://www.instagram.com/neuvohaus/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                            <li><a href="https://github.com/Neuvo-House/Healthcare_ai" target="_blank" rel="noopener noreferrer">Github</a></li>
                            <li><a href="https://www.linkedin.com/company/neuvohaus/about/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                        </ul>
                    </div>
                    <div className="box">
                        <h3> Legals</h3>
                        <ul>
                            <li>Privacy Policy</li>
                            <li>Terms Of Services</li>
                            <li>Cookie Policy</li>
                        </ul>

                    </div>

                </div>
            </div>

        </div>
    );
}
export default Footer;
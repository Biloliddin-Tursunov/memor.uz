import { useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import Center_strip from "../assets/patterns/center_strip.svg";
import "../styles/components/links.css";

export default function Links() {
    const navigate = useNavigate();

    const items = [
        {
            href: "/knowledge",
            title: "KNOWLEDGE",
            text: (
                <ul>
                    <li>Articles</li>
                    <li>Videos</li>
                    <li>Books</li>
                    <li>Courses</li>
                </ul>
            ),
        },
        {
            href: "/action",
            title: "ACTION",
            text: (
                <ul>
                    <li>Events</li>
                    <li>Architects</li>
                    <li>Projects</li>
                    <li>Store</li>
                </ul>
            ),
        },
        {
            href: "/creation",
            title: "CREATION",
            text: (
                <ul>
                    <li>Design</li>
                    <li>Artworks</li>
                    <li>Ornaments</li>
                </ul>
            ),
        },
    ];

    return (
        <section id="links" className="links">
            <h2 className="links__heading">What We Do</h2>

            <div className="links__cards">
                {items.map(({ href, title, text }) => (
                    <div key={href} className="links__card">
                        <h3 className="links__card-title">{title}</h3>
                        <div className="links__card-text">{text}</div>
                        <button
                            className="links__cta-btn"
                            onClick={() => navigate(href)}>
                            See More{" "}
                            <FaLongArrowAltRight className="links__cta-icon" />
                        </button>
                    </div>
                ))}
            </div>

            <div className="links__strip">
                <img src={Center_strip} alt="" aria-hidden="true" />
            </div>
        </section>
    );
}

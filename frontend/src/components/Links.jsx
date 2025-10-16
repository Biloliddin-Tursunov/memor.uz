import { useNavigate } from "react-router-dom";
import Center_strip from "../assets/patterns/center_strip.svg";
import "../styles/components/links.css";
import { useTranslation } from "react-i18next";

export default function Links() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const items = [
        {
            href: "/knowledge",
            title: t("KNOWLEDGE"),
            text: (
                <ul>
                    <li>{t("Articles")}</li>
                    <li>{t("Videos")}</li>
                    <li>{t("Books")}</li>
                    <li>{t("Courses")}</li>
                </ul>
            ),
        },
        {
            href: "/action",
            title: t("ACTION"),
            text: (
                <ul>
                    <li>{t("Events")}</li>
                    <li>{t("Artists")}</li>
                    <li>{t("Projects")}</li>
                    <li>{t("Store")}</li>
                </ul>
            ),
        },
        {
            href: "/creation",
            title: t("CREATION"),
            text: (
                <ul>
                    <li>{t("Design")}</li>
                    <li>{t("Artworks")}</li>
                    <li>{t("Ornaments")}</li>
                </ul>
            ),
        },
    ];

    return (
        <section id="links" className="links">
            <h2 className="links__heading">{t("Explore")}</h2>

            <div className="links__cards">
                {items.map(({ href, title, text }) => (
                    <div
                        key={href}
                        className="links__card"
                        onClick={() => navigate(href)}>
                        <h3 className="links__card-title">{title}</h3>
                        <div className="links__card-text">{text}</div>
                    </div>
                ))}
            </div>

            <div className="links__strip">
                <img src={Center_strip} alt="" aria-hidden="true" />
            </div>
        </section>
    );
}

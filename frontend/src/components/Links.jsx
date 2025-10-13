import { useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import Down_arrow from "../assets/icons/down_arrow.svg";
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
                    <li>O‘zbek me’morchiligining ildizlarini tahlil qilish;</li>
                    <li>
                        Naqsh, bezak va suzani elementlarini raqamlashtirish;
                    </li>
                    <li>
                        Tarixiy shakllar va zamonaviy dizayn o‘rtasida muloqot
                        yaratish.
                    </li>
                </ul>
            ),
        },
        {
            href: "/action",
            title: "ACTION",
            text: (
                <ul>
                    <li>
                        Arxitektura, landshaft va san’at loyihalarini amalda
                        sinash;
                    </li>
                    <li>
                        3D model, maket va interaktiv media yordamida ifoda
                        qilish;
                    </li>
                    <li>
                        Talabalar va mutaxassislar uchun amaliy tajriba maydoni
                        yaratish.
                    </li>
                </ul>
            ),
        },
        {
            href: "/creation",
            title: "CREATION",
            text: (
                <ul>
                    <li>
                        Ilm va amaliyotni birlashtirib yangi shakllar yaratish;
                    </li>
                    <li>Milliy uslubni global kontekstda talqin etish;</li>
                    <li>
                        Yosh dizayner va me’morlar uchun ijodiy hamkorlik
                        muhitini kengaytirish.
                    </li>
                </ul>
            ),
        },
    ];

    return (
        <section id="links" className="links">
            <h2 className="links__heading">Biz nima qilamiz</h2>

            <div className="links__cards">
                {items.map(({ href, title, text }) => (
                    <div key={href} className="links__card">
                        <h3 className="links__card-title">{title}</h3>
                        <div className="links__card-text">{text}</div>
                        <button
                            className="links__cta-btn"
                            onClick={() => navigate(href)}>
                            ko‘proq ko‘rish{" "}
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

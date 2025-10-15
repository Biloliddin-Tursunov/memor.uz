// src/components/TeamSection.jsx
import Ornament from "../assets/patterns/members_section.svg";
import Biloliddin from "../assets/avatars/biloliddin.jpg";
import Otabek from "../assets/avatars/otabek.jpg";
import Aminaxon from "../assets/avatars/aminaxon.jpg";
import Bunyod from "../assets/avatars/Bunyod.png";

import "../styles/components/team_section.css";

export default function TeamSection() {
    const team = [
        { img: Otabek, name: "Otabek Isoev", role: "CEO" },
        {
            img: Biloliddin,
            name: "Biloliddin Tursunov",
            role: "Software Engineer",
        },
        { img: Bunyod, name: "Bunyod Akbaraliyev", role: "Designer" },
        {
            img: Aminaxon,
            name: "Aminaxon Yahyoxonova",
            role: "Creative Partner",
        },
    ];

    return (
        <section id="members" className="team">
            {/* Ornament layer */}
            <div className="team__ornament">
                <img src={Ornament} alt="" aria-hidden="true" />
            </div>

            {/* Content layer */}
            <div className="team__content">
                {/* title */}
                <div className="team__title-wrap">
                    <h2 className="team__title">
                        Dunyoni <br /> go‘zallashtirish uchun!
                    </h2>
                </div>

                {/* “JAMOAMIZ:” */}
                <div className="team__subtitle-wrap">
                    <p className="team__subtitle">Our Team:</p>
                </div>

                {/* team + side buttons */}
                <div className="team__grid-wrap">
                    <div className="team__grid">
                        {/* left round button */}
                        <button className="team__round-btn" title="Donat">
                            <span className="team__round-label">Join us!</span>
                        </button>

                        {/* members */}
                        {team.map(({ img, name, role }) => (
                            <div key={name} className="member">
                                <div className="member__photo">
                                    <img src={img} alt={name} />
                                </div>
                                <div className="member__meta">
                                    <p className="member__name">{name}</p>
                                    <p className="member__role">{role}</p>
                                </div>
                            </div>
                        ))}

                        {/* right round button */}
                        <button className="team__round-btn" title="Qo‘shilish">
                            <span className="team__round-label">Support?</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

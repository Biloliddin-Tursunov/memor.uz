import { FaTelegram, FaLinkedin, FaInstagram, FaGlobe } from "react-icons/fa";

const MEMBERS = [
  {
    name: "Biloliddin Tursunov",
    email: "biloliddin@memor.uz",
    avatar: "/avatars/biloliddin.jpg",
    links: {
      tg: "https://t.me/biloliddintursunov",
      in: "https://www.linkedin.com/in/biloliddintursunov/",
      ig: "https://www.instagram.com/biloliddin.tursunov/",
    },
  },
  {
    name: "Otabek Isoyev",
    email: "otabek@memor.uz",
    avatar: "/avatars/otabek.jpg",
    links: {
      tg: "https://t.me/o_isaeff",
      in: "https://www.linkedin.com/in/isoev/",
      ig: "https://www.instagram.com/memor.uz_/",
    },
  },
  {
    name: "Aminaxon Yahyoxonova",
    email: "aminaxon@memor.uz",
    avatar: "/avatars/aminaxon.jpg",
    links: {
      tg: "https://t.me/+lEnZi8bWOpBkYzNi",
      in: "https://linkedin.com",
      ig: "https://www.instagram.com/yaminam_357/",
    },
  },
];

export default function App() {
  return (
    <div className="page">
      {/* burchak naqshlar */}
      <img src="/patterns/top_left.svg" alt="" className="ptr top-left" />
      <img
        src="/patterns/bottom_right.svg"
        alt=""
        className="ptr bottom-right"
      />

      {/* hero */}
      <div className="center">
        <img src="/logos/logo_black.png" alt="Me'mor" className="logo" />
        <h1 className="brand">Me'mor</h1>
        <p className="subtitle">Assistant for Artists</p>

        {/* ijtimoiy tarmoqlar faqat ikonlar */}
        <div className="socials">
          <a
            href="https://t.me/"
            aria-label="Telegram"
            target="_blank"
            rel="noreferrer"
          >
            <FaTelegram />
          </a>
          <a
            href="https://linkedin.com/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://instagram.com/"
            aria-label="Instagram"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram />
          </a>
        </div>

        {/* A’zolar CTA — alohida, katta, pastga yumshoq scroll */}
        <a href="#members" className="members-cta">
          A’zolarni ko‘rish ↓
        </a>
      </div>

      {/* MEMBERS */}
      <section id="members" className="members">
        {/* <h2 className="members-title">A’zolar</h2> */}
        <div className="grid">
          {MEMBERS.map((m, i) => (
            <article key={i} className="card">
              <img className="avatar" src={m.avatar} alt={m.name} />
              <div className="card-body">
                <h3 className="name">{m.name}</h3>
                <a className="email" href={`mailto:${m.email}`}>
                  {m.email}
                </a>
                <div className="mini-socials">
                  <a
                    href={m.links.in}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href={m.links.tg}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Telegram"
                  >
                    <FaTelegram />
                  </a>
                  <a
                    href={m.links.ig}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

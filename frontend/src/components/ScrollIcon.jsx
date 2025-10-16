import Down_arrow from "../assets/icons/down_arrow.svg";

export default function ScrollIcon({ target }) {
    return (
        <a
            href={target}
            className="w-[75px] absolute bottom-10 animate-bounce text-gray-300 hover:text-white">
            <img src={Down_arrow} alt="down arrow" />
        </a>
    );
}

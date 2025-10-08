export default function ScrollIcon({ target }) {
    return (
        <a
            href={target}
            className="absolute bottom-10 animate-bounce text-gray-300 hover:text-white"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-chevron-down"
                viewBox="0 0 16 16"
            >
                <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
            </svg>
        </a>
    );
}

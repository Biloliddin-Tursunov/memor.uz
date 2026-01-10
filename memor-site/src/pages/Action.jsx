// src/pages/Action.jsx
import ComingSoon from "../components/home/ComingSoon";
import { useTranslation } from "react-i18next";

export default function Action() {
    const { t } = useTranslation();
    return <ComingSoon title={t("ComingSoon")} />;
}

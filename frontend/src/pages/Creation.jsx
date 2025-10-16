// src/pages/Action.jsx
import ComingSoon from "../components/ComingSoon";
import { useTranslation } from "react-i18next";

export default function Creation() {
    const { t } = useTranslation();
    return <ComingSoon title={t("ComingSoon")} />;
}

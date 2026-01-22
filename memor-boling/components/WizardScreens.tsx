import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Step Components
import IntroStep from "../components/steps/IntroStep";
import ChatStep from "../components/steps/ChatStep";
import StageSelectStep from "../components/steps/StageSelectStep";
import LocationStep from "../components/steps/LocationStep";
import DetailsStep from "../components/steps/DetailsStep"; // New component
import StyleStep from "../components/steps/StyleStep";
import RequirementsStep from "../components/steps/RequirementsStep";
import ResultsStep from "../components/steps/ResultsStep";

import { AppStep, HouseSpecs, ProjectType } from "../types";

const WizardPage: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<AppStep>(AppStep.INTRO);
    const [mode, setMode] = useState<"ai" | "manual">("manual");
    const [projectType, setProjectType] = useState<ProjectType>(null);
    const [initialPrompt, setInitialPrompt] = useState<string>("");

    const [houseData, setHouseData] = useState<HouseSpecs>({
        rooms: "",
        floors: "",
        price: "",
        extra: "",
        area: "",
    });

    // Start Chat
    const handleStartChat = (message: string) => {
        setMode("ai");
        setInitialPrompt(message);
        setStep(AppStep.CHAT);
    };

    // Start Manual Flow
    const handleStartManual = () => {
        setMode("manual");
        setStep(AppStep.STAGE_SELECT);
    };

    // Handle Stage Selection (The Fork in the Road)
    const handleStageSelect = (type: string) => {
        setProjectType(type as ProjectType);

        if (type === "land") {
            setStep(AppStep.LOCATION_SELECT);
        } else if (type === "house" || type === "interior") {
            setStep(AppStep.DETAILS_INPUT); // Upload plan or enter size
        } else if (type === "idea") {
            setStep(AppStep.STYLE_SELECT); // Skip to style
        }
    };

    // Smart Back Navigation based on History/Type
    const goBack = () => {
        if (step === AppStep.INTRO) {
            navigate("/");
            return;
        }
        if (mode === "ai") {
            setStep(AppStep.INTRO);
            return;
        }

        switch (step) {
            case AppStep.STAGE_SELECT:
                setStep(AppStep.INTRO);
                break;

            case AppStep.LOCATION_SELECT:
                setStep(AppStep.STAGE_SELECT);
                break;

            case AppStep.DETAILS_INPUT:
                setStep(AppStep.STAGE_SELECT);
                break;

            case AppStep.STYLE_SELECT:
                if (projectType === "land") setStep(AppStep.LOCATION_SELECT);
                else if (projectType === "idea") setStep(AppStep.STAGE_SELECT);
                else setStep(AppStep.DETAILS_INPUT);
                break;

            case AppStep.REQUIREMENTS:
                setStep(AppStep.STYLE_SELECT);
                break;

            case AppStep.DESIGN_PROPOSALS:
                setStep(AppStep.REQUIREMENTS);
                break;

            default:
                setStep(AppStep.INTRO);
        }
    };

    // Render correct component based on state
    const renderStep = () => {
        switch (step) {
            case AppStep.INTRO:
                return (
                    <IntroStep
                        onStartChat={handleStartChat}
                        onStartManual={handleStartManual}
                    />
                );
            case AppStep.CHAT:
                return (
                    <ChatStep
                        initialMessage={initialPrompt}
                        onNext={() => setStep(AppStep.STAGE_SELECT)}
                    />
                );
            case AppStep.STAGE_SELECT:
                return <StageSelectStep onNext={handleStageSelect} />;

            // Branch: Land
            case AppStep.LOCATION_SELECT:
                return (
                    <LocationStep
                        onNext={() => setStep(AppStep.STYLE_SELECT)}
                    />
                );

            // Branch: House/Interior
            case AppStep.DETAILS_INPUT:
                return (
                    <DetailsStep
                        type={projectType}
                        onNext={() => setStep(AppStep.STYLE_SELECT)}
                    />
                );

            case AppStep.STYLE_SELECT:
                return (
                    <StyleStep onNext={() => setStep(AppStep.REQUIREMENTS)} />
                );

            case AppStep.REQUIREMENTS:
                return (
                    <RequirementsStep
                        type={projectType}
                        data={houseData}
                        setData={setHouseData}
                        onNext={() => setStep(AppStep.DESIGN_PROPOSALS)}
                    />
                );

            case AppStep.DESIGN_PROPOSALS:
                return <ResultsStep onFinish={() => navigate("/")} />;

            default:
                return <div>Unknown Step</div>;
        }
    };

    const isIntro = step === AppStep.INTRO;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col overflow-hidden relative">
            {!isIntro && (
                <div className="h-14 shrink-0 border-b border-slate-100 flex items-center px-4 md:px-6 justify-between bg-white z-20">
                    <button
                        onClick={goBack}
                        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-xs md:text-sm font-bold uppercase tracking-wide">
                        <ArrowLeft size={16} />
                        Orqaga
                    </button>

                    <div className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                        {mode === "ai"
                            ? "AI ASSISTANT"
                            : step.replace("_", " ")}
                    </div>
                </div>
            )}

            <div
                className={`flex-1 overflow-y-auto ${isIntro ? "p-0" : "p-4 md:p-8"}`}>
                <div className="max-w-5xl mx-auto h-full fade-in">
                    {renderStep()}
                </div>
            </div>
        </div>
    );
};

export default WizardPage;

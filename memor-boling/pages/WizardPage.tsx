import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic } from 'lucide-react';

// Step Components
import IntroStep from '../components/steps/IntroStep';
import ChatStep from '../components/steps/ChatStep';
import StageSelectStep from '../components/steps/StageSelectStep';
import LocationStep from '../components/steps/LocationStep';
import StyleStep from '../components/steps/StyleStep';
import RequirementsStep from '../components/steps/RequirementsStep';
import ResultsStep from '../components/steps/ResultsStep';

import { AppStep, HouseSpecs } from '../types';

const WizardPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<AppStep>(AppStep.INTRO);
  const [mode, setMode] = useState<'ai' | 'manual'>('manual'); // 'ai' = ChatBot, 'manual' = Custom Form
  const [houseData, setHouseData] = useState<HouseSpecs>({
    rooms: '', floors: '', price: '', extra: ''
  });

  // Handle Flow Transitions
  const handleStartBot = () => {
    setMode('ai');
    setStep(AppStep.CHAT);
  };

  const handleStartManual = () => {
    setMode('manual');
    setStep(AppStep.STAGE_SELECT);
  };

  const goBack = () => {
    if (step === AppStep.INTRO) {
        navigate('/');
        return;
    }

    if (mode === 'ai') {
        setStep(AppStep.INTRO);
        return;
    }

    // Manual Flow Back Logic
    switch (step) {
      case AppStep.STAGE_SELECT: setStep(AppStep.INTRO); break;
      case AppStep.LOCATION_SELECT: setStep(AppStep.STAGE_SELECT); break;
      case AppStep.STYLE_SELECT: setStep(AppStep.LOCATION_SELECT); break;
      case AppStep.REQUIREMENTS: setStep(AppStep.STYLE_SELECT); break;
      case AppStep.DESIGN_PROPOSALS: setStep(AppStep.REQUIREMENTS); break;
      case AppStep.PLAN_PROPOSALS: setStep(AppStep.DESIGN_PROPOSALS); break;
      default: setStep(AppStep.INTRO);
    }
  };

  const renderStep = () => {
    switch (step) {
      case AppStep.INTRO:
        return <IntroStep onSelectBot={handleStartBot} onSelectManual={handleStartManual} />;
      case AppStep.CHAT:
        return <ChatStep onNext={() => {}} />; // Chat stays in chat
      case AppStep.STAGE_SELECT:
        return <StageSelectStep onNext={() => setStep(AppStep.LOCATION_SELECT)} />;
      case AppStep.LOCATION_SELECT:
        return <LocationStep onNext={() => setStep(AppStep.STYLE_SELECT)} />;
      case AppStep.STYLE_SELECT:
        return <StyleStep onNext={() => setStep(AppStep.REQUIREMENTS)} />;
      case AppStep.REQUIREMENTS:
        return <RequirementsStep data={houseData} setData={setHouseData} onNext={() => setStep(AppStep.DESIGN_PROPOSALS)} />;
      case AppStep.DESIGN_PROPOSALS:
        return <ResultsStep mode="design" onNext={() => setStep(AppStep.PLAN_PROPOSALS)} />;
      case AppStep.PLAN_PROPOSALS:
        return <ResultsStep mode="plan" onNext={() => navigate('/')} />;
      default:
        return <div>Unknown Step</div>;
    }
  };

  const isIntro = step === AppStep.INTRO;
  const isChat = step === AppStep.CHAT;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col overflow-hidden relative">
      
      {/* Navigation Bar - Hidden on Intro */}
      {!isIntro && (
        <div className="h-14 shrink-0 border-b border-slate-100 flex items-center px-4 md:px-6 justify-between bg-white z-20">
            <button 
            onClick={goBack}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-xs md:text-sm font-bold uppercase tracking-wide"
            >
            <ArrowLeft size={16} />
            Orqaga
            </button>
            
            <div className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
            {mode === 'ai' ? 'AI ASSISTANT' : step.replace('_', ' ')}
            </div>
        </div>
      )}

      {/* Step Content Area - Scrollable */}
      <div className={`flex-1 overflow-y-auto ${isIntro ? 'p-0' : 'p-4 md:p-8'}`}>
        <div className="max-w-5xl mx-auto h-full fade-in">
          {renderStep()}
        </div>
      </div>

      {/* Global Input (Only shown in Intro and Manual Mode if needed, but per request input is specific to Intro or Chat) */}
      {/* Keeping distinct input logic inside IntroStep for the landing look */}
    </div>
  );
};

export default WizardPage;
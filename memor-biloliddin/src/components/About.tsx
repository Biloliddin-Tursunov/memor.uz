import React from 'react';
import { personalInfo } from '../data/localDb';

const About: React.FC = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
                <h2 className="font-serif text-3xl text-deep-teal mb-6">Manifest</h2>
                <div className="w-12 h-1 bg-sepia mb-6"></div>
                <p className="font-sans text-sm text-graphite/60 uppercase tracking-widest leading-loose">
                    Talaba.<br/>Tadqiqotchi.<br/>Me'mor.
                </p>
            </div>
            
            <div className="md:col-span-8 prose prose-lg font-sans text-graphite/80">
                <p>
                    Men <span className="font-bold text-deep-teal">{personalInfo.name}</span>, Farg'ona viloyatida tug'ilganman. 
                    Hozirda Samarqand Davlat Arxitektura-Qurilish Universitetida shaharsozlik yo'nalishida tahsil olmoqdaman.
                </p>
                <p>
                    Men <strong>Me'mor</strong> loyihasi a'zosiman.
                </p>
                <div className="py-6 my-6 border-l-4 border-sepia pl-6 bg-parchment/50 italic font-serif text-xl text-deep-teal">
                    "Men doim bitta savolga javob izlayman: Nega?"
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;
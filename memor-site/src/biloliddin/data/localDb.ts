import { Project, BlogPost } from '../types';

export const personalInfo = {
  name: "Biloliddin",
  role: "Talaba & Me'mor",
  subRole: "Tadqiqotchi",
  bio: "Men bir yosh ilm talabida yurgan inson, Samarqand davlat arxitektura qurilishi universitetida shaharsozlik yo'nalishida o'qiyman. Me'mor (memor.uz) talabalar harakati a'zosiman.",
  image: "https://memor.uz/people/biloliddin.jpg",
  email: "biloliddin@memor.uz",
  phone: "+998 (88) 209-99-79",
  location: "Samarqand",
  socials: {
    instagram: "https://www.instagram.com/biloliddin.tursunov/",
    linkedin: "https://www.linkedin.com/in/biloliddintursunov/",
    telegram: "https://t.me/biloliddintursunov"
  }
};

export const blogPosts: BlogPost[] = [];

export const projects: Project[] = [
  {
    id: 1,
    title: "Me'mor",
    category: "Coding",
    description: "Me'mor talabalar harakati platformasi. O'zbekiston arxitekturasi va shaharsozligini rivojlantirishga qaratilgan loyiha.",
    imageUrl: "https://memor.uz/favicon-light.svg",
    visible: true,
    year: "2025"
  }
];
import { createRef } from "react";
import { Vector3 } from "three";

const state = {
  sections: 9,
  pages: 8,
  zoom: 75,
  paragraphs: [
    {
      offset: 1,
      factor: 1.75,
      header: "Cyber & Cloud Website",
      image: "/cyber.png",
      aspect: 1.51,
      text: "I participated in a major event in Surabaya called 'Expo Expose', where schools from across East Java gathered to showcase their excellence. During this event, I contributed as afrontend developer by creating a website focused on cloud services and cybersecurity. My role involved designing and implementing a user-friendly interface that highlighted the event's innovative and competitive spirit.",
      link1: "https://github.com/DanishRach/LandingPage",
      link2: "https://landing-page-d88wro81x-danishrachs-projects.vercel.app/",
      
    },
    {
      offset: 2,
      factor: 2.0,
      header: "Gamer Website",
      image: "/game.png",
      aspect: 1.5,
      text: "This is a website designed for a gaming awards event, featuring **stunning animations and cutting-edge functionalities. I developed it as a way to enhance my skills, drawing inspiration and guidance from the YouTube channel 'JavaScript Mastery'. Through their tutorials, I gained valuable coding knowledge and applied it to create this project, showcasing my growth and passion for web development.",
      link1: "https://github.com/DanishRach/WebisteGamers",
      link2: "https://webiste-gamers.vercel.app/",
    },
    {
      offset: 3,
      factor: 2.25,
      header: "Game Space",
      image: "/space.jpg",
      aspect: 1.5037,
      text: "This is a personal project inspired by a Three.js example, where I attempted to recreate a space-themed game. The game features immersive sound effects, a shooting system, and fully 3D-designed assets. I used Three.js to bring the visual elements to life, showcasing my ability to work with 3D graphics and interactive features.",
      link1: "https://github.com/DanishRach/WebisteGamers",
      link2: "https://game-3d-danish.vercel.app/",
    },
    {
      offset: 4,
      factor: 2.85,
      header: "3D Car",
      image: "/car.png",
      aspect: 1.5037,
      text: "This is a personal project inspired by a Three.js example, where I attempted to recreate a space-themed game. The game features immersive sound effects, a shooting system, and fully 3D-designed assets. I used Three.js to bring the visual elements to life, showcasing my ability to work with 3D graphics and interactive features.",
      link1: "https://github.com/DanishRach/3Dcar",
      link2: "3d-car-two.vercel.app",
    },
  ],
  stripes: [
    { offset: 0, color: "#000", height: 13 },
    { offset: 6.3, color: "#000", height: 20 },
  ],
  diamonds: [
    { x: 0, offset: 0.15, pos: new Vector3(), scale: 14, factor: 4 },
    { x: 2, offset: 1.1, pos: new Vector3(), scale: 1.8, factor: 2.1 },
    { x: -5, offset: 2, pos: new Vector3(), scale: 1.8, factor: 2.5 },
    { x: 0, offset: 3.2, pos: new Vector3(), scale: 1.8, factor: 1.75 },
    { x: 0, offset: 4, pos: new Vector3(), scale: 1.8, factor: 2.5 },
    { x: 2, offset: 5.5, pos: new Vector3(), scale: 2.25, factor: 0.85 },
    { x: -5, offset: 7, pos: new Vector3(), scale: 1.8, factor: 2 },
    { x: 0, offset: 8, pos: new Vector3(), scale: 2.5, factor: 6 },
  ],
  top: createRef(),
};

export default state;

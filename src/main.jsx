import { createRoot } from "react-dom/client";
import React, { Suspense, useEffect, useRef, useMemo } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { TextureLoader, LinearFilter } from "three";
import lerp from "lerp";
import { Text, MultilineText } from "./components/Text";
import Diamonds from "./diamonds/Diamonds";
import Plane from "./components/Plane";
import { Block, useBlock } from "./blocks";
import state from "./store";
import "./styles.css";

function Navbar() {
  return (
    <nav
      style={{
        marginLeft: 10,
        marginTop: 20,
        padding: "1rem",
        color: "#fff",
        backgroundColor: "transparent",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 10,
      }}
    >
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        <li style={{ margin: "0 1rem" }}>
          <a
            href="https://danish-rach-porto.vercel.app/"
            target=""
            rel="noopener noreferrer"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Home
          </a>
        </li>
        <li style={{ margin: "0 1rem" }}>
          <a
            href="https://about-page-tawny.vercel.app/"
            target=""
            rel="noopener noreferrer"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            About
          </a>
        </li>
        <li style={{ margin: "0 1rem" }}>
          <a
            href="https://game-3d-danish.vercel.app/"
            target=""
            rel="noopener noreferrer"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Game
          </a>
        </li>
        <li style={{ margin: "0 1rem" }}>
          <a
            href="https://github.com/DanishRach"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Github
          </a>
        </li>
        <li style={{ margin: "0 1rem" }}>
          <a
            href="https://www.linkedin.com/in/danish-rachman?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Linkedin
          </a>
        </li>
      </ul>
    </nav>
  );
}

function Startup() {
  const ref = useRef();
  useFrame(
    () =>
      (ref.current.material.opacity = lerp(
        ref.current.material.opacity,
        0,
        0.025
      ))
  );
  return (
    <Plane
      ref={ref}
      color="#0e0e0f"
      position={[0, 0, 200]}
      scale={[100, 100, 1]}
    />
  );
}

function Paragraph({
  image,
  index,
  offset,
  factor,
  header,
  aspect,
  text,
  link1,
  link2,
}) {
  const { contentMaxWidth: w, canvasWidth, margin, mobile } = useBlock();
  const size = aspect < 1 && !mobile ? 0.65 : 1;
  const alignRight = (canvasWidth - w * size - margin) / 2;
  const pixelWidth = w * state.zoom * size;
  const left = !(index % 2);
  const color = index % 2 ? "#D40749" : "#2FE8C3";

  // Style untuk tombol
  const buttonStyle = {
    backgroundColor: "#2FE8C3",
    color: "#ffffff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "14px",
    cursor: "pointer",
    marginRight: "10px",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#23C4A3",
    transform: "scale(1.05)",
  };

  const buttonContainerStyle = {
    display: "flex",
    marginTop: "1rem",
    gap: "0.5rem",
  };

  return (
    <Block factor={factor} offset={offset}>
      <group position={[left ? -alignRight : alignRight, 0, 0]}>
        <Plane
          map={image}
          args={[1, 1, 32, 32]}
          shift={75}
          size={size}
          aspect={aspect}
          scale={[w * size, (w * size) / aspect, 1]}
          frustumCulled={false}
        />
        <Html
          style={{
            width: pixelWidth / (mobile ? 1 : 2),
            textAlign: left ? "left" : "right",
            pointerEvents: "auto", // Aktifkan pointer events
            zIndex: 10, // Pastikan elemen ini berada di atas
          }}
          position={[
            left || mobile ? (-w * size) / 2 : 0,
            (-w * size) / 2 / aspect - 0.4,
            1,
          ]}
        >
          <div tabIndex={index}>
            {text}
            <div style={buttonContainerStyle}>
              <button
                style={buttonStyle}
                onMouseOver={(e) =>
                  Object.assign(e.target.style, buttonHoverStyle)
                }
                onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
                onClick={() => window.open(link1, "_blank")}
              >
                Github
              </button>
              <button
                style={buttonStyle}
                onMouseOver={(e) =>
                  Object.assign(e.target.style, buttonHoverStyle)
                }
                onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
                onClick={() => window.open(link2, "_blank")}
              >
                View Website
              </button>
            </div>
          </div>
        </Html>
        <Text
          left={left}
          right={!left}
          size={w * 0.04}
          color={color}
          top
          position={[
            ((left ? -w : w) * size) / 2,
            (w * size) / aspect / 2 + 0.5,
            -1,
          ]}
        >
          {header}
        </Text>
        <Block factor={0.2}>
          <Text
            opacity={0.5}
            size={w * 0.5}
            color="#5D6166"
            position={[
              ((left ? w : -w) / 2) * size,
              (w * size) / aspect / 1,
              -10,
            ]}
          >
            {"0" + (index + 1)}
          </Text>
        </Block>
      </group>
    </Block>
  );
}

function Content() {
  const images = useLoader(
    TextureLoader,
    state.paragraphs.map(({ image }) => image)
  );
  useMemo(
    () => images.forEach((texture) => (texture.minFilter = LinearFilter)),
    [images]
  );

  const { contentMaxWidth: w } = useBlock();
  return (
    <>
      <Block factor={1} offset={0}>
        <Block factor={1.2}>
          <Text
            left
            size={w * 0.15}
            position={[-w / 2.2, 0.5, -1]}
            color="#d40749"
          >
            My Project
          </Text>
        </Block>
      </Block>
      {state.paragraphs.map((props, index) => (
        <Paragraph key={index} index={index} {...props} image={images[index]} />
      ))}
    </>
  );
}

function App() {
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);
  return (
    <>
      <Canvas
        linear
        dpr={[1, 2]}
        orthographic
        camera={{ zoom: state.zoom, position: [0, 0, 500] }}
      >
        <Suspense
          fallback={<Html center className="loading" children="Loading..." />}
        >
          <Content />
          <Diamonds />
          <Startup />
        </Suspense>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        {new Array(state.sections).fill().map((_, index) => (
          <div
            key={index}
            id={"0" + index}
            style={{ height: `${(state.pages / state.sections) * 100}vh` }}
          />
        ))}
      </div>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <>
    <Navbar />
    <App />
  </>
);

import React from 'react'

export default function Blobs({ splash = false }) {
  const op = splash ? 0.82 : 0.68
  return (
    <>
      <style>{`
        #blob-field { position:fixed; inset:0; pointer-events:none; z-index:0; overflow:hidden; }
        .blob { position:absolute; border-radius:50%; will-change:transform,filter; }

        @keyframes b1 {
          0%   { transform:translate(0,0) scale(1);       filter:blur(60px); }
          25%  { transform:translate(130px,90px) scale(1.12); filter:blur(80px); }
          50%  { transform:translate(-90px,170px) scale(.91); filter:blur(70px); }
          75%  { transform:translate(110px,-70px) scale(1.09); filter:blur(85px); }
          100% { transform:translate(0,0) scale(1);       filter:blur(60px); }
        }
        @keyframes b2 {
          0%   { transform:translate(0,0) scale(1);        filter:blur(65px); }
          30%  { transform:translate(-160px,70px) scale(1.14); filter:blur(85px); }
          60%  { transform:translate(100px,150px) scale(.89); filter:blur(70px); }
          85%  { transform:translate(-60px,-100px) scale(1.11); filter:blur(80px); }
          100% { transform:translate(0,0) scale(1);        filter:blur(65px); }
        }
        @keyframes b3 {
          0%   { transform:translate(0,0) scale(1);        filter:blur(70px); }
          20%  { transform:translate(120px,-140px) scale(1.13); filter:blur(90px); }
          55%  { transform:translate(-150px,100px) scale(.92); filter:blur(80px); }
          80%  { transform:translate(80px,80px) scale(1.08);   filter:blur(85px); }
          100% { transform:translate(0,0) scale(1);        filter:blur(70px); }
        }
        @keyframes b4 {
          0%   { transform:translate(0,0) scale(1);         filter:blur(62px); }
          35%  { transform:translate(-110px,-90px) scale(1.15); filter:blur(80px); }
          65%  { transform:translate(150px,120px) scale(.90); filter:blur(68px); }
          90%  { transform:translate(-80px,60px) scale(1.10);  filter:blur(75px); }
          100% { transform:translate(0,0) scale(1);         filter:blur(62px); }
        }
        @keyframes b5 {
          0%   { transform:translate(0,0) scale(1);          filter:blur(68px); }
          25%  { transform:translate(170px,-80px) scale(1.16); filter:blur(88px); }
          55%  { transform:translate(-120px,130px) scale(.88); filter:blur(75px); }
          80%  { transform:translate(90px,-50px) scale(1.12);  filter:blur(80px); }
          100% { transform:translate(0,0) scale(1);          filter:blur(68px); }
        }
        @keyframes b6 {
          0%   { transform:translate(0,0) scale(1);          filter:blur(55px); }
          40%  { transform:translate(-140px,100px) scale(1.17); filter:blur(75px); }
          70%  { transform:translate(110px,-150px) scale(.87); filter:blur(62px); }
          95%  { transform:translate(-80px,80px) scale(1.13);  filter:blur(68px); }
          100% { transform:translate(0,0) scale(1);          filter:blur(55px); }
        }
      `}</style>
      <div id="blob-field" aria-hidden="true">
        <div className="blob" style={{ width:'115vmax', height:'115vmax', left:'-22%', top:'-28%', background:'#a9c3e8', opacity:op, animation:'b1 8s ease-in-out infinite' }} />
        <div className="blob" style={{ width:'105vmax', height:'105vmax', left:'42%',  top:'8%',   background:'#e9bcc9', opacity:op*.92, animation:'b2 10s ease-in-out -3s infinite' }} />
        <div className="blob" style={{ width:'95vmax',  height:'95vmax',  left:'18%',  top:'44%',  background:'#b8d4a8', opacity:op*.88, animation:'b3 7s ease-in-out -5s infinite' }} />
        <div className="blob" style={{ width:'88vmax',  height:'88vmax',  left:'62%',  top:'52%',  background:'#a9c3e8', opacity:op*.80, animation:'b4 12s ease-in-out -8s infinite' }} />
        <div className="blob" style={{ width:'100vmax', height:'100vmax', left:'-12%', top:'48%',  background:'#e9bcc9', opacity:op*.85, animation:'b5 9s ease-in-out -14s infinite' }} />
        <div className="blob" style={{ width:'82vmax',  height:'82vmax',  left:'48%',  top:'-18%', background:'#e8d88a', opacity:op*.78, animation:'b6 11s ease-in-out -6s infinite' }} />
      </div>
    </>
  )
}

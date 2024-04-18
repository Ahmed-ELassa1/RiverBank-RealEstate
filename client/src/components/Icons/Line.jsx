import React from "react";

const LineIcon = () => {
  return (
    <svg
      height="18"
      width="18"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <path
          d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
          id="A"
        ></path>
      </defs>
      <clipPath id="B"></clipPath>
      <g transform="matrix(.727273 0 0 .727273 -.954545 -1.45455)">
        <path fill="#fbbc05" clipPath="url(#B)" d="M0 37V11l17 13z"></path>
        <path
          fill="#ea4335"
          clipPath="url(#B)"
          d="M0 11l17 13 7-6.1L48 14V0H0z"
        ></path>
        <path
          fill="#34a853"
          clipPath="url(#B)"
          d="M0 37l30-23 7.9 1L48 0v48H0z"
        ></path>
        <path
          fill="#4285f4"
          clipPath="url(#B)"
          d="M48 48L17 24l-4-3 35-10z"
        ></path>
      </g>
    </svg>
  );
};

export default LineIcon;

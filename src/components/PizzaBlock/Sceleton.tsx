import React from 'react';
import ContentLoader from 'react-content-loader';

const Sceleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="137" cy="131" r="130" />
    <rect x="1" y="270" rx="10" ry="10" width="275" height="27" />
    <rect x="1" y="312" rx="10" ry="10" width="275" height="87" />
    <rect x="5" y="425" rx="10" ry="10" width="90" height="27" />
    <rect x="123" y="418" rx="22" ry="22" width="152" height="44" />
  </ContentLoader>
);

export default Sceleton;

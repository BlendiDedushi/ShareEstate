import React from 'react';

const countries = [
  { name: 'Country 1', image: '/images/case-logo.svg' },
  { name: 'Country 2', image: '/images/case-logo.svg' },
  { name: 'Country 3', image: '/images/case-logo.svg' },
  { name: 'Country 4', image: '/images/case-logo.svg' },
  { name: 'Country 5', image: '/images/case-logo.svg' },
  { name: 'Country 6', image: '/images/case-logo.svg' },
  { name: 'Country 7', image: '/images/case-logo.svg' },
  // Add more countries here...
];

const CountryCard = ({ name, image }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={image} alt={name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
      </div>
    </div>
  );
};

export const CountryList = () => {
  return (
    <div className="flex flex-wrap">
      {countries.map((country, index) => (
        <CountryCard key={index} name={country.name} image={country.image} />
      ))}
    </div>
  );
};
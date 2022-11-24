// Code snippet for albm art component to be filtered and modified for later

import React, { useEffect } from 'react';
import CarComponent from './components/CarComponent';
// Importing our theme provider which will make our global state available to child components
import CarProvider from './utils/CarContext';
import Delete from './components/delete';

export default function App() {
  useEffect(() => {
    document.title = 'Digital Garage';
  }, []);

  var apiClone = [
    {
      name: "Tswizzle",
      albumArt: "https://cdn.shopify.com/s/files/1/0011/4651/9637/products/DD1_519a7456-20b9-41fd-aa58-e9fba6c25c82_1024x1024.png?v=1665148836"
    },
    {
      name: "Vanilla Ice",
      albumArt: "construction hat"
    },
    {
      name: "Ice Cube",
      albumArt: "Snapback hat"
    },
    {
      name: "Ye",
      albumArt: "idiot sandwich"
    },
  ]

  return (
    <CarProvider>
      {apiClone.map(element => {
        return <Delete taco={element.name} cat={element.albumArt}></Delete>
      })}
      <CarComponent />
    </CarProvider>
  );
}

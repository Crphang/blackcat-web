import React from 'react';

export default function EventRow({ event }) {
  console.log(event);
  return (
    <div>
      <div>{event.id}</div>
      <div>{event.title}</div>
    </div>
  );
}

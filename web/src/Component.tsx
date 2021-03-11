import React from 'react';

interface ComponentProps {
  text: string;
};

const Component = (props: ComponentProps) => {
  return (
    <p>{props.text}</p>
  );
};

export default Component;

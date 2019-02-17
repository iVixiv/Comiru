import React from 'react';

const Title = (props) => {
  const { title } = props;
  return (
    <section>
      <p>{title}</p>
    </section>
  );
};

export default Title;

import React, { useEffect, useState } from 'react';
import Markdown from 'react-remarkable';
import TosMarkdown from '../../../assets/TOS.md';

const TermsOfService = (): React.ReactElement => {
  const [tos, setTos] = useState('');
  // console.log(marked);
  useEffect(() => {
    fetch(TosMarkdown)
      .then((res) => res.text())
      .then((text) => setTos(text))
      .catch((err) => {
        console.log('Cannot load ToS because ', { err });
      });
  }, []);
  return (
    <div className="tos">
      <div className="tos-wrapper">
        <Markdown>{tos}</Markdown>
      </div>
    </div>
  );
};

export default TermsOfService;

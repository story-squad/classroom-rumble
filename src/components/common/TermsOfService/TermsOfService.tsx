import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import TosMarkdown from '../../../assets/TOS.md';

const TermsOfService = (): React.ReactElement => {
  const [tos, setTos] = useState('');

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
        <ReactMarkdown>{tos ? tos : ''}</ReactMarkdown>
      </div>
    </div>
  );
};

export default TermsOfService;

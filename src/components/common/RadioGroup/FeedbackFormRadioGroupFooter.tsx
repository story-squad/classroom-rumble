import React from 'react';

const formQuestions = [
  { footer1: 'Not at all', footer2: 'A lot' },
  { footer1: 'interesting', footer2: 'not interesting' },
];

const FeedbackFormRadioGroupFooter = ({}): React.ReactElement => {
  return (
    <div>
      {/* <span>Not at all</span>
      <span></span>
      <span>A lot</span> */}
    </div>
    // <div>
    //   {formQuestions.map(({ footer1, footer2 }) => (
    //     <div>
    //       footer1 ={footer1}
    //       footer2 ={footer2}
    //     </div>
    //   ))}
    // </div>
  );
};

export default FeedbackFormRadioGroupFooter;

import React from 'react';
import { Rumbles, Sections } from '../../../../../../api';
import { PromptBox, SectionInfo } from '../../../../../common';
import SubmissionForm from './SubmissionForm';

const RenderStudentViewRumble = ({
  section,
}: IRenderStudentViewRumbleProps): React.ReactElement => {
  return (
    <div>
      <div className="student-view-rumble">
        <SectionInfo section={section} />
        <PromptBox />
        <SubmissionForm />
      </div>

      <form>
        <h2>FEEDBACK</h2>
        <div>
          How much did you want the main characters to succeed? <br />
          <label>1</label>
          <input type="radio" name="Q1" value="1" checked={values.Q1 === '1'} />
          <label>2</label>
          <input type="radio" name="Q1" value="2" checked={values.Q1 === '2'} />
          <label>3</label>
          <input type="radio" name="Q1" value="3" checked={values.Q1 === '3'} />
          <label>4</label>
          <input type="radio" name="Q1" value="4" checked={values.Q1 === '4'} />
          <label>5</label>
          <input type="radio" name="Q1" value="5" checked={values.Q1 === '5'} />
        </div>
        <hr />
        <div>
          How interested were you in finding out what happens in the story?{' '}
          <br />
          <label>1</label>
          <input type="radio" name="Q2" value="1" checked={values.Q2 === '1'} />
          <label>2</label>
          <input type="radio" name="Q2" value="2" checked={values.Q2 === '2'} />
          <label>3</label>
          <input type="radio" name="Q2" value="3" checked={values.Q2 === '3'} />
          <label>4</label>
          <input type="radio" name="Q2" value="4" checked={values.Q2 === '4'} />
          <label>5</label>
          <input type="radio" name="Q2" value="5" checked={values.Q2 === '5'} />
        </div>
        <hr />
        <div>
          How easily did the descriptions allow you to imagine the setting and
          action? <br />
          <label>1</label>
          <input type="radio" name="Q3" value="1" checked={values.Q3 === '1'} />
          <label>2</label>
          <input type="radio" name="Q3" value="2" checked={values.Q3 === '2'} />
          <label>3</label>
          <input type="radio" name="Q3" value="3" checked={values.Q3 === '3'} />
          <label>4</label>
          <input type="radio" name="Q3" value="4" checked={values.Q3 === '4'} />
          <label>5</label>
          <input type="radio" name="Q3" value="5" checked={values.Q3 === '5'} />
        </div>
      </form>
    </div>
  );
};

interface IRenderStudentViewRumbleProps {
  rumble: Rumbles.IRumbleWithSectionInfo;
  section: Sections.ISectionWithRumbles;
}

export default RenderStudentViewRumble;

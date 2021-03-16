import styled from 'styled-components';
import { useFormikContext, Field } from 'formik';

import ErrorMessage from './ErrorMessage'


export const Checkbox = ({ name, children }) => {

  const { errors } = useFormikContext();
  
  return (
    <TermsAndConditions className="flex column">
      <div className="flex align-items-center">
        <CheckboxWrapper>
          <Field name={name} type="checkbox" />
        </CheckboxWrapper>

        {children}
      </div>

      {errors[name] && (
        <ErrorMessage error={errors[name]} />
      )}
    </TermsAndConditions>
  );
};



const TermsAndConditions = styled.div`
    margin-top: 30px;
    margin-bottom: 20px;
`;


const CheckboxWrapper = styled.label`
    display: inline-flex;
    cursor: pointer;
    position: relative;
    margin-right: 10px;

    input {
        height: 18px;
        width: 18px;
        -webkit-appearance: none;
        -moz-appearance: none;
        -o-appearance: none;
        appearance: none;
        border: 1px solid #34495E;
        border-radius: 4px;
        outline: none;
        transition-duration: 0.3s;
        cursor: pointer;
        position:relative;
        margin-left: 0;

        &:checked::before {
            content: '';
            position: absolute;
            left: 37%;
            top: 20%;
            width: 5px;
            height: 8px;
            border: solid rgb(80, 87, 99);
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }
    }
`;

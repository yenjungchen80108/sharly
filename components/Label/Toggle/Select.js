import styled from 'styled-components';

const Select = styled.select`
  line-height: 1em;
  background-color: transparent;
  border-style: none;
  width: 100%;
  min-width: 0;
  display: inline-flex;
  border: 1px solid var(--accents-2);
  border-radius: 5px;
  padding: 0px 12px;
  background: var(--background);
  color: var(--accents-4);
  height: 40px;
  transition: border-color 0.15s ease;
  outline: 0;
`;

export default Select;

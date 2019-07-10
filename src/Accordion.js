import styled from 'styled-components';

const Accordion = styled.div`
  background: #fff;
  cursor: pointer;

  :first-of-type,
  :first-of-type h3 {
    border-radius: 5px 5px 0 0;
  }

  :last-of-type,
  :last-of-type h3 {
    border-radius: 0 0 5px 5px;
  }
`;

export default Accordion;
import styled from 'styled-components';

const Panel = styled.div`
  display: ${props => (props.open ? "block" : "none")};
  padding: 10px;
  transition: all .3s ease;
`;

export default Panel;
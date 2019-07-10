import React from "react";
import styled, { css } from "styled-components";

const Form = styled.form`
  margin-top: 1em;
  margin-bottom: 1em;
`;

const fieldMixin = css`
  padding: 0 12px;
  outline: none;
  border: none;
  border-radius: 5px;
  transition: all .3s ease;

  :focus {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.12);
  }
`

const Input = styled.input`
  ${props => fieldMixin };
  width: calc(70% - 5px)
`;

const Select = styled.select`
  ${props => fieldMixin };
  width: calc(30% - 5px);
`;

const Button = styled.button`
  padding: 12px 20px;
  height: 42px;
  border: none;
  background: rgb(21, 28, 34);
  border-radius: 5px;
  margin-left: 10px;
  color: #fff;
  cursor: pointer;
  min-width: 35%;
`;

const FieldWrap = styled.div`
  display: flex;
  flex: 1;
  height: 42px;
  justify-content: space-between;
`;

function SearchField(props) {
  return (
    <Form>
      <FieldWrap>
        <Input
          type="text"
          onChange={props.searchEmoji}
          placeholder="Type: joy / sad / angry "
        />

        {/* <span role="img" aria-label="search">
            Search 🔍
          </span> */}
        <Select onChange={props.updateLimit}>
          <option>20</option>
          <option>30</option>
          <option>50</option>
          <option>All</option>
        </Select>
      </FieldWrap>
    </Form>
  );
}


export default SearchField;

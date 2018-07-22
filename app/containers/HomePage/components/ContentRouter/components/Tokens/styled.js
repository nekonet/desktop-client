import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;

  .ant-table-thead > tr > th {
    min-width: 100px;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  margin: 20px;
  max-width: 580px;
  width: 100%;

  input {
    margin-right: 5px;
  }

  button {
    margin-left: 5px;
  }
`;

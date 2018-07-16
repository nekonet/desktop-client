import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  .ant-card {
    max-width: 200px;
    margin: 10px;
  }
  .ant-card-body {
    overflow: auto !important;
    overflow-wrap: break-word;
  }
`;

import styled from 'styled-components';
import {Layout} from 'antd';
const {Header, Footer, Sider, Content} = Layout;

export const HeaderText = styled.div`
font-size: 24px;
    margin-left: 15px;  
`;

export const PageLayout = styled(Layout)`
  min-height: 100vh;
  width: 100%;
`;

export const PageHeader = styled(Header)`
  background-color: white !important;
  display: flex;
    align-items: center;
    justify-content: start;
    padding: 0 20px;
`;

export const PageFooter = styled(Footer)``;
export const PageSider = styled(Sider)`
  background-color: white !important;
`;
export const PageContent = styled(Content)``;

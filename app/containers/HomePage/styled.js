import styled from 'styled-components';
import {Layout} from 'antd';
const {Header, Footer, Sider, Content} = Layout;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0px;
`;

export const HeaderText = styled.div`
  font-size: 18px;
  margin-left: 0px;
`;

export const PageLayout = styled(Layout)`
  min-height: 100vh;
  width: 100%;
`;

export const PageHeader = styled(Header)`
  background-color: #f0f2f5 !important;
  height: 50px !important;
  line-height: 50px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
`;

export const PageFooter = styled(Footer)`
  display: flex;
  padding: 5px 50px !important;
  justify-content: center;
  align-items: center;
  font-size: 12px !important;
  font-weight: 300 !important;
`;
export const PageSider = styled(Sider)`
  background-color: white !important;
`;
export const PageContent = styled(Content)``;

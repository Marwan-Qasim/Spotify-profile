import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: var(--white, #fff);
  border-radius: 12px;
  padding: 36px 40px;
  max-width: 1000px;
  width: 100%;
  text-align: center;
`;

const Message = styled.p`
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--white, #fff);
`;

const ErrorMessage = ({ children }) => (
  <Wrapper role="alert" aria-live="assertive">
    <Card>
      <Message>{children}</Message>
    </Card>
  </Wrapper>
);

export default ErrorMessage;

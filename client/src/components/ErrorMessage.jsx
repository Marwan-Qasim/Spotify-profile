import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 20px 24px;
  background: rgba(255, 0, 0, 0.04);
  border: 1px solid rgba(255, 0, 0, 0.08);
  color: #ff6b6b;
  border-radius: 8px;
  max-width: 780px;
  margin: 24px auto;
  text-align: center;
`;

const Message = styled.p`
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
`;

const ErrorMessage = ({ children }) => (
  <Wrapper role="alert" aria-live="assertive">
    <Message>{children}</Message>
  </Wrapper>
);

export default ErrorMessage;

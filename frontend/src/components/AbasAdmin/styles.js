import styled from "styled-components";

export const AbasContainer = styled.div`
  display: flex;
  gap: 0;
  border-bottom: 2px solid #eee;
  margin-bottom: 1.5rem;
`;

export const Aba = styled.button`
  background: none;
  border: none;
  padding: 0.7rem 1.2rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: #888;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
  text-decoration: none;
  display: inline-block;

  &:hover {
    color: #c1440e;
  }

  &.active {
    color: #c1440e;
    border-bottom-color: #c1440e;
  }
`;

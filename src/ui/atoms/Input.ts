import { styled } from "foliage";
import { theme } from "../themes/dark";

export const Input = styled.input`
  background: ${theme.colors.grey[6]};
  border-radius: 5px;
  border: 1px solid ${theme.colors.grey[10]};
  color: ${theme.colors.grey[0]};
  font-size: 14px;
  outline: none;
  padding: 12px 16px;
  display: block;

  &:focus {
    border: 1px solid ${theme.colors.blue[0]};
  }
`;

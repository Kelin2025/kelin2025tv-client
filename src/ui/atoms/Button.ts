import { styled } from "foliage";
import { theme } from "../themes/dark";

export const Button = styled.button`
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  outline: none;
  padding: 12px 26px;
  box-shadow: 0 0 0 3px transparent inset;
  transition: box-shadow 0.2s ease-out, opacity 0.2s ease-out;

  &[disabled] {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &[data-type="danger"] {
    background: ${theme.colors.red[0]};
    color: #fff;
  }

  &[data-type="success"] {
    background: ${theme.colors.green[0]};
    color: #fff;
  }

  &[data-type="primary"] {
    background: ${theme.colors.blue[0]};
    color: #fff;
  }

  &[data-type="secondary"] {
    background: ${theme.colors.grey[6]};
    color: #fff;
  }

  &:focus {
    box-shadow: 0 0 0 3px ${theme.colors.blue[0]} inset;
    opacity: 0.7;
  }
`;

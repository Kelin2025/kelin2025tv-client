import { styled } from "foliage";
import { theme } from "../themes/dark";

export const Card = styled.div`
  background: ${theme.colors.grey[8]};
  padding: 25px 30px;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
`;

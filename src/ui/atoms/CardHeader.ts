import { styled } from "foliage";
import { theme } from "../themes/dark";

export const CardHeader = styled.div`
  border-bottom: 2px solid ${theme.colors.grey[7]};
  padding: 25px 30px;
  margin: -25px -30px 25px;
  border-radius: 10px 10px 0 0;

  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 400;
  }
`;

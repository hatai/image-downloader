import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  padding: 0;
  width: 100%;
  height: 100%;
  column-count: 1;
  column-gap: 15px;

  @media only screen and (min-width: 600px) {
    column-count: 3;
  }

  @media only screen and (min-width: 900px) {
    column-count: 4;
  }

  @media only screen and (min-width: 1200px) {
    column-count: 5;
  }

  @media only screen and (min-width: 1500px) {
    column-count: 6;
  }

  @media only screen and (min-width: 1800px) {
    column-count: 7;
  }

  @media only screen and (min-width: 2100px) {
    column-count: 8;
  }

  @media only screen and (min-width: 2400px) {
    column-count: 9;
  }
`;

const Grid = styled.div`
  padding: 0;
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;
`;

const GridLayout = ({ children }) => (
  <Container>
    {children.map((child, i) => (
      <Grid key={i}>{child}</Grid>
    ))}
  </Container>
)

export default GridLayout
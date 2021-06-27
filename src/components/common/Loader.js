import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 300px;
  overflow: hidden;
`;

const Loader = styled.div`
  color: #ffffff;
  text-indent: -9999em;
  margin: 88px auto;
  position: relative;
  font-size: 11px;
  transform: translateZ(0);

  &&,
  ::before,
  ::after {
    background: #ffffff;
    animation: load 1s infinite ease-in-out;
    width: 1em;
    height: 4em;
  }

  ::before,
  ::after {
    position: absolute;
    top: 0;
    content: '';
  }

  ::before {
    left: -1.5em;
    animation-delay: -0.16s;
  }

  ::after {
    left: 1.5em;
    animation-delay: 0.16s;
  }

  @keyframes load {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 4em;
    }

    40% {
      box-shadow: 0 -2em;
      height: 5em;
    }
  }
`;

const LoaderContainer = () => (
  <Container>
    <Loader />
  </Container>
);

export default LoaderContainer;

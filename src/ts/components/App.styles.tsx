import styled from '@emotion/styled';

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`;
export const Title = styled.div`
    font-size: 2rem;
    display: block;
    padding: 2rem 1rem 1rem 1rem;
    background-color: #44444463;
`;
export const Loading = styled.div`
    background-color: rgba(0, 0, 0, 0.75);
    color: white;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const Button = styled.button`
  background-color: rgba(106, 204, 245, 0.44);
  color: #2739b7;
  border: none;
  font-size: 1rem;
  display: inline-block;
  padding: 0.5rem;
  margin: 0.25rem;
`;
export const UpcListWrapper = styled.ul`
    overflow: auto;
`;
export const UIWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

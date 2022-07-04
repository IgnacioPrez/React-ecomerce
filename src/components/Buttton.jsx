import styled from "styled-components";

export const Button = styled.button`
 display: flex;
 border: none;
 align-items: center;
 background-color: #eee;
 padding: 1.4em;
 font-size: 0.8em;
 height: 1.5em;
 width: auto;
 border-radius: 1rem;
 color: lightcoral;
 box-shadow: 0 0.4rem #dfd9d9;
 margin: 0 auto;
 cursor: pointer;
 :active {
 color: white;
 box-shadow: 0 0.2rem #dfd9d9;
 transform: translateY(0.2rem);
}

:hover:not(:disabled) {
 background: lightcoral;
 color: white;
 text-shadow: 0 0.1rem #bcb4b4;
}

:disabled {
 cursor: auto;
 color: grey;
}
`;

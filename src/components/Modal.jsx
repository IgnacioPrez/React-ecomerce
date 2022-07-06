import styled from "styled-components";
import gratitud from '../img/images.png'
const Modal = () => {
  return (
    <>
        <Overlay>
            <ContenedorModal>
                <EncabezadoModal>
                    <h3>
                        Muchas Gracias por su compra! 😁
                    </h3>
                    <img src={gratitud} alt='gratitud'/>
                </EncabezadoModal>
            </ContenedorModal>
        </Overlay>
    </>
  )
}

export default Modal

const Overlay = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.5);
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const ContenedorModal = styled.div`
    width: 500px;
    min-height: 100px;
    background: #fff;
    border-radius: 5px;
    position: relative;
    box-shadow: rgba(100,100,111,0.2) 0px 7px 29px 0px;
    padding: 20px;
`

const EncabezadoModal = styled.div`
    display: flex;
    align-items: center;
    margin-bottom:20px ;
    padding-bottom: 20px;
    border-bottom: 1px solid #e8e8e8;

    h3 {
        font-weight: 500;
        font-size: 16px;
        color: #1766DC;
    }
`
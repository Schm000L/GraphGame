import * as React from 'react'
import styled from "styled-components";

const ModalMainSection = styled.section`
    position:fixed;
    background: white;
    width: 80%;
    height: auto;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
`

interface showHideProps {
    show: boolean
}

export const ShowHideModal = styled.div.attrs<showHideProps>({
    style: (props: showHideProps) => ({
       display: `${props.show ? "block" : "none"}`
    })
})`
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
`

export const WinModal = (handleClose:any, show:boolean, children:any) => {
    return (
        <ShowHideModal show={show}>
        <ModalMainSection>
            {children}
            <button onClick={handleClose}>close</button>
        </ModalMainSection>
        </ShowHideModal>
    );
}


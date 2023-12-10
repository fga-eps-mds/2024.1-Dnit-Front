import React, { useState, useEffect } from 'react';
import Modal from "../../Modal";
import ReactLoading from "react-loading";
import {EscolaData} from "../../../models/service";

interface ModalProps {
    //escolaId: string
    onClose: () => void;
}


const ModalAlterarEscola: React.FC<ModalProps> = ({ onClose }) => {
    
    const [escola, setEscola] = useState<EscolaData | null>(null);
    
    return (
        <Modal className="modal-title" closeModal={() => onClose()}>
            <h4 className="text-center mt-2">Indisponível...</h4>
            <div className="d-flex justify-content-center m-4">
                <ReactLoading type="spinningBubbles" color="#000000" />
            </div>
            <span></span>
        </Modal>
    );
};

export default ModalAlterarEscola;
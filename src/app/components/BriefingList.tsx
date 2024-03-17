import { useEffect, useState } from "react";
import { Briefing } from "../types/Briefing";
import { Modal } from "./Modal";
import { EditBriefingForm } from "./EditBriefingForm";

type Props = {
    briefings: Briefing[];
    onDelete: (id: number) => void;
    onEdit: (updatedBriefing: Briefing) => void;
}

export const BriefingList = ({ briefings, onDelete, onEdit }: Props) => {

    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [briefingsData, setBriefingsData] = useState(briefings);
    const [briefingToEdit, setBriefingToEdit] = useState<Briefing | null>(null);

    useEffect(() => {
        setBriefingsData(briefings);
    }, [briefings]);

    const handleEditClick = (id: number) => {
        // Encontrar o briefing com o ID correspondente
        const briefing = briefingsData.find((briefing) => briefing.id === id);
        if (briefing) {
            setBriefingToEdit(briefing); // Definir o briefing a ser editado
            setOpenModalAdd(true); // Abrir o modal de edição
        }
    };

    const handleCancelEdit = () => {
        setBriefingToEdit(null); // Limpar o briefing a ser editado
        setOpenModalAdd(false); // Fechar o modal de edição
    };

    const handleEditBriefing = (updatedBriefing: Briefing) => {
        const updatedBriefings = briefings.map((briefing) =>
            briefing.id === updatedBriefing.id ? updatedBriefing : briefing
        );
        onEdit(updatedBriefing); // Atualize os briefings na lista original
        setOpenModalAdd(false); // Fechar o modal de edição
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {briefingsData.map(briefing => (
                <div key={briefing.id} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <div className="mb-2">
                        <div>{briefing.state === 'negociacao' && <span className="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Negociação</span>}</div>
                        <div>{briefing.state === 'aprovado' && <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Aprovado</span>}</div>
                        <div>{briefing.state === 'finalizado' && <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Finalizado</span>}</div>                       
                    </div>
                    <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{briefing.clientName}</h4>
                    <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">{briefing.description}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-400">{briefing.dateTime}</p>
                    <div className="flex flex-row-reverse mt-5">
                        <a style={{ cursor: 'pointer' }} onClick={() => onDelete(briefing.id)} >
                            <svg className="feather feather-trash-2" fill="none" height="18" stroke="#9CA3AF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                        </a>
                        <a style={{ cursor: 'pointer' }} onClick={() => handleEditClick(briefing.id)}>
                            <svg className="feather feather-edit" fill="none" height="18" stroke="#9CA3AF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </a>
                    </div>
                </div>
            ))}

            <Modal isVisible={openModalAdd} onClose={() => setOpenModalAdd(false)}>
                {briefingToEdit && <EditBriefingForm briefing={briefingToEdit} onEdit={handleEditBriefing} onCancel={handleCancelEdit} />}
            </Modal>

        </div>
    )

}

import { useState } from 'react';
import { Briefing } from '../types/Briefing';

type Props = {
  briefing: Briefing; // Adicione a propriedade briefing ao tipo Props
  onEdit: (updatedBriefing: Briefing) => void;
  onCancel: () => void;
};

export const EditBriefingForm = ({ briefing, onEdit, onCancel }: Props) => {
  const [clientName, setClientName] = useState(briefing.clientName); // Inicialize com o valor do briefing
  const [description, setDescription] = useState(briefing.description); // Inicialize com o valor do briefing
  const [state, setState] = useState(briefing.state); // Inicialize com o valor do briefing

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const dateTime = new Date().toLocaleString();
    const updatedBriefing: Briefing = {
      ...briefing, // Mantenha os dados existentes do briefing
      clientName,
      description,
      dateTime,
      state,
    };
    console.log('Briefing atualizado:', updatedBriefing);
    onEdit(updatedBriefing); // Chame a função onEdit para atualizar o briefing existente
    onCancel();
  };

  const handleCancel = () => {
    onCancel(); // Chame a função onCancel para fechar o modal
  }

  return (
    <form onSubmit={handleSubmit} className="m-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Editando briefing</h2>
      <div className="flex flex-col mb-4">
        <label htmlFor="clientName" className="text-gray-900 dark:text-white text-sm mb-1">Nome do cliente</label>
        <input
          type="text"
          id="clientName"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
          className="rounded px-3 py-2 bg-gray-50 border border-gray-300 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="description" className="text-sm mb-1 text-gray-900 dark:text-white">Descrição</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="rounded px-3 py-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="state" className="text-sm mb-1 text-gray-900 dark:text-white">Estado</label>
        <select
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value as 'negociacao' | 'finalizado' | 'aprovado')}
          required
          className="rounded px-3 py-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        >
          <option value="">Selecione o estado</option>
          <option value="negociacao">Negociação</option>
          <option value="aprovado">Aprovado</option>
          <option value="finalizado">Finalizado</option>
        </select>
      </div>
      <div className='flex flex-row-reverse gap-4'>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Salvar alteração</button>
        <button type="button" onClick={handleCancel} className="border border-gray-200 dark:bg-gray-800 text-white py-2 px-4 rounded ">Cancelar</button>
      </div>
    </form>
  );
};
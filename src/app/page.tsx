"use client"
import { Fragment, SetStateAction, useEffect, useState } from 'react';
import { BriefingList } from './components/BriefingList';
import { AddBriefingForm } from './components/AddBriefingForm'; // Importe o componente AddBriefingForm
import { briefings } from './data/briefings';
import { Modal } from './components/Modal';
import { Briefing } from './types/Briefing';

const Page = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [filter, setFilter] = useState('');
  
  const [briefingsData, setBriefingsData] = useState(briefings); // Use um estado para armazenar os briefings

  useEffect(() => {
    setBriefingsData(briefings);
  }, [briefings]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const handleAddBriefing = (newBriefing: Briefing) => {
    setBriefingsData([...briefingsData, newBriefing]); // Adicione o novo briefing ao estado briefingsData
  };

  const handleEditBriefing = (updatedBriefing: Briefing) => {
    const updatedBriefings = briefingsData.map(briefing => {
      if (briefing.id === updatedBriefing.id) {
        return updatedBriefing;
      }
      return briefing;
    });
    setBriefingsData(updatedBriefings);
};


  const filteredBriefings = briefingsData.filter(
    (briefing) => filter === '' || briefing.state === filter
  );

  const deleteItem = (idToDelete: number) => {
    setBriefingsData(prevBriefings => prevBriefings.filter(briefing => briefing.id !== idToDelete));
  };

  return (
    <Fragment>
      <div className="container mx-auto px-4">
        <div className="mt-10 mb-5 flex justify-between items-center">
          <div>
            <h1 className="font-bold text-4xl">Lista de briefings</h1>
            <p className="mt-2 text-gray-700 dark:text-gray-400"><span className='text-gray-200'>{briefingsData.length} </span> briefings cadastrados.</p>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <select value={filter} onChange={handleFilterChange} className="rounded-md border border-gray-200 p-3 dark:bg-gray-800 dark:border-gray-700">
                <option value="">Todos</option>
                <option value="negociacao">Negociação</option>
                <option value="aprovado">Aprovado</option>
                <option value="finalizado">Finalizado</option>
              </select>
            </div>
            <button onClick={() => setOpenModalAdd(true)} className="p-3 bg-blue-700 text-white rounded-md">Adicionar novo</button>
          </div>
        </div>
        <BriefingList briefings={filteredBriefings} onDelete={deleteItem} onEdit={handleEditBriefing}/>
        <Modal isVisible={openModalAdd} onClose={() => setOpenModalAdd(false)}>
          <AddBriefingForm onAdd={handleAddBriefing} onCancel={()=>setOpenModalAdd(false)} />
        </Modal>
      </div>
    </Fragment>
  );
};

export default Page;

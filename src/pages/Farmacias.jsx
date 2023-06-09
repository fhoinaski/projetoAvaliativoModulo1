import React, { useState } from 'react';
import FarmaciaModal from '../components/FarmaciaModal';
import { Table } from 'react-bootstrap';
import MapaFarmacia from '../components/MapaFarmacia';
import { TabelaFarmacia } from '../components/TabelaFarmacia';
import { useFarmaciaState } from '../contexts/farmaciaContext/useFarmacia';
import Carregando from '../components/Carregando';


const Farmacias = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [detalheFarmaia, setDetalheFarmacia] = useState(null);
  const { todasFarmacias, carregando } = useFarmaciaState();

  const mostrarFarmacia = (cnpj) => {
    const farmacia = todasFarmacias.find((dadosFarmacia) => dadosFarmacia.cnpj === cnpj);
    setIsOpen(true);
    setDetalheFarmacia(farmacia);
  };

  return (
    <div className="w-11/12 mx-auto my-10">
      <FarmaciaModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        objetoInfo={detalheFarmaia}
        titulo={detalheFarmaia?.nomeFantasia}
      />

      <Table striped bordered hover className='text-center'>
        <thead>
          <tr >
            <th>Nome Fantasia</th>
            <th>Bairro</th>
            <th>Telefone</th>
            <th>Detalhes</th>
          </tr>
        </thead>
        <tbody className='flex-col items-center justify-center '>
          {todasFarmacias.map((farmacia) => (
            <TabelaFarmacia
              key={farmacia.cnpj}
              farmacia={farmacia}
              onClick={() => mostrarFarmacia(farmacia.cnpj)}
            />
          ))}
        </tbody>
      </Table>
      {carregando ? (
        <div className='h-96 flex items-center justify-center'>
          <Carregando />
        </div>
      ) : (
        <div className='flex mx-auto' style={{ height: '500px', width: '100%' }}>
          <MapaFarmacia farmacias={todasFarmacias} onMapLoad={() => setCarregando(false)} />
        </div>
      )}
    </div>
  );
};

export default Farmacias;

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const MapaFarmacia = ({ farmacias, zoom = 10 }) => {

//recebe as farmacias e retorna um array com as posições mapeia e filtrando as posições que não são nulas e retorna um array com as posições
//que não são nulas 
  const positions = farmacias.map((farmacia) => {
    const latitude = parseFloat(farmacia.latitude);
    const longitude = parseFloat(farmacia.longitude);

    if (isNaN(latitude) || isNaN(longitude)) {
      return null;
    }

    return {
      latitude,
      longitude,
      farmacia: farmacia,
    };
  })
  .filter((position) => position !== null);




  if (!positions || positions.length === 0) {
    return <div className='flex justify-center text-center w-full my-5 text-orange-500 font-semibold'>Sem dados disponiveis aguarde ...</div>;
  }

  const center = {
    lat: positions[0].latitude,
    lng: positions[0].longitude,
  };
   

  return (
    <>
   <MapContainer center={center} zoom={zoom} style={{ height: '500px', width: '100%', zIndex: 0 }} >

   <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        />
      {positions.map(({latitude, longitude, farmacia}, index) => (
  <Marker key={index} position={[latitude, longitude]}>
    <Popup>
      <span className='font-extrabold text-orange-600 flex justify-center'>{farmacia.razaoSocial}</span>
      <br />
      <span className='font-bold'>Cnpj:</span>  {farmacia.cnpj}
      <br />
      <span className='font-bold'>Endereço:</span> {farmacia.logradouro}, {farmacia.logradouroNumero}, {farmacia.bairro}
      <br/>
      <span className='font-bold'>Telefone:</span> {farmacia.telefone}
      <br/>
      <span className='font-bold'>Whatsapp:</span> {farmacia.telefone}      
    </Popup>
  </Marker>
))}

    </MapContainer>
    
  </>
);
};

export default MapaFarmacia;

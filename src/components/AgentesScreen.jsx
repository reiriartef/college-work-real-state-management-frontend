import { useState } from 'react';
import FormAgente from './FormAgente';

const AgentesScreen = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);

  const handleOptionClick = async (option) => {
    setSelectedOption(option);
    setSearchValue(''); // Limpiar el input al cambiar la opción

    if (option === 'Todos los agentes') {
      const data = await todosLosClientes();
      setData(data);
    }
  };

  const handleSearch = async () => {
    if (selectedOption === 'Mostrar por nombre') {
      const data = await clientesBy(searchValue, 'nombre');
      setData(data);
    }
    if (selectedOption === 'Mostrar por Apellido') {
      const data = await clientesBy(searchValue, 'apellido');
      setData(data);
    }
    if (selectedOption === 'Mostrar por Tipo') {
      const data = await clientesBy(searchValue, 'especializacion');
      setData(data);
    }
  };

  const todosLosClientes = async () => {
    try {
      return await fetch('http://127.0.0.1:5000/agentes').then((response) =>
        response.json()
      );
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const clientesBy = async (value, param) => {
    try {
      return await fetch(`http://127.0.0.1:5000/agentes_by?${param}=${value}`).then(
        (response) => response.json()
      );
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return (
    <div className="p-6">
      <nav className="bg-gray-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-center space-x-4">
          {['Todos los agentes', 'Mostrar por nombre', 'Mostrar por Apellido', 'Mostrar por Especialidad', 'Agregar nuevo Agente'].map(
            (option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`px-4 py-2 rounded-lg ${
                  selectedOption === option
                    ? 'bg-gray-800 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-300'
                }`}
              >
                {option}
              </button>
            )
          )}
        </div>
      </nav>

      {/* Mostrar input solo para opciones específicas */}
      {(selectedOption === 'Mostrar por nombre' ||
        selectedOption === 'Mostrar por Apellido' ||
        selectedOption === 'Mostrar por Especialidad') && (
        <div className="mb-4 flex items-center space-x-2">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={`Ingrese un ${selectedOption.split(' ')[2].toLowerCase()}`}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Buscar
          </button>
        </div>
      )}

      <div>
        {selectedOption === 'Agregar nuevo Agente' ? (
          <div className="bg-white p-4 shadow rounded-lg">
            <FormAgente/>
          </div>
        ) : (
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Nombre</th>
                <th className="py-2 px-4 text-left">Apellido</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Telefono</th>
                <th className="py-2 px-4 text-left">Especializacion</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((cliente, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4 text-left">{cliente.id_agente}</td>
                    <td className="py-2 px-4 text-left">{cliente.nombre}</td>
                    <td className="py-2 px-4 text-left">{cliente.apellido}</td>
                    <td className="py-2 px-4 text-left">{cliente.email}</td>
                    <td className="py-2 px-4 text-left">{cliente.telefono}</td>
                    <td className="py-2 px-4 text-left">{cliente.especializacion}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 px-4 text-center text-gray-500">
                    No hay datos para mostrar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AgentesScreen;

import { useState } from 'react';
import FormPago from './FormPago';

const PagosScreen = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);

  const handleOptionClick = async (option) => {
    setSelectedOption(option);
    setSearchValue(''); // Limpiar el input al cambiar la opción

    if (option === 'Todos los pagos') {
      const data = await todosLosPagos();
      setData(data);
    }
  };

  const handleSearch = async () => {
    if (selectedOption === 'Mostrar por fecha') {
      const data = await pagosBy(searchValue, 'fecha_pago');
      setData(data);
    }
    if (selectedOption === 'Mostrar por metodo de pago') {
      const data = await pagosBy(searchValue, 'metodo_pago');
      setData(data);
    }
  };

  const todosLosPagos = async () => {
    try {
      return await fetch('http://127.0.0.1:5000/pagos').then((response) =>
        response.json()
      );
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const pagosBy = async (value, param) => {
    try {
      console.log(value)
      return await fetch(`http://127.0.0.1:5000/pagos_by?${param}=${value}`).then(
        (response) => response.json()
      );
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const eliminarPago = async (idPago) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/pagos/eliminar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_pago: idPago })
      });

      if (response.ok) {
        alert('Pago eliminado exitosamente');
        const updatedData = await todosLosPagos();
        setData(updatedData);
      } else {
        alert('Error al eliminar el pago');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error al eliminar el pago');
    }
  };

  return (
    <div className="p-6">
      <nav className="bg-gray-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-center space-x-4">
          {['Todos los pagos', 'Mostrar por fecha', 'Mostrar por metodo de pago', 'Registrar nuevo pago'].map(
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
      {(selectedOption === 'Mostrar por fecha' ||
        selectedOption === 'Mostrar por metodo de pago') && (
        <div className="mb-4 flex items-center space-x-2">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={`Ingrese ${selectedOption.split(' ')[2].toLowerCase() == 'fecha' ? 'una fecha en formato AAAA-MM-DD' : 'un metodo de pago'}`}
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
        {selectedOption === 'Registrar nuevo pago' ? (
          <div className="bg-white p-4 shadow rounded-lg">
            <FormPago/>
          </div>
        ) : (
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Fecha del Pago</th>
                <th className="py-2 px-4 text-left">Monto</th>
                <th className="py-2 px-4 text-left">Metodo de Pago</th>
                <th className="py-2 px-4 text-left">ID Transaccion</th>
                <th className="py-2 px-4 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((pago, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4 text-left">{pago.id_pago}</td>
                    <td className="py-2 px-4 text-left">{new Date(pago.fecha_pago).toLocaleDateString()}</td>
                    <td className="py-2 px-4 text-left">{new Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD' }).format(
    pago.monto,
  )}</td>
                    <td className="py-2 px-4 text-left">{pago.metodo_pago}</td>
                    <td className="py-2 px-4 text-left">{pago.id_transaccion}</td>
                    <td className="py-2 px-4 text-left">
                      <button
                        onClick={() => eliminarPago(pago.id_pago)}
                        className={'bg-red-500 text-white hover:bg-red-600 transition px-3 py-1 rounded-md'
                        } 
                      >
                        Eliminar
                      </button>
                    </td>
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

export default PagosScreen;

import { useState } from "react";
import FormTransaccion from "./FormTransaccion";

const TransaccionesScreen = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [data, setData] = useState([]);

  const handleOptionClick = async (option) => {
    setSelectedOption(option);

    if (option === "Todas las transacciones") {
      const data = await todasLasTransacciones();
      setData(data);
    }
  };

  const todasLasTransacciones = async () => {
    try {
      return await fetch("http://127.0.0.1:5000/transacciones").then(
        (response) => response.json()
      );
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const finalizarTransaccion = async (idTransaccion) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/transacciones/finalizar`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_transaccion: idTransaccion }),
        }
      );

      if (response.ok) {
        alert("Transacción finalizada exitosamente");
        const updatedData = await todasLasTransacciones();
        setData(updatedData);
      } else {
        alert("Error al finalizar la transacción");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error al finalizar la transacción");
    }
  };

  return (
    <div className="p-6">
      <nav className="bg-gray-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-center space-x-4">
          {["Todas las transacciones", "Generar transaccion"].map((option) => (
            <button
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`px-4 py-2 rounded-lg ${
                selectedOption === option
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </nav>

      <div>
        {selectedOption === "Generar transaccion" ? (
          <div className="bg-white p-4 shadow rounded-lg">
            <FormTransaccion />
          </div>
        ) : (
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Fecha de Transaccion</th>
                <th className="py-2 px-4 text-left">Monto de la Transaccion</th>
                <th className="py-2 px-4 text-left">Tipo de Inmueble</th>
                <th className="py-2 px-4 text-left">
                  Descripcion del Inmueble
                </th>
                <th className="py-2 px-4 text-left">Cliente</th>
                <th className="py-2 px-4 text-left">Agente</th>
                <th className="py-2 px-4 text-left">
                  Estado de la transaccion
                </th>
                <th className="py-2 px-4 text-left">Tipo de Transaccion</th>
                <th className="py-2 px-4 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((transaccion, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4 text-left">
                      {transaccion.id_transaccion}
                    </td>
                    <td className="py-2 px-4 text-left">
                      {new Date(
                        transaccion.fecha_transaccion
                      ).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 text-left">
                      {new Intl.NumberFormat("us-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(transaccion.precio_transaccion)}
                    </td>
                    <td className="py-2 px-4 text-left">
                      {transaccion.tipo_inmueble}
                    </td>
                    <td className="py-2 px-4 text-left">
                      {transaccion.descripcion_inmueble}
                    </td>
                    <td className="py-2 px-4 text-left">
                      {transaccion.nombre_cliente}{" "}
                      {transaccion.apellido_cliente}
                    </td>
                    <td className="py-2 px-4 text-left">
                      {transaccion.nombre_agente} {transaccion.apellido_agente}
                    </td>
                    <td className="py-2 px-4 text-left">
                      {transaccion.estado_transaccion}
                    </td>
                    <td className="py-2 px-4 text-left">
                      {transaccion.tipo_transaccion}
                    </td>
                    <td className="py-2 px-4 text-left">
                      <button
                        onClick={() =>
                          finalizarTransaccion(transaccion.id_transaccion)
                        }
                        className={`${
                          transaccion.estado_transaccion === "Finalizada"
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-green-500 text-white hover:bg-green-600 transition"
                        } px-3 py-1 rounded-md`}
                        disabled={
                          transaccion.estado_transaccion === "Finalizada"
                        }
                      >
                        Finalizar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="10"
                    className="py-4 px-4 text-center text-gray-500"
                  >
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

export default TransaccionesScreen;

import { useState } from "react";
import FormInmueble from "./FormInmueble";

const InmueblesScreen = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);

  const handleOptionClick = async (option) => {
    setSelectedOption(option);
    setSearchValue(""); // Limpiar el input al cambiar la opción

    if (option === "Todos los inmuebles") {
      const data = await todosLosinmuebles();
      setData(data);
    }
  };

  const handleSearch = async () => {
    if (selectedOption === "Mostrar por ciudad") {
      const data = await inmueblesBy(searchValue, "ciudad");
      setData(data);
    }
    if (selectedOption === "Mostrar por estado") {
      const data = await inmueblesBy(searchValue, "estado");
      setData(data);
    }
    if (selectedOption === "Mostrar por codigo postal") {
      const data = await inmueblesBy(searchValue, "codigo_postal");
      setData(data);
    }
    if (selectedOption === "Mostrar por tipo") {
      const data = await inmueblesBy(searchValue, "tipo_inmueble");
      setData(data);
    }
    if (selectedOption === "Mostrar por estado del inmueble") {
      const data = await inmueblesBy(searchValue, "estado_inmueble");
      setData(data);
    }
  };

  const todosLosinmuebles = async () => {
    try {
      return await fetch("http://127.0.0.1:5000/inmuebles").then((response) =>
        response.json()
      );
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const inmueblesBy = async (value, param) => {
    try {
      return await fetch(
        `http://127.0.0.1:5000/inmuebles_by?${param}=${value}`
      ).then((response) => response.json());
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return (
    <div className="p-6">
      <nav className="bg-gray-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-center space-x-4">
          {[
            "Todos los inmuebles",
            "Mostrar por ciudad",
            "Mostrar por estado",
            "Mostrar por codigo postal",
            "Mostrar por tipo",
            "Mostrar por estado del inmueble",
            "Agregar nuevo inmueble",
          ].map((option) => (
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

      {/* Mostrar input solo para opciones específicas */}
      {(selectedOption === "Mostrar por ciudad" ||
        selectedOption === "Mostrar por estado" ||
        selectedOption === "Mostrar por codigo postal" ||
        selectedOption === "Mostrar por tipo" ||
        selectedOption === "Mostrar por estado del inmueble" ||
        selectedOption === "Mostrar por Tipo") && (
        <div className="mb-4 flex items-center space-x-2">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={`Ingrese un ${selectedOption
              .split(" ")[2]
              .toLowerCase()}`}
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
        {selectedOption === "Agregar nuevo inmueble" ? (
          <div className="bg-white p-4 shadow rounded-lg">
            <FormInmueble />
          </div>
        ) : (
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Direccion</th>
                <th className="py-2 px-4 text-left">Estado</th>
                <th className="py-2 px-4 text-left">Ciudad</th>
                <th className="py-2 px-4 text-left">Codigo Postal</th>
                <th className="py-2 px-4 text-left">Tipo de Inmueble</th>
                <th className="py-2 px-4 text-left">Precio de Venta</th>
                <th className="py-2 px-4 text-left">Estado del inmueble</th>
                <th className="py-2 px-4 text-left">Descripcion</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((inmueble, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4 text-left">
                      {inmueble.id_inmueble}
                    </td>
                    <td className="py-2 px-4 text-left">
                      {inmueble.direccion}
                    </td>
                    <td className="py-2 px-4 text-left">{inmueble.estado}</td>
                    <td className="py-2 px-4 text-left">{inmueble.ciudad}</td>
                    <td className="py-2 px-4 text-left">
                      {inmueble.codigo_postal}
                    </td>
                    <td className="py-2 px-4 text-left">
                      {inmueble.tipo_inmueble}
                    </td>
                    <td className="py-2 px-4 text-left">
                      {new Intl.NumberFormat("us-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(inmueble.precio_venta)}
                    </td>
                    <td className="py-2 px-4 text-left">
                      {inmueble.estado_inmueble}
                    </td>
                    <td className="py-2 px-4 text-left">
                      {inmueble.descripcion}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
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

export default InmueblesScreen;

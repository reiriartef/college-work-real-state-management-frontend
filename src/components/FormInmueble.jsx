import { useState } from "react";

function FormInmueble() {
  

  const [formData, setFormData] = useState({
    direccion:"",
    estado:"",
    ciudad:"",
    codigo_postal :"",
    tipo_inmueble:"",
    precio_venta:"",
    estado_inmueble:"",
    descripcion:""
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
    };
    console.log(dataToSubmit)

    try {
      const response = await fetch("http://127.0.0.1:5000/inmuebles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      if (response.ok) {
        alert("Inmueble creado satisfactoriamente");
        setFormData({
          direccion:"",
          estado:"",
          ciudad:"",
          codigo_postal :"",
          tipo_inmueble:"",
          precio_venta:"",
          estado_inmueble:"",
          descripcion:""
        });
      } else {
        alert("Error al enviar los datos");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error al enviar los datos");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">
        Registro de Inmueble
      </h2>
      <form onSubmit={handleSubmit}>
        

        <input
          type="text"
          name="direccion"
          placeholder="Direccion"
          value={formData.direccion}
          onChange={handleChange}
          required
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="text"
          name="estado"
          placeholder="Estado"
          value={formData.estado}
          onChange={handleChange}
          required
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="text"
          name="ciudad"
          placeholder="Ciudad"
          value={formData.ciudad}
          onChange={handleChange}
          required
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="text"
          name="codigo_postal"
          placeholder="Codigo Postal"
          value={formData.codigo_postal}
          onChange={handleChange}
          required
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="text"
          name="tipo_inmueble"
          placeholder="Tipo de Inmueble"
          value={formData.tipo_inmueble}
          onChange={handleChange}
          required
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="number"
          name="precio_venta"
          placeholder="Precio de Venta"
          value={formData.precio_venta}
          onChange={handleChange}
          required
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="text"
          name="estado_inmueble"
          placeholder="Estado del Inmueble"
          value={formData.estado_inmueble}
          onChange={handleChange}
          required
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripcion del Inmueble"
          value={formData.descripcion}
          onChange={handleChange}
          required
          className="mb-4 p-2 border rounded w-full"
        />
        

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}

export default FormInmueble;

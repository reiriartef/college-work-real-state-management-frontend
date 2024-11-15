import { useState } from "react";

function FormCliente() {
  

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    direccion:"",
    telefono:"",
    email:"",
    tipo_cliente:""
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
      const response = await fetch("http://127.0.0.1:5000/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      if (response.ok) {
        alert("Cliente creado satisfactoriamente");
        setFormData({
            nombre: "",
            apellido: "",
            direccion:"",
            telefono:"",
            email:"",
            tipo_cliente:""
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
        Registro de Cliente
      </h2>
      <form onSubmit={handleSubmit}>
        

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
          className="mb-4 p-2 border rounded w-full"
        />
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
          name="telefono"
          placeholder="Telefono"
          value={formData.telefono}
          onChange={handleChange}
          required
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="text"
          name="email"
          placeholder="Correo Electronico"
          value={formData.email}
          onChange={handleChange}
          required
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="text"
          name="tipo_cliente"
          placeholder="Tipo de Cliente"
          value={formData.tipo_cliente}
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

export default FormCliente;

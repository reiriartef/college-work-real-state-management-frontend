import { useState } from "react";
import { Disclosure, DisclosureButton } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import ClientesScreen from "./ClientesScreen";
import AgentesScreen from "./AgentesScreen";
import InmueblesScreen from "./InmueblesScreen";
import TransaccionesScreen from "./TransaccionesScreen";
import PagosScreen from "./PagosScreen";
import ReportesScreen from "./ReportesScreen";

const navigation = [
  { name: "Clientes", href: "#", current: true },
  { name: "Agentes", href: "#", current: false },
  { name: "Inmuebles", href: "#", current: false },
  { name: "Transacciones", href: "#", current: false },
  { name: "Pagos", href: "#", current: false },
  { name: "Reportes", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function StackedLayout() {
  const [activePage, setActivePage] = useState(); // Página activa por defecto

  // Función para renderizar el contenido según la página activa
  const renderContent = () => {
    switch (activePage) {
      case "Clientes":
        return <ClientesScreen />;
      case "Agentes":
        return <AgentesScreen />;
      case "Inmuebles":
        return <InmueblesScreen />;
      case "Transacciones":
        return <TransaccionesScreen />;
      case "Pagos":
        return <PagosScreen />;
      case "Reportes":
        return <ReportesScreen />;
      // Aquí puedes agregar más casos para otras pantallas
      default:
        return (
          <div className="flex flex-col justify-center items-center h-full p-4">
            <h1 className="text-2xl font-bold mb-4">Bienvenido a CVI</h1>
            <img
              src="src/assets/welcome.jpg"
              alt="Placeholder"
              className="w-0.8 mb-4 rounded-3xl"
            />
            <p className="w-full text-justify mt-4">
              Una app para compras y ventas de inmuebles que revoluciona tu
              negocio: gestiona propiedades, controla transacciones y maximiza
              oportunidades. Todo en un solo lugar, con filtros avanzados,
              informes y colaboración segura. ¡Optimiza tu mercado inmobiliario
              ahora!
            </p>
          </div>
        );
    }
  };

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center justify-center w-full">
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => setActivePage(item.name)}
                        className={classNames(
                          activePage === item.name
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Botón para menú móvil */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActivePage(item.name)}
                  className={classNames(
                    activePage === item.name
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </Disclosure.Panel>
        </Disclosure>

        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </>
  );
}

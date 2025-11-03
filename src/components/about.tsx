export default function About() {
  return (
    <section id="nosotros" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Imagen */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/profesores-y-estudiantes-colegio-felices.jpg"
                alt="Comunidad educativa Liceo Fidel Coloma"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Stats */}
            <div className="absolute -bottom-8 -right-8 bg-blue-600 text-white p-6 rounded-xl shadow-xl">
              <div className="text-4xl font-bold mb-1">40+</div>
              <div className="text-sm">Años de experiencia</div>
            </div>
          </div>

          {/* Contenido */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              Sobre Nosotros
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Liceo Fidel Coloma</h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Fundado en 1985, el Liceo Fidel Coloma se ha consolidado como una institución educativa de referencia en
                la región, comprometida con la formación integral de niños y jóvenes.
              </p>
              <p>
                Nuestro enfoque pedagógico combina la excelencia académica con el desarrollo de valores humanos,
                preparando a nuestros estudiantes para enfrentar los desafíos del mundo moderno con responsabilidad y
                liderazgo.
              </p>
            </div>

            {/* Misión y Visión */}
            <div className="space-y-4 pt-4">
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-bold text-gray-900 mb-2">Nuestra Misión</h3>
                <p className="text-gray-600">
                  Brindar una educación de calidad que forme ciudadanos íntegros, críticos y comprometidos con el
                  desarrollo de la sociedad.
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-bold text-gray-900 mb-2">Nuestra Visión</h3>
                <p className="text-gray-600">
                  Ser reconocidos como la institución educativa líder en excelencia académica y formación en valores.
                </p>
              </div>
            </div>

            {/* Valores */}
            <div className="flex flex-wrap gap-3 pt-4">
              {["Excelencia", "Respeto", "Responsabilidad", "Innovación"].map((value) => (
                <div key={value} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-semibold">
                  {value}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

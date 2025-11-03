export function Hero() {
  return (
    <section id="inicio" className="relative bg-gradient-to-br from-blue-50 to-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenido */}
          <div className="space-y-6">
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              Educación de calidad desde 1985
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight text-balance">
              Formando líderes del mañana
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed text-pretty">
              En el Liceo Fidel Coloma nos comprometemos con la excelencia académica y el desarrollo integral de
              nuestros estudiantes, preparándolos para los desafíos del futuro.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#nosotros"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium inline-flex items-center gap-2"
              >
                Conocer más
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#contacto"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors font-medium"
              >
                Contactar
              </a>
            </div>
          </div>

          {/* Imagen */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/estudiantes-felices-en-aula-moderna-colegio.jpg"
                alt="Estudiantes del Liceo Fidel Coloma"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decoración */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600 rounded-2xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-100 rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

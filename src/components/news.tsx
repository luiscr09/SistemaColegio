export function News() {
  const news = [
    {
      id: 1,
      title: "Inicio del año escolar 2025",
      date: "15 de Enero, 2025",
      summary:
        "Damos la bienvenida a todos nuestros estudiantes y familias al nuevo ciclo escolar. Las clases inician el 20 de enero.",
      image: "/inicio-clases-colegio-estudiantes.jpg",
    },
    {
      id: 2,
      title: "Reunión de padres y representantes",
      date: "10 de Enero, 2025",
      summary:
        "Invitamos a todos los padres a la reunión informativa sobre el calendario académico y actividades del año.",
      image: "/reunion-padres-colegio.jpg",
    },
    {
      id: 3,
      title: "Acto cívico por el Día de la Bandera",
      date: "5 de Enero, 2025",
      summary: "Celebramos con orgullo nuestros símbolos patrios con un emotivo acto cívico en el patio central.",
      image: "/acto-civico-bandera-colegio.jpg",
    },
  ]

  return (
    <section id="noticias" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Últimas Noticias</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mantente informado sobre las actividades y eventos de nuestra comunidad educativa
          </p>
        </div>

        {/* Grid de noticias */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {news.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-blue-600 font-semibold mb-2">{item.date}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.summary}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Botón ver todas */}
        <div className="text-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Ver todas las noticias
          </button>
        </div>
      </div>
    </section>
  )
}

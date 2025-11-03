export function Courses() {
  const levels = [
    {
      id: 1,
      name: "Educación Inicial",
      description: "Preescolar para niños de 3 a 5 años con enfoque en desarrollo integral",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      name: "Educación Primaria",
      description: "1° a 6° grado con programas de lectura, matemáticas y ciencias",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      id: 3,
      name: "Educación Secundaria",
      description: "1° a 5° año con preparación para la universidad y formación técnica",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
    },
  ]

  const subjects = [
    { name: "Matemáticas", color: "bg-blue-100 text-blue-700" },
    { name: "Lengua y Literatura", color: "bg-green-100 text-green-700" },
    { name: "Ciencias Naturales", color: "bg-purple-100 text-purple-700" },
    { name: "Ciencias Sociales", color: "bg-orange-100 text-orange-700" },
    { name: "Inglés", color: "bg-pink-100 text-pink-700" },
    { name: "Educación Física", color: "bg-red-100 text-red-700" },
    { name: "Arte y Cultura", color: "bg-yellow-100 text-yellow-700" },
    { name: "Tecnología", color: "bg-indigo-100 text-indigo-700" },
  ]

  return (
    <section id="cursos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Cursos y Formación</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ofrecemos una educación integral desde preescolar hasta secundaria
          </p>
        </div>

        {/* Niveles educativos */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {levels.map((level) => (
            <div key={level.id} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                {level.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{level.name}</h3>
              <p className="text-gray-600 leading-relaxed">{level.description}</p>
            </div>
          ))}
        </div>

        {/* Materias destacadas */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Materias Destacadas</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {subjects.map((subject, index) => (
              <div key={index} className={`${subject.color} px-6 py-3 rounded-full font-semibold`}>
                {subject.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

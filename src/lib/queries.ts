// Archivo centralizado con todas las queries a Supabase para estudiantes y tutores
// Importa supabase desde ./client.ts en componentes del cliente
// Los tipos están definidos en types/student-parent.ts


import type { Student, Parent, StudentParent } from "../../src/types/student-parent"
import {supabase} from "./supabase"


export type ParentInsert = Omit<Parent, "id" | "created_at" | "relationship_type">;
// ================== ESTUDIANTES ==================





// Obtener todos los estudiantes
export async function getStudents() {
  try {
    const { data, error } = await supabase.from("students").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return { data: data as Student[], error: null }
  } catch (error) {
    return { data: null, error: error instanceof Error ? error.message : "Error desconocido" }
  }
}
// Obtener estudiante por ID con sus tutores
export async function getStudentWithParents(studentId: string) {
  try {
    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("*")
      .eq("id", studentId)
      .single()

    if (studentError) throw studentError

    const { data: studentParents, error: parentsError } = await supabase
      .from("student_parents")
      .select(
        `
        *,
        parent:parents(*)
      `,
      )
      .eq("student_id", studentId)

    if (parentsError) throw parentsError

    return {
      data: {
        student: student as Student,
        // Nota: 'studentParents' es un array de StudentParentLink + Parent
        parents: studentParents as any[], 
      },
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

// Buscar estudiantes por nombre o CUE
export async function searchStudents(query: string) {
  try {
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,cue_mined.ilike.%${query}%`)
      .limit(10)

    if (error) throw error
    return { data: data as Student[], error: null }
  } catch (error) {
    return { data: null, error: error instanceof Error ? error.message : "Error desconocido" }
  }
}

// Crear nuevo estudiante
export async function createStudent(student: Omit<Student, "id" | "created_at">) {
  try {
    const { data, error } = await supabase.from("students").insert([student]).select().single()

    if (error) throw error
    return { data: data as Student, error: null }
  } catch (error) {
    return { data: null, error: error instanceof Error ? error.message : "Error desconocido" }
  }
}

// Actualizar estudiante
export async function updateStudent(studentId: string, updates: Partial<Omit<Student, "id" | "created_at">>) {
  try {
    const { data, error } = await supabase.from("students").update(updates).eq("id", studentId).select().single()

    if (error) throw error
    return { data: data as Student, error: null }
  } catch (error) {
    return { data: null, error: error instanceof Error ? error.message : "Error desconocido" }
  }
}

// Eliminar estudiante
export async function deleteStudent(studentId: string) {
  try {
    const { error } = await supabase.from("students").delete().eq("id", studentId)

    if (error) throw error
    return { error: null }
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Error desconocido" }
  }
}

// ================== TUTORES ==================

// Obtener todos los tutores
export async function getParents() {
  try {
    const { data, error } = await supabase.from("parents").select("*").order("created_at", {
      ascending: false,
    })

    if (error) throw error
    return { data: data as Parent[], error: null }
  } catch (error) {
    return { data: null, error: error instanceof Error ? error.message : "Error desconocido" }
  }
}

// Obtener tutor por ID
export async function getParent(parentId: string) {
  try {
    const { data, error } = await supabase.from("parents").select("*").eq("id", parentId).single()

    if (error) throw error
    return { data: data as Parent, error: null }
  } catch (error) {
    return { data: null, error: error instanceof Error ? error.message : "Error desconocido" }
  }
}

// Crear nuevo tutor
export async function createParent(parent: ParentInsert) {
  try {
    const { data, error } = await supabase.from("parents").insert([parent]).select().single()

    if (error) throw error
    // El retorno sigue siendo Parent (con ID y created_at ya generados)
    return { data: data as Parent, error: null } 
  } catch (error) {
    return { data: null, error: error instanceof Error ? error.message : "Error desconocido" }
  }
}
// Actualizar tutor
export async function updateParent(parentId: string, updates: Partial<Omit<Parent, "id" | "created_at">>) {
  try {
    const { data, error } = await supabase.from("parents").update(updates).eq("id", parentId).select().single()

    if (error) throw error
    return { data: data as Parent, error: null }
  } catch (error) {
    return { data: null, error: error instanceof Error ? error.message : "Error desconocido" }
  }
}

// ================== RELACIONES ESTUDIANTE-TUTOR ==================

// Vincular tutor a estudiante
export async function linkParentToStudent(studentId: string, parentId: string, relationshipType: string) {
  try {
    const { data, error } = await supabase
      .from("student_parents")
      .insert([
        {
          student_id: studentId,
          parent_id: parentId,
          relationship_type: relationshipType,
        },
      ])
      .select()
      .single()

    if (error) throw error
    return { data: data as StudentParent, error: null }
  } catch (error) {
    return { data: null, error: error instanceof Error ? error.message : "Error desconocido" }
  }
}

// Desvincular tutor de estudiante
export async function unlinkParentFromStudent(studentId: string, parentId: string) {
  try {
    const { error } = await supabase
      .from("student_parents")
      .delete()
      .eq("student_id", studentId)
      .eq("parent_id", parentId)

    if (error) throw error
    return { error: null }
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Error desconocido" }
  }
}

// Actualizar tipo de relación
export async function updateRelationshipType(studentId: string, parentId: string, relationshipType: string) {
  try {
    const { data, error } = await supabase
      .from("student_parents")
      .update({ relationship_type: relationshipType })
      .eq("student_id", studentId)
      .eq("parent_id", parentId)
      .select()
      .single()

    if (error) throw error
    return { data: data as StudentParent, error: null }
  } catch (error) {
    return { data: null, error: error instanceof Error ? error.message : "Error desconocido" }
  }
}

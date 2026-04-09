// src/api.js

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts' // Puedes cambiar por tu API real

/**
 * Obtener todas las incidencias (limitadas a 10 para ejemplo)
 */
export async function fetchIncidents() {
  try {
    const res = await fetch(BASE_URL)
    if (!res.ok) throw new Error('Error al obtener las incidencias')
    const data = await res.json()
    return data.slice(0, 10) // Limitar ejemplo
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Obtener una incidencia por ID
 * @param {number|string} id 
 */
export async function fetchIncidentById(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`)
    if (!res.ok) throw new Error('Incidencia no encontrada')
    return await res.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Crear una nueva incidencia
 * @param {{title: string, body: string, status?: string}} incidentData
 */
export async function createIncident(incidentData) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(incidentData)
    })
    if (!res.ok) throw new Error('Error al crear la incidencia')
    return await res.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Editar una incidencia existente
 * @param {number|string} id 
 * @param {{title?: string, body?: string, status?: string}} incidentData
 */
export async function updateIncident(id, incidentData) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(incidentData)
    })
    if (!res.ok) throw new Error('Error al actualizar la incidencia')
    return await res.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Borrar una incidencia
 * @param {number|string} id 
 */
export async function deleteIncident(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Error al borrar la incidencia')
    return true
  } catch (error) {
    console.error(error)
    throw error
  }
}
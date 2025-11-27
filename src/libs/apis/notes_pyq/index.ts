import api from "../axiosClinet";

const endPoint = {
  NOTES: "/notes",
  PYQS: "/pyqs",
};

/* -------------------------------------------------------
    NOTES API
------------------------------------------------------- */

/**
 * Create bulk notes with optional file uploads
 */
export async function createBulkNotes(notesArray: any[]) {
  const formData = new FormData();

  const notesForBody = notesArray.map((note) => {
    if (note.file instanceof File) {
      formData.append("files", note.file);
      return {
        title: note.title,
        year: note.year,
        subjectId: note.subjectId,
        fileUrl: note.fileUrl || null,
      };
    }
    return {
      title: note.title,
      year: note.year,
      subjectId: note.subjectId,
      fileUrl: note.fileUrl || null,
    };
  });

  formData.append("notes", JSON.stringify(notesForBody));

  const res = await api.post(`${endPoint.NOTES}/bulk`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
}

export async function getNotes(page = 1, limit = 10, subjectId: number) {
  const res = await api.get(endPoint.NOTES, {
    params: { page, limit, subjectId },
  });

  return res.data;
}

export async function deleteNote(id: string) {
  const res = await api.delete(`${endPoint.NOTES}/${id}`);
  return res.data;
}

/* -------------------------------------------------------
    PYQ API — Matches your backend controller
------------------------------------------------------- */

/**
 * Create **single** PYQ
 */
export async function createPyq(formData: FormData) {
  const res = await api.post(endPoint.PYQS, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

/**
 * Bulk Create PYQs
 *
 * items: [{ title, year, subjectId, file? }]
 */
export async function bulkCreatePyqs(pyqArray: any[]) {
  const formData = new FormData();

  const itemsForBody = pyqArray.map((item) => {
    if (item.file instanceof File) {
      formData.append("files", item.file);
      return {
        title: item.title,
        year: item.year,
        subjectId: item.subjectId,
      };
    }
    return {
      title: item.title,
      year: item.year,
      subjectId: item.subjectId,
      fileUrl: item.fileUrl || null,
    };
  });

  formData.append("items", JSON.stringify(itemsForBody));

  const res = await api.post(`${endPoint.PYQS}/bulk`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
}

/**
 * Get PYQs with pagination + optional subject filter
 */
export async function getPyqs(page = 1, limit = 10, subjectId?: number) {
  const res = await api.get(endPoint.PYQS, {
    params: { page, limit, subjectId },
  });
  return res.data;
}

/**
 * Get a single PYQ by ID
 */
export async function getPyqById(id: number) {
  const res = await api.get(`${endPoint.PYQS}/${id}`);
  return res.data;
}

/**
 * Update a PYQ
 */
export async function updatePyq(id: number, formData: FormData) {
  const res = await api.put(`${endPoint.PYQS}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

/**
 * Delete a PYQ
 */
export async function deletePyq(id: number) {
  const res = await api.delete(`${endPoint.PYQS}/${id}`);
  return res.data;
}

/**
 * Get PYQs by year
 */
export async function getPyqsByYear(year: number) {
  const res = await api.get(`${endPoint.PYQS}/year/${year}`);
  return res.data;
}

/**
 * Get list of available years by subject
 */
export async function getPyqYears(subjectId: number) {
  const res = await api.get(`${endPoint.PYQS}/available-years`, {
    params: { subjectId },
  });
  return res.data;
}

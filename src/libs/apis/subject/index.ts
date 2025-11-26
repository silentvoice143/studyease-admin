import api from "../axiosClinet";

const endPoint = {
  BASE: "/subjects",
};

export async function getSubjects(
  page = 1,
  limit = 10,
  streamId: number,
  sem: number
) {
  const res = await api.get(endPoint.BASE, {
    params: { page, limit, streamId, semester: sem },
  });

  return res.data;
}

export async function postSubject(body: any) {
  const res = await api.post(endPoint.BASE, body);
  return res.data;
}

export async function deleteStream(id: string) {
  const res = await api.delete(`${endPoint.BASE}/${id}`);
  return res.data;
}

export async function editStream(body: any) {
  const res = await api.put(`${endPoint.BASE}/${body.id!}`, body.data!);
  return res.data;
}
